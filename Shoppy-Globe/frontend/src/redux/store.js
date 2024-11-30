
import { createStore, combineReducers, applyMiddleware } from 'redux';
import cartReducer from './cart/cartReducer';
import {thunk} from 'redux-thunk';
const rootReducer = combineReducers({
  cart: cartReducer,
});

const store = createStore(rootReducer,  applyMiddleware(thunk));

export default store;
