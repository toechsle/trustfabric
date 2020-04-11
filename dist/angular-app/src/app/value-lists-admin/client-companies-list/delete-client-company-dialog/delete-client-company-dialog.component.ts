import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-delete-client-company-dialog',
  templateUrl: './delete-client-company-dialog.component.html',
  styleUrls: ['./delete-client-company-dialog.component.css']
})
export class DeleteClientCompanyDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
