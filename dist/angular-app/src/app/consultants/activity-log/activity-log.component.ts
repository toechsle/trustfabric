import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import  { Subscription } from 'rxjs/Subscription';
import { LogItem } from '../../org.ifb.trustfabric';
import { ConsultantService } from '../../consultants.service';
import { AuthService } from '../../auth/auth.service';
import { ConsultantsUpdatePersonalDataService } from '../profile-consultants/consultants-update-personal-data.service';


@Component({
  selector: 'app-activity-log',
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.css']
})
export class ActivityLogComponent implements OnInit, OnDestroy {

  //displayedColumns = ['creator', 'date', 'text'];
  displayedColumns = ['date', 'text'];
  dataSource = new MatTableDataSource<LogItem>();

  public logItems: LogItem[] = [];
  private id: string;
  private errorMessage;
  private subscription: Subscription;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private consultantService: ConsultantService, private consultantsUpdatePersonalDataService: ConsultantsUpdatePersonalDataService, private authService: AuthService) {}

  ngOnInit() {

    this.id = this.authService.getIdOfCurrentUser();
    return this.getConsultant(this.id)
      .then(() => {
        
        this.dataSource.data = this.logItems;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.subscription = this.consultantsUpdatePersonalDataService.personalDataUpdated$.subscribe(
          () => {
            return this.getConsultant(this.id)
              .then(() => {
                this.dataSource.data = this.logItems;
              })
          }
        );

      });

  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


  applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSource.filter = filterValue;
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
  }

  private getConsultant(id: string): Promise<any> { 
    let tempList = [];
    return this.consultantService.getparticipant(id)
      .toPromise()
      .then((result) => {
          this.errorMessage = null;
          if (result.logItems) {
            result.logItems.forEach(element => {
              tempList.push(element);
            });
            this.logItems = tempList;
          }
          else {
            this.logItems = [];
          }
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
