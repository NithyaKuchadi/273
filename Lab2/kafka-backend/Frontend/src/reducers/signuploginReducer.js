import {SIGNUP_BUYER, SIGNUP_OWNER, LOGIN_BUYER, LOGIN_OWNER} from '../actions/types';
const initialState = {
  redirect : false,
  loginSuccess:false
}

export default function(state = initialState, action){
  switch(action.type){
      case SIGNUP_OWNER: 
          return {
              ...state,
              redirect : action.redirect
          }
      case LOGIN_OWNER: 
          return {
              ...state,
              OwnerloginSuccess : action.OwnerloginSuccess
          }
      case SIGNUP_BUYER: 
          return {
              ...state,
              redirect : action.redirect
          }
      case LOGIN_BUYER: 
          return {
              ...state,
              loginSuccess : action.loginSuccess
          }
      default: 
          return state;
  }
}