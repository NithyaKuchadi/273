import  { GET_EMAIL_LIST, NEW_MESSAGE, INBOX_MESSAGES } from './types';
import axios from 'axios';
import { rooturl } from '../config/settings';

export const getEmailList = () => async (dispatch) => {
    let token = localStorage.getItem('token');
    var config = {
        headers: {
            'Authorization': "bearer "+token,
            'Content-Type': 'application/json'
        }
    };
    axios.defaults.withCredentials = true;
    await axios.post('http://'+rooturl+':5000/getemailList',config)
    .then(async (response) => {
        if (response.status === 200) {
            dispatch({
                type: GET_EMAIL_LIST,
                payload: response.data
            });
        }
    }
    )
}


export const postMessage = (data) => async (dispatch) => {
    let token = localStorage.getItem('token');
    var config = {
        headers: {
            'Authorization': "bearer "+token,
            'Content-Type': 'application/json'
        }
    };
    axios.defaults.withCredentials = true;
    await axios.post('http://'+rooturl+':5000/newmessage',data,config)
    .then(async (response) => {
        if (response.status === 200) {
            dispatch({
                type: NEW_MESSAGE,
                payload: response.data
            });
        }
    }
    )
   
}


export const getInboxMessages = (email1) => async (dispatch) => {
    let token = localStorage.getItem('token');
    var config = {
        headers: {
            'Authorization': "bearer "+token,
            'Content-Type': 'application/json'
        }
    };
    axios.defaults.withCredentials = true;
    let email={
        "email":email1
    }
    await axios.post('http://'+rooturl+':5000/inbox/messages',email,config)
    .then(async (response) => {
        if (response.status === 200) {
            dispatch({
                type: INBOX_MESSAGES,
                payload: response.data
            });
        }
    }
    )
    
}