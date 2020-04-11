import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Client, Consultant } from '../../../../org.ifb.trustfabric';
import { QueriesService } from '../../../../queries.service';
import { RemoveFromProposedProjectsOfClientService } from '../RemoveFromProposedProjectsOfClient.service';
import { ProposedProjectUpdateService } from '../../projects-proposed.update.service';
import { ProposedProjectService } from '../../../../ProposedProject.service';
import { RemoveFromReadableConsultantsOfClientService } from '../../RemoveFromReadableConsultantsOfClient.service';
import { UIWindowService } from '../../../../ui-service-windows.service';
import { Subscription } from 'rxjs/Rx';


@Component({
  selector: 'app-remove-access-dialog',
  templateUrl: './remove-access-dialog.component.html',
  styleUrls: ['./remove-access-dialog.component.css']
})
export class RemoveAccessDialogComponent implements OnInit {

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


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private removeFromProposedProjectsOfClientService: RemoveFromProposedProjectsOfClientService, private queriesService: QueriesService, private proposedProjectUpdateService: ProposedProjectUpdateService, private proposedProjectService: ProposedProjectService, private uiWindowService: UIWindowService, private removeFromReadableConsultantsOfClientService: RemoveFromReadableConsultantsOfClientService, private dialogRef: MatDialogRef<RemoveAccessDialogComponent>) { }

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

    return this.removeFromProposedProjectsOfSelectedClients()
        .then(() => {
          this.proposedProjectUpdateService.proposedProjectsUpdated();
        })
        .then(() => {
          return this.loadAssociatedConsultants(this.projectId);
        })
        .then(() => {
          return this.removeAssociatedConsultantsFromReadableConsultantsListOfSelectedClients();
        })
        .then(() => {
          this.uiWindowService.loadingStateChanged.next(false);
          this.dialogRef.close();
        });

  }

  private loadClients(): Promise<any> {

    let projectString = 'resource:org.ifb.trustfabric.ProposedProject#' + this.projectId;
    let tempList = [];
    return this.queriesService.sendQuery('selectClientsByProposedProjectAccess', ['proposedProjects'], [projectString])
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
        if (typeof client.proposedProjects !== 'undefined' && client.proposedProjects.length > 0) {
          for (let project of client.proposedProjects) {
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


  private removeFromProposedProjectsOfSelectedClients(): Promise<any> {

    this.projectString = 'resource:org.ifb.trustfabric.ProposedProject#' + this.projectId;

    let promises = [];

    for (let client of this.selectedClients) {
      promises.push(this.removeFromProposedProjectsOfClient(client));
    }

    return Promise.all(promises)
    .then(() => {
      console.log("Proposed project has successfully been removed from the selected clients.");
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
     
    this.transaction = {
      $class: 'org.ifb.trustfabric.RemoveFromProposedProjectsOfClient',
      'client': 'resource:org.ifb.trustfabric.Client#' + clientId,
      'proposedProjectToBeRemoved': this.projectString,
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

  private loadAssociatedConsultants(projectId: any): Promise<any> {
    let tempList = [];
    return this.proposedProjectService.getAsset(projectId)
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


  private getId(str: string) {
    return str.split('#')[1];
  }




}
