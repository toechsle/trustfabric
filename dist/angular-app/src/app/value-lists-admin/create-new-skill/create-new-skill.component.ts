import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SkillService } from '../../skills.service';
import { MatDialog } from '@angular/material';
import { NewSkillMessageComponent } from './new-skill-message/new-skill-message.component';
import { UIService } from '../../ui-service.service';

@Component({
  selector: 'app-create-new-skill',
  templateUrl: './create-new-skill.component.html',
  styleUrls: ['./create-new-skill.component.css']
})
export class CreateNewSkillComponent implements OnInit {

  private skillBeginner;
  private skillIntermediate;
  private skillAdvanced;
  private errorMessage;
  private warningMessage;
  private successMessage;
  private currentId;
  private counter;

  constructor(private skillService: SkillService, private uiService: UIService, private dialog: MatDialog) { }

  ngOnInit() {

  }

  onSubmit(form: NgForm): Promise<any> {

    this.uiService.loadingStateChanged.next(true);

    this.skillBeginner = {
      $class: "org.ifb.trustfabric.Skill",
          "id": form.value.name + "_" + "Beginner",
          "name": form.value.name,
          "proficiency": "Beginner"
    };

    this.skillIntermediate = {
      $class: "org.ifb.trustfabric.Skill",
          "id": form.value.name + "_" + "Intermediate",
          "name": form.value.name,
          "proficiency": "Intermediate"
    };

    this.skillAdvanced = {
      $class: "org.ifb.trustfabric.Skill",
          "id": form.value.name + "_" + "Advanced",
          "name": form.value.name,
          "proficiency": "Advanced"
    };

    form.resetForm();

    this.counter = 0;

    return this.skillService.addAsset(this.skillBeginner)
    .toPromise()
    .then(() => {
        this.counter = 1;
        return this.skillService.addAsset(this.skillIntermediate)
        .toPromise()
        .then(() => {
            this.counter = 2;
            return this.skillService.addAsset(this.skillAdvanced)
            .toPromise()
            .then(() => {
              this.uiService.loadingStateChanged.next(false);
              this.successMessage = "Skill " + this.skillBeginner.name + " has been created.";
              this.dialog.open(NewSkillMessageComponent, {data: {title: "Success", text: this.successMessage}});
            })
        })
    })
    .catch((error) => {

        if (error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details.";
        }
        else {
            this.errorMessage = error;
        }

        if (this.counter == 0) {
            this.uiService.loadingStateChanged.next(false);
            this.dialog.open(NewSkillMessageComponent, {data: {title: "Error", text: this.errorMessage}});
        }
        else if (this.counter == 1) {
            this.currentId = this.skillBeginner.id;
            this.deleteSkill().then(() => {
              this.uiService.loadingStateChanged.next(false);
              this.dialog.open(NewSkillMessageComponent, {data: {title: "Error", text: this.errorMessage}});
            })
            .catch((error) => {
              this.uiService.loadingStateChanged.next(false);
              this.warningMessage = "Skill " + this.skillBeginner.name + " for proficiency level 'BEGINNER' has already been created and a further error prevented removing the asset again. Please remove the asset manually.";
              this.dialog.open(NewSkillMessageComponent, {data: {title: "Error", text: this.errorMessage + "\n" + this.warningMessage}});
            });
        }
        else if (this.counter == 2) {
            this.currentId = this.skillBeginner.id;
            this.deleteSkill().then(() => {
              this.currentId = this.skillIntermediate.id;
              this.deleteSkill().then(() => {
                this.uiService.loadingStateChanged.next(false);
                this.dialog.open(NewSkillMessageComponent, {data: {title: "Error", text: this.errorMessage}});      
              })
              .catch((error) => {
                this.uiService.loadingStateChanged.next(false);
                this.warningMessage = "Skill " + this.skillBeginner.name + " for proficiency level 'INTERMEDIATE' has already been created and a further error prevented removing the asset again. Please remove the asset manually.";
                this.dialog.open(NewSkillMessageComponent, {data: {title: "Error", text: this.errorMessage + "\n" + this.warningMessage}});
              });     
            })
            .catch((error) => {
              this.uiService.loadingStateChanged.next(false);
              this.warningMessage = "Skill " + this.skillBeginner.name + " has already been created for proficiency levels 'BEGINNER' and 'INTERMEDIATE' and a further error prevented removing the assets again. Please remove the assets manually.";;
              this.dialog.open(NewSkillMessageComponent, {data: {title: "Error", text: this.errorMessage + "\n" + this.warningMessage}});
            });     
        }

    });
    
  }

  private deleteSkill(): Promise<any> {
    return this.skillService.deleteAsset(this.currentId)
		.toPromise()
  }


}
