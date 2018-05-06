import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';


import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { TransferState, makeStateKey } from '@angular/platform-browser';


@Injectable()
export class ServerHttpInterceptor implements HttpInterceptor {

  constructor(private _transferState: TransferState) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(tap(event => {
    if (event instanceof HttpResponse) {
      this._transferState.set(makeStateKey(request.url), event.body);
      }
    }));
  }

}
