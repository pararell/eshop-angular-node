import { Component, OnInit, Input, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { State } from './../store/reducers/index';
import { Store } from '@ngrx/store';
import * as actions from './../store/actions'
import * as fromRoot from '../store/reducers';
import 'rxjs/add/operator/filter';
import { keys } from './../../config/keys';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() price: number;
  handler: any;

  constructor(private _route: ActivatedRoute,  private store: Store<State>) {

   }

  ngOnInit() {
    this.handler = StripeCheckout.configure({
      key: keys.stripePublishableKey,
      locale: 'auto',
      token: token => {
        const payment = { token: token, amount: this.price }
        this.store.dispatch(new actions.LoadPayment(payment));
      }
    });
  }

  onClickBuy() {
    this.handler.open({
      name: 'Bluetooth eshop',
      description: 'Pay fro product',
      amount: this.price * 100
    });
  }

  @HostListener('window:popstate')
  onPopstate() {
    this.handler.close()
  }



}
