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
export const getCategories = createSelector(Products, fromProducts.categories);
export const getProduct = createSelector(Products, fromProducts.product);
export const getProductLoading = createSelector(Products, fromProducts.productLoading);
export const getCart = createSelector(Products, fromProducts.cart);
export const getOrder = createSelector(Products, fromProducts.order);
export const getOrderId = createSelector(Products, fromProducts.orderId);
export const getOrders = createSelector(Products, fromProducts.orders);
export const getProductImages = createSelector(Products, fromProducts.productImages);
export const getProductTtitles = createSelector(Products, fromProducts.productsTitles);
export const getPriceFilter = createSelector(Products, fromProducts.priceFilter);
