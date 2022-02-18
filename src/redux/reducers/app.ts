import {
  DEFAULT_VALUES,
  SET_PATH_NAME,
  SWITCH_LANGUAGE,
  SWITCH_MODE,
  TOGGLE_COLLAPSED_NAV,
  WINDOW_WIDTH
} from '../constants/app';

const initialApp = {
  navCollapsed: true,
  pathname: '',
  width: 1367,
  locale: 'EN',
  mode: 'light'
};

export type InAppState = typeof initialApp;

const app = (state = initialApp, action) => {
  let resp = state;

  switch (action.type) {
    case TOGGLE_COLLAPSED_NAV: {
      resp = {
        ...state,
        navCollapsed: action.navCollapsed
      }; break;
    }
    case SET_PATH_NAME: {
      console.log(action);
      resp = {
        ...state,
        pathname: action.pathname
      }; break;
    }
    case WINDOW_WIDTH: {
      resp = {
        ...state,
        width: action.width
      }; break;
    } case SWITCH_MODE: {
      resp = {
        ...state,
        mode: action.mode
      }; break;
    } case SWITCH_LANGUAGE: {
      resp = {
        ...state,
        locale: action.locale
      }; break;
    } case DEFAULT_VALUES: {
      resp = {
        ...state,
        ...action.payload
      }; break;
    }
  }

  return resp;
};

export default app;
