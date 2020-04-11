import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { UIService } from '../../ui-service.service';


@Component({
  selector: 'app-client-administrators',
  templateUrl: './client-administrators.component.html',
  styleUrls: ['./client-administrators.component.css']
})
export class ClientAdministratorsComponent implements OnInit, OnDestroy {

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
