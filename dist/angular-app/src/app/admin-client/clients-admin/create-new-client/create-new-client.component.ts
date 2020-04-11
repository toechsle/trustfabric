import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClientCompanyService } from '../../../ClientCompany.service';
import { ClientService } from '../../../clients.service';
import { MatDialog } from '@angular/material';
import { NewClientMessageComponent } from './new-client-message/new-client-message.component';
import { AuthService } from '../../../auth/auth.service';
import { UIService } from '../../../ui-service.service';


@Component({
  selector: 'app-create-new-client',
  templateUrl: './create-new-client.component.html',
  styleUrls: ['./create-new-client.component.css']
})
export class CreateNewClientComponent implements OnInit {

  companies;
  private client;
  private clientId;
  private errorMessage;
  private successMessage;

  constructor(private clientCompanyService: ClientCompanyService, private clientService: ClientService, private authService: AuthService, private uiService: UIService, private dialog: MatDialog) { }

  ngOnInit() {
    this.loadClientCompanies();
  }

  onSubmit(form: NgForm): Promise<any> {

    this.uiService.loadingStateChanged.next(true);

    this.clientId = form.value.email + "_" + new Date().getTime();
  
    this.client = {
      $class: "org.ifb.trustfabric.Client",
          "id": this.clientId,
          "firstName": form.value.firstName,
          "lastName": form.value.lastName,
          "email": form.value.email,
          "company": form.value.company,
          "position": null,
          "image": null,
          "readableConsultants": null,
          "writableConsultants": null,
          "proposedProjects": null,
          "acceptedProjects": null
    };

    form.resetForm();

    return this.clientService.addParticipant(this.client)
    .toPromise()
    .then(() => {
      this.authService.createBusinessNetworkCardFile(this.clientId, "Client");
      this.uiService.loadingStateChanged.next(false);
      this.successMessage = "A new Client account has been created for " + this.client.firstName + " " + this.client.lastName + ".";
      this.dialog.open(NewClientMessageComponent, {data: {title: "Success", text: this.successMessage}});
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details.";
        }
        else{
            this.errorMessage = error;
        }
        this.uiService.loadingStateChanged.next(false);
        this.dialog.open(NewClientMessageComponent, {data: {title: "Error", text: this.errorMessage}});
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
