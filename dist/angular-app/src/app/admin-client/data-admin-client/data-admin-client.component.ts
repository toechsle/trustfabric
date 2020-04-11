import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import  { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/toPromise';
import { ClientAdministratorService } from  '../ClientAdministrator.service';
import { AdminClientUpdatePersonalDataService } from  './admin-client-update-personal-data.service';
import { AdminClientUpdatePersonalDataDialogComponent } from './admin-client-update-personal-data-dialog/admin-client-update-personal-data-dialog.component';
import { AuthService } from "../../auth/auth.service";


@Component({
  selector: 'app-data-admin-client',
  templateUrl: './data-admin-client.component.html',
  styleUrls: ['./data-admin-client.component.css']
})
export class DataAdminClientComponent implements OnInit, OnDestroy {

  private id;
  private firstName;
  private lastName;
  private email;
  private errorMessage;
  private subscription: Subscription;


  constructor(private administratorService: ClientAdministratorService, private dialog: MatDialog, private adminUpdatePersonalDataService: AdminClientUpdatePersonalDataService, private authService: AuthService) {}



  ngOnInit() {  

    this.id = this.authService.getIdOfCurrentUser();
    this.getAdministrator(this.id);

    this.subscription = this.adminUpdatePersonalDataService.personalDataUpdated$.subscribe(
      () => {
        this.getAdministrator(this.id);
      }
    );

  }


  openUpdateDialog() {

    const dialogRef = this.dialog.open(AdminClientUpdatePersonalDataDialogComponent, {data: {
      id: this.id,
      firstName: this.firstName, 
      lastName: this.lastName,
      email: this.email,
      }
    });

  }
  

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


  private getAdministrator(id: string): Promise<any> { 
      return this.administratorService.getparticipant(id)
      .toPromise()
      .then((result) => {
          this.errorMessage = null;
          this.firstName = result.firstName;
          this.lastName = result.lastName;
          this.email = result.email;
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
