import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Store } from '@ngrx/store';
import * as actions from './../store/actions'
import * as fromRoot from '../store/reducers';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  items$: Observable<any>;
  categories$: Observable<any>;
  filterPrice: BehaviorSubject<number> = new BehaviorSubject(Infinity);

  constructor( private store: Store<fromRoot.State>) {
    this.store.dispatch(new actions.LoadProducts());

  this.items$ = Observable.combineLatest(
    this.store.select(fromRoot.getProducts).filter(Boolean),
    this.store.select(fromRoot.getCart).filter(Boolean).map(cart => cart.items),
    this.filterPrice,
    (products, cartItems, filterPrice) => {
      return {
        products: products.filter(product => product.salePrice <= filterPrice),
        minPrice: products.map(product => product.salePrice).reduce((a, b) => Math.max(a, b), 0),
        maxPrice: products.map(product => product.salePrice).reduce((a, b) => Math.min(a, b), 0),
        cartIds: cartItems.reduce((prev, curr) => ( {...prev, [curr.id] : curr.qty } ), {} )
      }
    }
  )

  this.categories$ = this.store.select(fromRoot.getCategories)
    .filter(Boolean)
    .map(categories => ([...categories.categories, ...categories.tags])
    .map(category => category.toLowerCase())
    .reduce((prev, curr) => prev.concat(prev.includes(curr) ? [] : [curr]) , []).filter(Boolean));
 }

 addToCart(id) {
  this.store.dispatch(new actions.AddToCart(id));
 }

 removeFromCart(id) {
   this.store.dispatch(new actions.RemoveFromCart(id));
 }

 priceRange(price) {
   this.filterPrice.next(price);
 }

}
