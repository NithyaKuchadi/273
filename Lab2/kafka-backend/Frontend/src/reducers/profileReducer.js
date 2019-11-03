import {GET_PROFILE_BUYERDETAILS,GET_PASTORDERS, GET_UPCOMINGORDERS,GET_PROFILE_OWNERDETAILS,UPDATE_BUYERPROFILE,UPDATE_OWNERPROFILE} from '../actions/types';
const initialState = {
}

export default function(state = initialState, action){
  switch(action.type){
      case GET_PROFILE_BUYERDETAILS: 
          return {
              ...state,
             buyerProfileDetails: action.payload
          }
      case GET_PASTORDERS: 
          return {
              ...state,
              getPastOrders:action.payload
          }
      case GET_UPCOMINGORDERS: 
          return {
              ...state,
              getUpcomingOrders: action.payload
          }
      case GET_PROFILE_OWNERDETAILS: 
          return {
              ...state,
            ownerProfileDetails: action.payload
          }  
          case UPDATE_BUYERPROFILE: 
          return {
              ...state,
              buyerProfileDetails: action.payload
          }   
          case UPDATE_OWNERPROFILE: 
          return {
              ...state,
              ownerProfileDetails: action.payload
          }   
      default: 
          return state;
  }
}