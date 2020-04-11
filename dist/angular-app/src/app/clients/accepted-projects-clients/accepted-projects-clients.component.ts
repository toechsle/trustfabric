import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { AcceptedProjectService } from '../../consultants/projects-consultants/AcceptedProject.service';
import { QueriesService } from '../../queries.service';
import { AcceptedProject, Consultant } from '../../org.ifb.trustfabric';
import 'rxjs/add/operator/toPromise';
import { ConsultantService } from '../../consultants.service';
import { ViewAcceptedConsultantProfileComponent } from './view-accepted-consultant-profile/view-accepted-consultant-profile.component';


@Component({
  selector: 'app-accepted-projects-clients',
  templateUrl: './accepted-projects-clients.component.html',
  styleUrls: ['./accepted-projects-clients.component.css']
})
export class AcceptedProjectsClientsComponent implements OnInit {
 
  public acceptedProjects: AcceptedProject[] = [];
  isDisabled = false;

  private currentConsultants: Consultant[] = [];
  private transaction;
  private errorMessage;
  
  
  //displayedColumns = ['image', 'id', 'firstName', 'lastName', 'email', 'company', 'position', 'teamleaders', 'skills', 'projects', 'viewProfile'];
  displayedColumns = ['lastName', 'firstName', 'email', 'viewProfile'];
  dataSource = new MatTableDataSource<Consultant>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private changeDetectorRefs: ChangeDetectorRef, private consultantService: ConsultantService, private acceptedProjectService: AcceptedProjectService, private queriesService: QueriesService, private dialog: MatDialog) {}


  
  ngOnInit() {  
    this.loadAcceptedProjects();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openProfile(consultantId: string) {

    const dialogRef = this.dialog.open(ViewAcceptedConsultantProfileComponent, {
      height: '100%',
      width: '100%'
    });

    dialogRef.componentInstance.consultantId = consultantId;
 
  }

  onClick(consultants: string[]) { 

    this.isDisabled = true;

    this.currentConsultants = [];
    let promises = [];

    if (consultants) {
      for (let consultant of consultants) {
        let consultantId = this.getId(consultant);
        promises.push(this.getConsultant(consultantId));
      }
    }
      
    return Promise.all(promises)
    .then(() => {
      if (this.currentConsultants.length > 0) {
        this.dataSource = new MatTableDataSource<Consultant>(this.currentConsultants);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.changeDetectorRefs.detectChanges();
      }
      else {
        this.dataSource = new MatTableDataSource<Consultant>([]);
        console.log("There are no consultants associated with this project.");
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.changeDetectorRefs.detectChanges();
      }
      this.isDisabled = false;
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

  private getConsultant(id: string): Promise<any> { 
    return this.consultantService.getparticipant(id)
    .toPromise()
    .then((result) => {
        this.errorMessage = null;
        this.currentConsultants.push(result);
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


  private loadAcceptedProjects(): Promise<any> {
    let tempList = [];
    return this.acceptedProjectService.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(project => {
        tempList.push(project);
      });
      this.acceptedProjects = tempList;
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

  private getId(str: string) {
    return str.split('#')[1];
  }



}
