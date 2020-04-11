import { Component, OnInit } from '@angular/core';
import { NewPasswordMessageAdminConsultantComponent } from './new-password-message-admin-consultant/new-password-message-admin-consultant.component'
import { MatDialog } from '@angular/material';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';


@Component({
  selector: 'app-security-admin-consultant',
  templateUrl: './security-admin-consultant.component.html',
  styleUrls: ['./security-admin-consultant.component.css']
})
export class SecurityAdminConsultantComponent {

  private errorMessage;
  private successMessage;

  constructor(private dialog: MatDialog) { }

  onSubmit(form: NgForm) {

    let user = firebase.auth().currentUser;

    user.updatePassword(form.value.newPassword)
    .then(() => {
      form.resetForm();
      this.successMessage = "The password has been changed.";
      this.dialog.open(NewPasswordMessageAdminConsultantComponent, {data: {title: "Success", text: this.successMessage}});
    })
    .catch((error) => {
      form.resetForm();
      this.errorMessage = error;
      this.dialog.open(NewPasswordMessageAdminConsultantComponent, {data: {title: "Error", text: this.errorMessage}});
    });
  }
  
}
