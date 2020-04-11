import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Skill } from '../../../../../org.ifb.trustfabric';
import { UpdateSkillsOfConsultantService } from './UpdateSkillsOfConsultant.service';
import { SkillService } from '../../../../../skills.service';
import { SkillsUpdateClientService } from '../skills-update-client.service';
import { UIService } from '../../../../../ui-service.service';
import { Subscription } from 'rxjs/Rx';
import { AuthService } from '../../../../../auth/auth.service';
import { AddLogItemToConsultantService } from '../../../../../AddLogItemToConsultant.service';
import { ClientService } from '../../../../../clients.service';


@Component({
  selector: 'app-add-skills-dialog',
  templateUrl: './add-skills-dialog.component.html',
  styleUrls: ['./add-skills-dialog.component.css']
})
export class AddSkillsDialogComponent implements OnInit, OnDestroy {

  transaction;
  logItem;
  consultantId: string;
  selectedSkills: string[];
  selectedSkills2: string[] = [];
  arrayOfSkills: Skill[] = [];
  isDisabled: boolean = true;
  errorMessage;
  isLoading = false;
  private text;
  private clientId;
  private firstNameOfClient;
  private lastNameOfClient;
  private companyOfClient;
  private subscription: Subscription; 

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private updateSkillsOfConsultantService: UpdateSkillsOfConsultantService, private skillsUpdateClientService: SkillsUpdateClientService, private skillService: SkillService, private uiService: UIService, private authService: AuthService, private addLogItemToConsultantService: AddLogItemToConsultantService, private clientService: ClientService, private dialogRef: MatDialogRef<AddSkillsDialogComponent>) { }

  ngOnInit() {

    this.subscription = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });

    this.loadSkills();

    this.clientId = this.authService.getIdOfCurrentUser();

  }

  ngOnDestroy() {
    if (this.subscription) {
        this.subscription.unsubscribe();
    }
  }


  onNgModelChange() {
    if (this.selectedSkills.length>0) {
      this.isDisabled = false;
    }
    else {
      this.isDisabled = true;
    }
  }

  onAddClicked() {

    this.uiService.loadingStateChanged.next(true);

    return this.addToSkillsOfConsultant()
        .then(() => {
          return this.getClient(this.clientId);
        })
        .then(() => {
          return this.addToLogItemsOfConsultant();
        })
        .then(() => {
          this.skillsUpdateClientService.skillsUpdated();
          this.uiService.loadingStateChanged.next(false);
          this.dialogRef.close();
        });

  }


  private addToSkillsOfConsultant(): Promise<any> {

    this.selectedSkills.forEach(element => {
      let skill = "resource:org.ifb.trustfabric.Skill#" + element;
      this.selectedSkills2.push(skill);
    });

    this.transaction = {
      $class: 'org.ifb.trustfabric.UpdateSkillsOfConsultant',
      'consultant': 'resource:org.ifb.trustfabric.Consultant#' + this.consultantId,
      'newSkills': this.selectedSkills2,
      'timestamp': new Date().getTime()
    };

    return this.updateSkillsOfConsultantService.addTransaction(this.transaction)
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

  private loadSkills(): Promise<any> {
    let tempList = [];
    return this.skillService.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(element => {
        tempList.push(element);
      });
      this.arrayOfSkills = tempList;  
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

  private addToLogItemsOfConsultant(): Promise<any> {

    let skills = "";

    for (let i=0; i<this.selectedSkills.length; i++) {
      let skillName = this.getSkill(this.selectedSkills[i]);
      let proficiency = this.getProficiency(this.selectedSkills[i]);
      if (i == this.selectedSkills.length - 1) {
        skills += skillName + " " + proficiency;
      }
      else {
        skills += skillName + " " + proficiency + "," + " ";
      }
    }


    this.text = this.firstNameOfClient + " " + this.lastNameOfClient + " from " + this.companyOfClient + " added the following skills: " + skills + ".";

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


  private getProficiency(str: string) {
    return str.split('_')[1];
  }

  private getSkill(str: string) {
    return str.split('_')[0];
  }



}
