import {
  GET_IMAGE_SINGLE_SAVE,
  GET_TAGS_SAVE
} from '../constants/tags';

export const INIT_STATE: InTags = {
  tags: [],
  banner: {}
};

export default function tags(state = INIT_STATE, action) {
  let resp = state;

  switch (action.type) {
    case GET_IMAGE_SINGLE_SAVE: {
      resp = {
        ...state,
        banner: action.payload
      }; break;
    } case GET_TAGS_SAVE: {

      resp = {
        ...state,
        tags: action.payload
      }; break;
    }
  }

  return resp;
}
