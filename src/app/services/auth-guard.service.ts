import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  isLoggedIn: any;
  constructor(private router: Router) {
    this.isLoggedIn = Boolean(localStorage.getItem('isLoggedIn'));
    console.log(typeof this.isLoggedIn);
    console.log(this.isLoggedIn);

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log(route);

    if (!Boolean(localStorage.getItem('isLoggedIn'))) {
      this.router.navigate(['login']);
      return false;
    } else {
      // this.router.navigate([state.url]);
      return true;
    }
  }
}
