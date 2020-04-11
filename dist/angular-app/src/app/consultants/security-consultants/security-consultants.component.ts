import { Component, OnInit } from '@angular/core';
import { NewPasswordMessageConsultantsComponent } from './new-password-message-consultants/new-password-message-consultants.component'
import { MatDialog } from '@angular/material';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';

@Component({
  selector: 'app-security-consultants',
  templateUrl: './security-consultants.component.html',
  styleUrls: ['./security-consultants.component.css']
})
export class SecurityConsultantsComponent {
 
  private consultantId
  private transaction;
  private errorMessage;
  private successMessage;

  constructor(private dialog: MatDialog) { }


  onSubmit(form: NgForm) {

    let user = firebase.auth().currentUser;

    user.updatePassword(form.value.newPassword)
    .then(() => {
      form.resetForm();
      this.successMessage = "The password has been changed.";
      this.dialog.open(NewPasswordMessageConsultantsComponent, {data: {title: "Success", text: this.successMessage}});
    })
    .catch((error) => {
      form.resetForm();
      this.errorMessage = error;
      this.dialog.open(NewPasswordMessageConsultantsComponent, {data: {title: "Error", text: this.errorMessage}});
    });

  }

}
