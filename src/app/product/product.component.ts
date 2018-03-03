import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import * as actions from './../store/actions'
import * as fromRoot from '../store/reducers';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  items$: Observable<any>;
  productLoading$: Observable<any>;
  activeTab: String = 'first';

  constructor(private _route: ActivatedRoute,  private store: Store<fromRoot.State>) {

    _route.params
      .map(params => params['id'])
      .subscribe(params => {
        this.store.dispatch(new actions.GetProduct(params));
      });

    this.productLoading$ = this.store.select(fromRoot.getProductLoading);

    this.items$ = Observable.combineLatest(
      this.store.select(fromRoot.getProduct),
      this.store.select(fromRoot.getCart).filter(Boolean).map(cart => cart.items),
      (product, cartItems) => {
        return {
          product: product,
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
