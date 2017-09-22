
import * as actions from './../actions';


// state
export interface State {
  products: any;
  product: any;
  cart: any;
  loadingProduct: boolean;
}

 export const initialState: State = {
    products: null,
    product: null,
    cart: null,
    loadingProduct: false
};



// reducer
export function productReducer(state = initialState, action): State {
  switch (action.type) {

    case actions.LOAD_PRODUCTS_SUCESS: {
      return { ...state, products: action.payload }
    }

    case actions.LOADING_PRODUCT: {
        return { ...state, loadingProduct: true }
      }

    case actions.GET_PRODUCT_SUCESS: {
        return { ...state,
                    product: action.payload,
                    loadingProduct: false  }
      }

      case actions.GET_CART_SUCCESS:
      case actions.ADD_TO_CART_SUCCESS: {
        return { ...state,
                    cart: action.payload  }
      }

    default: {
      return state;
    }
  }
}

export const products = (state: State) => state.products;
export const product = (state: State) => state.product;
export const cart = (state: State) => state.cart;
export const productLoading = (state: State) => state.loadingProduct;
