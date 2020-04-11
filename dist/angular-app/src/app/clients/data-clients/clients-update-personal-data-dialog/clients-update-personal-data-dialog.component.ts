import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UpdateMasterDataOfClientService } from '../UpdateMasterDataOfClient.service';
import { ClientsUpdatePersonalDataService } from '../clients-update-personal-data.service';
import { NgForm } from '@angular/forms';
import { ClientCompanyService } from '../../../ClientCompany.service';
import { UIService } from '../../../ui-service.service';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-clients-update-personal-data-dialog',
  templateUrl: './clients-update-personal-data-dialog.component.html',
  styleUrls: ['./clients-update-personal-data-dialog.component.css']
})
export class ClientsUpdatePersonalDataDialogComponent implements OnInit {

  isLoading = false;
  private subscription: Subscription;
  companies: string[];
  private transaction;
  private id: string;
  private firstName;
  private lastName;
  private email;
  private company;
  private position;
  private errorMessage;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private clientsUpdatePersonalDataService: ClientsUpdatePersonalDataService, private updateMasterDataOfClientService: UpdateMasterDataOfClientService, private uiService: UIService, private clientCompanyService: ClientCompanyService, private dialogRef: MatDialogRef<ClientsUpdatePersonalDataDialogComponent>) { }

  
  ngOnInit() {

    this.subscription = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });

    this.loadClientCompanies();

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
        this.clientsUpdatePersonalDataService.dataUpdated();
        this.uiService.loadingStateChanged.next(false);
        this.dialogRef.close();
      });   

  }


  private updateMasterData(): Promise<any> {
    
    let clientString = "resource:org.ifb.trustfabric.Client#" + this.id;

    this.transaction = {
      $class: "org.ifb.trustfabric.UpdateMasterDataOfClient",       
          "client": clientString,   
          "newFirstName": this.firstName,  
          "newLastName": this.lastName,
          "newEmail": this.email,
          "newCompany": this.company,
          "newPosition": this.position,
          "timestamp": new Date().getTime()
    };

    return this.updateMasterDataOfClientService.addTransaction(this.transaction)
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

  private loadClientCompanies(): Promise<any> {
    let tempList = [];
    return this.clientCompanyService.getAll()
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


}
