import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-delete-company-dialog',
  templateUrl: './delete-company-dialog.component.html',
  styleUrls: ['./delete-company-dialog.component.css']
})
export class DeleteCompanyDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
