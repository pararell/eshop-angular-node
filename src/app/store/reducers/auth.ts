
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
      return { ...state, user: Object.keys(action.payload).length ? action.payload : null }
    }

    default: {
      return state;
    }
  }
}

export const user = (state: State) => state.user;
