import { createSelector, createFeatureSelector, combineReducers} from '@ngrx/store';
import * as fromAuth from './auth';
import * as fromProducts from './product';
import * as fromDashboard from './dashboard';
import * as actions from './../actions';

export interface State {
  auth: fromAuth.State;
  products: fromProducts.State;
  dashboard: fromDashboard.State;
}

export const reducers = {
  auth: fromAuth.appReducer,
  products: fromProducts.productReducer,
  dashboard: fromDashboard.dashboardReducer
}


export const getAuth = (state: State) => state.auth;
export const Products = (state: State) => state.products;
export const Dashboard = (state: State) => state.dashboard;

export const getUser = createSelector(getAuth, fromAuth.user);

export const getProducts = createSelector(Products, fromProducts.products);
export const getCategories = createSelector(Products, fromProducts.categories);
export const getPagination = createSelector(Products, fromProducts.pagination);
export const getCategoriesPagination = createSelector(Products, fromProducts.categoriesPagination);
export const getProduct = createSelector(Products, fromProducts.product);
export const getProductLoading = createSelector(Products, fromProducts.productLoading);
export const getCart = createSelector(Products, fromProducts.cart);
export const getOrder = createSelector(Products, fromProducts.order);
export const getUserOrders = createSelector(Products, fromProducts.userOrders);
export const getProductTtitles = createSelector(Products, fromProducts.productsTitles);
export const getPriceFilter = createSelector(Products, fromProducts.priceFilter);
export const getPosition = createSelector(Products, fromProducts.position);

export const getOrderId = createSelector(Dashboard, fromDashboard.order);
export const getOrders = createSelector(Dashboard, fromDashboard.orders);
export const getProductImages = createSelector(Dashboard, fromDashboard.productImages);
