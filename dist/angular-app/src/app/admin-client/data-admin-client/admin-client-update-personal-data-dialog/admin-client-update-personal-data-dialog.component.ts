import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UpdateMasterDataOfClientAdministratorService } from '../UpdateMasterDataOfClientAdministrator.service';
import { AdminClientUpdatePersonalDataService } from '../admin-client-update-personal-data.service';
import { NgForm } from '@angular/forms';
import { UIService } from '../../../ui-service.service';
import { Subscription } from 'rxjs/Rx';


@Component({
  selector: 'app-admin-client-update-personal-data-dialog',
  templateUrl: './admin-client-update-personal-data-dialog.component.html',
  styleUrls: ['./admin-client-update-personal-data-dialog.component.css']
})
export class AdminClientUpdatePersonalDataDialogComponent implements OnInit, OnDestroy {

  isLoading = false;
  private subscription: Subscription;
  private transaction;
  private id: string;
  private firstName;
  private lastName;
  private email;
  private errorMessage;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private adminUpdatePersonalDataService: AdminClientUpdatePersonalDataService, private updateMasterDataOfAdministratorService: UpdateMasterDataOfClientAdministratorService, private uiService: UIService, private dialogRef: MatDialogRef<AdminClientUpdatePersonalDataDialogComponent>) { }

  
  ngOnInit() {

    this.subscription = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  
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

    return this.updateMasterData()
      .then(() => {
        this.adminUpdatePersonalDataService.dataUpdated();
        this.uiService.loadingStateChanged.next(false);
        this.dialogRef.close();
      });   

  }


  private updateMasterData(): Promise<any> {
    
    let administratorString = "resource:org.ifb.trustfabric.ClientAdministrator#" + this.id;

    this.transaction = {
      $class: "org.ifb.trustfabric.UpdateMasterDataOfClientAdministrator",       
          "administrator": administratorString,   
          "newFirstName": this.firstName,  
          "newLastName": this.lastName,
          "newEmail": this.email,
          "timestamp": new Date().getTime()
    };

    return this.updateMasterDataOfAdministratorService.addTransaction(this.transaction)
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
