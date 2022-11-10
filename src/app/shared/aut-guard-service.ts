import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { TokenService } from './token.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: TokenService, public router: Router) {}
  canActivate(): boolean {
    if (! this.auth.isLoggedIn()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}