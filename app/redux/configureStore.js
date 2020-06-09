import {createStore, combineReducers} from 'redux';
import loginReducer from './loginReducer';
const rootReducer = combineReducers({account: loginReducer});
const configureStore = () => {
  return createStore(rootReducer);
};
export default configureStore;
