import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-delete-consultant-dialog',
  templateUrl: './delete-consultant-dialog.component.html',
  styleUrls: ['./delete-consultant-dialog.component.css']
})
export class DeleteConsultantDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
