import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {LoginService} from './login.service';
import {Router} from '@angular/router';

@Injectable()
export class AuthguardService implements CanActivate {

  constructor ( private user: LoginService, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
  	this.router.navigate(['/']);
  	console.log('You are not authenticated');
    return this.user.getUserLoggedIn();
}

}
