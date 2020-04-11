import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { AcceptedProjectService } from '../AcceptedProject.service';
import { Client, AcceptedProject, Consultant } from '../../../org.ifb.trustfabric';
import { AcceptedProjectUpdateService } from '../projects-accepted.update.service';
import { DeleteProjectDialogAcceptedComponent } from './delete-project-dialog-accepted/delete-project-dialog-accepted.component';
import  { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/toPromise';
import { AddConsultantsDialogAcceptedComponent } from './add-consultants-dialog-accepted/add-consultants-dialog-accepted.component';
import { RemoveConsultantsDialogAcceptedComponent } from './remove-consultants-dialog-accepted/remove-consultants-dialog-accepted.component';
import { GrantAccessDialogAcceptedComponent } from './grant-access-dialog-accepted/grant-access-dialog-accepted.component';
import { RemoveAccessDialogAcceptedComponent } from './remove-access-dialog-accepted/remove-access-dialog-accepted.component';
import { QueriesService } from '../../../queries.service';
import { RemoveFromAcceptedProjectsOfClientService } from './RemoveFromAcceptedProjectsOfClient.service';
import { RemoveFromReadableConsultantsOfClientService } from '../RemoveFromReadableConsultantsOfClient.service';
import { RemoveFromWritableConsultantsOfClientService } from './RemoveFromWritableConsultantsOfClient.service';
import { UIService } from '../../../ui-service.service';



@Component({
  selector: 'app-accepted-projects-list',
  templateUrl: './accepted-projects-list.component.html',
  styleUrls: ['./accepted-projects-list.component.css']
})
export class AcceptedProjectsListComponent implements OnInit, OnDestroy {

  private currentId;
  private currentName;
  private arrayOfEligibleClients: Client[] = [];
  private arrayOfTeamMembers: Consultant[] = [];
  private consultantsOfProjectToBeRemoved: Consultant[] = [];
  private consultantsOfProjectToBeRemoved2: string[] = [];
  private transaction;
  private errorMessage;
  private subscription: Subscription;
  private subscription2: Subscription;
  
  //displayedColumns = ['id', 'name', 'projectLeader', 'consultants', 'addRemConsultants', 'grantRemAccess', 'delete'];
  displayedColumns = ['name', 'addRemConsultants', 'grantRemAccess', 'delete'];

  dataSource = new MatTableDataSource<AcceptedProject>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private acceptedProjectService: AcceptedProjectService, private acceptedProjectUpdateService: AcceptedProjectUpdateService, private removeFromAcceptedProjectsOfClientService: RemoveFromAcceptedProjectsOfClientService, private removeFromReadableConsultantsOfClientService: RemoveFromReadableConsultantsOfClientService, private removeFromWritableConsultantsOfClientService: RemoveFromWritableConsultantsOfClientService, private uiService: UIService, private queriesService: QueriesService, private dialog: MatDialog) { 

  }

  ngOnInit() {  
    this.loadAll();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.subscription = this.acceptedProjectUpdateService.listOfAcceptedProjectsChanged$.subscribe(
      () => {
        this.loadAll();
      }
    );

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAddConsultantsDialog(id: string, name: string) {
      
    this.currentId = id;
    this.currentName = name;
    
    const dialogRef = this.dialog.open(AddConsultantsDialogAcceptedComponent, {data: {
      title: "Add consultants", 
      text: "Select all consultants you want to add to project '" + this.currentName + "'."
      }
    });

    dialogRef.componentInstance.projectId = this.currentId;
    
  }

  openRemoveConsultantsDialog(id: string, name: string) {
      
    this.currentId = id;
    this.currentName = name;
    
    const dialogRef = this.dialog.open(RemoveConsultantsDialogAcceptedComponent, {data: {
      title: "Remove consultants", 
      text: "Select all consultants you want to remove from project '" + this.currentName + "'."
      }
    });

    dialogRef.componentInstance.projectId = this.currentId;
    
  }

  openGrantAccessDialog(id: string, name: string) {
      
    this.currentId = id;
    this.currentName = name;
    
    const dialogRef = this.dialog.open(GrantAccessDialogAcceptedComponent, {data: {
      title: "Add clients", 
      text: "Select all clients you want to give access to project '" + this.currentName + "'."
      }
    });

    dialogRef.componentInstance.projectId = this.currentId;
    
  }

  openRemoveAccessDialog(id: string, name: string) {
      
    this.currentId = id;
    this.currentName = name;
    
    const dialogRef = this.dialog.open(RemoveAccessDialogAcceptedComponent, {data: {
      title: "Remove clients", 
      text: "Select all clients for whom you want to revoke access to project '" + this.currentName + "'."
      }
    });

    dialogRef.componentInstance.projectId = this.currentId;
    
  }

  openDeleteDialog(id: String, name: String) {
    
    this.currentId = id;
    this.currentName = name;
    
    const dialogRef = this.dialog.open(DeleteProjectDialogAcceptedComponent, {data: {
      title: "Please confirm", 
      text: "Are you sure you want to delete project '" + this.currentName + "'?"
      }
    });

    this.subscription2 = dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        
        this.uiService.loadingStateChanged.next(true);

        //return this.loadEligibleClients()
        /* Because of a bug in the hyperledger-composer query language
        related to the CONTAINS operator, method "loadEligibleClients()" currently does not work.
        Hence, method "loadEligibleClientsSubstitute()" has to be used instead until that bug gets fixed. */
        return this.loadEligibleClientsSubstitute()
        .then(() => {
          return this.removeFromAcceptedProjectsOfEligibleClients();
        })
        .then(() => {
          return this.loadConsultants();
        })
        .then(() => {
          return this.filterConsultants(this.currentId);
        })
        .then(() => {
          return this.updateReadableConsultantsOfClientsWithAccessToProject();
        })
        .then(() => {
          return this.updateWritableConsultantsOfClientsWithAccessToProject();
        })
        .then(() => {
          return this.deleteProject();
        })
        .then(() => {
          return this.loadAll();
        })
        .then(() => {
          this.uiService.loadingStateChanged.next(false);
        }); 
      }   
    });

  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.subscription2) {
      this.subscription2.unsubscribe();
    }
  }



  deleteProject(): Promise<any> {
    return this.acceptedProjectService.deleteAsset(this.currentId)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
        if(error == 'Server error'){
				  this.errorMessage = "Could not connect to REST server. Please check your configuration details.";
		    }
			  else if(error == '404 - Not Found'){
				  this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			  }
			  else{
				  this.errorMessage = error;
			  }
    });
  }

  
  private loadAll(): Promise<any> {
    let tempList = [];
    return this.acceptedProjectService.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(project => {
        tempList.push(project);
      });
      this.dataSource.data = tempList;
    })
    .catch((error) => {
        if (error == 'Server error') {
            this.errorMessage = "Could not connect to REST server. Please check your configuration details.";
        }
        else if (error == '404 - Not Found') {
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else {
            this.errorMessage = error;
        }
    });
  }


  private loadEligibleClients(): Promise<any> {

    let projectString = 'resource:org.ifb.trustfabric.AcceptedProject#' + this.currentId;
    let tempList = [];
    return this.queriesService.sendQuery('selectClientsByAcceptedProjectAccess', ['acceptedProjects'], [projectString])
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(element => {
        tempList.push(element);
      });
      this.arrayOfEligibleClients = tempList;  
    })
    .catch((error) => {
        if (error == 'Server error') {
            this.errorMessage = "Could not connect to REST server. Please check your configuration details.";
        }
        else if (error == '404 - Not Found') {
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else {
            this.errorMessage = error;
        }
    });
  }

  private loadEligibleClientsSubstitute(): Promise<any> {

    let tempList = [];
    this.arrayOfEligibleClients = [];
    return this.queriesService.sendQuery('selectClients')
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(element => {
        tempList.push(element);
      });
      let idOfProject = "";
      for (let client of tempList) { 
        if (typeof client.acceptedProjects !== 'undefined' && client.acceptedProjects.length > 0) {
          for (let project of client.acceptedProjects) {
            idOfProject = this.getId(project);
            if (idOfProject == this.currentId) {
              this.arrayOfEligibleClients.push(client);
              break;
            }
          }
        }   
      }    
    })
    .catch((error) => {
        if (error == 'Server error') {
            this.errorMessage = "Could not connect to REST server. Please check your configuration details.";
        }
        else if (error == '404 - Not Found') {
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else {
            this.errorMessage = error;
        }
    });
  }


  private getId(str: string) {
    return str.split('#')[1];
  }



  private removeFromAcceptedProjectsOfEligibleClients(): Promise<any> {

    let promises = [];

    for (let client of this.arrayOfEligibleClients) {
      promises.push(this.removeFromAcceptedProjectsOfClient(client.id));
    }

    return Promise.all(promises)
    .then(() => {
      console.log("Accepted project has successfully been removed from the relevant clients.");
    })
    .catch((error) => {
      if (error == 'Server error') {
          this.errorMessage = "Could not connect to REST server. Please check your configuration details.";
      }
      else if (error == '404 - Not Found') {
          this.errorMessage = "404 - Could not find API route. Please check your available APIs."
      }
      else {
          this.errorMessage = error;
      }
    });

  }


  private removeFromAcceptedProjectsOfClient(clientId: string) {

    let projectString = 'org.ifb.trustfabric.AcceptedProject#' + this.currentId;
     
    this.transaction = {
      $class: 'org.ifb.trustfabric.RemoveFromAcceptedProjectsOfClient',
      'client': 'resource:org.ifb.trustfabric.Client#' + clientId,
      'acceptedProjectToBeRemoved': projectString,
      'timestamp': new Date().getTime()
    };

    return this.removeFromAcceptedProjectsOfClientService.addTransaction(this.transaction)
      .toPromise()
      .then(() => {
        this.errorMessage = null;
      })
      .catch((error) => {
          if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details.";
          }
          else if(error == '404 - Not Found'){
            this.errorMessage = "404 - Could not find API route. Please check your available APIs."
          }
          else{
            this.errorMessage = error;
          }
      });

  } 


  private loadConsultants(): Promise<any> {
    let tempList = [];
    return this.queriesService.sendQuery("selectConsultants")
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(element => {
        tempList.push(element);
      });
      this.arrayOfTeamMembers = tempList;  
    })
    .catch((error) => {
        if (error == 'Server error') {
            this.errorMessage = "Could not connect to REST server. Please check your configuration details.";
        }
        else if (error == '404 - Not Found') {
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else {
            this.errorMessage = error;
        }
    });
  }

  private filterConsultants(projectId: any): Promise<any> {
    let tempList = [];
    this.consultantsOfProjectToBeRemoved = [];
    return this.acceptedProjectService.getAsset(projectId)
    .toPromise()
    .then((result) => {
      if (result.consultants) {
        
        result.consultants.forEach(element => {
          tempList.push(element);
        }); 
        for (let teamMember of this.arrayOfTeamMembers) {
          let teamMemberString = 'resource:org.ifb.trustfabric.Consultant#' + teamMember.id;
          if (this.contains(tempList, teamMemberString)) {
            this.consultantsOfProjectToBeRemoved.push(teamMember);
          }
        }
        
      }
      else {
        this.consultantsOfProjectToBeRemoved = [];
      }
    })
    .catch((error) => {
        if (error == 'Server error') {
            this.errorMessage = "Could not connect to REST server. Please check your configuration details.";
        }
        else if (error == '404 - Not Found') {
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else {
            this.errorMessage = error;
        }
    });
  }


  private updateReadableConsultantsOfClientsWithAccessToProject(): Promise<any> {
   
    let promises = [];

    for (let client of this.arrayOfEligibleClients) {
      promises.push(this.updateReadableConsultantsOfClient(client.id));
    }

    return Promise.all(promises)
    .then(() => {
      console.log("The consultants have successfully been removed from the relevant clients' list of readableConsultants.");
    })
    .catch((error) => {
      if (error == 'Server error') {
          this.errorMessage = "Could not connect to REST server. Please check your configuration details.";
      }
      else if (error == '404 - Not Found') {
          this.errorMessage = "404 - Could not find API route. Please check your available APIs."
      }
      else {
          this.errorMessage = error;
      }
    });

  }

  private updateReadableConsultantsOfClient(clientId: string) {

    this.consultantsOfProjectToBeRemoved2 = [];

    this.consultantsOfProjectToBeRemoved.forEach(element => {
      let consultant = "resource:org.ifb.trustfabric.Consultant#" + element.id;
      this.consultantsOfProjectToBeRemoved2.push(consultant);
    });

    this.transaction = {
      $class: 'org.ifb.trustfabric.RemoveFromReadableConsultantsOfClient',
        'client': 'org.ifb.trustfabric.Client#' + clientId,
        'readableConsultantsToBeRemoved': this.consultantsOfProjectToBeRemoved2,
        'timestamp': new Date().getTime()
    };

    return this.removeFromReadableConsultantsOfClientService.addTransaction(this.transaction)
      .toPromise()
      .then(() => {
        this.errorMessage = null;
      })
      .catch((error) => {
          if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details.";
          }
          else if(error == '404 - Not Found'){
            this.errorMessage = "404 - Could not find API route. Please check your available APIs."
          }
          else{
            this.errorMessage = error;
          }
      });

  } 


  private updateWritableConsultantsOfClientsWithAccessToProject(): Promise<any> {
   
    let promises = [];

    for (let client of this.arrayOfEligibleClients) {
      promises.push(this.updateWritableConsultantsOfClient(client.id));
    }

    return Promise.all(promises)
    .then(() => {
      console.log("The consultants have successfully been removed from the relevant clients' list of writableConsultants.");
    })
    .catch((error) => {
      if (error == 'Server error') {
          this.errorMessage = "Could not connect to REST server. Please check your configuration details.";
      }
      else if (error == '404 - Not Found') {
          this.errorMessage = "404 - Could not find API route. Please check your available APIs."
      }
      else {
          this.errorMessage = error;
      }
    });

  }

  private updateWritableConsultantsOfClient(clientId: string) {

    this.transaction = {
      $class: 'org.ifb.trustfabric.RemoveFromWritableConsultantsOfClient',
        'client': 'org.ifb.trustfabric.Client#' + clientId,
        'writableConsultantsToBeRemoved': this.consultantsOfProjectToBeRemoved2,
        'timestamp': new Date().getTime()
    };

    return this.removeFromWritableConsultantsOfClientService.addTransaction(this.transaction)
      .toPromise()
      .then(() => {
        this.errorMessage = null;
      })
      .catch((error) => {
          if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details.";
          }
          else if(error == '404 - Not Found'){
            this.errorMessage = "404 - Could not find API route. Please check your available APIs."
          }
          else{
            this.errorMessage = error;
          }
      });

  } 




  private contains(array: any[], item: any) {
    for (let i=0; i<array.length; i++) {
        if (array[i] == item) {
            return true;
        }
    }
    return false;
  }



}
