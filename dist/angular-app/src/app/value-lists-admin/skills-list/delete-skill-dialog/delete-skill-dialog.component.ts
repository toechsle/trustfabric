import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-delete-skill-dialog',
  templateUrl: './delete-skill-dialog.component.html',
  styleUrls: ['./delete-skill-dialog.component.css']
})
export class DeleteSkillDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
