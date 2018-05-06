import { map, filter, first } from 'rxjs/operators';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import * as actions from './../../store/actions'
import * as fromRoot from '../../store/reducers';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent  {

  cart$: Observable<any>;
  order$: Observable<any>;
  user$: Observable<any>;
  orderForm: FormGroup;

  toggleOrderForm = false;

  constructor(
    private _route: ActivatedRoute,
    private store: Store<fromRoot.State>,
    private _fb: FormBuilder,
    private location: Location) {

    this.cart$ = this.store.select(fromRoot.getCart);
    this.order$ = this.store.select(fromRoot.getOrder).pipe(
      filter(Boolean),
      map(order => order.outcome));

    this.user$ = this.store.select(fromRoot.getUser);

    this.orderForm = this._fb.group({
      name: ['', Validators.required ],
      email: ['', Validators.required ],
      adress: ['', Validators.required ],
      city: ['', Validators.required ],
      country: ['', Validators.required ],
      zip: ['', Validators.required ]
    });

  }

  goBack() {
    this.location.back();
  }

  removeFromCart(id) {
    this.store.dispatch(new actions.RemoveFromCart(id));
  }

  onToggleForm() {
    this.toggleOrderForm = !this.toggleOrderForm;
  }

  closeToggleForm() {
    this.toggleOrderForm = false;
  }

  submit() {
    this.cart$.pipe(first())
      .subscribe(cart => {

        const order = { ...this.orderForm.value,
          amount: cart.totalPrice
        };

        this.store.dispatch(new actions.MakeOrder(order));
        this.toggleOrderForm = false;
      })


  }

}
