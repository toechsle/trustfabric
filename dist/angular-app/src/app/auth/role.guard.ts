import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";


@Injectable()
export class RoleGuard implements CanActivate {
    
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        const expectedRole = route.data.expectedRole;

        if (this.authService.hasRole(expectedRole)) {
            return true;
        }
        else {
            this.router.navigate(['no-access']);
            return false;
        }    
          
    }
} 