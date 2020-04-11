import { Component, OnInit } from '@angular/core';
import { NewPasswordMessageAdminClientComponent } from './new-password-message-admin-client/new-password-message-admin-client.component'
import { MatDialog } from '@angular/material';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';

@Component({
  selector: 'app-security-admin-client',
  templateUrl: './security-admin-client.component.html',
  styleUrls: ['./security-admin-client.component.css']
})
export class SecurityAdminClientComponent {

  private errorMessage;
  private successMessage;

  constructor(private dialog: MatDialog) { }

  onSubmit(form: NgForm) {

    let user = firebase.auth().currentUser;

    user.updatePassword(form.value.newPassword)
    .then(() => {
      form.resetForm();
      this.successMessage = "The password has been changed.";
      this.dialog.open(NewPasswordMessageAdminClientComponent, {data: {title: "Success", text: this.successMessage}});
    })
    .catch((error) => {
      form.resetForm();
      this.errorMessage = error;
      this.dialog.open(NewPasswordMessageAdminClientComponent, {data: {title: "Error", text: this.errorMessage}});
    });
  }

}
