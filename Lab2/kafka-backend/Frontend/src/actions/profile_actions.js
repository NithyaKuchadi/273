import { GET_PROFILE_BUYERDETAILS, GET_PASTORDERS, GET_UPCOMINGORDERS, GET_PROFILE_OWNERDETAILS, UPDATE_BUYERPROFILE, UPDATE_OWNERPROFILE } from '../actions/types';
import axios from 'axios';
import { rooturl } from '../config/settings';

export const profileDetailsofBuyer = (data) => async (dispatch) => {

    let token = localStorage.getItem('token');
    var config = {
        headers: {
            'Authorization': "bearer "+token,
            'Content-Type': 'application/json'
        }
    };

    axios.defaults.withCredentials = true;
    await axios.post('http://' + rooturl + ':5000/getProfileDetails', data, config)
        .then(
            async (response) => {
                if (response.status === 200) {
                    dispatch({
                        type: GET_PROFILE_BUYERDETAILS,
                        payload: response.data
                    });
                }

            }
        )
}
export const pastOrdersofBuyer = (userid) => async (dispatch) => {

    let token = localStorage.getItem('token');
    var config = {
        headers: {
            'Authorization': "bearer "+token,
            'Content-Type': 'application/json'
        }
    };
    axios.defaults.withCredentials = true;
    await axios.post('http://' + rooturl + ':5000/pastOrdersOfUser', userid, config)
        .then(
            async (response) => {
                if (response.status === 200) {
                    dispatch({
                        type: GET_PASTORDERS,
                        payload: response.data
                    });
                }

            }
        )
}
export const upcomingOrdersofBuyer = (userid) => async (dispatch) => {

    let token = localStorage.getItem('token');
    var config = {
        headers: {
            'Authorization': "bearer "+token,
            'Content-Type': 'application/json'
        }
    };
    axios.defaults.withCredentials = true;
    await axios.post('http://' + rooturl + ':5000/upcomingOrders', userid, config)
        .then(
            async (response) => {
                if (response.status === 200) {
                    dispatch({
                        type: GET_UPCOMINGORDERS,
                        payload: response.data
                    });
                }

            }
        )
}
export const profileDetailsofOwner = (data) => async (dispatch) => {
    let token = localStorage.getItem('token');
    var config = {
        headers: {
            'Authorization': "bearer "+token,
            'Content-Type': 'application/json'
        }
    };
    axios.defaults.withCredentials = true;
    await axios.post('http://' + rooturl + ':5000/getProfileDetails', data, config)
        .then(
            async (response) => {
                if (response.status === 200) {
                    dispatch({
                        type: GET_PROFILE_OWNERDETAILS,
                        payload: response.data
                    });
                }

            }
        )
}

export const updateBuyerProfile = (data) => async (dispatch) => {
    let token = localStorage.getItem('token');
    var config = {
        headers: {
            'Authorization': "bearer "+token,
            'Content-Type': 'application/json'
        }
    };
    axios.defaults.withCredentials = true;
    await axios.post('http://' + rooturl + ':5000/updateBuyerProfile', data, config)
        .then(
            async (response) => {
                if (response.status === 200) {
                    dispatch({
                        type: UPDATE_BUYERPROFILE,
                        payload: response.data
                    });
                }

            }
        )
}
export const updateOwnerProfile = (data) => async (dispatch) => {
    let token = localStorage.getItem('token');
    var config = {
        headers: {
            'Authorization': "bearer "+token,
            'Content-Type': 'application/json'
        }
    };
    axios.defaults.withCredentials = true;
    await axios.post('http://' + rooturl + ':5000/updateOwnerProfile', data, config)
        .then(
            async (response) => {
                if (response.status === 200) {
                    dispatch({
                        type: UPDATE_OWNERPROFILE,
                        payload: response.data
                    });
                }

            }
        )
}
