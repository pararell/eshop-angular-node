import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../../store/reducers';
import { Store } from '@ngrx/store';
import * as actions from './../../../store/actions'

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.scss']
})
export class OrderEditComponent {

  order$: Observable<any>;

  constructor(private store: Store<fromRoot.State>, private _route: ActivatedRoute, private location: Location ) {

    _route.params.map(params => params['id'])
      .subscribe(params => {
        this.store.dispatch(new actions.LoadOrder(params));
    });

     this.order$ = this.store.select(fromRoot.getOrderId);
   }

   goBack() {
    this.location.back();
  }

}
