import { Component, OnInit } from '@angular/core';
import { FormControl  } from '@angular/forms';


import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../store/reducers';
import { Store } from '@ngrx/store';
import * as actions from './../store/actions'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user$: Observable<any>;
  cart$: Observable<any>;
  productTitles$: Observable<any>;
  userOrders$: Observable<any>;
  showAutocomplete$: BehaviorSubject<boolean> = new BehaviorSubject(false);


  readonly query: FormControl = new FormControl();

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {

    this.user$ = this.store.select(fromRoot.getUser);
    this.cart$ = this.store.select(fromRoot.getCart);
    this.productTitles$ = this.store.select(fromRoot.getProductTtitles);
    this.userOrders$ = this.store.select(fromRoot.getUserOrders);

    this.query.valueChanges
      .debounceTime(200)
      .subscribe((value) => {
        const sendQuery = value || 'EMPTY___QUERY';
        this.store.dispatch(new actions.LoadProductsSearch(sendQuery));
      });

    this.user$
      .first()
      .subscribe((user) => {
        if (!user) {
          this.store.dispatch(new actions.LoadUserAction());
        }
      });

    this.user$
      .filter(user => user && user._id)
      .take(1)
      .subscribe(user => {
        this.store.dispatch(new actions.LoadUserOrders({token: user._id }));
      });

    this.cart$
      .first()
      .subscribe(cart => {
        if (!cart) {
          this.store.dispatch(new actions.GetCart());
        }
      });
   }

   onFocus() {
    this.showAutocomplete$.next(true);
   }

   onBlur() {
     setTimeout(() => this.showAutocomplete$.next(false), 300);
   }

   onTitleLink(productUrl) {
      this.query.setValue('');

   }


}
