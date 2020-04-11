import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from '../../../../node_modules/rxjs/Rx';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnDestroy {

  @Output() closeSidenav = new EventEmitter<void>();
  
  private subscription: Subscription;
  private isAuthenticated$: BehaviorSubject<boolean>;
  public isAuthenticated: boolean;


  constructor(private authService: AuthService) { }

  ngOnInit() {

    this.isAuthenticated$ = this.authService.isAutenticated();

    this.subscription = this.isAuthenticated$.subscribe(res => {
        if (res) {
            this.isAuthenticated = true;
        } 
        else {
            this.isAuthenticated = false;
        }
    });

  }


  ngOnDestroy() {
    if (this.subscription) {
        this.subscription.unsubscribe();
    }
  }

  onClose() {
    this.closeSidenav.emit();
  }

}
