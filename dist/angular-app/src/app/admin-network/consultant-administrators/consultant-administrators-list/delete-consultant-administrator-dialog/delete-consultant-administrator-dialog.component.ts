import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-delete-consultant-administrator-dialog',
  templateUrl: './delete-consultant-administrator-dialog.component.html',
  styleUrls: ['./delete-consultant-administrator-dialog.component.css']
})
export class DeleteConsultantAdministratorDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
