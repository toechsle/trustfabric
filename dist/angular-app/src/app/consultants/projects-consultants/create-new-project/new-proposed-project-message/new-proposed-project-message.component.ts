import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ProposedProjectUpdateService } from '../../projects-proposed.update.service';

@Component({
  selector: 'app-new-proposed-project-message',
  templateUrl: './new-proposed-project-message.component.html',
  styleUrls: ['./new-proposed-project-message.component.css']
})
export class NewProposedProjectMessageComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private proposedProjectUpdateService: ProposedProjectUpdateService) { }

  ngOnInit() {
  }

  notifyTable() {
    this.proposedProjectUpdateService.proposedProjectsUpdated();
  }

}
