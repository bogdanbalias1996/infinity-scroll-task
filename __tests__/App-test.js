import 'react-native';
import React from 'react';
import {Provider} from 'react-redux';

import App from '../src/components/App';
import Stubs from '../src/stubs/Stubs';
import Lists from '../src/stubs/Lists';
import CreateListModal from '../src/stubs/CreateListModal';
import store from '../src/store/store';
import createReducer, {
  selectors as createSelectors,
} from '../src/stubs/CreateListModal/reducer';

import {it} from '@jest/globals';

import renderer from 'react-test-renderer';
import {
  LIST_CREATE_ERROR,
  LIST_CREATE_REQUEST,
  LIST_CREATE_SUCCESS,
} from '../src/stubs/CreateListModal/actions';

import reducer, {selectors} from '../src/stubs/Lists/reducer';
import {
  LIST_FETCH_REQUEST,
  LIST_FETCH_SUCCESS,
  LIST_FETCH_ERROR,
} from '../src/stubs/Lists/actions';

describe('Render Components', () => {
  it('renders App correctly', () => {
    renderer.create(<App />);
  });

  it('renders Stubs correctly', () => {
    renderer.create(<Stubs />);
  });

  it('renders Lists correctly', () => {
    renderer.create(
      <Provider store={store}>
        <Lists />
      </Provider>,
    );
  });

  it('renders CreateListModal correctly', () => {
    renderer.create(
      <Provider store={store}>
        <CreateListModal />
      </Provider>,
    );
  });
});

describe('Create List Reducer', () => {
  it('should handle LIST_CREATE_REQUEST', () => {
    const initialState = {
      newList: null,
      listCreating: false,
      error: null,
    };

    const action = {
      type: LIST_CREATE_REQUEST,
    };

    const newState = createReducer(initialState, action);

    expect(newState).toEqual({
      newList: null,
      listCreating: true,
      error: null,
    });
  });

  it('should handle LIST_CREATE_SUCCESS', () => {
    const initialState = {
      newList: null,
      listCreating: true,
      error: null,
    };

    const payload = {
      /* Define your payload data here */
    };

    const action = {
      type: LIST_CREATE_SUCCESS,
      payload,
    };

    const newState = createReducer(initialState, action);

    expect(newState).toEqual({
      newList: payload,
      listCreating: false,
      error: null,
    });
  });

  it('should handle LIST_CREATE_ERROR', () => {
    const initialState = {
      newList: {
        /* Initial newList data */
      },
      listCreating: true,
      error: null,
    };

    const error = {
      /* Define your error data here */
    };

    const action = {
      type: LIST_CREATE_ERROR,
      error,
    };

    const newState = createReducer(initialState, action);

    expect(newState).toEqual({
      newList: initialState.newList,
      listCreating: false,
      error,
    });
  });
});

describe('List Selectors', () => {
  it('should select newList', () => {
    const state = {
      newList: {
        /* Define newList data */
      },
      listCreating: false,
      error: null,
    };

    const selectedNewList = createSelectors.newList(state);

    expect(selectedNewList).toBe(state.newList);
  });

  it('should select listCreating', () => {
    const state = {
      newList: null,
      listCreating: true,
      error: null,
    };

    const selectedListCreating = createSelectors.listCreating(state);

    expect(selectedListCreating).toBe(state.listCreating);
  });
});

describe('List Reducer', () => {
  it('should handle LIST_FETCH_REQUEST', () => {
    const initialState = {
      list: [],
      listFetching: false,
      isListEnd: false,
      error: false,
    };

    const action = {
      type: LIST_FETCH_REQUEST,
    };

    const newState = reducer(initialState, action);

    expect(newState).toEqual({
      ...initialState,
      listFetching: true,
    });
  });

  it('should handle LIST_FETCH_SUCCESS with page 1', () => {
    const initialState = {
      list: [
        /* Initial list data */
      ],
      listFetching: true,
      isListEnd: false,
      error: false,
    };

    const payload = {
      list: [
        /* Define your list data here */
      ],
      page: 1,
    };

    const action = {
      type: LIST_FETCH_SUCCESS,
      payload,
    };

    const newState = reducer(initialState, action);

    expect(newState).toEqual({
      ...initialState,
      list: payload.list,
      listFetching: false,
      isListEnd: payload.list.length === 0 ? true : false,
    });
  });

  it('should handle LIST_FETCH_SUCCESS with a non-page 1', () => {
    const initialState = {
      list: [
        /* Initial list data */
      ],
      listFetching: true,
      isListEnd: false,
      error: false,
    };

    const payload = {
      list: [
        /* Define your list data for the non-page 1 case */
      ],
      page: 2, // A non-page 1
    };

    const action = {
      type: LIST_FETCH_SUCCESS,
      payload,
    };

    const newState = reducer(initialState, action);

    expect(newState).toEqual({
      ...initialState,
      list: [...initialState.list, ...payload.list],
      listFetching: false,
      isListEnd: false, // Should not be true for non-page 1
    });
  });

  it('should handle LIST_FETCH_SUCCESS with an empty list', () => {
    const initialState = {
      list: [
        /* Initial list data */
      ],
      listFetching: true,
      isListEnd: false,
      error: false,
    };

    const payload = {
      list: [], // An empty list
      page: 2, // A non-page 1
    };

    const action = {
      type: LIST_FETCH_SUCCESS,
      payload,
    };

    const newState = reducer(initialState, action);

    expect(newState).toEqual({
      ...initialState,
      listFetching: false,
      isListEnd: true, // Should be true for an empty list
    });
  });

  it('should handle LIST_FETCH_ERROR', () => {
    const initialState = {
      list: [
        /* Initial list data */
      ],
      listFetching: true,
      isListEnd: false,
      error: false,
    };

    const action = {
      type: LIST_FETCH_ERROR,
      error: true, // Define your error data here
    };

    const newState = reducer(initialState, action);

    expect(newState).toEqual({
      ...initialState,
      listFetching: false,
      error: action.error,
    });
  });
});

describe('List Selectors', () => {
  it('should select list', () => {
    const state = {
      list: [
        /* Define list data here */
      ],
      listFetching: false,
      isListEnd: false,
      error: false,
    };

    const selectedList = selectors.list(state);

    expect(selectedList).toBe(state.list);
  });

  it('should select listFetching', () => {
    const state = {
      list: [
        /* Initial list data */
      ],
      listFetching: true,
      isListEnd: false,
      error: false,
    };

    const selectedListFetching = selectors.listFetching(state);

    expect(selectedListFetching).toBe(state.listFetching);
  });

  it('should select isListEnd', () => {
    const state = {
      list: [
        /* Initial list data */
      ],
      listFetching: false,
      isListEnd: true, // Define your isListEnd value
      error: false,
    };

    const selectedIsListEnd = selectors.isListEnd(state);

    expect(selectedIsListEnd).toBe(state.isListEnd);
  });
});
