import { createStore, applyMiddleware } from 'redux';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';

const bindMiddleware = (middleware) => (
  process.env.NODE_ENV !== 'production'
    ? composeWithDevTools(applyMiddleware(...middleware))
    : applyMiddleware(...middleware)
);

const storeReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    return nextState;
  }
  return reducers(state, action);
};

const initStore = () => createStore(storeReducer, bindMiddleware([reduxThunk]));

export const wrapper = createWrapper(initStore);

export default wrapper;
