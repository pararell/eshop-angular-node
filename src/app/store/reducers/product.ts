
import * as actions from './../actions';


export interface State {
  products: any;
  categories: { categories: Array<string>, tags: Array<string> };
  product: any;
  cart: any;
  loadingProduct: boolean;
  orders: null;
  userOrders: null;
  order: any;
  orderId: any;
  productImages: Array<string>;
  productsTitles: Array<string>;
  priceFilter: number;
}

export const initialState: State = {
  products: null,
  categories: { categories: [], tags: [] },
  product: null,
  cart: null,
  loadingProduct: false,
  orders: null,
  userOrders: null,
  orderId: null,
  order: null,
  productImages: [],
  productsTitles: [],
  priceFilter: Infinity
};



export function productReducer(state = initialState, action): State {
  switch (action.type) {

    case actions.LOAD_PRODUCTS_SUCESS: {
      return { ...state,
                  products: action.payload.products,
                  categories: action.payload.categories }
    }

    case actions.ADD_PRODUCT_IMAGE: {
      return { ...state, productImages: action.payload }
    }

    case actions.GET_PRODUCT_SUCESS: {
        return { ...state,
                    product: action.payload,
                    loadingProduct: false  }
      }

    case actions.LOAD_PRODUCTS_SEARCH_SUCESS: {
        return { ...state, productsTitles: action.payload }
      }

    case actions.GET_CART_SUCCESS:
    case actions.ADD_TO_CART_SUCCESS: {
        return { ...state,
                    cart: action.payload  }
      }

    case actions.LOAD_PAYMENT_SUCCESS:
      return {...state,
                 order: action.payload.order,
                 cart: action.payload.cart }

    case actions.FILTER_PRICE:
      return {...state, priceFilter: action.payload };


    case actions.LOAD_ORDERS_SUCCESS: {
        return { ...state, orders: action.payload } }

    case actions.LOAD_ORDER_SUCCESS: {
      return { ...state, orderId: action.payload }}

    case actions.LOAD_USER_ORDERS_SUCCESS: {
      return { ...state, userOrders: action.payload } }


    default: {
      return state;
    }
  }
}

export const products = (state: State) => state.products;
export const categories = (state: State) => state.categories;
export const product = (state: State) => state.product;
export const cart = (state: State) => state.cart;
export const productLoading = (state: State) => state.loadingProduct;
export const orders = (state: State) => state.orders;
export const userOrders = (state: State) => state.userOrders;
export const orderId = (state: State) => state.orderId;
export const order = (state: State) => state.order;
export const productImages = (state: State) => state.productImages;
export const productsTitles = (state: State) => state.productsTitles;
export const priceFilter = (state: State) => state.priceFilter;
