import global from '@main/redux/reducer';
// import commonData from "@redux/reducers/common";
// import landingPage from "@redux/reducers/landingPage";
import app from '@redux/reducers/app';
import auth from '@redux/reducers/auth';
import {
combineReducers
} from 'redux';

export default function createReducer(asyncReducers?) {
  return combineReducers({
    auth,
    app,
    global,
    ...asyncReducers
  });
}
