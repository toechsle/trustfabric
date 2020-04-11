import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ConsultantUpdateService } from '../../consultants-admin.update.service';

@Component({
  selector: 'app-new-consultant-message',
  templateUrl: './new-consultant-message.component.html',
  styleUrls: ['./new-consultant-message.component.css']
})
export class NewConsultantMessageComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private consultantUpdateService: ConsultantUpdateService) { }

  ngOnInit() {
  }

  notifyTable() {
    this.consultantUpdateService.consultantAdded();
  }


}
