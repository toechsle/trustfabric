import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { CompaniesUpdateService } from '../../companies-admin.update.service';

@Component({
  selector: 'app-new-company-message',
  templateUrl: './new-company-message.component.html',
  styleUrls: ['./new-company-message.component.css']
})
export class NewCompanyMessageComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private companiesUpdateService: CompaniesUpdateService) { }

  ngOnInit() {
  }

  notifyTable() {
    this.companiesUpdateService.companyAdded();
  }


}
