import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { State } from './../store/reducers/index';
import { Store } from '@ngrx/store';
import * as actions from './../store/actions'
import * as fromRoot from '../store/reducers';
import 'rxjs/add/operator/filter';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart$: Observable<any>;


  constructor(private _route: ActivatedRoute,  private store: Store<State>, private location: Location) {
    this.cart$ = this.store.select(fromRoot.getCart)
      .filter(products => products)
      .map(products =>
        ({products: products.items, keys: Object.keys(products.items), totalPrice: products.totalPrice, totalQty: products.totalQty }));
   }

  ngOnInit() {

  }

  goBack() {
    this.location.back();
  }

}
