
import * as actions from './../actions';


// state
export interface State {
  date: { id: number; title: string; day: number; month: number; year: number};
  user: any;
}

 export const initialState: State = {
    date: { id: 0, title: '', day: 0, month: 0, year: 0},
    user: null
};



// reducer
export function appReducer(state = initialState, action): State {
  switch (action.type) {
    case 'ADD_DAY': {
      return  {...state,
        date: action.payload
     }
    }

    case actions.STORE_USER_ACTION: {
      return { ...state, user: Object.keys(action.payload).length ? action.payload : null }
    }


    default: {
      return state;
    }
  }
}

export const user = (state: State) => state.user;
