import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Consultant, Client } from '../../../../org.ifb.trustfabric';
import { AcceptedProjectUpdateService } from '../../projects-accepted.update.service';
import { QueriesService } from '../../../../queries.service';
import { AddToConsultantsOfAcceptedProjectService } from './AddToConsultantsOfAcceptedProject.service';
import { AcceptedProjectService } from '../../AcceptedProject.service';
import { AddToReadableConsultantsOfClientService } from '../../projects-list/add-consultants-dialog/AddToReadableConsultantsOfClient.service';
import { AddToWritableConsultantsOfClientService } from './AddToWritableConsultantsOfClient.service';
import { AuthService } from '../../../../auth/auth.service';
import { ConsultantService } from '../../../../consultants.service';
import { UIWindowService } from '../../../../ui-service-windows.service';
import { Subscription } from 'rxjs/Rx';


@Component({
  selector: 'app-add-consultants-dialog-accepted',
  templateUrl: './add-consultants-dialog-accepted.component.html',
  styleUrls: ['./add-consultants-dialog-accepted.component.css']
})
export class AddConsultantsDialogAcceptedComponent implements OnInit {

  isLoading = false;
  transaction;
  consultantId;
  projectId: string;
  selectedConsultants: string[];
  selectedConsultants2: string[] = [];
  arrayOfTeamMembers0: Consultant[] = [];
  arrayOfTeamMembers: Consultant[] = [];
  arrayOfAddableTeamMembers: Consultant[] = [];
  clientsWithAccessToProject: Client[] = [];
  isDisabled: boolean = true;
  errorMessage;
  private subscription: Subscription;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private addToConsultantsOfAcceptedProjectService: AddToConsultantsOfAcceptedProjectService, private acceptedProjectUpdateService: AcceptedProjectUpdateService, private queriesService: QueriesService, private acceptedProjectService: AcceptedProjectService, private addToReadableConsultantsOfClientService: AddToReadableConsultantsOfClientService, private addToWritableConsultantsOfClientService: AddToWritableConsultantsOfClientService, private authService: AuthService, private consultantService: ConsultantService, private uiWindowService: UIWindowService, private dialogRef: MatDialogRef<AddConsultantsDialogAcceptedComponent>) { }

  ngOnInit() {

    this.consultantId = this.authService.getIdOfCurrentUser();

    this.subscription = this.uiWindowService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  
    this.uiWindowService.loadingStateChanged.next(true);
    
    return this.loadConsultants()
      .then(() => {
        /* this function call is necessary because access on a per-property basis 
        has so far only been implemented in the ACL language but not in 
        the runtime environment: */
        return this.filterConsultants0();
      })
      .then(() => {
        return this.filterConsultants(this.projectId);
      })
      .then(() => {
        this.uiWindowService.loadingStateChanged.next(false);
      })

  }


  onNgModelChange() {
    if (this.selectedConsultants.length>0) {
      this.isDisabled = false;
    }
    else {
      this.isDisabled = true;
    }
  }

  onAddClicked() {

    this.uiWindowService.loadingStateChanged.next(true);

    return this.addToConsultantsOfAcceptedProject()
        .then(() => {
          this.acceptedProjectUpdateService.acceptedProjectsUpdated();
        })
        .then(() => {
          //return this.getClientsWithAccessToProject();
          /* Because of a bug in the hyperledger-composer query language
          related to the CONTAINS operator, method "getClientsWithAccessToProject()" currently does not work.
          Hence, method "getClientsWithAccessToProjectSubstitute()" has to be used instead until that bug gets fixed. */
          return this.getClientsWithAccessToProjectSubstitute();
        })
        .then(() => {
          return this.updateReadableConsultantsOfClientsWithAccessToProject();
        })
        .then(() => {
          return this.updateWritableConsultantsOfClientsWithAccessToProject();
        })
        .then(() => {
          this.uiWindowService.loadingStateChanged.next(false);
          this.dialogRef.close();
        });    

  }


  private addToConsultantsOfAcceptedProject(): Promise<any> {

    this.selectedConsultants2 = [];

    this.selectedConsultants.forEach(element => {
      let consultant = "resource:org.ifb.trustfabric.Consultant#" + element;
      this.selectedConsultants2.push(consultant);
    });

    this.transaction = {
      $class: 'org.ifb.trustfabric.AddToConsultantsOfAcceptedProject',
      'acceptedProject': 'resource:org.ifb.trustfabric.AcceptedProject#' + this.projectId,
      'newConsultants': this.selectedConsultants2,
      'timestamp': new Date().getTime()
    };

    return this.addToConsultantsOfAcceptedProjectService.addTransaction(this.transaction)
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
      this.arrayOfTeamMembers0 = tempList;  
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
    this.arrayOfAddableTeamMembers = [];
    return this.acceptedProjectService.getAsset(projectId)
    .toPromise()
    .then((result) => {
      this.errorMessage = null; 
      if (result.consultants) {
        
        result.consultants.forEach(element => {
          tempList.push(element);
        }); 
        for (let teamMember of this.arrayOfTeamMembers) {
          let teamMemberString = 'resource:org.ifb.trustfabric.Consultant#' + teamMember.id;
          if (!this.contains(tempList, teamMemberString)) {
            this.arrayOfAddableTeamMembers.push(teamMember);
          }
        }
        
      }
      else {
        this.arrayOfAddableTeamMembers = this.arrayOfTeamMembers;
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

  /* this function is necessary because access on a per-property basis 
  has so far only been implemented in the ACL language but not in 
  the runtime environment: */
  private filterConsultants0(): Promise<any> {
    let tempList = [];
    this.arrayOfTeamMembers = [];
    return this.consultantService.getparticipant(this.consultantId)
    .toPromise()
    .then((result) => {
      this.errorMessage = null; 
      if (result.teamleaders) {      
        result.teamleaders.forEach(element => {
          tempList.push(element);
        }); 
        for (let consultant of this.arrayOfTeamMembers0) {
          let consultantString = 'resource:org.ifb.trustfabric.Consultant#' + consultant.id;
          if (!this.contains(tempList, consultantString)) {
            this.arrayOfTeamMembers.push(consultant);
          }
        }      
      }
      else {
        this.arrayOfTeamMembers = this.arrayOfTeamMembers0;
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


  private getClientsWithAccessToProject(): Promise<any> {
    
    let projectString = 'resource:org.ifb.trustfabric.AcceptedProject#' + this.projectId;
    let tempList = [];
    return this.queriesService.sendQuery('selectClientsByAcceptedProjectAccess', ['acceptedProjects'], [projectString])
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(element => {
        tempList.push(element);
      });
      this.clientsWithAccessToProject = tempList; 
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

  private getClientsWithAccessToProjectSubstitute(): Promise<any> {
    
    let tempList = [];
    this.clientsWithAccessToProject = [];
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
            if (idOfProject == this.projectId) {
              this.clientsWithAccessToProject.push(client);
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

  private updateReadableConsultantsOfClientsWithAccessToProject(): Promise<any> {
   
    let promises = [];

    for (let client of this.clientsWithAccessToProject) {
      promises.push(this.updateReadableConsultantsOfClient(client.id));
    }

    return Promise.all(promises)
    .then(() => {
      console.log("The consultants have successfully been added to the relevant clients' list of readableConsultants.");
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

    this.transaction = {
      $class: 'org.ifb.trustfabric.AddToReadableConsultantsOfClient',
        'client': 'org.ifb.trustfabric.Client#' + clientId,
        'newReadableConsultants': this.selectedConsultants2,
        'timestamp': new Date().getTime()
    };

    return this.addToReadableConsultantsOfClientService.addTransaction(this.transaction)
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

    for (let client of this.clientsWithAccessToProject) {
      promises.push(this.updateWritableConsultantsOfClient(client.id));
    }

    return Promise.all(promises)
    .then(() => {
      console.log("The consultants have successfully been added to the relevant clients' list of writableConsultants.");
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
      $class: 'org.ifb.trustfabric.AddToWritableConsultantsOfClient',
        'client': 'org.ifb.trustfabric.Client#' + clientId,
        'newWritableConsultants': this.selectedConsultants2,
        'timestamp': new Date().getTime()
    };

    return this.addToWritableConsultantsOfClientService.addTransaction(this.transaction)
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


  private getId(str: string) {
    return str.split('#')[1];
  }




}
