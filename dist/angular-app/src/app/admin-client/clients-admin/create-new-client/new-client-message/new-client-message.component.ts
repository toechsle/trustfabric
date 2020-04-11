import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ClientUpdateService } from '../../clients-admin.update.service';

@Component({
  selector: 'app-new-client-message',
  templateUrl: './new-client-message.component.html',
  styleUrls: ['./new-client-message.component.css']
})
export class NewClientMessageComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private clientUpdateService: ClientUpdateService) { }

  ngOnInit() {
  }

  notifyTable() {
    this.clientUpdateService.clientAdded();
  }

}
