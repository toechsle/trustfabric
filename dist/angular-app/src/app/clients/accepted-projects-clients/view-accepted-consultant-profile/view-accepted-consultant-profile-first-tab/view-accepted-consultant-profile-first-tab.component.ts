import { Component, OnInit, Inject, ViewChild, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ConsultantService } from '../../../../consultants.service';
import { Project, Skill } from '../../../../org.ifb.trustfabric';
import { ViewProjectDescriptionComponent } from '../../../../consultants/profile-consultants/view-project-description/view-project-description.component';
import { AddSkillsDialogComponent } from './add-skills-dialog/add-skills-dialog.component';
import { AddProjectDialogComponent } from './add-project-dialog/add-project-dialog.component';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/toPromise';
import { SkillsUpdateClientService } from './skills-update-client.service';
import { ProjectsUpdateClientService } from './projects-update-client.service';
import { SkillService } from '../../../../skills.service';
import { ProjectService } from '../../../../Project.service';
import { ConsultantSelectedService } from '../../../consultant-selected.service';

@Component({
  selector: 'app-view-accepted-consultant-profile-first-tab',
  templateUrl: './view-accepted-consultant-profile-first-tab.component.html',
  styleUrls: ['./view-accepted-consultant-profile-first-tab.component.css']
})
export class ViewAcceptedConsultantProfileFirstTabComponent implements OnInit, OnDestroy {

  //displayedColumns = ['id', 'name', 'proficiency'];
  displayedColumns = ['name', 'proficiency'];
  dataSource = new MatTableDataSource<Skill>();

  //displayedColumns2 = ['id', 'name', 'role', 'beginning', 'end', 'duration', 'description'];
  displayedColumns2 = ['name', 'role', 'beginning', 'end', 'duration', 'description'];
  dataSource2 = new MatTableDataSource<Project>();
  
  public image = null;
  consultantId: string;

  private skills: Skill[] = [];
  private projects: Project[] = [];

  private skillRefs: string[] = [];
  private projectRefs: string[] = [];
  
  private transaction;
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
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private consultantService: ConsultantService, private dialog: MatDialog, private skillsUpdateClientService: SkillsUpdateClientService, private projectsUpdateClientService: ProjectsUpdateClientService, private skillService: SkillService, private projectService: ProjectService, private consultantSelectedService: ConsultantSelectedService) {}

  ngOnInit() {  
    
    this.consultantId = this.consultantSelectedService.consultantSelected.getValue();

    return this.getConsultant(this.consultantId)
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
         
        this.subscription = this.skillsUpdateClientService.listOfSkillsChanged$.subscribe(
          () => {
            return this.getConsultant(this.consultantId)
              .then(() => {
                return this.getSkills();
              })
              .then(() => {
                this.dataSource.data = this.skills;
              });
          }
        );
        this.subscription2 = this.projectsUpdateClientService.listOfProjectsChanged$.subscribe(
          () => {
            return this.getConsultant(this.consultantId)
              .then(() => {
                return this.getProjects();
              })
              .then(() => {
                this.dataSource2.data = this.projects;
              });
          }
        );
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


  openSkillAddingWindow() {
    
    const dialogRef = this.dialog.open(AddSkillsDialogComponent, {data: {
      title: "Add skills", 
      text: "Select the skills you want to add to the profile of '" + this.firstName + " " + this.lastName + "'."
      }
    });

    dialogRef.componentInstance.consultantId = this.consultantId;
    
  }


  openProjectAddingWindow() {
    
    const dialogRef = this.dialog.open(AddProjectDialogComponent, {data: {
      title: "Create new project reference" 
      },
      width: '400px',
      height: '500px'
    });

    dialogRef.componentInstance.consultantId = this.consultantId;

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


  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.subscription2) {
      this.subscription2.unsubscribe();
    }
  }



  private getConsultant(id: string): Promise<any> { 
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
