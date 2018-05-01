
import * as actions from './../actions';


export interface State {
  user: any;
}

 export const initialState: State = {
    user: null
};


export function appReducer(state = initialState, action): State {
  switch (action.type) {

    case actions.STORE_USER_ACTION: {
      return { ...state, user: action.payload };
    }

    case actions.ADD_PRODUCT_IMAGES_URL_SUCCESS: {
      return { ...state, user: action.payload.admin ? action.payload : state.user };
    }

    case actions.REMOVE_PRODUCT_IMAGE_SUCCESS: {
      return { ...state, user: action.payload.admin ? action.payload : state.user };
    }

    case actions.ADD_PRODUCT_IMAGE: {
      return {...state, user: { ...state.user, images: action.payload } };
    }

    default: {
      return state;
    }
  }
}

export const user = (state: State) => state.user;
