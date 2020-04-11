import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { SkillService } from '../../skills.service';
import { Skill } from '../../org.ifb.trustfabric';
import { SkillUpdateService } from '../skills-admin.update.service';
import { DeleteSkillDialogComponent } from './delete-skill-dialog/delete-skill-dialog.component';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/toPromise';
import { UIService } from '../../ui-service.service';

@Component({
  selector: 'app-skills-list',
  templateUrl: './skills-list.component.html',
  styleUrls: ['./skills-list.component.css']
})
export class SkillsListComponent implements OnInit, OnDestroy {

  private currentId;
  private currentName;
  private errorMessage;
  private subscription: Subscription;
  
  //displayedColumns = ['id', 'name', 'proficiency', 'delete'];
  displayedColumns = ['name', 'proficiency', 'delete'];
  dataSource = new MatTableDataSource<Skill>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private skillService: SkillService, private skillUpdateService: SkillUpdateService, private uiService: UIService, private dialog: MatDialog) { 

  }

  ngOnInit() {  
    
    this.loadAll();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.subscription = this.skillUpdateService.listOfSkillsChanged$.subscribe(
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

  openDeleteDialog(id: String, name: String) {
    
    this.currentId = id;
    this.currentName = name;
    
    const dialogRef = this.dialog.open(DeleteSkillDialogComponent, {data: {
      title: "Please confirm", 
      text: "Are you sure you want to delete the skill '" + this.currentName + "' ?"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.uiService.loadingStateChanged.next(true);
        this.deleteSkill()
        .then(() => {
          this.loadAll();
        });   
      }   
    });

  }

  deleteSkill(): Promise<any> {
    return this.skillService.deleteAsset(this.currentId)
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
    return this.skillService.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(skill => {
        tempList.push(skill);
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
