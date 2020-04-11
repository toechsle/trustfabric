import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { BehaviorSubject, Subscription } from '../../../../node_modules/rxjs/Rx';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() sidenavToggle = new EventEmitter<void>();

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

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }


}
