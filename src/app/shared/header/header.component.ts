import { State } from './../../store/reducers/index';
import * as fromRoot from '../../store/reducers';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actions from './../../store/actions'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  user$: Observable<any>;
  cart$: Observable<any>;

  constructor(private store: Store<State>) {

    this.user$ = this.store.select(fromRoot.getUser);
    this.cart$ = this.store.select(fromRoot.getCart);
    this.store.dispatch(new actions.LoadUserAction());
    this.store.dispatch(new actions.GetCart());
   }


}
