import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Client, Consultant } from '../../../../org.ifb.trustfabric';
import { QueriesService } from '../../../../queries.service';
import { AddToAcceptedProjectsOfClientService } from '../../AddToAcceptedProjectsOfClient.service';
import { AcceptedProjectUpdateService } from '../../projects-accepted.update.service';
import { AddToReadableConsultantsOfClientService } from '../../projects-list/add-consultants-dialog/AddToReadableConsultantsOfClient.service';
import { AcceptedProjectService } from '../../AcceptedProject.service';
import { AddToWritableConsultantsOfClientService } from '../add-consultants-dialog-accepted/AddToWritableConsultantsOfClient.service';
import { UIWindowService } from '../../../../ui-service-windows.service';
import { Subscription } from 'rxjs/Rx';


@Component({
  selector: 'app-grant-access-dialog-accepted',
  templateUrl: './grant-access-dialog-accepted.component.html',
  styleUrls: ['./grant-access-dialog-accepted.component.css']
})
export class GrantAccessDialogAcceptedComponent implements OnInit {
 
  isLoading = false;
  transaction;
  projectId: string;
  projectString: string;
  selectedClients: string[];
  arrayOfAllClients: Client[] = [];
  arrayOfAlreadyAddedClients: Client[] = [];
  arrayOfAddableClients: Client[] = [];
  private arrayOfConsultantsAssociatedWithProject: Consultant[] = [];
  isDisabled: boolean = true;
  errorMessage;
  private subscription: Subscription;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private addToAcceptedProjectsOfClientService: AddToAcceptedProjectsOfClientService, private acceptedProjectUpdateService: AcceptedProjectUpdateService, private queriesService: QueriesService, private addToReadableConsultantsOfClientService: AddToReadableConsultantsOfClientService, private addToWritableConsultantsOfClientService: AddToWritableConsultantsOfClientService, private acceptedProjectService: AcceptedProjectService, private uiWindowService: UIWindowService, private dialogRef: MatDialogRef<GrantAccessDialogAcceptedComponent>) { }

  ngOnInit() {

    this.subscription = this.uiWindowService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });

    this.uiWindowService.loadingStateChanged.next(true);

    //return this.loadClients() 
      //.then(() => {
        //return this.filterClients();
      //})
      //.then(() => {
      // this.uiWindowService.loadingStateChanged.next(false);
      //});              
    /* Because of a bug in the hyperledger-composer query language
    related to the CONTAINS operator, method "filterClients()" currently does not work.
    Hence, method "loadAndFilterClientsSubstitute()" has to be used instead until that bug gets fixed. */
    return this.loadAndFilterClientsSubstitute()
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

  onAddClicked() {

    this.uiWindowService.loadingStateChanged.next(true);

    return this.addToAcceptedProjectsOfSelectedClients()
        .then(() => {
          this.acceptedProjectUpdateService.acceptedProjectsUpdated();    
        })
        .then(() => {
          return this.loadAssociatedConsultants(this.projectId);
        })
        .then(() => {
          return this.addAssociatedConsultantsToReadableConsultantsListOfSelectedClients();
        })
        .then(() => {
          return this.addAssociatedConsultantsToWritableConsultantsListOfSelectedClients();
        })
        .then(() => {
          this.uiWindowService.loadingStateChanged.next(false);
          this.dialogRef.close();
        });

  }


 private loadClients(): Promise<any> {
    let tempList = [];
    return this.queriesService.sendQuery("selectClients")
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(element => {
        tempList.push(element);
      });
      this.arrayOfAllClients = tempList;  
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

  private filterClients(): Promise<any> {
    
    let projectString = 'resource:org.ifb.trustfabric.AcceptedProject#' + this.projectId;
    let tempList = [];
    return this.queriesService.sendQuery("selectClientsByAcceptedProjectAccess", ["acceptedProjects"], [projectString])
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      if (result) {
        this.arrayOfAddableClients = [];
        result.forEach(element => {
          tempList.push(element);
        });
        this.arrayOfAlreadyAddedClients = tempList;
        for (let client of this.arrayOfAllClients) {
          if (!this.contains(this.arrayOfAlreadyAddedClients, client)) {
            this.arrayOfAddableClients.push(client);
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

  private loadAndFilterClientsSubstitute(): Promise<any> {

    let tempList = [];
    return this.queriesService.sendQuery('selectClients')
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(element => {
        tempList.push(element);
      });
      this.arrayOfAllClients = tempList;
      let idOfProject = "";
      for (let client of tempList) {
        if (typeof client.acceptedProjects !== 'undefined' && client.acceptedProjects.length > 0) {
          for (let project of client.acceptedProjects) {
            idOfProject = this.getId(project);
            if (idOfProject == this.projectId) {
              this.arrayOfAlreadyAddedClients.push(client);
              break;
            }
          }
        }
      }  
      if (this.arrayOfAlreadyAddedClients.length > 0) {
        for (let client of this.arrayOfAllClients) {
          if (!this.contains(this.arrayOfAlreadyAddedClients, client)) {
            this.arrayOfAddableClients.push(client);
          }
        }      
      }
      else {
        this.arrayOfAddableClients = this.arrayOfAllClients;
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
            console.log(this.errorMessage);
        }
    });
  }

  private addToAcceptedProjectsOfSelectedClients(): Promise<any> {

    this.projectString = 'resource:org.ifb.trustfabric.AcceptedProject#' + this.projectId;
    
    let promises = [];

    for (let client of this.selectedClients) {
      promises.push(this.addToAcceptedProjectsOfClient(client));
    }

    return Promise.all(promises)
    .then(() => {
      console.log("Accepted project has successfully been added to the selected clients.");
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
     
    this.transaction = {
      $class: 'org.ifb.trustfabric.AddToAcceptedProjectsOfClient',
      'client': 'resource:org.ifb.trustfabric.Client#' + clientId,
      'newAcceptedProjects': [this.projectString],
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


  private addAssociatedConsultantsToReadableConsultantsListOfSelectedClients(): Promise<any> {

    let promises = [];

    for (let client of this.selectedClients) {
      promises.push(this.updateReadableConsultantsOfClient(client));
    }

    return Promise.all(promises)
    .then(() => {
      console.log("The consultants associated with the project have successfully been added to the relevant clients' list of readableConsultants.");
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
        'newReadableConsultants': this.arrayOfConsultantsAssociatedWithProject,
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


  private addAssociatedConsultantsToWritableConsultantsListOfSelectedClients(): Promise<any> {

    let promises = [];

    for (let client of this.selectedClients) {
      promises.push(this.updateWritableConsultantsOfClient(client));
    }

    return Promise.all(promises)
    .then(() => {
      console.log("The consultants associated with the project have successfully been added to the relevant clients' list of writableConsultants.");
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
        'newWritableConsultants': this.arrayOfConsultantsAssociatedWithProject,
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
        if (array[i].id == item.id) {
            return true;
        }
    }
    return false;
  }

  private getId(str: string) {
    return str.split('#')[1];
  }


}
