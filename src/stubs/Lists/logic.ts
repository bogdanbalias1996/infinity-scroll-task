import {createLogic} from 'redux-logic';

import {
  LIST_FETCH_REQUEST,
  listFetchFulfilled,
  listFetchRejected,
} from './actions';
import {API_KEY, SESSION_ID} from '../../constants';

export const listFetchRequestLogic = createLogic({
  type: LIST_FETCH_REQUEST,
  latest: true,

  async process({httpClient, action}, dispatch, done) {
    const page = action.payload;

    try {
      const list = await httpClient
        .get(
          `account/8487708/lists?page=${page}&session_id=${SESSION_ID}&api_key=${API_KEY}`,
        )
        .then(resp => resp.data.results);

      dispatch(listFetchFulfilled(list, page));
    } catch (err) {
      console.error(err);
      dispatch(listFetchRejected(err));
    }
    done();
  },
});

export default [listFetchRequestLogic];
