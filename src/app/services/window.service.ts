import { Injectable } from '@angular/core';



@Injectable()
export class WindowService {

  constructor() { }

  location    : { href: string };
  innerWidth  : number;
  innerHeight : number;
  document    : Document;
  open        : Function;
  resize      : Function;
  navigator   : any = {
    userAgent: ''
  };
}
