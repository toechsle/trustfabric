import { Component, OnInit, OnDestroy } from '@angular/core';
import { UIService } from '../../ui-service.service';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-projects-consultants',
  templateUrl: './projects-consultants.component.html',
  styleUrls: ['./projects-consultants.component.css']
})
export class ProjectsConsultantsComponent implements OnInit, OnDestroy {

  isLoading = false;
  private subscription: Subscription;

  constructor(private uiService: UIService) { }

  ngOnInit() {

    this.subscription = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });

  }

  ngOnDestroy() {
    if (this.subscription) {
        this.subscription.unsubscribe();
    }
  }

}
