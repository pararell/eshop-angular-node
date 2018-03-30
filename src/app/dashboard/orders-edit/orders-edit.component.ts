import { Component } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../store/reducers';
import { Store } from '@ngrx/store';
import * as actions from './../../store/actions'

@Component({
  selector: 'app-orders-edit',
  templateUrl: './orders-edit.component.html',
  styleUrls: ['./orders-edit.component.scss']
})
export class OrdersEditComponent {

  orders$: Observable<any>;

  constructor(private store: Store<fromRoot.State>) {

     this.store.dispatch(new actions.LoadOrders());

     this.orders$ = this.store.select(fromRoot.getOrders);
   }

}
