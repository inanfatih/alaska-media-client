import {
  GET_CONTENT,
  CONTENT_ERROR,
  // SET_DATAPATH,
  DELETE_CONTENT,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    // case SET_DATAPATH:
    //   return {
    //     ...state,
    //     dataPath: action.payload,
    //   };
    case GET_CONTENT:
      return {
        ...state,
        content: action.payload,
        loading: false,
      };
    case CONTENT_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case DELETE_CONTENT:
      return {
        ...state,
        content: action.payload,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
