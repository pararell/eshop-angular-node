import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import * as actions from './../../store/actions'
import * as fromRoot from '../../store/reducers';

import { keys } from './../../../config/keys';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})

export class CardComponent implements OnInit {

  @Input() price: number;
  handler: any;

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.handler = StripeCheckout.configure({
      key: keys.stripePublishableKey,
      locale: 'auto',
      token: token => {
        const payment = { token: token, amount: this.price};
        this.store.dispatch(new actions.LoadPayment(payment));
      }
    });
  }

  onClickBuy() {
    this.handler.open({
      name: 'Bluetooth eshop',
      description: 'Pay for products',
      amount: this.price * 100,
      billingAddress: true,
      allowRememberMe: false,
      locale: 'auto',
      currency: 'EUR'
    });
  }

  @HostListener('window:popstate')
  onPopstate() {
    this.handler.close()
  }



}
