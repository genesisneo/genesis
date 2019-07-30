import {
  combineReducers,
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

const { NODE_ENV } = process.env;
const isDev = NODE_ENV === 'development';

/* eslint-disable no-underscore-dangle */
const reduxDevTool = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const enhancedCompose = (isDev && reduxDevTool) ? reduxDevTool : false;
const composeEnhancers = enhancedCompose || compose;
/* eslint-enable no-underscore-dangle */

const rootReducers = combineReducers({
  genesis: reducers
});

const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
