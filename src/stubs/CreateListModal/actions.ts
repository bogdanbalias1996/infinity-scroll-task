import {CreateListFormState, CreateListResponse} from './types';

export const LIST_CREATE_REQUEST = 'LIST_CREATE_REQUEST';
export const LIST_CREATE_SUCCESS = 'LIST_CREATE_SUCCESS';
export const LIST_CREATE_ERROR = 'LIST_CREATE_ERROR';

export const listCreateRequest = (data: CreateListFormState) => ({
  type: LIST_CREATE_REQUEST,
  payload: data,
});
export const listCreateFulfilled = (newList: Record<string, any>) => ({
  type: LIST_CREATE_SUCCESS,
  payload: newList,
});
export const listCreateRejected = (err: CreateListResponse) => ({
  type: LIST_CREATE_ERROR,
  error: err,
});
