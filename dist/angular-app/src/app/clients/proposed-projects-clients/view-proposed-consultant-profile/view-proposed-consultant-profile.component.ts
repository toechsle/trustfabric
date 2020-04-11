import { Component, OnInit } from '@angular/core';
import { ConsultantSelectedService } from '../../consultant-selected.service';

@Component({
  selector: 'app-view-proposed-consultant-profile',
  templateUrl: './view-proposed-consultant-profile.component.html',
  styleUrls: ['./view-proposed-consultant-profile.component.css']
})
export class ViewProposedConsultantProfileComponent implements OnInit {

  consultantId: string;

  constructor(private consultantSelectedService: ConsultantSelectedService) { }

  ngOnInit() {

    this.consultantSelectedService.sendMessage(this.consultantId);

  }

}