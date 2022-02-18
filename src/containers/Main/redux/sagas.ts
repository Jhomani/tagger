import request, {
  getOptions
} from '@utils/request';
import {
  call,
  takeLatest
} from 'redux-saga/effects';
import {
  INITIAL_REQUEST_MAIN_START
} from './constants';

export function* initialRequestMain() {
  let url, options;
  try {
    url = `${process.env.BACK_URL}/roles`;
    options = yield getOptions();
    const roles = yield call(request, url, options);
    // const role = roles.filter(item => item.typeUser === 'UAS')
    console.log(roles);

    // yield put(initialRequestMainSuccess({ role: role[0].id }));
  } catch (err) {
    console.log(err);
  }
}

export function* mainSaga() {
  yield takeLatest(INITIAL_REQUEST_MAIN_START, initialRequestMain);
}

export default mainSaga;
