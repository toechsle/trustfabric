import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-new-password-message-clients',
  templateUrl: './new-password-message-clients.component.html',
  styleUrls: ['./new-password-message-clients.component.css']
})
export class NewPasswordMessageClientsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
