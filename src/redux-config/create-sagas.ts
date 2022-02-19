import global from '@main/redux/sagas';
import tags from '@redux/sagas/tags';
import {
  all
} from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([
    tags(),
    global()
  ]);
}
