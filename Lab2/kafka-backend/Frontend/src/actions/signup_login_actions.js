import { SIGNUP_BUYER, SIGNUP_OWNER, LOGIN_BUYER, LOGIN_OWNER } from '../actions/types';
import axios from 'axios';
import { rooturl } from '../config/settings';

export const signupBuyer = (buyerData) => async (dispatch) => {

    axios.defaults.withCredentials = true;
    await axios.post('http://' + rooturl + ':5000/Buyersignup', buyerData)
        .then(
            (response) => {
                if (response.status === 200) {
                    dispatch({
                        type: SIGNUP_BUYER,
                        redirect: true
                    });
                }
                else {
                    console.log("response is 202");
                    dispatch({
                        type: SIGNUP_BUYER,
                        redirect: false
                    });
                }

            }
        )

}



export const signupOwner = (ownerData) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.post('http://' + rooturl + ':5000/Ownersignup', ownerData)
        .then(
            (response) => {
                if (response.status === 200) {
                    dispatch({
                        type: SIGNUP_OWNER,
                        redirect: true
                    });
                }
                else {
                    dispatch({
                        type: SIGNUP_OWNER,
                        redirect: false
                    });
                }

            }
        )
}
export const loginBuyer = (buyerloginData) => async (dispatch) => {
    axios.defaults.withCredentials = true;
    await axios.post('http://'+rooturl+':5000/buyerLogin', buyerloginData)
        .then(
            (response) => {
                if (response.status === 200) {

                    localStorage.setItem("cookie1", response.data.cookie1);
                    localStorage.setItem("cookie2", response.data.cookie2);
                    localStorage.setItem("cookie3", response.data.cookie3);
                    localStorage.setItem("token", response.data.token);

                    dispatch({
                        type: LOGIN_BUYER,
                        loginSuccess: true
                    });
                }
                else {
                    dispatch({
                        type: LOGIN_BUYER,
                        loginSuccess: false
                    });
                }

            }
        )
}
export const loginOwner = (ownerdata) => async (dispatch) => {
    axios.defaults.withCredentials = true;
    await axios.post('http://'+rooturl+':5000/Ownerlogin', ownerdata)
        .then(
            (response) => {
                if (response.status === 200) {
                    localStorage.setItem("cookie1", response.data.cookie1);
                    localStorage.setItem("cookie2", response.data.cookie2);
                    localStorage.setItem("cookie3", response.data.cookie3);
                    localStorage.setItem("token", response.data.token);
                    dispatch({
                        type: LOGIN_OWNER,
                        OwnerloginSuccess: true
                    });
                }
                else {
                    dispatch({
                        type: LOGIN_OWNER,
                        OwnerloginSuccess: false
                    });
                }

            }
        )
}
