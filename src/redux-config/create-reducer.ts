import global from '@main/redux/reducer';
import app from '@redux/reducers/app';
import tags from '@redux/reducers/tags';
import {
  combineReducers
} from 'redux';

export default function createReducer(asyncReducers?) {
  return combineReducers({
    tags,
    app,
    global,
    ...asyncReducers
  });
}
