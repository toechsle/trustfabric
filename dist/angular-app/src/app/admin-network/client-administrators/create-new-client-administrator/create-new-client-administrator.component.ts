import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClientCompanyService } from '../../../ClientCompany.service';
import { ClientAdministratorService } from '../../../admin-client/ClientAdministrator.service';
import { MatDialog } from '@angular/material';
import { NewClientAdministratorMessageComponent } from './new-client-administrator-message/new-client-administrator-message.component';
import { AuthService } from '../../../auth/auth.service';
import { ClientCompaniesUpdateService } from '../../../value-lists-admin/client-companies-admin.update.service';
import { Subscription } from 'rxjs';
import { UIService } from '../../../ui-service.service';



@Component({
  selector: 'app-create-new-client-administrator',
  templateUrl: './create-new-client-administrator.component.html',
  styleUrls: ['./create-new-client-administrator.component.css']
})
export class CreateNewClientAdministratorComponent implements OnInit, OnDestroy {

  companies;
  private admin;
  private adminId;
  private errorMessage;
  private successMessage;
  private subscription: Subscription;  

  constructor(private clientCompanyService: ClientCompanyService, private clientAdministratorService: ClientAdministratorService, private authService: AuthService, private dialog: MatDialog, private uiService: UIService, private clientCompaniesUpdateService: ClientCompaniesUpdateService) { }

  ngOnInit() {
    
    this.loadClientCompanies();

    this.subscription = this.clientCompaniesUpdateService.listOfCompaniesChanged$.subscribe(
      () => {
        this.loadClientCompanies();
      }
    );

  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


  onSubmit(form: NgForm): Promise<any> {

    this.uiService.loadingStateChanged.next(true);

    this.adminId = form.value.email + "_" + new Date().getTime();

    this.admin = {
      $class: "org.ifb.trustfabric.ClientAdministrator",
          "id": this.adminId,
          "firstName": form.value.firstName,
          "lastName": form.value.lastName,
          "email": form.value.email,
          "company": form.value.company,
    };

    form.resetForm();

    return this.clientAdministratorService.addParticipant(this.admin)
    .toPromise()
    .then(() => {
      this.authService.createBusinessNetworkCardFile(this.adminId, "ClientAdmin");
      this.successMessage = "A new ClientAdmin account has been created for " + this.admin.firstName + " " + this.admin.lastName + ".";
      this.uiService.loadingStateChanged.next(false);
      this.dialog.open(NewClientAdministratorMessageComponent, {data: {title: "Success", text: this.successMessage}});
    })
    .catch((error) => {
        if (error == 'Server error') {
            this.errorMessage = "Could not connect to REST server. Please check your configuration details.";
        }
        else {
            this.errorMessage = error;
        }
        this.uiService.loadingStateChanged.next(false);
        this.dialog.open(NewClientAdministratorMessageComponent, {data: {title: "Error", text: this.errorMessage}});
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
