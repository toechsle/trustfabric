import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClientCompanyService } from '../../ClientCompany.service';
import { MatDialog } from '@angular/material';
import { NewClientCompanyMessageComponent } from './new-client-company-message/new-client-company-message.component';
import { UIService } from '../../ui-service.service';

@Component({
  selector: 'app-create-new-client-company',
  templateUrl: './create-new-client-company.component.html',
  styleUrls: ['./create-new-client-company.component.css']
})
export class CreateNewClientCompanyComponent implements OnInit {

  private company;
  private errorMessage;
  private successMessage;

  constructor(private clientCompanyService: ClientCompanyService, private uiService: UIService, private dialog: MatDialog) { }

  ngOnInit() {

  }
 
  onSubmit(form: NgForm): Promise<any> {

    this.uiService.loadingStateChanged.next(true);

    this.company = {
      $class: "org.ifb.trustfabric.ClientCompany",
          "name": form.value.name
    };

    form.resetForm();

    return this.clientCompanyService.addAsset(this.company)
    .toPromise()
    .then(() => {
        this.uiService.loadingStateChanged.next(false);
        this.successMessage = "Company " + this.company.name + " has been created.";
        this.dialog.open(NewClientCompanyMessageComponent, {data: {title: "Success", text: this.successMessage}});    
    })
    .catch((error) => {
        if (error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details.";
        }
        else {
            this.errorMessage = error;
        }   
        this.uiService.loadingStateChanged.next(false);
        this.dialog.open(NewClientCompanyMessageComponent, {data: {title: "Error", text: this.errorMessage}});
    });
    
  } 


}
