import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-new-password-message-admin-consultant',
  templateUrl: './new-password-message-admin-consultant.component.html',
  styleUrls: ['./new-password-message-admin-consultant.component.css']
})
export class NewPasswordMessageAdminConsultantComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit() {
  }

}
