import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { UIService } from '../../ui-service.service';


@Component({
  selector: 'app-consultant-administrators',
  templateUrl: './consultant-administrators.component.html',
  styleUrls: ['./consultant-administrators.component.css']
})
export class ConsultantAdministratorsComponent implements OnInit, OnDestroy {

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
