import {
  all, call, put, takeLatest
} from 'redux-saga/effects';
import {TagsService} from 'src/services';
import {
  getCurrentBanner,
  getTagsSave,
  saveCurrentBanner
} from '../actions/tags';
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
  const service = new TagsService();
  const {resolve, reject, del, ...others} = arg.payload;

  try {
    if (del)
      yield service.deleteBannerTag(others);
    else
      yield service.addBannerTag(others);

    yield put(getCurrentBanner({reject, resolve}));
  } catch (err) {
    console.log(err.message);
    yield call(reject, 'Ops, tenemos problems.');
  }
}

export default function* signInSaga() {
  yield takeLatest(GET_TAGS_START, getAvailableTags);
  yield takeLatest(GET_IMAGE_SINGLE_START, getBannerSaga);
  yield takeLatest(DEL_IMAGE_TAG, addDelImageTag);
  yield takeLatest(ADD_IMAGE_TAG, addDelImageTag);
}
