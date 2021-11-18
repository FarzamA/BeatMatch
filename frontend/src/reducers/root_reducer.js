import { combineReducers } from 'redux';
import session from './session_reducer';
import errors from './errors_reducer';
import entitiesReducer from './entities_reducer';
import modalsReducer from './modals_reducer';

const RootReducer = combineReducers({
  entities: entitiesReducer,
  session,
  errors,
  modals: modalsReducer
});

export default RootReducer;