import {Action} from '@ngrx/store';

export const LOAD_USER_ACTION = 'LOAD_USER__ACTION';
export const STORE_USER_ACTION = 'STORE_USER_ACTION';

export const STORE_ACTION = 'STORE_ACTION';

export const LOAD_PAYMENT = 'LOAD_PAYMENT';
export const LOAD_PAYMENT_SUCCESS = 'LOAD_PAYMENT Sucess';
export const LOAD_PAYMENT_FAIL = 'LOAD_PAYMENT Fail';

export const MAKE_ORDER = 'Make Order';
export const MAKE_ORDER_SUCCESS = 'Make Order Success';
export const MAKE_ORDER_FAIL = 'Make Order Fail';

export const LOAD_PRODUCT = 'LOAD Product';
export const LOAD_PRODUCT_SUCESS = 'LOAD Product Sucess';

export const LOAD_PRODUCTS = 'LOAD Products';
export const LOAD_PRODUCTS_SUCESS = 'LOAD Products Sucess';

export const LOAD_PRODUCTS_SEARCH = 'LOAD Products Search';
export const LOAD_PRODUCTS_SEARCH_SUCESS = 'LOAD Products Search Sucess';

export const GET_PRODUCT = 'GET Product';
export const GET_PRODUCT_SUCESS = 'GET Product Sucess';

export const ADD_TO_CART = 'ADD to Cart';
export const ADD_TO_CART_SUCCESS = 'ADD to Cart Success';

export const GET_CART = 'Get Cart';
export const GET_CART_SUCCESS = 'Get Cart Success'

export const REMOVE_FROM_CART = 'Remove from Cart';

export const ADD_PRODUCT_IMAGE = 'Add Product Image';
export const REMOVE_PRODUCT_IMAGE = 'Remove Product Image';

export const ADD_PRODUCT = 'Add Product';
export const REMOVE_PRODUCT = 'Remove Product';
export const EDIT_PRODUCT = 'Edit Product';

export const FILTER_PRICE = 'Filter Price';

export const LOAD_ORDERS = 'Load Orders';
export const LOAD_ORDERS_SUCCESS = 'Load Orders Success';

export const LOAD_ORDER = 'Load Order';
export const LOAD_ORDER_SUCCESS = 'Load Order Success';

export const LOAD_USER_ORDERS = 'Load User Orders';
export const LOAD_USER_ORDERS_SUCCESS = 'Load User Orders Success';

export const UPDATE_ORDER = 'Update Order';


export class AddProduct implements Action {
    readonly type = ADD_PRODUCT;
    constructor(public payload: any ) {
    }
}

export class EditProduct implements Action {
    readonly type = EDIT_PRODUCT;
    constructor(public payload: any ) {
    }
}


export class RemoveProduct implements Action {
    readonly type = REMOVE_PRODUCT;
    constructor(public payload: any ) {
    }
}


export class AddProductImage implements Action {
    readonly type = ADD_PRODUCT_IMAGE;
    constructor(public payload: any ) {
    }
}

export class RemoveProductImage implements Action {
    readonly type = REMOVE_PRODUCT_IMAGE;
    constructor(public payload: any ) {
    }
}


export class AddToCart implements Action {
    readonly type = ADD_TO_CART;
    constructor(public payload: any ) {
    }
}

export class RemoveFromCart implements Action {
    readonly type = REMOVE_FROM_CART;
    constructor(public payload: any ) {
    }
}

export class GetCart implements Action {
    readonly type = GET_CART;
}

export class GetCartSuccess implements Action {
    readonly type = GET_CART_SUCCESS;
    constructor(public payload: any ) {
    }
}


export class AddToCartSuccess implements Action {
    readonly type = ADD_TO_CART_SUCCESS;
    constructor(public payload: any ) {
    }
}

export class LoadUserAction implements Action {
    readonly type = LOAD_USER_ACTION;
}

export class StoreUserAction implements Action {
    readonly type = STORE_USER_ACTION;
     constructor(public payload: any ) {
     }
}

export class LoadPayment implements Action {
        readonly type = LOAD_PAYMENT;
         constructor(public payload: any ) {
    }
}

export class LoadPaymentSuccess implements Action {
    readonly type = LOAD_PAYMENT_SUCCESS;
     constructor(public payload: any ) {
    }
}


export class MakeOrder implements Action {
  readonly type = MAKE_ORDER;
   constructor(public payload: any ) {
  }
}

export class MakeOrderSuccess implements Action {
  readonly type = MAKE_ORDER_SUCCESS;
    constructor(public payload: any ) {
  }
}


export class LoadProducts implements Action {
    readonly type = LOAD_PRODUCTS;
     constructor() {
    }
}

export class LoadProductsSuccess implements Action {
    readonly type = LOAD_PRODUCTS_SUCESS;
     constructor(public payload: any) {
    }
}


export class LoadProductsSearch implements Action {
  readonly type = LOAD_PRODUCTS_SEARCH;
   constructor(public payload: any) {
  }
}

export class LoadProductsSearchSuccess implements Action {
  readonly type = LOAD_PRODUCTS_SEARCH_SUCESS;
   constructor(public payload: any) {
  }
}


export class GetProduct implements Action {
    readonly type = GET_PRODUCT;
     constructor(public payload: any) {
    }
}

export class GetProductSuccess implements Action {
    readonly type = GET_PRODUCT_SUCESS;
     constructor(public payload: any) {
    }
}

export class LoadPaymentFail implements Action {
    readonly type = LOAD_PAYMENT_FAIL;
     constructor(public payload: any ) {
    }
}


export class StoreAction implements Action {
    readonly type = STORE_ACTION;
     constructor(public payload: any ) {
    }
  }

export class FilterPrice implements Action {
    readonly type = FILTER_PRICE;
      constructor(public payload: any ) {
    }
}


export class LoadOrders implements Action {
  readonly type = LOAD_ORDERS;
   constructor() {
  }
}

export class LoadOrdersSuccess implements Action {
  readonly type = LOAD_ORDERS_SUCCESS;
   constructor(public payload: any) {
  }
}

export class LoadOrder implements Action {
  readonly type = LOAD_ORDER;
   constructor(public payload: any) {
  }
}

export class LoadOrderSuccess implements Action {
  readonly type = LOAD_ORDER_SUCCESS;
   constructor(public payload: any) {
  }
}

export class UpdateOrder implements Action {
  readonly type = UPDATE_ORDER;
   constructor(public payload: any) {
  }
}

export class LoadUserOrders implements Action {
  readonly type = LOAD_USER_ORDERS;
   constructor(public payload: any) {
  }
}

export class LoadUserOrdersSuccess implements Action {
  readonly type = LOAD_USER_ORDERS_SUCCESS;
   constructor(public payload: any) {
  }
}
