import { SIGNUP ,LOGIN} from '../actions/types';
import axios from 'axios';
import { rooturl } from '../config/settings';

export const signup = (data) => async (dispatch) => {

    axios.defaults.withCredentials = true;
    await axios.post('http://' + rooturl + ':5000/signup', data)
        .then(
            (response) => {
                if (response.status === 200) {
                    console.log("in signup response 200");
                    dispatch({
                        type: SIGNUP,
                        signupSuccess: true
                    });
                }
                else {
                    console.log("response is 202");
                    dispatch({
                        type: SIGNUP,
                        signupSuccess: false
                    });
                }

            }
        )
}
export const login = (data) => async (dispatch) => {

    axios.defaults.withCredentials = true;
    await axios.post('http://' + rooturl + ':5000/login', data)
        .then(
            (response) => {
                if (response.status === 200) {
                    console.log("response data is "+JSON.stringify(response.data))
                   
                    localStorage.setItem("cookie1", response.data.cookie1);
                    localStorage.setItem("cookie2", response.data.cookie2);
                    localStorage.setItem("cookie3", response.data.cookie3);
                    localStorage.setItem("token", response.data.token);

                    dispatch({
                        type: LOGIN,
                        loginSuccess: true
                    });
                }
                else {
                    console.log("response is 202");
                    dispatch({
                        type: LOGIN,
                        loginSuccess: false
                    });
                }

            }
        )
}


