import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConsultantCompanyService } from '../../../ConsultantCompany.service';
import { ConsultantAdministratorService } from '../../../admin-consultant/ConsultantAdministrator.service';
import { MatDialog } from '@angular/material';
import { NewConsultantAdministratorMessageComponent } from './new-consultant-administrator-message/new-consultant-administrator-message.component';
import { AuthService } from '../../../auth/auth.service';
import { CompaniesUpdateService } from '../../../value-lists-admin/companies-admin.update.service';
import { Subscription } from 'rxjs';
import { UIService } from '../../../ui-service.service';


@Component({
  selector: 'app-create-new-consultant-administrator',
  templateUrl: './create-new-consultant-administrator.component.html',
  styleUrls: ['./create-new-consultant-administrator.component.css']
})
export class CreateNewConsultantAdministratorComponent implements OnInit {

  companies;
  private admin;
  private adminId;
  private errorMessage;
  private successMessage;
  private subscription: Subscription;  


  constructor(private consultantCompanyService: ConsultantCompanyService, private consultantAdministratorService: ConsultantAdministratorService, private authService: AuthService, private dialog: MatDialog, private companiesUpdateService: CompaniesUpdateService, private uiService: UIService) { }

  ngOnInit() {
    
    this.loadConsultantCompanies();

    this.subscription = this.companiesUpdateService.listOfCompaniesChanged$.subscribe(
      () => {
        this.loadConsultantCompanies();
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
      $class: "org.ifb.trustfabric.ConsultantAdministrator",
          "id": this.adminId,
          "firstName": form.value.firstName,
          "lastName": form.value.lastName,
          "email": form.value.email,
          "company": form.value.company,
    };

    form.resetForm();

    return this.consultantAdministratorService.addParticipant(this.admin)
    .toPromise()
    .then(() => {
      this.authService.createBusinessNetworkCardFile(this.adminId, "ConsultantAdmin");
      this.successMessage = "A new ConsultantAdmin account has been created for " + this.admin.firstName + " " + this.admin.lastName + ".";
      this.uiService.loadingStateChanged.next(false);
      this.dialog.open(NewConsultantAdministratorMessageComponent, {data: {title: "Success", text: this.successMessage}});
    })
    .catch((error) => {
        if (error == 'Server error') {
            this.errorMessage = "Could not connect to REST server. Please check your configuration details.";
        }
        else {
            this.errorMessage = error;
        }
        this.uiService.loadingStateChanged.next(false);
        this.dialog.open(NewConsultantAdministratorMessageComponent, {data: {title: "Error", text: this.errorMessage}});
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


}
