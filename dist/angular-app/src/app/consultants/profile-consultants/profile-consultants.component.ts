import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ConsultantService } from '../../consultants.service';
import { Project, Skill } from '../../org.ifb.trustfabric';
import { ConsultantsDeleteTeamleaderDialogComponent } from './consultants-delete-teamleader-dialog/consultants-delete-teamleader-dialog.component';
import { ConsultantsUpdatePersonalDataDialogComponent } from './consultants-update-personal-data-dialog/consultants-update-personal-data-dialog.component';
import { ConsultantsUpdatePersonalDataService } from './consultants-update-personal-data.service';
import { RemoveTeamleaderFromConsultantService } from './RemoveTeamleaderFromConsultant.service';
import { ConsultantsUpdateImageDialogComponent } from './consultants-update-image-dialog/consultants-update-image-dialog.component';
import { ConsultantsUpdateImageService } from './consultants-update-image.service';
import  { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/toPromise';
import { NgForm } from '@angular/forms';
import { AddTeamleaderWithGivenEmailToConsultantService } from './AddTeamleaderWithGivenEmailToConsultant.service';
import { Consultant } from '../../org.ifb.trustfabric';
import { ViewProjectDescriptionComponent } from './view-project-description/view-project-description.component';
import { SkillService } from '../../skills.service';
import { ProjectService } from '../../Project.service';
import { AuthService } from "../../auth/auth.service";
import { UIService } from '../../ui-service.service';


@Component({
  selector: 'app-profile-consultants',
  templateUrl: './profile-consultants.component.html',
  styleUrls: ['./profile-consultants.component.css']
})
export class ProfileConsultantsComponent implements OnInit, OnDestroy {

  //displayedColumns = ['id', 'name', 'proficiency'];
  displayedColumns = ['name', 'proficiency'];
  dataSource = new MatTableDataSource<Skill>();

  //displayedColumns2 = ['id', 'name', 'role', 'beginning', 'end', 'duration', 'description'];
  displayedColumns2 = ['name', 'role', 'beginning', 'end', 'duration', 'description'];
  dataSource2 = new MatTableDataSource<Project>();
  
  isLoading = false;
  public image = null;
  public teamleaders: Consultant[] = [];

  private skills: Skill[] = [];
  private projects: Project[] = [];

  private teamleaderRefs: string[] = [];
  private currentTeamleaderId;
  private emailOfTeamleaderToBeAdded;

  private skillRefs: string[] = [];
  private projectRefs: string[] = [];
  
  private transaction;

  private id: string;
  private firstName;
  private lastName;
  private email;
  private company;
  private position;
  private errorMessage;
  private subscription: Subscription;
  private subscription2: Subscription;
  private subscription3: Subscription;


  @ViewChild('skillPaginator') paginator: MatPaginator;
  @ViewChild('skillSort') skillSort: MatSort;
  @ViewChild('projectPaginator') paginator2: MatPaginator;
  @ViewChild('projectSort') projectSort: MatSort;
  constructor(private consultantService: ConsultantService, private removeTeamleaderFromConsultantService: RemoveTeamleaderFromConsultantService, private dialog: MatDialog, private consultantsUpdatePersonalDataService: ConsultantsUpdatePersonalDataService, private consultantsUpdateImageService: ConsultantsUpdateImageService, private addTeamleaderWithGivenEmailToConsultantService: AddTeamleaderWithGivenEmailToConsultantService, private skillService: SkillService, private projectService: ProjectService, private authService: AuthService, private uiService: UIService) {}

  ngOnInit() {  

    this.id = this.authService.getIdOfCurrentUser();
    return this.getConsultant(this.id)
      .then(() => {
        return this.getTeamleaders();
      })
      .then(() => {
        return this.getSkills();
      })
      .then(() => {
        return this.getProjects();
      })
      .then(() => {
        
        this.dataSource.data = this.skills;
        this.dataSource2.data = this.projects;

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.skillSort;
        this.dataSource2.paginator = this.paginator2;
        this.dataSource2.sort = this.projectSort;   

        this.subscription = this.consultantsUpdatePersonalDataService.personalDataUpdated$.subscribe(
          () => {
            this.getConsultant(this.id);
          }
        );
    
        this.subscription2 = this.consultantsUpdateImageService.imageUpdated$.subscribe(
          () => {
            this.getConsultant(this.id);
          }
        );

        this.subscription3 = this.uiService.loadingStateChanged.subscribe(isLoading => {
          this.isLoading = isLoading;
        });

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

  applyFilter2(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource2.filter = filterValue;
    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }

  openDescription(id: string, name: string, role: string, beginning: string, end: string, duration: number, description: string) {
    
    const dialogRef = this.dialog.open(ViewProjectDescriptionComponent, {data: {
        projectId: id,
        projectName: name,
        projectRole: role,
        projectBeginning: beginning,
        projectEnd: end,
        projectDuration: duration,
        projectDescription: description
      }
    });

  }

  addTeamleaderToConsultant(form: NgForm): Promise<any> {

    this.uiService.loadingStateChanged.next(true);

    this.emailOfTeamleaderToBeAdded = form.value.email;
    form.resetForm();
    
    return this.addTeamleader()
        .then(() => {
          return this.getConsultant(this.id);
        })  
        .then(() => {
          return this.getTeamleaders();
        });

  }


  private addTeamleader(): Promise<any> {

    let consultantString = "resource:org.ifb.trustfabric.Consultant#" + this.id;

    this.transaction = {
      $class: "org.ifb.trustfabric.AddTeamleaderWithGivenEmailToConsultant",       
          "consultant": consultantString,   
          "email": this.emailOfTeamleaderToBeAdded,
          "timestamp": new Date().getTime()
    };

    return this.addTeamleaderWithGivenEmailToConsultantService.addTransaction(this.transaction)
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


  openDeleteTeamleaderDialog(id: String, firstName: String, lastName: String, email: String) {

    this.currentTeamleaderId = id;
    
    const dialogRef = this.dialog.open(ConsultantsDeleteTeamleaderDialogComponent, {data: {
      title: "Please confirm", 
      text: "Are you sure you want to remove " + firstName + " " + lastName + " (with Email: " + email + ") from the list of your teamleaders?"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.uiService.loadingStateChanged.next(true);
        return this.deleteTeamleader()
        .then(() => {
          return this.getConsultant(this.id);
        })
        .then(() => {
          return this.getTeamleaders();
        });     
      }   
    });

  }

  private deleteTeamleader(): Promise<any> {

    let consultantString = "resource:org.ifb.trustfabric.Consultant#" + this.id;
    let teamleaderString = "resource:org.ifb.trustfabric.Consultant#" + this.currentTeamleaderId;
  
    this.transaction = {
      $class: "org.ifb.trustfabric.RemoveTeamleaderFromConsultant",       
          "consultant": consultantString,   
          "teamleaderToBeRemoved": teamleaderString,
          "timestamp": new Date().getTime()
    };

    return this.removeTeamleaderFromConsultantService.addTransaction(this.transaction)
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


  openUpdateMasterDataDialog() {

    const dialogRef = this.dialog.open(ConsultantsUpdatePersonalDataDialogComponent, {data: {
      id: this.id,
      firstName: this.firstName, 
      lastName: this.lastName,
      email: this.email,
      company: this.company,
      position: this.position
      }
    });

    dialogRef.componentInstance.firstNameOfConsultant = this.firstName;
    dialogRef.componentInstance.lastNameOfConsultant = this.lastName;
    
  }

  openImageUploadDialog() {
    this.dialog.open(ConsultantsUpdateImageDialogComponent, {data: {
      id: this.id,
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.subscription2) {
      this.subscription2.unsubscribe();
    }
    if (this.subscription3) {
      this.subscription3.unsubscribe();
    }
  }



  private getConsultant(id: string): Promise<any> { 
    let tempList = [];
    let tempList2 = [];
    let tempList3 = [];
    return this.consultantService.getparticipant(id)
      .toPromise()
      .then((result) => {
          this.errorMessage = null;
          this.firstName = result.firstName;
          this.lastName = result.lastName;
          this.email = result.email;
          this.company = result.company;
          this.position = result.position;
          if (result.image) {
            this.image = result.image;
          }
          else {
            this.image = "assets/images/defaultProfilePic.png";
          }
          if (result.teamleaders) {
            result.teamleaders.forEach(element => {
              tempList.push(element);
            });
            this.teamleaderRefs = tempList;
          }
          else {
            this.teamleaderRefs = [];
          }
          if (result.skills) {
            result.skills.forEach(element => {
              tempList2.push(element);
            });
            this.skillRefs = tempList2;
          }
          else {
            this.skillRefs = [];
          }
          if (result.projects) {
            result.projects.forEach(element => {
              tempList3.push(element);
            });
            this.projectRefs = tempList3;
          }
          else {
            this.projectRefs = [];
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


  private getTeamleaders(): Promise<any> { 

    this.teamleaders = [];

    let promises = [];

    for (let teamleaderRef of this.teamleaderRefs) {
        let teamleaderId = this.getId(teamleaderRef); 
        promises.push(this.getTeamleader(teamleaderId));
    }

    return Promise.all(promises)
      .then(() => {
        this.errorMessage = null;
        console.log("Teamleaders have been retrieved successfully.");
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

  private getTeamleader(teamleaderId: string): Promise<any> {
     
    return this.consultantService.getparticipant(teamleaderId)
      .toPromise()
      .then((result) => {
          this.errorMessage = null;
          this.teamleaders.push(result);
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


 private getSkills(): Promise<any> { 

    this.skills = [];

    let promises = [];

    for (let skillRef of this.skillRefs) {
        let skillId = this.getId(skillRef); 
        promises.push(this.getSkill(skillId));
    }

    return Promise.all(promises)
      .then(() => {
        this.errorMessage = null;
        console.log("Skills have been retrieved successfully.");
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

  private getSkill(skillId: string): Promise<any> {
     
    return this.skillService.getAsset(skillId)
      .toPromise()
      .then((result) => {
          this.errorMessage = null;
          this.skills.push(result);
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

  private getProjects(): Promise<any> { 

    this.projects = [];

    let promises = [];

    for (let projectRef of this.projectRefs) {
        let projectId = this.getId(projectRef); 
        promises.push(this.getProject(projectId));
    }

    return Promise.all(promises)
      .then(() => {
        this.errorMessage = null;
        console.log("Projects have been retrieved successfully.");
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

  private getProject(projectId: string): Promise<any> {
     
    return this.projectService.getAsset(projectId)
      .toPromise()
      .then((result) => {
          this.errorMessage = null;
          this.projects.push(result);
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