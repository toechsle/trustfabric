import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable, OnDestroy } from "@angular/core";
import { AuthService } from "./auth.service";
import { BehaviorSubject } from '../../../node_modules/rxjs/Rx';
import  { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthGuard implements CanActivate, OnDestroy {

    private subscription: Subscription;
    private isAuthenticated$: BehaviorSubject<boolean>;
    private isAuthenticated: boolean;
    
    constructor(private authService: AuthService, private router: Router) {
   
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

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.isAuthenticated) {
            return true;
        }
        else {
            this.router.navigate(['']);
            return false;
        }     
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }




} 