import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {of} from 'rxjs/observable/of';
import {Observable} from 'rxjs/Observable';
import { ApiService } from './../services/api.service';
import {Store, combineReducers, Action} from '@ngrx/store';
import * as actions from './actions';
import { State } from './reducers/index';

import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class AppEffects {

   @Effect() fetchUser$: Observable<Action> = this._actions
    .ofType(actions.LOAD_USER_ACTION)
    .switchMap(() => this.apiService.getUser())
    .map(res => new actions.StoreUserAction(res));

    @Effect() loadPayment$: Observable<Action> = this._actions
    .ofType(actions.LOAD_PAYMENT)
    .switchMap((action: actions.LoadPayment) => this.apiService.handleToken(action.payload))
    .map(res => new actions.StoreUserAction(res));

    @Effect() loadProduct$: Observable<Action> = this._actions
    .ofType(actions.LOAD_PRODUCT)
    .switchMap((action: actions.LoadProduct) => this.apiService.loadProduct(action.payload))
    .map(res => new actions.LoadProductSuccess(res));

    @Effect() loadProductLoader$: Observable<Action> = this._actions
    .ofType(actions.GET_PRODUCT)
    .map(res => new actions.LoadingProduct());

    @Effect() loadProducts$: Observable<Action> = this._actions
    .ofType(actions.LOAD_PRODUCTS)
    .switchMap(() => this.apiService.loadProducts())
    .map(res => new actions.LoadProductsSuccess(res));

    @Effect() getProduct$: Observable<Action> = this._actions
    .ofType(actions.GET_PRODUCT)
    .switchMap((action: actions.GetProduct) => this.apiService.getProduct(action.payload))
    .map(res => new actions.GetProductSuccess(res));


    @Effect() getCart$: Observable<Action> = this._actions
    .ofType(actions.GET_CART)
    .switchMap(() => this.apiService.getCart())
    .map(res => new actions.GetCartSuccess(res));


    @Effect() addToCart$: Observable<Action> = this._actions
    .ofType(actions.ADD_TO_CART)
    .switchMap((action: actions.AddToCart) => this.apiService.addToCart(action.payload))
    .map(res => new actions.AddToCartSuccess(res));


    @Effect() removeFromCart$: Observable<Action> = this._actions
    .ofType(actions.REMOVE_FROM_CART)
    .switchMap((action: actions.RemoveFromCart) => this.apiService.removeFromCart(action.payload))
    .map(res => new actions.GetCartSuccess(res));

  constructor(private _actions: Actions, private store: Store<State>, private apiService: ApiService) { }

}


