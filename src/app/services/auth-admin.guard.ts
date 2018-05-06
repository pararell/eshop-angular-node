import { Injectable } from '@angular/core';
import { CanLoad, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import * as fromRoot from '../store/reducers';
import 'rxjs/add/operator/first';


@Injectable()
export class AuthGuardAdmin implements CanLoad, CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canLoad(): Observable<boolean> {
    return this.authService.isAdmin.map(user => {
      if (user) {
      return user;
      } else {
        this.router.navigate(['/products']);
        return user;
      }
    });
  }

  canActivate(): Observable<boolean> {
    return this.authService.isAdmin.map(user => {
      if (user) {
      return user;
      } else {
        this.router.navigate(['/products']);
        return user;
      }
    });
 }

}
