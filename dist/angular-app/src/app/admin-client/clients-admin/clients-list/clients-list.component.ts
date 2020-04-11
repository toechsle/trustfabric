import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ClientService } from '../../../clients.service';
import { Client } from '../../../org.ifb.trustfabric';
import { ClientUpdateService } from '../clients-admin.update.service';
import { DeleteClientDialogComponent } from './delete-client-dialog/delete-client-dialog.component';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/toPromise';
import { UIService } from '../../../ui-service.service';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit, OnDestroy {

  private currentId;
  private currentFirstName;
  private currentLastName;
  private currentEmail;
  private errorMessage;
  private subscription: Subscription;
  
  //displayedColumns = ['id', 'firstName', 'lastName', 'email', 'company', 'position', 'readableConsultants', 'writableConsultants', 'proposedProjects', 'acceptedProjects', 'delete'];
  displayedColumns = ['lastName', 'firstName', 'email', 'company', 'delete'];
  dataSource = new MatTableDataSource<Client>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private clientService: ClientService, private clientUpdateService: ClientUpdateService, private uiService: UIService, private dialog: MatDialog) { 

  }

  ngOnInit() {  
    
    this.loadAll();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.subscription = this.clientUpdateService.listOfClientsChanged$.subscribe(
      () => {
        this.loadAll();
      }
    );

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDeleteDialog(id: String, firstName: String, lastName: String, email: String) {

    this.currentId = id;
    this.currentFirstName = firstName;
    this.currentLastName = lastName;
    this.currentEmail = email;
    
    const dialogRef = this.dialog.open(DeleteClientDialogComponent, {data: {
      title: "Please confirm", 
      text: "Are you sure you want to delete the account of " + this.currentFirstName + " " + this.currentLastName + " (with Email: " + this.currentEmail + ") ?"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.uiService.loadingStateChanged.next(true);
        this.deleteClient()
        .then(() => {
          this.loadAll();
        });   
      }   
    });

  }

  deleteClient(): Promise<any> {
    return this.clientService.deleteParticipant(this.currentId)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
        if(error == 'Server error'){
				  this.errorMessage = "Could not connect to REST server. Please check your configuration details.";
		    }
			  else if(error == '404 - Not Found'){
				  this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			  }
			  else{
				  this.errorMessage = error;
			  }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private loadAll(): Promise<any> {
    let tempList = [];
    return this.clientService.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(client => {
        tempList.push(client);
      });
      this.dataSource.data = tempList;
      this.uiService.loadingStateChanged.next(false);
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
