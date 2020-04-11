import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ProposedProjectService } from '../../../ProposedProject.service';
import { QueriesService } from '../../../queries.service';
import { Client, ProposedProject, Consultant } from '../../../org.ifb.trustfabric';
import { ProposedProjectUpdateService } from '../projects-proposed.update.service';
import { DeleteProjectDialogComponent } from './delete-project-dialog/delete-project-dialog.component';
import  { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/toPromise';
import { AddConsultantsDialogComponent } from './add-consultants-dialog/add-consultants-dialog.component';
import { RemoveConsultantsDialogComponent } from './remove-consultants-dialog/remove-consultants-dialog.component';
import { GrantAccessDialogComponent } from './grant-access-dialog/grant-access-dialog.component';
import { RemoveAccessDialogComponent } from './remove-access-dialog/remove-access-dialog.component';
import { TransformProjectDialogComponent } from './transform-project-dialog/transform-project-dialog.component';
import { RemoveFromProposedProjectsOfClientService } from './RemoveFromProposedProjectsOfClient.service';
import { RemoveFromReadableConsultantsOfClientService } from '../RemoveFromReadableConsultantsOfClient.service';
import { UIService } from '../../../ui-service.service';


@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit, OnDestroy {

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
  
  //displayedColumns = ['id', 'name', 'projectLeader', 'consultants', 'addRemConsultants', 'grantRemAccess', 'transform', 'delete'];
  displayedColumns = ['name', 'addRemConsultants', 'grantRemAccess', 'transform', 'delete'];

  dataSource = new MatTableDataSource<ProposedProject>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private removeFromProposedProjectsOfClientService: RemoveFromProposedProjectsOfClientService, private proposedProjectService: ProposedProjectService, private proposedProjectUpdateService: ProposedProjectUpdateService, private queriesService: QueriesService, private removeFromReadableConsultantsOfClientService: RemoveFromReadableConsultantsOfClientService, private uiService: UIService, private dialog: MatDialog) { 

  }

  ngOnInit() {  
    this.loadAll();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.subscription = this.proposedProjectUpdateService.listOfProposedProjectsChanged$.subscribe(
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
    
    const dialogRef = this.dialog.open(AddConsultantsDialogComponent, {data: {
      title: "Add consultants", 
      text: "Select all consultants you want to add to project '" + this.currentName + "'."
      }
    });

    dialogRef.componentInstance.projectId = this.currentId;
    
  }

  openRemoveConsultantsDialog(id: string, name: string) {
      
    this.currentId = id;
    this.currentName = name;
    
    const dialogRef = this.dialog.open(RemoveConsultantsDialogComponent, {data: {
      title: "Remove consultants", 
      text: "Select all consultants you want to remove from project '" + this.currentName + "'."
      }
    });

    dialogRef.componentInstance.projectId = this.currentId;
    
  }

  openGrantAccessDialog(id: string, name: string) {
      
    this.currentId = id;
    this.currentName = name;
    
    const dialogRef = this.dialog.open(GrantAccessDialogComponent, {data: {
      title: "Add clients", 
      text: "Select all clients you want to give access to project '" + this.currentName + "'."
      }
    });

    dialogRef.componentInstance.projectId = this.currentId;
    
  }

  openRemoveAccessDialog(id: string, name: string) {
      
    this.currentId = id;
    this.currentName = name;
    
    const dialogRef = this.dialog.open(RemoveAccessDialogComponent, {data: {
      title: "Remove clients", 
      text: "Select all clients for whom you want to revoke access to project '" + this.currentName + "'."
      }
    });

    dialogRef.componentInstance.projectId = this.currentId;
    
  }

  openTransformProjectDialog(id: string, name: string) {
      
    this.currentId = id;
    this.currentName = name;
    
    const dialogRef = this.dialog.open(TransformProjectDialogComponent, {data: {
      title: "Please confirm", 
      text: "Are you sure you want to change the status of project '" + this.currentName + "' from 'proposed' to 'accepted' ?"
      }
    });

    dialogRef.componentInstance.projectId = this.currentId;
    
  }

  openDeleteDialog(id: String, name: String) {
    
    this.currentId = id;
    this.currentName = name;
    
    const dialogRef = this.dialog.open(DeleteProjectDialogComponent, {data: {
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
          return this.removeFromProposedProjectsOfEligibleClients();
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


  private deleteProject(): Promise<any> {
    return this.proposedProjectService.deleteAsset(this.currentId)
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
    return this.proposedProjectService.getAll()
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

    let projectString = 'resource:org.ifb.trustfabric.ProposedProject#' + this.currentId;
    let tempList = [];
    return this.queriesService.sendQuery('selectClientsByProposedProjectAccess', ['proposedProjects'], [projectString])
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
        if (typeof client.proposedProjects !== 'undefined' && client.proposedProjects.length > 0) {
          for (let project of client.proposedProjects) {
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



  private removeFromProposedProjectsOfEligibleClients(): Promise<any> {

    let promises = [];

    for (let client of this.arrayOfEligibleClients) {
      promises.push(this.removeFromProposedProjectsOfClient(client.id));
    }

    return Promise.all(promises)
    .then(() => {
      console.log("Proposed project has successfully been removed from the relevant clients.");
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


  private removeFromProposedProjectsOfClient(clientId: string) {

    let projectString = 'org.ifb.trustfabric.ProposedProject#' + this.currentId;
     
    this.transaction = {
      $class: 'org.ifb.trustfabric.RemoveFromProposedProjectsOfClient',
      'client': 'resource:org.ifb.trustfabric.Client#' + clientId,
      'proposedProjectToBeRemoved': projectString,
      'timestamp': new Date().getTime()
    };

    return this.removeFromProposedProjectsOfClientService.addTransaction(this.transaction)
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
    return this.proposedProjectService.getAsset(projectId)
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


  private contains(array: any[], item: any) {
    for (let i=0; i<array.length; i++) {
        if (array[i] == item) {
            return true;
        }
    }
    return false;
  }



}
