import { Component, OnInit } from '@angular/core';
import { NewPasswordMessageClientsComponent } from './new-password-message-clients/new-password-message-clients.component'
import { MatDialog } from '@angular/material';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';
@Component({
  selector: 'app-security-clients',
  templateUrl: './security-clients.component.html',
  styleUrls: ['./security-clients.component.css']
})
export class SecurityClientsComponent {

  private errorMessage;
  private successMessage;

  constructor(private dialog: MatDialog) { }

  onSubmit(form: NgForm) {

    let user = firebase.auth().currentUser;

    user.updatePassword(form.value.newPassword)
    .then(() => {
      form.resetForm();
      this.successMessage = "The password has been changed.";
      this.dialog.open(NewPasswordMessageClientsComponent, {data: {title: "Success", text: this.successMessage}});
    })
    .catch((error) => {
      form.resetForm();
      this.errorMessage = error;
      this.dialog.open(NewPasswordMessageClientsComponent, {data: {title: "Error", text: this.errorMessage}});
    });
  }


}
