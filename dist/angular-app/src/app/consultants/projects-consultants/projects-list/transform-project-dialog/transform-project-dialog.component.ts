import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Client, ProposedProject } from '../../../../org.ifb.trustfabric';
import { QueriesService } from '../../../../queries.service';
import { RemoveFromProposedProjectsOfClientService } from '../RemoveFromProposedProjectsOfClient.service';
import { AddToAcceptedProjectsOfClientService } from '../../AddToAcceptedProjectsOfClient.service';
import { ProposedProjectUpdateService } from '../../projects-proposed.update.service';
import { AcceptedProjectUpdateService } from '../../projects-accepted.update.service';
import { ProposedProjectService } from '../../../../ProposedProject.service';
import { AcceptedProjectService } from '../../AcceptedProject.service';
import { AddToWritableConsultantsOfClientService } from '../../accepted-projects-list/add-consultants-dialog-accepted/AddToWritableConsultantsOfClient.service';
import { UIWindowService } from '../../../../ui-service-windows.service';
import { Subscription } from 'rxjs/Rx';



@Component({
  selector: 'app-transform-project-dialog',
  templateUrl: './transform-project-dialog.component.html',
  styleUrls: ['./transform-project-dialog.component.css']
})
export class TransformProjectDialogComponent implements OnInit, OnDestroy {

  isLoading = false;
  transaction;
  proposedProject: ProposedProject;
  acceptedProject;
  arrayOfEligibleClients: Client[] = [];
  projectId: string;
  errorMessage;
  private subscription: Subscription;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private acceptedProjectService: AcceptedProjectService, private addToAcceptedProjectsOfClientService: AddToAcceptedProjectsOfClientService, private proposedProjectUpdateService: ProposedProjectUpdateService, private acceptedProjectUpdateService: AcceptedProjectUpdateService, private queriesService: QueriesService, private proposedProjectService: ProposedProjectService, private removeFromProposedProjectsOfClientService: RemoveFromProposedProjectsOfClientService, private addToWritableConsultantsOfClientService: AddToWritableConsultantsOfClientService, private uiWindowService: UIWindowService, private dialogRef: MatDialogRef<TransformProjectDialogComponent>) { }

  ngOnInit() {

    this.subscription = this.uiWindowService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });

  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


  onYesClicked() {
    this.uiWindowService.loadingStateChanged.next(true);
    return this.getProposedProject()
        .then(() => {
          return this.createAcceptedProject();
        }) 
        .then(() => {
          //return this.loadEligibleClients()
          /* Because of a bug in the hyperledger-composer query language
          related to the CONTAINS operator, method "loadEligibleClients()" currently does not work.
          Hence, method "loadEligibleClientsSubstitute()" has to be used instead until that bug gets fixed. */
          return this.loadEligibleClientsSubstitute();
        })  
        .then(() => {
          return this.addToAcceptedProjectsOfEligibleClients();
        }) 
        .then(() => {
          return this.removeFromProposedProjectsOfEligibleClients();
        }) 
        .then(() => {
          return this.updateWritableConsultantsOfClientsWithAccessToProject();
        })    
        .then(() => {
          return this.deleteProposedProject();
        })
        .then(() => {
          this.acceptedProjectUpdateService.acceptedProjectsUpdated();
          this.proposedProjectUpdateService.proposedProjectsUpdated();
          this.uiWindowService.loadingStateChanged.next(false);
          this.dialogRef.close();
        });
        
  }


  private getProposedProject(): Promise<any> {
    return this.proposedProjectService.getAsset(this.projectId)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      this.proposedProject = result;
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

  private createAcceptedProject(): Promise<any> {

    this.acceptedProject = {
      $class: 'org.ifb.trustfabric.AcceptedProject',
        'id': this.projectId,
        'name': this.proposedProject.name,
        'projectLeader': this.proposedProject.projectLeader,
        'consultants': this.proposedProject.consultants
      };    
      return this.acceptedProjectService.addAsset(this.acceptedProject)
      .toPromise()
      .then(() => {
        this.errorMessage = null;
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


  private deleteProposedProject(): Promise<any> {
    return this.proposedProjectService.deleteAsset(this.projectId)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
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


  private addToAcceptedProjectsOfEligibleClients(): Promise<any> {
      
    let promises = [];

    for (let client of this.arrayOfEligibleClients) {   
        promises.push(this.addToAcceptedProjectsOfClient(client.id));
    }

    return Promise.all(promises)
      .then(() => {
        this.errorMessage = null;
        console.log("Accepted project has successfully been added to the relevant clients.");
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


  private addToAcceptedProjectsOfClient(clientId: string) {
     
    let projectString = 'resource:org.ifb.trustfabric.AcceptedProject#' + this.projectId;

    this.transaction = {
      $class: 'org.ifb.trustfabric.AddToAcceptedProjectsOfClient',
      'client': 'resource:org.ifb.trustfabric.Client#' + clientId,
      'newAcceptedProjects': [projectString],
      'timestamp': new Date().getTime()
    };

    return this.addToAcceptedProjectsOfClientService.addTransaction(this.transaction)
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

    let projectString = 'org.ifb.trustfabric.ProposedProject#' + this.projectId;
     
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


  private updateWritableConsultantsOfClientsWithAccessToProject(): Promise<any> {
   
    let promises = [];

    for (let client of this.arrayOfEligibleClients) {
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
        'newWritableConsultants': this.proposedProject.consultants,
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


  private loadEligibleClients(): Promise<any> {

    let projectString = 'resource:org.ifb.trustfabric.ProposedProject#' + this.projectId;
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


  private getId(str: string) {
    return str.split('#')[1];
  }



}






