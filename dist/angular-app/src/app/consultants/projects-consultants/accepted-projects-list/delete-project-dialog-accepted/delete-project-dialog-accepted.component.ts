import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-delete-project-dialog-accepted',
  templateUrl: './delete-project-dialog-accepted.component.html',
  styleUrls: ['./delete-project-dialog-accepted.component.css']
})
export class DeleteProjectDialogAcceptedComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
