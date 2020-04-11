import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Consultant, Client } from '../../../../org.ifb.trustfabric';
import { AcceptedProjectUpdateService } from '../../projects-accepted.update.service';
import { QueriesService } from '../../../../queries.service';
import { RemoveFromConsultantsOfAcceptedProjectService } from './RemoveFromConsultantsOfAcceptedProject.service';
import { AcceptedProjectService } from '../../AcceptedProject.service';
import { RemoveFromReadableConsultantsOfClientService } from '../../RemoveFromReadableConsultantsOfClient.service';
import { RemoveFromWritableConsultantsOfClientService } from '../RemoveFromWritableConsultantsOfClient.service';
import { UIWindowService } from '../../../../ui-service-windows.service';
import { Subscription } from 'rxjs/Rx';


@Component({
  selector: 'app-remove-consultants-dialog-accepted',
  templateUrl: './remove-consultants-dialog-accepted.component.html',
  styleUrls: ['./remove-consultants-dialog-accepted.component.css']
})
export class RemoveConsultantsDialogAcceptedComponent implements OnInit {

  isLoading = false;
  transaction;
  projectId: string;
  selectedConsultants: string[];
  selectedConsultants2: string[] = [];
  arrayOfTeamMembers: Consultant[] = [];
  arrayOfRemovableConsultants: Consultant[] = [];
  private arrayOfEligibleClients: Client[] = [];
  isDisabled: boolean = true;
  errorMessage;
  private subscription: Subscription;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private removeFromConsultantsOfAcceptedProjectService: RemoveFromConsultantsOfAcceptedProjectService, private acceptedProjectUpdateService: AcceptedProjectUpdateService, private queriesService: QueriesService, private acceptedProjectService: AcceptedProjectService, private removeFromReadableConsultantsOfClientService: RemoveFromReadableConsultantsOfClientService, private removeFromWritableConsultantsOfClientService: RemoveFromWritableConsultantsOfClientService, private uiWindowService: UIWindowService, private dialogRef: MatDialogRef<RemoveConsultantsDialogAcceptedComponent>) { }

  ngOnInit() {
    
    this.subscription = this.uiWindowService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });

    this.uiWindowService.loadingStateChanged.next(true);

    return this.loadConsultants()
    .then(() => {
      this.uiWindowService.loadingStateChanged.next(false);
    });

  }


  onNgModelChange() {
    if (this.selectedConsultants.length>0) {
      this.isDisabled = false;
    }
    else {
      this.isDisabled = true;
    }
  }

  onRemoveClicked() {

    this.uiWindowService.loadingStateChanged.next(true);

    return this.removeFromConsultantsOfAcceptedProject()
        .then(() => {
          this.acceptedProjectUpdateService.acceptedProjectsUpdated();
        })   
        .then(() => {
          //return this.loadEligibleClients()
          /* Because of a bug in the hyperledger-composer query language
          related to the CONTAINS operator, method "loadEligibleClients()" currently does not work.
          Hence, method "loadEligibleClientsSubstitute()" has to be used instead until that bug gets fixed. */
          return this.loadEligibleClientsSubstitute()
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


  private removeFromConsultantsOfAcceptedProject(): Promise<any> {

    this.selectedConsultants2 = [];

    this.selectedConsultants.forEach(element => {
      let consultant = "resource:org.ifb.trustfabric.Consultant#" + element;
      this.selectedConsultants2.push(consultant);
    });

    this.transaction = {
      $class: 'org.ifb.trustfabric.RemoveFromConsultantsOfAcceptedProject',
      'acceptedProject': 'resource:org.ifb.trustfabric.AcceptedProject#' + this.projectId,
      'consultantsToBeRemoved': this.selectedConsultants2,
      'timestamp': new Date().getTime()
    };

    return this.removeFromConsultantsOfAcceptedProjectService.addTransaction(this.transaction)
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
      this.filterConsultants(this.projectId);
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
    this.arrayOfRemovableConsultants = [];
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
            this.arrayOfRemovableConsultants.push(teamMember);
          }
        }
        
      }
      else {
        this.arrayOfRemovableConsultants = [];
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


  private loadEligibleClients(): Promise<any> {

    let projectString = 'resource:org.ifb.trustfabric.AcceptedProject#' + this.projectId;
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
            if (idOfProject == this.projectId) {
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

    this.transaction = {
      $class: 'org.ifb.trustfabric.RemoveFromReadableConsultantsOfClient',
        'client': 'org.ifb.trustfabric.Client#' + clientId,
        'readableConsultantsToBeRemoved': this.selectedConsultants2,
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
        'writableConsultantsToBeRemoved': this.selectedConsultants2,
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

  private getId(str: string) {
    return str.split('#')[1];
  }



  
}
