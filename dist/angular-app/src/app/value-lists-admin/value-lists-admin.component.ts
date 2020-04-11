import { Component, OnInit } from '@angular/core';
import { UIService } from '../ui-service.service';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-value-lists-admin',
  templateUrl: './value-lists-admin.component.html',
  styleUrls: ['./value-lists-admin.component.css']
})
export class ValueListsAdminComponent implements OnInit {

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
