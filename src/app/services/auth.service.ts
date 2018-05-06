import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';



@Injectable()
export class AuthService {

  constructor(public apiService: ApiService) { }

  get isLoggedIn(): Observable<boolean> {
    return this.apiService.getUser()
    .first()
    .map((user: any) => {
      return (user && user._id) ? true : false;
    })

  }

  get isAdmin(): Observable<boolean> {
    return this.apiService.getUser()
    .first()
    .map((user: any) => {
      return (user && user.admin) ? true : false;
    })


  }

}
