import { createSelector, createFeatureSelector, combineReducers} from '@ngrx/store';
import * as fromAuth from './auth';
import * as fromProducts from './product';
import * as actions from './../actions';

export interface State {
  auth: fromAuth.State;
  products: fromProducts.State;
}

export const reducers = {
  auth: fromAuth.appReducer,
  products: fromProducts.productReducer
}


export const getAuth = (state: State) => state.auth;
export const Products = (state: State) => state.products;

export const getUser = createSelector(getAuth, fromAuth.user);
export const getProducts = createSelector(Products, fromProducts.products);
export const getProduct = createSelector(Products, fromProducts.product);
export const getProductLoading = createSelector(Products, fromProducts.productLoading);
export const getCart = createSelector(Products, fromProducts.cart);
export const getOrder = createSelector(Products, fromProducts.order);

