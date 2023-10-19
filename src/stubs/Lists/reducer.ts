import {MovieList} from './types';

import {
  LIST_FETCH_REQUEST,
  LIST_FETCH_SUCCESS,
  LIST_FETCH_ERROR,
} from './actions';

export const selectors = {
  list: state => state.list,
  listFetching: state => state.listFetching,
  isListEnd: state => state.isListEnd,
};

const initialState = {
  list: [],
  listFetching: false,
  isListEnd: false,
  error: false,
};

export default function reducer(
  state = initialState,
  action: {
    type: string;
    payload: {list: Array<MovieList>; page: number};
    error: boolean;
  },
) {
  switch (action.type) {
    case LIST_FETCH_REQUEST:
      return {
        ...state,
        listFetching: true,
      };
    case LIST_FETCH_SUCCESS:
      return {
        ...state,
        list:
          action.payload.page === 1
            ? action.payload.list
            : [...state.list, ...action.payload.list],
        listFetching: false,
        isListEnd: action.payload.list.length === 0 && true,
      };
    case LIST_FETCH_ERROR:
      return {
        ...state,
        listFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
}
