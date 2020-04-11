import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ClientCompaniesUpdateService } from '../../client-companies-admin.update.service';

@Component({
  selector: 'app-new-client-company-message',
  templateUrl: './new-client-company-message.component.html',
  styleUrls: ['./new-client-company-message.component.css']
})
export class NewClientCompanyMessageComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private clientCompaniesUpdateService: ClientCompaniesUpdateService) { }

  ngOnInit() {
  }

  notifyTable() {
    this.clientCompaniesUpdateService.companyAdded();
  }

}
