// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import {
  applyMiddleware, compose, createStore
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {
  routinePromiseWatcherSaga
} from 'redux-saga-routines';
import {
  DAEMON
} from './constants';
import createReducer from './create-reducer';
import createSagas from './create-sagas';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}) {
  const middlewares = [sagaMiddleware];

  const enhancers = [applyMiddleware(...middlewares)];

  const composeEnhancers =
    process.env.NODE_ENV !== 'production' && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({shouldHotReload: false})
      : compose;

  const store = createStore(
    createReducer(),
    initialState,
    composeEnhancers(...enhancers)
  );

  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {};
  store.injectedSagas = {
    'initSagas': {
      mode: DAEMON,
      task: store.runSaga(createSagas)
    }
  };

  store.runSaga(routinePromiseWatcherSaga);

  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./create-reducer', () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }

  return store;
}
