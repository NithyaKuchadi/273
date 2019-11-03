import { GET_EMAIL_LIST, NEW_MESSAGE, INBOX_MESSAGES } from '../actions/types';

const initialState = {
    emailList: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_EMAIL_LIST:
            return {
                ...state,
                emailList: action.payload,
            }
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