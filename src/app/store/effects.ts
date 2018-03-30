import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

import { ApiService } from './../services/api.service';

import {Store, combineReducers, Action} from '@ngrx/store';
import * as actions from './actions';
import { State } from './reducers/index';


@Injectable()
export class AppEffects {

  @Effect() fetchUser$: Observable<Action> = this._actions
    .ofType(actions.LOAD_USER_ACTION)
    .switchMap((action: actions.LoadUserAction) => this.apiService.getUser())
    .map(res => new actions.StoreUserAction(res));

  @Effect() loadPayment$: Observable<Action> = this._actions
    .ofType(actions.LOAD_PAYMENT)
    .switchMap((action: actions.LoadPayment) => this.apiService.handleToken(action.payload))
    .map(res => new actions.LoadPaymentSuccess(res));

  @Effect() loadProducts$: Observable<Action> = this._actions
    .ofType(actions.LOAD_PRODUCTS)
    .switchMap((action: actions.LoadProducts) => this.apiService.loadProducts())
    .map(res => new actions.LoadProductsSuccess(res));

  @Effect() loadProductsSearch$: Observable<Action> = this._actions
    .ofType(actions.LOAD_PRODUCTS_SEARCH)
    .switchMap((action: actions.LoadProductsSearch) => this.apiService.loadProductsSearch(action.payload))
    .map(res => new actions.LoadProductsSearchSuccess(res));


  @Effect() addProduct$: Observable<Action> = this._actions
    .ofType(actions.ADD_PRODUCT)
    .switchMap((action: actions.AddProduct) => this.apiService.addProduct(action.payload))
    .map(res => new actions.LoadProductsSuccess(res));

  @Effect() editProduct$: Observable<Action> = this._actions
    .ofType(actions.EDIT_PRODUCT)
    .switchMap((action: actions.EditProduct) => this.apiService.editProduct(action.payload))
    .map(res => new actions.LoadProductsSuccess(res));

  @Effect() removeProduct$: Observable<Action> = this._actions
    .ofType(actions.REMOVE_PRODUCT)
    .switchMap((action: actions.RemoveProduct) => this.apiService.removeProduct(action.payload))
    .map(res => new actions.LoadProductsSuccess(res));

  @Effect() getProduct$: Observable<Action> = this._actions
    .ofType(actions.GET_PRODUCT)
    .switchMap((action: actions.GetProduct) => this.apiService.getProduct(action.payload))
    .map(res => new actions.GetProductSuccess(res));

  @Effect() getCart$: Observable<Action> = this._actions
    .ofType(actions.GET_CART)
    .switchMap((action: actions.GetCart) => this.apiService.getCart())
    .map(res => new actions.GetCartSuccess(res));

  @Effect() addToCart$: Observable<Action> = this._actions
    .ofType(actions.ADD_TO_CART)
    .switchMap((action: actions.AddToCart) => this.apiService.addToCart(action.payload))
    .map(res => new actions.AddToCartSuccess(res));

  @Effect() removeFromCart$: Observable<Action> = this._actions
    .ofType(actions.REMOVE_FROM_CART)
    .switchMap((action: actions.RemoveFromCart) => this.apiService.removeFromCart(action.payload))
    .map(res => new actions.GetCartSuccess(res));

  @Effect() removeImage$: Observable<Action> = this._actions
    .ofType(actions.REMOVE_PRODUCT_IMAGE)
    .switchMap((action: actions.RemoveProductImage) => this.apiService.removeImage(action.payload))
    .map(res => new actions.StoreUserAction(res));

  @Effect() loadOrders$: Observable<Action> = this._actions
    .ofType(actions.LOAD_ORDERS)
    .switchMap((action: actions.LoadOrders) => this.apiService.getOrders())
    .map(res => new actions.LoadOrdersSuccess(res));

  @Effect() loadOrder$: Observable<Action> = this._actions
    .ofType(actions.LOAD_ORDER)
    .switchMap((action: actions.LoadOrder) => this.apiService.getOrder(action.payload))
    .map(res => new actions.LoadOrderSuccess(res));

  @Effect() loadUserOrders$: Observable<Action> = this._actions
    .ofType(actions.LOAD_USER_ORDERS)
    .switchMap((action: actions.LoadUserOrders) => this.apiService.getUserOrders(action.payload))
    .map(res => new actions.LoadUserOrdersSuccess(res));

  @Effect() updateOrder$: Observable<Action> = this._actions
    .ofType(actions.UPDATE_ORDER)
    .switchMap((action: actions.UpdateOrder) => this.apiService.updateOrder(action.payload))
    .map(res => new actions.LoadOrderSuccess(res));


  constructor(private _actions: Actions, private store: Store<State>, private apiService: ApiService) { }

}
