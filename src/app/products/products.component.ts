import { Component, OnInit, HostListener } from '@angular/core';
import { State } from './../store/reducers/index';
import * as fromRoot from '../store/reducers';
import { Observable } from 'rxjs/Observable';
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

  handler: any;
  amount: Number = 0;
  products$: Observable<any>;
  cart$: Observable<any>;

constructor( private store: Store<State>) {}

ngOnInit() {

  this.store.dispatch(new actions.LoadProducts());
  this.products$ = this.store.select(fromRoot.getProducts);
  this.cart$ = this.store.select(fromRoot.getCart)
        .filter(Boolean)
        .map(cart => {
          return {
            ...cart,
            ids: cart.items.map(item => item.id)
          }
        })
}


addToCart(product) {
  this.store.dispatch(new actions.AddToCart(product));
}

removeFromCart(id) {
  this.store.dispatch(new actions.RemoveFromCart(id));
}


// this.store.dispatch(new actions.LoadProduct({
//   title: 'ANC bluetooth headphones wireless',
//   description: '811 Bluetooth 4.1 wireless Headphone, fashion sport bluetooth headset',
//   descriptionFull: '',
//   regularPrice: 100,
//   salePrice: 70,
//   stock: 'Na sklade',
//   status: 'visible',
//   onSale: true,
//   shipping: ['Dobierka'],
//   tags: ['bluetooth', 'sluchatka'],
//   type: 'Sluchatka',
//   category: 'Bluetooth',
//   mainImage: {
//     name: '2017-Shenzhen-factory-ANC-bluetooth-headphones-wireless',
//     url: 'http://localhost:8081/apiE/wp-content/uploads/2017/06/2017-Shenzhen-factory-ANC-bluetooth-headphones-wireless.jpg',
//   },
//   dateAdded: Date.now()
// }));


}
