import {
InPayment
} from 'src/services';
import {
INITIAL_REQUEST_MAIN_SUCCESS
} from './constants';

interface InMainResources {
  roleUser: string,
  products: InPayment[]
}

const initialStateMain: InMainResources = {
  roleUser: '',
  products: []
};

export function mainReducer(state = initialStateMain, action) {
  let resp = state;

  switch (action.type) {
    case INITIAL_REQUEST_MAIN_SUCCESS: {
      const {role} = action.payload ?? {};

      resp = {
...state, roleUser: role
}; break;
    }
  }

  return resp;
}

export default mainReducer;
