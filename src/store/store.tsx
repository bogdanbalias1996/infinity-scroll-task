import {
  applyMiddleware,
  compose,
  legacy_createStore as createStore,
} from 'redux';
import {createLogicMiddleware} from 'redux-logic';
import axios from 'axios';

import logic from '../rootLogic';
import rootReducer from '../rootReducer';
import {Alert} from 'react-native';

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    Alert.alert('Oops, something went wrong, try again');
    return Promise.reject(error);
  },
);

const deps = {
  httpClient: axios,
};

const composeEnhancers =
  //@ts-ignore
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ as typeof compose) || compose;
const logicMiddleware = createLogicMiddleware(logic, deps);

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(logicMiddleware)),
);

export default store;
