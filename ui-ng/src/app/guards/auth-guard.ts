import { Injectable } from '@angular/core';
import { CanActivate, Router, CanActivateChild } from '@angular/router';
import { AuthenticationService } from '../db/authentication.service';

@Injectable()
export class AuthGuard implements CanActivateChild {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(): boolean {
    return this.authCheck();
  }

  canActivateChild(): boolean {
    return this.authCheck();
  }

  private authCheck(): boolean {
    if (this.authService.isAuthenticated()) return true;
    this.router.navigate(['/login']);
    return false;
  }
}
