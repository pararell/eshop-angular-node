import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent  {

  productAction: String = '';

  constructor() { }

  changeAction(action: string) {
    this.productAction = this.productAction === action ? '' : action;
  }

}
