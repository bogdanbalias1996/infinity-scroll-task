import {
  applyMiddleware,
  compose,
  legacy_createStore as createStore,
} from 'redux';
import {createLogicMiddleware} from 'redux-logic';

import {api} from '../api';
import logic from '../rootLogic';
import rootReducer from '../rootReducer';

const deps = {
  httpClient: api,
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
