import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-view-project-description',
  templateUrl: './view-project-description.component.html',
  styleUrls: ['./view-project-description.component.css']
})
export class ViewProjectDescriptionComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
