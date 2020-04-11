import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UpdateMasterDataOfConsultantService } from '../UpdateMasterDataOfConsultant.service';
import { ConsultantsUpdatePersonalDataService } from '../consultants-update-personal-data.service';
import { ConsultantCompanyService } from '../../../ConsultantCompany.service';
import { NgForm } from '@angular/forms';
import { UIService } from '../../../ui-service.service';
import { Subscription } from 'rxjs/Rx';
import { AddLogItemToConsultantService } from '../../../AddLogItemToConsultant.service';


@Component({
  selector: 'app-consultants-update-personal-data-dialog',
  templateUrl: './consultants-update-personal-data-dialog.component.html',
  styleUrls: ['./consultants-update-personal-data-dialog.component.css']
})
export class ConsultantsUpdatePersonalDataDialogComponent implements OnInit, OnDestroy {


    companies;
    isLoading = false;
    firstNameOfConsultant: string;
    lastNameOfConsultant: string;
    private subscription: Subscription;
    private transaction;
    private logItem;
    private text;
    private id: string;
    private firstName;
    private lastName;
    private email;
    private company;
    private position;
    private errorMessage;
    

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private consultantsUpdatePersonalDataService: ConsultantsUpdatePersonalDataService, private updateMasterDataOfConsultantService: UpdateMasterDataOfConsultantService, private consultantCompanyService: ConsultantCompanyService, private uiService: UIService, private addLogItemToConsultantService: AddLogItemToConsultantService, private dialogRef: MatDialogRef<ConsultantsUpdatePersonalDataDialogComponent>) { }

    
    ngOnInit() {

      this.subscription = this.uiService.loadingStateChanged.subscribe(isLoading => {
        this.isLoading = isLoading;
      });

      this.loadConsultantCompanies();

    }

    ngOnDestroy() {
      if (this.subscription) {
          this.subscription.unsubscribe();
      }
    }

    onSubmit(form: NgForm, id: string): Promise<any> {

      this.uiService.loadingStateChanged.next(true);

      this.id = id;
      this.firstName = form.value.firstName;
      this.lastName = form.value.lastName;
      this.email = form.value.email;
      this.company = form.value.company;
      this.position = form.value.position;
  
      return this.updateMasterData()
        .then(() => {
          return this.addToLogItemsOfConsultant();
        })
        .then(() => {
          this.consultantsUpdatePersonalDataService.dataUpdated();
          this.uiService.loadingStateChanged.next(false);
          this.dialogRef.close();
        });   

    }


    private updateMasterData(): Promise<any> {
      
      let consultantString = "resource:org.ifb.trustfabric.Consultant#" + this.id;

      this.transaction = {
        $class: "org.ifb.trustfabric.UpdateMasterDataOfConsultant",       
            "consultant": consultantString,   
            "newFirstName": this.firstName,  
            "newLastName": this.lastName,
            "newEmail": this.email,
            "newCompany": this.company,
            "newPosition": this.position,
            "timestamp": new Date().getTime()
      };

      return this.updateMasterDataOfConsultantService.addTransaction(this.transaction)
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

    private loadConsultantCompanies(): Promise<any> {
      let tempList = [];
      return this.consultantCompanyService.getAll()
      .toPromise()
      .then((result) => {
        this.errorMessage = null;
        result.forEach(company => {
          tempList.push(company);
        });
        this.companies = tempList;
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

      this.text = "Personal information updated by " + this.firstNameOfConsultant + " " + this.lastNameOfConsultant + ".";
  
      this.logItem = {
        "$class": "org.ifb.trustfabric.LogItem",
        "creator": "resource:org.ifb.trustfabric.Consultant#" + this.id,
        "date": new Date().getTime(),
        "text": this.text
      }
  
      this.transaction = {
        $class: 'org.ifb.trustfabric.AddLogItemToConsultant',
        'consultant': 'resource:org.ifb.trustfabric.Consultant#' + this.id,
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






}
