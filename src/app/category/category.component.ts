import { Component, OnInit } from '@angular/core';
import { State } from './../store/reducers/index';
import * as fromRoot from '../store/reducers';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/combineLatest';
import { ApiService } from './../services/api.service';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import * as actions from './../store/actions'


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  items$: Observable<any>;
  categories$: Observable<any>;
  category$: Observable<any>;
  filterPrice: BehaviorSubject<number> = new BehaviorSubject(Infinity);

  constructor( private store: Store<State>, private route: ActivatedRoute) {
    this.store.dispatch(new actions.LoadProducts());
    this.category$ = route.params.map(params => params['category']);
  }

  ngOnInit() {

    this.items$ = Observable.combineLatest(
      this.store.select(fromRoot.getProducts).filter(Boolean),
      this.store.select(fromRoot.getCart).filter(Boolean).map(cart => cart.items),
      this.category$,
      this.filterPrice,
      (products, cartItems, category, filterPrice) => {
        const categoryProducts = products.filter(product => (product.category === category || product['tags'].includes(category)));
        return {
          products: categoryProducts.filter(product => product.salePrice <= filterPrice),
          minPrice: categoryProducts.map(product => product.salePrice).reduce((a, b) => Math.max(a, b)),
          maxPrice: categoryProducts.map(product => product.salePrice).reduce((a, b) => Math.min(a, b)),
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
