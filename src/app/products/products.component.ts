import { Component, OnInit } from '@angular/core';
import { State } from './../store/reducers/index';
import * as fromRoot from '../store/reducers';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import { ApiService } from './../services/api.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { keys } from './../../config/keys';
import * as actions from './../store/actions'


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  items$: Observable<any>;

constructor( private store: Store<State>) {
  this.store.dispatch(new actions.LoadProducts());
}

ngOnInit() {

  this.items$ = Observable.combineLatest(
    this.store.select(fromRoot.getProducts),
    this.store.select(fromRoot.getCart).filter(Boolean).map(cart => cart.items),
    (products, cartItems) => {
      return {
        products: products,
        cartIds: cartItems.reduce((prev, curr) => ( {...prev, [curr.id] : curr.qty } ), {} )
      }
    }
  )

}


addToCart(id) {
  this.store.dispatch(new actions.AddToCart(id));
}

removeFromCart(id) {
  this.store.dispatch(new actions.RemoveFromCart(id));
}


}
