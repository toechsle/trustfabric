import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import  { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/toPromise';
import { ClientService } from  '../../clients.service';
import { ClientsUpdatePersonalDataService } from  './clients-update-personal-data.service';
import { ClientsUpdatePersonalDataDialogComponent } from './clients-update-personal-data-dialog/clients-update-personal-data-dialog.component';
import { AuthService } from "../../auth/auth.service";


@Component({
  selector: 'app-data-clients',
  templateUrl: './data-clients.component.html',
  styleUrls: ['./data-clients.component.css']
})
export class DataClientsComponent implements OnInit, OnDestroy {

  private id: string;
  private firstName;
  private lastName;
  private email;
  private company;
  private position;
  private errorMessage;
  private subscription: Subscription;


  constructor(private clientService: ClientService, private dialog: MatDialog, private clientsUpdatePersonalDataService: ClientsUpdatePersonalDataService, private authService: AuthService) {}


  ngOnInit() { 
    
    this.id = this.authService.getIdOfCurrentUser();
    this.getClient(this.id);

    this.subscription = this.clientsUpdatePersonalDataService.personalDataUpdated$.subscribe(
      () => {
        this.getClient(this.id);
      }
    );

  }


  openUpdateDialog() {

    const dialogRef = this.dialog.open(ClientsUpdatePersonalDataDialogComponent, {data: {
      id: this.id,
      firstName: this.firstName, 
      lastName: this.lastName,
      email: this.email,
      company: this.company,
      position: this.position
      }
    });

  }
  

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


  private getClient(id: string): Promise<any> { 
      return this.clientService.getparticipant(id)
      .toPromise()
      .then((result) => {
          this.errorMessage = null;
          this.firstName = result.firstName;
          this.lastName = result.lastName;
          this.email = result.email;
          this.company = result.company;
          this.position = result.position;
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
