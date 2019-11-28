import { GET_PROFILE, UPDATE_PROFILE } from '../actions/types';
import axios from 'axios';
import { rooturl } from '../config/settings';

export const profileaction = (data) => async (dispatch) => {
    console.log("IN ACTION FILE...GET PROFILE DETAILS");
    axios.defaults.withCredentials = true;
    await axios.post('http://' + rooturl + ':5000/getProfileDetails', data)
        .then(
            async (response) => {
                if (response.status === 200) {
                    console.log("IN ACTION FILE " + JSON.stringify(response.data));
                    dispatch({
                        type: GET_PROFILE,
                        payload: response.data.profile[0]
                    });
                }
            }
        )
}
export const updateProfile = (data) => async (dispatch) => {
    console.log("IN ACTION FILE...UPDATE");
    axios.defaults.withCredentials = true;
    await axios.post('http://' + rooturl + ':5000/updateprofile', data)
        .then(
            async (response) => {
                if (response.status === 200) {
                    console.log("IN ACTION FILE " + JSON.stringify(response.data));
                    dispatch({
                        type: UPDATE_PROFILE,
                        payload: response.data.profiledetails[0]
                    });
                }

            }
        )
}

