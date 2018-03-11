import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../store/reducers';
import { Store } from '@ngrx/store';
import * as actions from './../store/actions'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user$: Observable<any>;
  cart$: Observable<any>;

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {

    this.user$ = this.store.select(fromRoot.getUser);
    this.cart$ = this.store.select(fromRoot.getCart);

    this.user$
      .first()
      .subscribe((user) => {
        if (!user) {
          this.store.dispatch(new actions.LoadUserAction());
        }
      });

    this.cart$
      .first()
      .subscribe(cart => {
        if (!cart) {
          this.store.dispatch(new actions.GetCart());
        }
      });
   }


}
