import {Alert} from 'react-native';
import {createLogic} from 'redux-logic';

import {
  LIST_CREATE_REQUEST,
  listCreateFulfilled,
  listCreateRejected,
} from './actions';
import {goBack} from '../../RootNavigation';
import {API_KEY, SESSION_ID} from '../../constants';
import {listFetchRequest} from '../Lists/actions';

export const listCreateRequestLogic = createLogic({
  type: LIST_CREATE_REQUEST,
  latest: true,

  async process({httpClient, action}, dispatch, done) {
    const data = action.payload;

    try {
      const newList = await httpClient
        .post(
          `https://api.themoviedb.org/3/list?session_id=${SESSION_ID}&api_key=${API_KEY}`,
          data,
        )
        .then(resp => resp.data);

      dispatch(listCreateFulfilled(newList));
      dispatch(listFetchRequest(1));
      Alert.alert('List Creation', 'Success', [{text: 'OK', onPress: goBack}]);
    } catch (err) {
      console.error(err);
      dispatch(listCreateRejected(err.response.data.status_message));
      Alert.alert('List Creation', 'Failed', [{text: 'OK'}]);
    }
    done();
  },
});

export default [listCreateRequestLogic];
