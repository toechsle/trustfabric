import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UpdateProjectsOfConsultantService } from './UpdateProjectsOfConsultant.service';
import { ProjectService } from '../../../../../Project.service';
import { ProjectsUpdateClientService } from '../projects-update-client.service';
import { NgForm } from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/toPromise';
import { AuthService } from '../../../../../auth/auth.service';
import { UIService } from '../../../../../ui-service.service';
import { ClientService } from '../../../../../clients.service';
import { AddLogItemToConsultantService } from '../../../../../AddLogItemToConsultant.service';


@Component({
  selector: 'app-add-project-dialog',
  templateUrl: './add-project-dialog.component.html',
  styleUrls: ['./add-project-dialog.component.css']
})
export class AddProjectDialogComponent implements OnInit {

  transaction;
  logItem;
  consultantId: string;
  isLoading = false;
  private subscription: Subscription; 
  private text;
  private clientId;
  private firstNameOfClient;
  private lastNameOfClient;
  private companyOfClient;
  private project;
  private projectId: string;
  private projectName: string;

  isDisabled: boolean = true;
  errorMessage;
  

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private updateProjectsOfConsultantService: UpdateProjectsOfConsultantService, private projectsUpdateClientService: ProjectsUpdateClientService, private projectService: ProjectService, private authService: AuthService, private uiService: UIService, private clientService: ClientService, private addLogItemToConsultantService: AddLogItemToConsultantService, private dialogRef: MatDialogRef<AddProjectDialogComponent>) { }

  ngOnInit() { 
    
    this.subscription = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });

    this.clientId = this.authService.getIdOfCurrentUser();

  }

  ngOnDestroy() {
    if (this.subscription) {
        this.subscription.unsubscribe();
    }
  }

  onSubmit(form: NgForm) {

    this.uiService.loadingStateChanged.next(true);

    this.projectId = this.clientId + "_" + new Date().getTime();
    let duration = this.calculateDuration(form.value.beginning, form.value.end);
    let creator = 'org.ifb.trustfabric.Client#' + this.clientId;
    this.projectName = form.value.name;

    this.project = {
      $class: 'org.ifb.trustfabric.Project',
      'id': this.projectId,
      'name': this.projectName,
      'role': form.value.role,
      'beginning': form.value.beginning,
      'end': form.value.end,
      'duration': duration,
      'description': form.value.description,
      'creator': creator
    };

    form.resetForm();

    return this.createNewProject()
        .then(() => {
          return this.addToProjectsOfConsultant()
        })
        .then(() => {
          return this.getClient(this.clientId);
        })
        .then(() => {
          return this.addToLogItemsOfConsultant();
        })
        .then(() => {
          this.projectsUpdateClientService.projectsUpdated();
          this.uiService.loadingStateChanged.next(false);
          this.dialogRef.close();
        });

  }

  private calculateDuration(startDate: Date, endDate: Date) {
      
      let diff = Math.floor(endDate.getTime() - startDate.getTime());
      let day = 1000 * 60 * 60 * 24;

      let days = Math.floor(diff/day);
      let weeks = Math.floor(days/7);  

      if (weeks == 1) {
        return "" + weeks + " week";
      }
      return "" + weeks + " weeks";

  }


  private createNewProject(): Promise<any> {

    return this.projectService.addAsset(this.project)
    .toPromise()
    .catch((error) => {
        if (error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details.";
        }
        else {
            this.errorMessage = error;
        }    
    });
    
  } 

  private addToProjectsOfConsultant(): Promise<any> {

    let newProject = "resource:org.ifb.trustfabric.Project#" + this.projectId;

    this.transaction = {
      $class: 'org.ifb.trustfabric.UpdateProjectsOfConsultant',
      'consultant': 'resource:org.ifb.trustfabric.Consultant#' + this.consultantId,
      'newProject': [newProject],
      'timestamp': new Date().getTime()
    };

    return this.updateProjectsOfConsultantService.addTransaction(this.transaction)
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

  private addToLogItemsOfConsultant(): Promise<any> {

    this.text = this.firstNameOfClient + " " + this.lastNameOfClient + " from " + this.companyOfClient + " added project reference '" + this.projectName + "'.";

    this.logItem = {
      "$class": "org.ifb.trustfabric.LogItem",
      "creator": "resource:org.ifb.trustfabric.Client#" + this.clientId,
      "date": new Date().getTime(),
      "text": this.text
    }

    this.transaction = {
      $class: 'org.ifb.trustfabric.AddLogItemToConsultant',
      'consultant': 'resource:org.ifb.trustfabric.Consultant#' + this.consultantId,
      'logItem': [this.logItem],
      'timestamp': new Date().getTime()
    };

    return this.addLogItemToConsultantService.addTransaction(this.transaction)
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

  private getClient(id: string): Promise<any> { 
    return this.clientService.getparticipant(id)
    .toPromise()
    .then((result) => {
        this.errorMessage = null;
        this.firstNameOfClient = result.firstName;
        this.lastNameOfClient = result.lastName;
        this.companyOfClient = result.company;
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

  

}
