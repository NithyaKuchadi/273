import { combineReducers } from 'redux';
import signuploginReducer  from './signuploginReducer';
import buyerReducer from './buyerReducer';
import ownerReducer from './ownerReducer';
import profileReducer from './profileReducer';
import inboxReducer from './inboxReducer';
export default combineReducers(
{
signin: signuploginReducer,
buyer:buyerReducer,
owner:ownerReducer,
profile:profileReducer,
inbox:inboxReducer
}
);