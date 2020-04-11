import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ConsultantAdministratorUpdateService } from '../../consultant-administrator.update.service';


@Component({
  selector: 'app-new-consultant-administrator-message',
  templateUrl: './new-consultant-administrator-message.component.html',
  styleUrls: ['./new-consultant-administrator-message.component.css']
})
export class NewConsultantAdministratorMessageComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private consultantAdministratorUpdateService: ConsultantAdministratorUpdateService) { }

  ngOnInit() {
  }

  notifyTable() {
    this.consultantAdministratorUpdateService.consultantAdminAdded();
  }

}
