import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { SkillUpdateService } from '../../skills-admin.update.service';

@Component({
  selector: 'app-new-skill-message',
  templateUrl: './new-skill-message.component.html',
  styleUrls: ['./new-skill-message.component.css']
})
export class NewSkillMessageComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private skillUpdateService: SkillUpdateService) { }

  ngOnInit() {
  }

  notifyTable() {
    this.skillUpdateService.skillAdded();
  }


}
