import {
  GET_PORTFOLIO,
  GET_PROJECT,
  GET_PROFILE,
} from './types';

const initialState = {
  portfolio: [],
  project: {},
  profile: {}
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PORTFOLIO:
      return {
        ...state,
        portfolio: payload
      };

    case GET_PROJECT:
      return {
        ...state,
        project: payload
      };

    case GET_PROFILE:
      return {
        ...state,
        profile: payload
      };

    default:
      return state;
  }
};
