import {MovieList} from './types';

export const LIST_FETCH_REQUEST = 'LIST_FETCH_REQUEST';
export const LIST_FETCH_SUCCESS = 'LIST_FETCH_SUCCESS';
export const LIST_FETCH_ERROR = 'LIST_FETCH_ERROR';

export const listFetchRequest = (page: number) => ({
  type: LIST_FETCH_REQUEST,
  payload: page,
});
export const listFetchFulfilled = (list: Array<MovieList>, page: number) => ({
  type: LIST_FETCH_SUCCESS,
  payload: {list, page},
});
export const listFetchRejected = (err: string) => ({
  type: LIST_FETCH_ERROR,
  payload: err,
  error: true,
});
