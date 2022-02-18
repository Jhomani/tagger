import {
  HIDE_LOADER_AUTH, LOGIN_GOOGLE_SUCCESS, LOGIN_REQUEST_SUCCESS,
  LOGOUT_REQUEST_SUCCESS, SHOW_LOADER_AUTH
} from '../constants/auth';

export const INIT_STATE = {
  userToken: '',
  dateLogin: '',
  userType: '',
  loader: false,
  dataUser: {}
};

export type InAuthRed = typeof INIT_STATE;

export default function auth(state = INIT_STATE, action) {
  let resp = state;

  switch (action.type) {
    case LOGIN_REQUEST_SUCCESS: {
      const {dataUser, ...firstGrade} = action.payload;

      resp = {
        ...state,
        ...firstGrade,
        dataUser: {
...state.dataUser, ...dataUser
}
      }; break;
    } case LOGIN_GOOGLE_SUCCESS: {

      resp = {
        ...state,
        dataUser: {
...state.dataUser, ...action.payload
}
      }; break;
    }
    case SHOW_LOADER_AUTH: {

      resp = {
        ...state,
        loader: true
      }; break;
    }
    case HIDE_LOADER_AUTH: {
      resp = {
        ...state,
        loader: false
      }; break;

    }
    case LOGOUT_REQUEST_SUCCESS: {
      resp = INIT_STATE; break;
    }
  }

  return resp;
}
