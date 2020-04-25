import initialState from './initialState';
import {
  GET_PORTFOLIO,
  GET_PROJECT,
  GET_PROFILE,
  GET_PORTFOLIO_BY_TAGS,
  GET_PORTFOLIO_BY_TECHNOLOGY,
} from './types';

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PORTFOLIO:
    case GET_PORTFOLIO_BY_TAGS:
    case GET_PORTFOLIO_BY_TECHNOLOGY:
      return {
        ...state,
        portfolio: payload,
      };

    case GET_PROJECT:
      return {
        ...state,
        project: payload,
      };

    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
      };

    default:
      return state;
  }
};

export default reducer;
