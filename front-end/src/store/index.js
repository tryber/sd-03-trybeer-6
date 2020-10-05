import {
  applyMiddleware,
  createStore,
  compose,
} from 'redux';
import thunk from 'redux-thunk';
import productsReducer from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  productsReducer,
  composeEnhancers(applyMiddleware(thunk)),
);

export default store;
