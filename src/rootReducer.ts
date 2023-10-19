import {combineReducers} from 'redux';
import {reducer as listReducer} from './stubs/Lists';
import {reducer as createReducer} from './stubs/CreateListModal';

export default combineReducers({
  list: listReducer,
  create: createReducer,
});
