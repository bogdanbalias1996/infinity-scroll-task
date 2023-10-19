import {
  LIST_CREATE_REQUEST,
  LIST_CREATE_SUCCESS,
  LIST_CREATE_ERROR,
} from './actions';
import {CreateListResponse} from './types';

export const selectors = {
  newList: state => state.newList,
  listCreating: state => state.listCreating,
};

const initialState = {
  newList: null,
  listCreating: false,
  error: null,
};

export default function reducer(
  state = initialState,
  action: {
    type: string;
    payload: CreateListResponse;
    error: CreateListResponse;
  },
) {
  switch (action.type) {
    case LIST_CREATE_REQUEST:
      return {
        ...state,
        listCreating: true,
      };
    case LIST_CREATE_SUCCESS:
      return {
        ...state,
        newList: action.payload,
        listCreating: false,
      };
    case LIST_CREATE_ERROR:
      return {
        ...state,
        listCreating: false,
        error: action.error,
      };
    default:
      return state;
  }
}
