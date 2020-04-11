import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ConsultantCompanyService } from '../../ConsultantCompany.service';
import { ConsultantCompany } from '../../org.ifb.trustfabric';
import { CompaniesUpdateService } from '../companies-admin.update.service';
import { DeleteCompanyDialogComponent } from './delete-company-dialog/delete-company-dialog.component';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/toPromise';
import { UIService } from '../../ui-service.service';


@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.css']
})

export class ConsultantCompaniesListComponent implements OnInit, OnDestroy {

  private currentName;
  private errorMessage;
  private subscription: Subscription;
  
  displayedColumns = ['name', 'delete'];
  dataSource = new MatTableDataSource<ConsultantCompany>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private consultantCompanyService: ConsultantCompanyService, private companiesUpdateService: CompaniesUpdateService, private uiService: UIService, private dialog: MatDialog) { 

  }

  ngOnInit() {  
    
    this.loadAll();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.subscription = this.companiesUpdateService.listOfCompaniesChanged$.subscribe(
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
    
    const dialogRef = this.dialog.open(DeleteCompanyDialogComponent, {data: {
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
    return this.consultantCompanyService.deleteAsset(this.currentName)
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
    return this.consultantCompanyService.getAll()
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
