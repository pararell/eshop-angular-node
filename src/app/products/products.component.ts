import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ActivatedRoute } from '@angular/router';

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
  category$: Observable<any>;
  filterPrice: BehaviorSubject<number> = new BehaviorSubject(Infinity);

  constructor( private store: Store<fromRoot.State>, private route: ActivatedRoute ) {

    this.category$ = route.params.map(params => params['category']);

    this.store.select(fromRoot.getProducts)
      .first()
      .subscribe(products => {
        if (!products) {
          this.store.dispatch(new actions.LoadProducts());
        }
      });

    this.items$ = Observable.combineLatest(
      this.store.select(fromRoot.getProducts)
        .filter(Boolean),
      this.store.select(fromRoot.getCart)
        .filter(Boolean)
        .map(cart => cart.items),
      this.filterPrice,
      this.category$,
      (products, cartItems, filterPrice, category) => {
        const filteredProducts = category
          ? products.filter(product => (product.category === category || product['tags'].includes(category)))
          : products;
        return {
          products: filteredProducts.filter(product => product.salePrice <= filterPrice),
          minPrice: filteredProducts.map(product => product.salePrice).reduce((a, b) => Math.max(a, b), 0),
          maxPrice: filteredProducts.map(product => product.salePrice).reduce((a, b) => Math.min(a, b), 0),
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
