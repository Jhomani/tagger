import request, {postOptions} from '@utils/request';
import {
  all, call, put, takeLatest
} from 'redux-saga/effects';
import {TagsService} from 'src/services';
import {getTagsSave, saveCurrentBanner} from '../actions/tags';
import {
  ADD_IMAGE_TAG,
  DEL_IMAGE_TAG,
  GET_IMAGE_SINGLE_START,
  GET_TAGS_START
} from '../constants/tags';

export function* getAvailableTags() {
  const service = new TagsService();

  try {
    const tags = yield service.getTags();

    yield put(getTagsSave(tags));
  } catch (err) {
    console.log(err.message);
  }
}

export function* getBannerSaga(arg) {
  const service = new TagsService();
  const {resolve, reject} = arg.payload;

  try {
    const banner = yield service.getBanner();

    yield all([
      put(saveCurrentBanner(banner)),
      call(resolve, 'Good, now you login to sistem.')
    ]);
  } catch (err) {
    console.log(err.message);
    yield call(reject, 'Ops, tenemos problems.');
  }
}

export function* addDelImageTag(arg) {
  let url, options, msg;
  const {res, rej, ...other} = arg.payload;

  try {

    url = `${process.env.BACK_URL}/users/reset-password`;
    options = yield postOptions(other);
    const {token} = yield call(request, url, options);

    msg = 'We send a code to your email';
    yield call(res, {
      msg,
      current: 'code',
      token
    });
  } catch (err) {

    if (err.message == '500') console.log('Server Error');
    else msg = err.message;
    yield call(rej, msg);
  }
}

export default function* signInSaga() {
  yield takeLatest(GET_TAGS_START, getAvailableTags);
  yield takeLatest(GET_IMAGE_SINGLE_START, getBannerSaga);
  yield takeLatest(DEL_IMAGE_TAG, addDelImageTag);
  yield takeLatest(ADD_IMAGE_TAG, addDelImageTag);
}
