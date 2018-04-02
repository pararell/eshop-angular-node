import { Component, OnInit, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ActivatedRoute, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

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
  pagination$: Observable<any>;
  category$: Observable<any>;
  filterPrice$: Observable<number>;
  page$ : Observable<any>;

  readonly component = 'productsComponent';

  constructor(
    private store: Store<fromRoot.State>,
    private route: ActivatedRoute,
    private router: Router,
    private _meta: Meta,
    private _title: Title,
    private elRef: ElementRef ) {

    this.category$ = route.params.map(params => params['category']);
    this.page$ = route.queryParams.map(params => params['page']).map(page => parseFloat(page));

    this.filterPrice$ = store.select(fromRoot.getPriceFilter);

    Observable.combineLatest(this.store.select(fromRoot.getProducts), this.page$, this.category$,
      (products, page, category) => ({products, page, category}))
      .first()
      .subscribe(({products, page, category}) => {
        if (!products && !category) {
          this.store.dispatch(new actions.LoadProducts({page: page || 1}));
          this.store.dispatch(new actions.LoadCategories());
        } else if (!products && category) {
          this.store.dispatch(new actions.LoadCategoryProducts({category, page: 1}));
          this.store.dispatch(new actions.LoadCategories());
        }
      });

    this.category$
      .skip(1)
      .subscribe(category => {
        if (category) {
        this.store.dispatch(new actions.LoadCategoryProducts({category, page: 1}));
        } else {
          this.store.dispatch(new actions.LoadProducts({page: 1}));
        }
      });


    this.items$ = Observable.combineLatest(
      this.store.select(fromRoot.getProducts).filter(Boolean),
      this.store.select(fromRoot.getCart).filter(Boolean).map(cart => cart.items),
      this.filterPrice$,
      this.category$,
      (products, cartItems, filterPrice, category) => {
        return {
          products: products.filter(product => product.salePrice <= filterPrice),
          minPrice: products.filter(product => product.salePrice)
            .map(product => product.salePrice).reduce((a, b) => Math.max(a, b), 0),
          maxPrice: products.filter(product => product.salePrice)
            .map(product => product.salePrice).reduce((a, b) => Math.min(a, b), 0),
          cartIds: (cartItems && cartItems.length)
            ? cartItems.reduce((prev, curr) => ( {...prev, [curr.id] : curr.qty } ), {} )
            : {}
        }
      }
    )

    this._title.setTitle('Products');
    this._meta.updateTag({ name: 'description', content: 'Bluetooth Headphones for every ears' });

    this.categories$ = this.store.select(fromRoot.getCategories).filter(Boolean);
    this.pagination$ = this.store.select(fromRoot.getPagination)
      .map(pagination => ({
        ...pagination,
        range: Array(pagination.pages).fill(0).map((v, i) => i + 1)
      }))
  }

  addToCart(id) {
    this.store.dispatch(new actions.AddToCart(id));
  }

  removeFromCart(id) {
    this.store.dispatch(new actions.RemoveFromCart(id));
  }

  priceRange(price) {
    this.store.dispatch(new actions.FilterPrice(price));
  }

  changePage(page) {
    this.store.dispatch(new actions.LoadProducts({page}));
    this.router.navigate(['/products'], { queryParams: { page } });
    this.store.dispatch(new actions.UpdatePosition({productsComponent: 0}));
  }

}
