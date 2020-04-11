import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ClientAdministratorUpdateService } from '../../client-administrator.update.service';

@Component({
  selector: 'app-new-client-administrator-message',
  templateUrl: './new-client-administrator-message.component.html',
  styleUrls: ['./new-client-administrator-message.component.css']
})
export class NewClientAdministratorMessageComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private clientAdministratorUpdateService: ClientAdministratorUpdateService) { }

  ngOnInit() {
  }

  notifyTable() {
    this.clientAdministratorUpdateService.clientAdminAdded();
  }


}
