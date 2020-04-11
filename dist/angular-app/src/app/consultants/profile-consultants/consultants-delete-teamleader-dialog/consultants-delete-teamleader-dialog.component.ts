import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-consultants-delete-teamleader-dialog',
  templateUrl: './consultants-delete-teamleader-dialog.component.html',
  styleUrls: ['./consultants-delete-teamleader-dialog.component.css']
})
export class ConsultantsDeleteTeamleaderDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
