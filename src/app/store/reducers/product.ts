
import * as actions from './../actions';


export interface State {
  products: any;
  categories: { categories: Array<string>, tags: Array<string> };
  product: any;
  cart: any;
  loadingProduct: boolean;
  order: any;
  productImages: Array<string>;
  productsTitles: Array<string>;
}

export const initialState: State = {
  products: null,
  categories: { categories: [], tags: [] },
  product: null,
  cart: null,
  loadingProduct: false,
  order: null,
  productImages: [],
  productsTitles: []
};



export function productReducer(state = initialState, action): State {
  switch (action.type) {

    case actions.LOAD_PRODUCTS_SUCESS: {
      return { ...state,
                  products: action.payload.products,
                  categories: action.payload.categories }
    }

    case actions.LOADING_PRODUCT: {
        return { ...state, loadingProduct: true }
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
export const order = (state: State) => state.order;
export const productImages = (state: State) => state.productImages;
export const productsTitles = (state: State) => state.productsTitles;
