import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Client, Consultant } from '../../../../org.ifb.trustfabric';
import { QueriesService } from '../../../../queries.service';
import { RemoveFromAcceptedProjectsOfClientService } from '../RemoveFromAcceptedProjectsOfClient.service';
import { RemoveFromReadableConsultantsOfClientService } from '../../RemoveFromReadableConsultantsOfClient.service';
import { AcceptedProjectUpdateService } from '../../projects-accepted.update.service';
import { AcceptedProjectService } from '../../AcceptedProject.service';
import { RemoveFromWritableConsultantsOfClientService } from '../RemoveFromWritableConsultantsOfClient.service';
import { UIWindowService } from '../../../../ui-service-windows.service';
import { Subscription } from 'rxjs/Rx';



@Component({
  selector: 'app-remove-access-dialog-accepted',
  templateUrl: './remove-access-dialog-accepted.component.html',
  styleUrls: ['./remove-access-dialog-accepted.component.css']
})
export class RemoveAccessDialogAcceptedComponent implements OnInit {

  isLoading = false;
  transaction;
  projectId: string;
  projectString: string;
  selectedClients: string[];
  arrayOfRemovableClients: Client[] = [];
  private arrayOfConsultantsAssociatedWithProject: Consultant[] = [];
  isDisabled: boolean = true;
  errorMessage;
  private subscription: Subscription;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private removeFromAcceptedProjectsOfClientService: RemoveFromAcceptedProjectsOfClientService, private acceptedProjectUpdateService: AcceptedProjectUpdateService, private queriesService: QueriesService, private removeFromReadableConsultantsOfClientService: RemoveFromReadableConsultantsOfClientService, private acceptedProjectService: AcceptedProjectService, private removeFromWritableConsultantsOfClientService: RemoveFromWritableConsultantsOfClientService, private uiWindowService: UIWindowService, private dialogRef: MatDialogRef<RemoveAccessDialogAcceptedComponent>) { }

  ngOnInit() {

    this.subscription = this.uiWindowService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });

    this.uiWindowService.loadingStateChanged.next(true);

    //return this.loadClients()
    /* Because of a bug in the hyperledger-composer query language
    related to the CONTAINS operator, method "loadClients()" currently does not work.
    Hence, method "loadClientsSubstitute()" has to be used instead until that bug gets fixed. */
    return this.loadClientsSubstitute()
    .then(() => {
      this.uiWindowService.loadingStateChanged.next(false);
    });

  }


  onNgModelChange() {
    if (this.selectedClients.length>0) {
      this.isDisabled = false;
    }
    else {
      this.isDisabled = true;
    }
  }

  onRemoveClicked() {

    this.uiWindowService.loadingStateChanged.next(true);

    return this.removeFromAceptedProjectsOfSelectedClients()
        .then(() => {
          this.acceptedProjectUpdateService.acceptedProjectsUpdated();
        })
        .then(() => {
          return this.loadAssociatedConsultants(this.projectId);
        })
        .then(() => {
          return this.removeAssociatedConsultantsFromReadableConsultantsListOfSelectedClients();
        })
        .then(() => {
          return this.removeAssociatedConsultantsFromWritableConsultantsListOfSelectedClients();
        })
        .then(() => {
          this.uiWindowService.loadingStateChanged.next(false);
          this.dialogRef.close();
        });

  }


  private removeFromAceptedProjectsOfSelectedClients(): Promise<any> {

    this.projectString = 'resource:org.ifb.trustfabric.AcceptedProject#' + this.projectId;

    let promises = [];

    for (let client of this.selectedClients) {
      promises.push(this.removeFromAcceptedProjectsOfClient(client));
    }

    return Promise.all(promises)
    .then(() => {
      console.log("Accepted project has successfully been removed from the selected clients.");
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
     
    this.transaction = {
      $class: 'org.ifb.trustfabric.RemoveFromAcceptedProjectsOfClient',
      'client': 'resource:org.ifb.trustfabric.Client#' + clientId,
      'acceptedProjectToBeRemoved': this.projectString,
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


  private loadClients(): Promise<any> {

    let projectString = 'resource:org.ifb.trustfabric.AcceptedProject#' + this.projectId;
    let tempList = [];
    return this.queriesService.sendQuery('selectClientsByAcceptedProjectAccess', ['acceptedProjects'], [projectString])
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(element => {
        tempList.push(element);
      });
      this.arrayOfRemovableClients = tempList;  
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


  private loadClientsSubstitute(): Promise<any> {

    let tempList = [];
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
              this.arrayOfRemovableClients.push(client);
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


  private loadAssociatedConsultants(projectId: any): Promise<any> {
    let tempList = [];
    return this.acceptedProjectService.getAsset(projectId)
    .toPromise()
    .then((result) => {
      this.errorMessage = null; 
      if (result.consultants) {      
        result.consultants.forEach(element => {
          tempList.push(element);
        }); 
        this.arrayOfConsultantsAssociatedWithProject = tempList;
      }
      else {
        this.arrayOfConsultantsAssociatedWithProject = [];
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


  private removeAssociatedConsultantsFromReadableConsultantsListOfSelectedClients(): Promise<any> {
  
    let promises = [];

    for (let client of this.selectedClients) {
      promises.push(this.updateReadableConsultantsOfClient(client));
    }

    return Promise.all(promises)
    .then(() => {
      console.log("The consultants associated with the project have successfully been removed from the relevant clients' list of readableConsultants.");
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
        'readableConsultantsToBeRemoved': this.arrayOfConsultantsAssociatedWithProject,
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


  private removeAssociatedConsultantsFromWritableConsultantsListOfSelectedClients(): Promise<any> {
  
    let promises = [];

    for (let client of this.selectedClients) {
      promises.push(this.updateWritableConsultantsOfClient(client));
    }

    return Promise.all(promises)
    .then(() => {
      console.log("The consultants associated with the project have successfully been removed from the relevant clients' list of writableConsultants.");
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
        'writableConsultantsToBeRemoved': this.arrayOfConsultantsAssociatedWithProject,
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


  private getId(str: string) {
    return str.split('#')[1];
  }



}
