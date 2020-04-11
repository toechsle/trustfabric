import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-new-password-message-consultants',
  templateUrl: './new-password-message-consultants.component.html',
  styleUrls: ['./new-password-message-consultants.component.css']
})
export class NewPasswordMessageConsultantsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
