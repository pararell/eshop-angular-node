
import * as actions from './../actions';


export interface State {
  products: any;
  categories: Array<string>;
  pagination: {
    page: number;
    pages: number;
    limit: number;
    total: number;
  };
  product: any;
  loadingProduct: boolean;
  cart: any;
  userOrders: null;
  order: any;
  productsTitles: Array<string>;
  priceFilter: number;
  position: any;
}

export const initialState: State = {
  products: null,
  categories: [],
  pagination: {
    page: 1,
    pages: 1,
    limit: 10,
    total: 0
  },
  product: null,
  loadingProduct: false,
  cart: null,
  userOrders: null,
  order: null,
  productsTitles: [],
  priceFilter: Infinity,
  position: null
};



export function productReducer(state = initialState, action): State {
  switch (action.type) {

    case actions.LOAD_PRODUCTS_SUCESS: {
      return { ...state,
                  products: action.payload.products,
                  pagination: action.payload.pagination }
    }

    case actions.LOAD_CATEGORY_PRODUCTS_SUCESS: {
      return { ...state,
                  products: action.payload.products }
    }

    case actions.LOAD_CATEGORIES_SUCESS: {
      return { ...state,
                  categories: action.payload }
    }


    case actions.GET_PRODUCT: {
      return { ...state,
                  loadingProduct: true  }
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
                 cart: action.payload.cart
                }

    case actions.MAKE_ORDER_SUCCESS:
          return {...state,
                    order: action.payload.order,
                    cart: action.payload.cart
                  }

    case actions.FILTER_PRICE:
      return {...state, priceFilter: action.payload };

    case actions.LOAD_USER_ORDERS_SUCCESS: {
      return { ...state, userOrders: action.payload } }

    case actions.UPDATE_POSITION: {
      return { ...state, position: action.payload } }


    default: {
      return state;
    }
  }
}

export const products = (state: State) => state.products;
export const categories = (state: State) => state.categories;
export const pagination = (state: State) => state.pagination;
export const product = (state: State) => state.product;
export const cart = (state: State) => state.cart;
export const productLoading = (state: State) => state.loadingProduct;
export const userOrders = (state: State) => state.userOrders;
export const order = (state: State) => state.order;
export const productsTitles = (state: State) => state.productsTitles;
export const priceFilter = (state: State) => state.priceFilter;

export const position = (state: State) => state.position;
