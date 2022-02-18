import {
addCookies
} from '../redux-config/cookiesMiddleware';
import {
getCookieName
} from './global';

export const saveState = (hostname: string, state = {}) => {
  try {
    const serializedState = JSON.stringify(state);
    const cookieName = getCookieName(hostname, 'storage');

    addCookies(cookieName, serializedState);
  } catch (err) {
    console.log('Error saving to Cookies', err);
  }
};
