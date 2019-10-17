import { GET_PROFILE_BUYERDETAILS,GET_PASTORDERS, GET_UPCOMINGORDERS,GET_PROFILE_OWNERDETAILS} from '../actions/types';
import axios from 'axios';

export const profileDetailsofBuyer = (data) => async (dispatch) => {

    axios.defaults.withCredentials = true;
    await  axios.post('http://localhost:5000/getProfileDetails', data)
        .then(
            async (response) => {
                if (response.status === 200) {
                    console.log("response is 200" + response.data);
                    dispatch({
                        type: GET_PROFILE_BUYERDETAILS,
                        payload: response.data
                    });
                }
                
            }
        )
}
export const pastOrdersofBuyer = (userid) => async (dispatch) => {

    axios.defaults.withCredentials = true;
       await axios.post('http://localhost:5000/pastOrdersOfUser', userid)
        .then(
            async (response) => {
                if (response.status === 200) {
                    console.log("response is 200" + response.data);
                    dispatch({
                        type: GET_PASTORDERS,
                        payload: response.data
                    });
                }
                
            }
        )
}
export const upcomingOrdersofBuyer = (userid) => async (dispatch) => {

    axios.defaults.withCredentials = true;
    await axios.post('http://localhost:5000/upcomingOrders', userid)
        .then(
            async (response) => {
                if (response.status === 200) {
                    console.log("response is 200" + response.data);
                    dispatch({
                        type: GET_UPCOMINGORDERS,
                        payload: response.data
                    });
                }
                
            }
        )
}
export const profileDetailsofOwner = (data) => async (dispatch) => {

    axios.defaults.withCredentials = true;
    await  axios.post('http://localhost:5000/getProfileDetails', data)
        .then(
            async (response) => {
                if (response.status === 200) {
                    console.log("response is 200" + response.data);
                    dispatch({
                        type: GET_PROFILE_OWNERDETAILS,
                        payload: response.data
                    });
                }
                
            }
        )
}