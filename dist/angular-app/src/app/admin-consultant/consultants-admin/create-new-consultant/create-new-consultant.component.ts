import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConsultantCompanyService } from '../../../ConsultantCompany.service';
import { ConsultantService } from '../../../consultants.service';
import { MatDialog } from '@angular/material';
import { NewConsultantMessageComponent } from './new-consultant-message/new-consultant-message.component';
import { AuthService } from '../../../auth/auth.service';
import { UIService } from '../../../ui-service.service';



@Component({
  selector: 'app-create-new-consultant',
  templateUrl: './create-new-consultant.component.html',
  styleUrls: ['./create-new-consultant.component.css']
})
export class CreateNewConsultantComponent implements OnInit {
  
  companies;
  private consultant;
  private consultantId;
  private errorMessage;
  private successMessage;


  constructor(private consultantCompanyService: ConsultantCompanyService, private consultantService: ConsultantService, private authService: AuthService, private uiService: UIService, private dialog: MatDialog) { }

  ngOnInit() {

    this.loadConsultantCompanies();
  
  }


  onSubmit(form: NgForm): Promise<any> {

    this.uiService.loadingStateChanged.next(true);

    this.consultantId = form.value.email + "_" + new Date().getTime();

    this.consultant = {
      $class: "org.ifb.trustfabric.Consultant",
          "id": this.consultantId,
          "firstName": form.value.firstName,
          "lastName": form.value.lastName,
          "email": form.value.email,
          "company": form.value.company,
          "position": null,
          "image": null,
          "teamleaders": null,
          "skills": null,
          "projects": null
    };

    form.resetForm();

    return this.consultantService.addParticipant(this.consultant)
    .toPromise()
    .then(() => {
      this.authService.createBusinessNetworkCardFile(this.consultantId, "Consultant");
      this.successMessage = "A new Consultant account has been created for " + this.consultant.firstName + " " + this.consultant.lastName + ".";
      this.uiService.loadingStateChanged.next(false);
      this.dialog.open(NewConsultantMessageComponent, {data: {title: "Success", text: this.successMessage}});
    })
    .catch((error) => {
        if (error == 'Server error') {
            this.errorMessage = "Could not connect to REST server. Please check your configuration details.";
        }
        else {
            this.errorMessage = error;
        }
        this.uiService.loadingStateChanged.next(false);
        this.dialog.open(NewConsultantMessageComponent, {data: {title: "Error", text: this.errorMessage}});
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
