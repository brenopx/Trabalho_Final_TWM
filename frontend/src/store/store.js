import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {thunk} from 'redux-thunk';

import globalReducer from './global/reducer'
import produtosReducer from './produtos/reducer'
import checkoutReducer from './checkout/reducer'

const rootReducer = combineReducers({
    global: globalReducer,
    produtos: produtosReducer,
    checkout: checkoutReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));

export default store