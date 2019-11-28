import { combineReducers } from 'redux';
import signuploginReducer  from './signuploginReducer';
import profileReducer from './profileReducer';
import messageReducer from './messageReducer';
import imageReducer from './imageReducer';
export default combineReducers(
{
signin: signuploginReducer,
profile: profileReducer,
inbox:messageReducer,
image:imageReducer

}
);