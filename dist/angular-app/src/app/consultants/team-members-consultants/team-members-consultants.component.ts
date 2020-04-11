import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ConsultantService } from '../../consultants.service';
import { Consultant } from '../../org.ifb.trustfabric';
import  { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/toPromise';
import { ViewTeamMemberProfileComponent } from './view-team-member-profile/view-team-member-profile.component';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-team-members-consultants',
  templateUrl: './team-members-consultants.component.html',
  styleUrls: ['./team-members-consultants.component.css']
})
export class TeamMembersConsultantsComponent implements OnInit {

  private consultantId: string; 
  private teamleaders: string[] = [];
  private arrayOfConsultants: Consultant[] = [];
  private arrayOfTeamMembers: Consultant[] = [];
  private errorMessage;
  private subscription: Subscription;
  
  //displayedColumns = ['image', 'id', 'firstName', 'lastName', 'email', 'company', 'position', 'teamleaders', 'skills', 'projects', 'viewProfile'];
  displayedColumns = ['lastName', 'firstName', 'email', 'viewProfile'];
  dataSource = new MatTableDataSource<Consultant>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private consultantService: ConsultantService, private authService: AuthService, private dialog: MatDialog) { 

  }

  ngOnInit() {  

    this.consultantId = this.authService.getIdOfCurrentUser();
    
    return this.loadAll()
    .then(() => {
        /* this function call is necessary because access on a per-property basis 
        has so far only been implemented in the ACL language but not in 
        the runtime environment: */
        return this.filterConsultants();
    })
    .then(() => {
      this.dataSource.data = this.arrayOfTeamMembers;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

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
    
    const dialogRef = this.dialog.open(ViewTeamMemberProfileComponent, {
      height: '100%',
      width: '100%'
    });

    dialogRef.componentInstance.id = consultantId;
 
  }


  private loadAll(): Promise<any> {
    let tempList = [];
    return this.consultantService.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(consultant => {
        tempList.push(consultant);
      });
      this.arrayOfConsultants = tempList;  
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

  /* this function is necessary because access on a per-property basis 
  has so far only been implemented in the ACL language but not in 
  the runtime environment: */
  private filterConsultants(): Promise<any> {
    let tempList = [];
    this.arrayOfTeamMembers = [];
    return this.consultantService.getparticipant(this.consultantId)
    .toPromise()
    .then((result) => {
      this.errorMessage = null; 
      if (result.teamleaders) {      
        result.teamleaders.forEach(element => {
          tempList.push(element);
        }); 
        for (let consultant of this.arrayOfConsultants) {
          let consultantString = 'resource:org.ifb.trustfabric.Consultant#' + consultant.id;
          if (!this.contains(tempList, consultantString)) {
            this.arrayOfTeamMembers.push(consultant);
          }
        }      
      }
      else {
        this.arrayOfTeamMembers = this.arrayOfConsultants;
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

  private contains(array: any[], item: any) {
    for (let i=0; i<array.length; i++) {
        if (array[i] == item) {
            return true;
        }
    }
    return false;
  }   

}