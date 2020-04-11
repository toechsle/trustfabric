import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConsultantCompanyService } from '../../ConsultantCompany.service';
import { MatDialog } from '@angular/material';
import { NewCompanyMessageComponent } from './new-company-message/new-company-message.component';
import { UIService } from '../../ui-service.service';


@Component({
  selector: 'app-create-new-company',
  templateUrl: './create-new-company.component.html',
  styleUrls: ['./create-new-company.component.css']
})
export class CreateNewCompanyComponent implements OnInit {

  private company;
  private errorMessage;
  private successMessage;

  constructor(private consultantCompanyService: ConsultantCompanyService, private uiService: UIService, private dialog: MatDialog) { }

  ngOnInit() {

  }
 
  onSubmit(form: NgForm): Promise<any> {

    this.uiService.loadingStateChanged.next(true);

    this.company = {
      $class: "org.ifb.trustfabric.ConsultantCompany",
          "name": form.value.name
    };

    form.resetForm();

    return this.consultantCompanyService.addAsset(this.company)
    .toPromise()
    .then(() => {
        this.uiService.loadingStateChanged.next(false);
        this.successMessage = "Company " + this.company.name + " has been created.";
        this.dialog.open(NewCompanyMessageComponent, {data: {title: "Success", text: this.successMessage}});    
    })
    .catch((error) => {
        if (error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details.";
        }
        else {
            this.errorMessage = error;
        }   
        this.uiService.loadingStateChanged.next(false);
        this.dialog.open(NewCompanyMessageComponent, {data: {title: "Error", text: this.errorMessage}});
    });
    
  } 


}
