import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ConsultantAdministratorService } from '../../../admin-consultant/ConsultantAdministrator.service';
import { ConsultantAdministrator } from '../../../org.ifb.trustfabric';
import { ConsultantAdministratorUpdateService } from '../consultant-administrator.update.service';
import { DeleteConsultantAdministratorDialogComponent } from './delete-consultant-administrator-dialog/delete-consultant-administrator-dialog.component';
import  { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/toPromise';
import { UIService } from '../../../ui-service.service';

@Component({
  selector: 'app-consultant-administrators-list',
  templateUrl: './consultant-administrators-list.component.html',
  styleUrls: ['./consultant-administrators-list.component.css']
})
export class ConsultantAdministratorsListComponent implements OnInit, OnDestroy {

  private currentId;
  private currentFirstName;
  private currentLastName;
  private currentEmail;
  private errorMessage;
  private subscription: Subscription;
  
  //displayedColumns = ['id', 'lastName', 'firstName', 'email', 'company', 'delete'];
  displayedColumns = ['lastName', 'firstName', 'email', 'company', 'delete'];
  dataSource = new MatTableDataSource<ConsultantAdministrator>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private consultantAdministratorService: ConsultantAdministratorService, private consultantAdministratorUpdateService: ConsultantAdministratorUpdateService, private uiService: UIService, private dialog: MatDialog) { 

  }

  ngOnInit() {  
    
    this.loadAll();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.subscription = this.consultantAdministratorUpdateService.listOfConsultantAdministratorsChanged$.subscribe(
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

  openDialog(id: String, firstName: String, lastName: String, email: String) {
    
    this.currentId = id;
    this.currentFirstName = firstName;
    this.currentLastName = lastName;
    this.currentEmail = email;
    
    const dialogRef = this.dialog.open(DeleteConsultantAdministratorDialogComponent, {data: {
      title: "Please confirm", 
      text: "Are you sure you want to delete the account of " + this.currentFirstName + " " + this.currentLastName + " (with Email: " + this.currentEmail + ") ?"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.uiService.loadingStateChanged.next(true);
        this.deleteAdmin()
        .then(() => {
          this.loadAll();
        });   
      }   
    });

  }

  deleteAdmin(): Promise<any> {
    return this.consultantAdministratorService.deleteParticipant(this.currentId)
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
    return this.consultantAdministratorService.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(consultant => {
        tempList.push(consultant);
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
        this.uiService.loadingStateChanged.next(false);
    });
  }


}
