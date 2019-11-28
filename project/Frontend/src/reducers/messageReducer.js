import {  NEW_MESSAGE, INBOX_MESSAGES } from '../actions/types';

const initialState = {
 
}

export default function (state = initialState, action) {
    switch (action.type) {
        case NEW_MESSAGE:
            return {
                ...state,
                payload: action.payload,
            }
        case INBOX_MESSAGES:
            return {
                ...state,
                msgs: action.payload,
            }
        default:
            return state;
    }
}