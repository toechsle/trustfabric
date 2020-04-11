import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProposedProjectService } from '../../../ProposedProject.service';
import { MatDialog } from '@angular/material';
import { NewProposedProjectMessageComponent } from './new-proposed-project-message/new-proposed-project-message.component';
import { AuthService } from "../../../auth/auth.service";
import { UIService } from '../../../ui-service.service';


@Component({
  selector: 'app-create-new-project',
  templateUrl: './create-new-project.component.html',
  styleUrls: ['./create-new-project.component.css']
})
export class CreateNewProjectComponent implements OnInit {

  isLoading = false;
  private consultantId;
  private proposedProject;
  private errorMessage;
  private successMessage;


  constructor(private proposedProjectService: ProposedProjectService, private dialog: MatDialog, private authService: AuthService, private uiService: UIService) { }

  ngOnInit() {
     
    this.consultantId = this.authService.getIdOfCurrentUser();

  }


  onSubmit(form: NgForm): Promise<any> {

    this.uiService.loadingStateChanged.next(true);

    this.proposedProject = {
      $class: 'org.ifb.trustfabric.ProposedProject',
      'id': this.consultantId + new Date().getTime(),
      'name': form.value.name,
      'projectLeader': 'org.ifb.trustfabric.Consultant#' + this.consultantId,
      'consultants': null
    };

    form.resetForm();

    return this.proposedProjectService.addAsset(this.proposedProject)
    .toPromise()
    .then(() => {
      this.successMessage = "A new Project with the name '" + this.proposedProject.name + "' has been created.";
      this.uiService.loadingStateChanged.next(false);
      this.dialog.open(NewProposedProjectMessageComponent, {data: {title: "Success", text: this.successMessage}});
    })
    .catch((error) => {
        if (error == 'Server error') {
            this.errorMessage = "Could not connect to REST server. Please check your configuration details.";
        }
        else {
            this.errorMessage = error;
        }
        this.uiService.loadingStateChanged.next(false);
        this.dialog.open(NewProposedProjectMessageComponent, {data: {title: "Error", text: this.errorMessage}});
    });
  
  }


}
