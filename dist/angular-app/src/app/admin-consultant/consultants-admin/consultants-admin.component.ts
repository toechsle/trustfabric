import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { UIService } from '../../ui-service.service';

@Component({
  selector: 'app-consultants-admin',
  templateUrl: './consultants-admin.component.html',
  styleUrls: ['./consultants-admin.component.css']
})
export class ConsultantsAdminComponent implements OnInit, OnDestroy {

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
