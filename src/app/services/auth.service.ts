import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';


@Injectable()
export class AuthService {

  constructor(public apiService: ApiService) { }

  get isLoggedIn(): Observable<boolean> {
    return this.apiService.getUser()
    .first()
    .map(user => {
      return user ? true : false;
    })

  }

  get isAdmin(): Observable<boolean> {
    return this.apiService.getUser()
    .first()
    .map(user => {
      return (user && user.admin) ? true : false;
    })


  }

}
