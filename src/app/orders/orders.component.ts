import { Component } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../store/reducers';
import { Store } from '@ngrx/store';
import * as actions from './../store/actions'

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {

  orders$: Observable<any>;

  constructor(private store: Store<fromRoot.State>) {

    this.orders$ = this.store.select(fromRoot.getUserOrders);

   }


}
