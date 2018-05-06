import { Component, OnInit, ElementRef } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
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
  loadingProducts$: Observable<boolean>;
  categories$: Observable<any>;
  pagination$: Observable<any>;
  paginationCategories$: Observable<any>;
  category$: Observable<any>;
  filterPrice$: Observable<number>;
  page$ : Observable<any>;
  sortBy$: Observable<any>;

  sortOptions = [{
    name: 'Newest',
    id: 'newest',
  },
  {
    name: 'Oldest',
    id: 'oldest',
  },
  {
    name: 'Price-asc',
    id: 'priceasc',
  },
  {
    name: 'Price-decs',
    id: 'pricedesc',
  }];

  readonly component = 'productsComponent';

  constructor(
    private store: Store<fromRoot.State>,
    private route: ActivatedRoute,
    private router: Router,
    private _meta: Meta,
    private _title: Title,
    private elRef: ElementRef ) {

    this.category$ = route.params.map(params => params['category']).distinctUntilChanged();
    this.page$ = route.queryParams.map(params => params['page']).map(page => parseFloat(page));
    this.sortBy$ = route.queryParams.map(params => params['sort']).map(sort => sort);

    this.filterPrice$ = store.select(fromRoot.getPriceFilter);
    this.loadingProducts$ = store.select(fromRoot.getLoadingProducts);

    this.store.select(fromRoot.getCategories)
      .filter(categories => !categories.length)
      .take(1)
      .subscribe(() => this.store.dispatch(new actions.LoadCategories()));

    Observable.combineLatest(this.category$, route.queryParams.map(params => ({page: params['page'], sort: params['sort']})),
      (category, {page, sort}) => ({category, page, sort}))
      .subscribe(({category, page, sort}) => {
        if (category) {
          this.store.dispatch(new actions.LoadCategoryProducts({category, page: page || 1, sort: sort || 'newest' }));
        } else {
          this.store.dispatch(new actions.LoadProducts({page: page || 1, sort: sort || 'newest' }));
        }
      });

    this.items$ = Observable.combineLatest(
      this.store.select(fromRoot.getProducts).filter(Boolean),
      this.store.select(fromRoot.getCart).filter(Boolean).map(cart => cart.items),
      this.filterPrice$,
      (products, cartItems, filterPrice) => {
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
    this.pagination$ = this.store.select(fromRoot.getPagination);
    this.paginationCategories$ = this.store.select(fromRoot.getCategoriesPagination);
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

  changeCategory(category) {
      this.store.dispatch(new actions.UpdatePosition({productsComponent: 0}));
  }

  changePage(page) {
    Observable.combineLatest(this.category$, this.sortBy$,
      (category, sortBy) => ({category, sortBy}))
      .first()
      .subscribe(({category, sortBy}) => {
        if (category) {
          // this.store.dispatch(new actions.LoadCategoryProducts({category, page: page || 1, sort: sortBy || 'newest'}));
          this.router.navigate(['/category/' + category], { queryParams: { sort: sortBy || 'newest', page: page || 1 } });
        } else {
          // this.store.dispatch(new actions.LoadProducts({page: page || 1, sort: sortBy || 'newest'}));
          this.router.navigate(['/products'], { queryParams: { sort: sortBy || 'newest', page: page || 1 } });
        }
      });
      this.store.dispatch(new actions.UpdatePosition({productsComponent: 0}));
  }

  changeSort(sort) {
    Observable.combineLatest(this.category$, this.page$,
      (category, page) => ({category, page}))
      .first()
      .subscribe(({category, page}) => {
        if (category) {
          // this.store.dispatch(new actions.LoadCategoryProducts({category, page: page || 1, sort}));
          this.router.navigate(['/category/' + category], { queryParams: { sort, page: page || 1 } });
        } else {
          // this.store.dispatch(new actions.LoadProducts({page: page || 1, sort}));
          this.router.navigate(['/products'], { queryParams: { sort, page: page || 1 } });
        }
      });
      this.store.dispatch(new actions.UpdatePosition({productsComponent: 0}));
  }

}
