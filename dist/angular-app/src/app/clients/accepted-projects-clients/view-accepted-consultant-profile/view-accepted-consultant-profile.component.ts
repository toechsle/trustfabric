import { Component, OnInit } from '@angular/core';
import { ConsultantSelectedService } from '../../consultant-selected.service';


@Component({
  selector: 'app-view-accepted-consultant-profile',
  templateUrl: './view-accepted-consultant-profile.component.html',
  styleUrls: ['./view-accepted-consultant-profile.component.css']
})
export class ViewAcceptedConsultantProfileComponent implements OnInit {

  consultantId: string;

  constructor(private consultantSelectedService: ConsultantSelectedService) { }

  ngOnInit() {

    this.consultantSelectedService.sendMessage(this.consultantId);

  }

}
