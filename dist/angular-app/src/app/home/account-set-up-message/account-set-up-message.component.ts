import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-account-set-up-message',
  templateUrl: './account-set-up-message.component.html',
  styleUrls: ['./account-set-up-message.component.css']
})
export class AccountSetUpMessageComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
