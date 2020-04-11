import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-new-password-message-admin-client',
  templateUrl: './new-password-message-admin-client.component.html',
  styleUrls: ['./new-password-message-admin-client.component.css']
})
export class NewPasswordMessageAdminClientComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit() {
  }

}
