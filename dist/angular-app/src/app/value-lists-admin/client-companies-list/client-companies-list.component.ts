import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ClientCompanyService } from '../../ClientCompany.service';
import { ClientCompany } from '../../org.ifb.trustfabric';
import { ClientCompaniesUpdateService } from '../client-companies-admin.update.service';
import { DeleteClientCompanyDialogComponent } from './delete-client-company-dialog/delete-client-company-dialog.component';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/toPromise';
import { UIService } from '../../ui-service.service';

@Component({
  selector: 'app-client-companies-list',
  templateUrl: './client-companies-list.component.html',
  styleUrls: ['./client-companies-list.component.css']
})
export class ClientCompaniesListComponent implements OnInit, OnDestroy {

  private currentName;
  private errorMessage;
  private subscription: Subscription;
  
  displayedColumns = ['name', 'delete'];
  dataSource = new MatTableDataSource<ClientCompany>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private clientCompanyService: ClientCompanyService, private clientCompaniesUpdateService: ClientCompaniesUpdateService, private uiService: UIService, private dialog: MatDialog) { 

  }

  ngOnInit() {  
    
    this.loadAll();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.subscription = this.clientCompaniesUpdateService.listOfCompaniesChanged$.subscribe(
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

  openDeleteDialog(name: String) {
    
    this.currentName = name;
    
    const dialogRef = this.dialog.open(DeleteClientCompanyDialogComponent, {data: {
      title: "Please confirm", 
      text: "Are you sure you want to delete the company '" + this.currentName + "' ?"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.uiService.loadingStateChanged.next(true);
        this.deleteCompany()
        .then(() => {
          this.loadAll();
        });   
      }   
    });

  }

  deleteCompany(): Promise<any> {
    return this.clientCompanyService.deleteAsset(this.currentName)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private loadAll(): Promise<any> {
    let tempList = [];
    return this.clientCompanyService.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(company => {
        tempList.push(company);
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
