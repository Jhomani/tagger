import React from 'react';
import middlewareRouterToken from '../redux-config/authMiddlewareRouter';
import configureStore from '../redux-config/configure-store';
import {
  getCookieName, getHostname
} from './global';
import {
  saveState
} from './persist-store';

const isServer = typeof window === 'undefined';

export function getOrCreateStore(initialState = {}) {
  if (isServer) return configureStore(initialState);

  const NEXT_REDUX_STORE = getCookieName(window.location.host, 'storage');
  console.log(NEXT_REDUX_STORE, 'this is name...');

  if (!window[NEXT_REDUX_STORE])
    window[NEXT_REDUX_STORE] = configureStore(initialState);

  return window[NEXT_REDUX_STORE];
}

export const defaultValueStorage = async (ctx, hostname) => {
  const cookieName = getCookieName(hostname, 'storage');
  console.log(cookieName);

  return {};
};

const withReduxStore = (App) => {
  const Redux = (props) => {
    // eslint-disable-next-line react/prop-types
    const reduxStore = getOrCreateStore(props.initialReduxState);

    if (!isServer) {
      reduxStore.subscribe(
        () => {
          setTimeout(() => {
            saveState(props.hostname, {});
          }, 200);
        }
      );
    }

    return <App {...props} reduxStore={reduxStore} />;
  };

  Redux.getInitialProps = async (appContext) => {
    const {ctx, Component} = appContext;
    const hostname = getHostname(ctx.req, true);

    const reduxStore = getOrCreateStore(await defaultValueStorage(ctx, hostname));

    ctx.reduxStore = reduxStore;
    middlewareRouterToken(ctx);

    return {
      pageProps: Component.getInitialProps ? await Component.getInitialProps(ctx) : {},
      initialReduxState: reduxStore.getState(),
      hostname
    };
  };

  return Redux;
};

export default withReduxStore;
