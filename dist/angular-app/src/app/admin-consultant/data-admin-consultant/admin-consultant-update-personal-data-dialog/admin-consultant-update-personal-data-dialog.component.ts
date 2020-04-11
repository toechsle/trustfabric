import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UpdateMasterDataOfConsultantAdministratorService } from '../UpdateMasterDataOfConsultantAdministrator.service';
import { AdminConsultantUpdatePersonalDataService } from '../admin-consultant-update-personal-data.service';
import { NgForm } from '@angular/forms';
import { UIService } from '../../../ui-service.service';
import { Subscription } from 'rxjs/Rx';


@Component({
  selector: 'app-admin-consultant-update-personal-data-dialog',
  templateUrl: './admin-consultant-update-personal-data-dialog.component.html',
  styleUrls: ['./admin-consultant-update-personal-data-dialog.component.css']
})
export class AdminConsultantUpdatePersonalDataDialogComponent implements OnInit {

  adminUID: string;
  isLoading = false;
  private subscription: Subscription;
  
  private transaction;
  private id: string;
  private firstName;
  private lastName;
  private email;
  private errorMessage;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private adminUpdatePersonalDataService: AdminConsultantUpdatePersonalDataService, private updateMasterDataOfAdministratorService: UpdateMasterDataOfConsultantAdministratorService, private uiService: UIService, private dialogRef: MatDialogRef<AdminConsultantUpdatePersonalDataDialogComponent>) { }

  
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
    
    let administratorString = "resource:org.ifb.trustfabric.ConsultantAdministrator#" + this.id;

    this.transaction = {
      $class: "org.ifb.trustfabric.UpdateMasterDataOfConsultantAdministrator",       
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
