import {SIGNUP_BUYER, SIGNUP_OWNER, LOGIN_BUYER, LOGIN_OWNER} from '../actions/types';
import axios from 'axios';

export const signupBuyer = (buyerData) => async (dispatch) =>{
   console.log("In Action, buyerData "+buyerData);
   axios.defaults.withCredentials = true;
   await axios.post('http://localhost:5000/Buyersignup', buyerData)
   .then(
       (response)=>
       {
        if(response.status === 200)
        {
            console.log("response is 200");
            dispatch({
                type: SIGNUP_BUYER,
                redirect: true
            });
       }
      else
       {
        console.log("response is 202");
        dispatch({
            type: SIGNUP_BUYER,
            redirect: false
        });
      }

       }
   )
  
}



  export const signupOwner = (ownerData) => dispatch=>
  {
    console.log("In Action, signupOwner "+ownerData);
    axios.defaults.withCredentials = true;
   axios.post('http://localhost:5000/Ownersignup', ownerData)
   .then(
       (response)=>
       {
        if(response.status === 200)
        {
            console.log("response is 200");
            dispatch({
                type: SIGNUP_OWNER,
                redirect: true
            });
       }
      else
       {
        console.log("response is 202");
        dispatch({
            type: SIGNUP_OWNER,
            redirect: false
        });
      }

       }
   )
  }
  export const loginBuyer =  (buyerloginData) => async (dispatch) => {
    console.log("In Action, loginBuyer "+buyerloginData);
    axios.defaults.withCredentials = true;
   await axios.post('http://localhost:5000/buyerLogin', buyerloginData)
   .then(
       (response)=>
       {
        if(response.status === 200)
        {
           console.log("cookie response is "+response.data);
           localStorage.setItem("cookie1", response.data.cookie1);
           localStorage.setItem("cookie2", response.data.cookie2);
           localStorage.setItem("cookie3", response.data.cookie3);
          
            console.log("response is 200");
            dispatch({
                type: LOGIN_BUYER,
                loginSuccess: true
            });
       }
      else
       {
        console.log("response is 202");
        dispatch({
            type: LOGIN_BUYER,
            loginSuccess: false
        });
      }

       }
   )
  }
  export const loginOwner =  (ownerdata) => async (dispatch) => {
    console.log("In Action, ownerlogin "+ownerdata);
    axios.defaults.withCredentials = true;
   await axios.post('http://localhost:5000/Ownerlogin', ownerdata)
   .then(
       (response)=>
       {
        if(response.status === 200)
        {
           console.log("cookie response is "+response.data);
           localStorage.setItem("cookie1", response.data.cookie1);
           localStorage.setItem("cookie2", response.data.cookie2);
           localStorage.setItem("cookie3", response.data.cookie3);
          
            console.log("response is 200");
            dispatch({
                type: LOGIN_OWNER,
                OwnerloginSuccess: true
            });
       }
      else
       {
        console.log("response is 202");
        dispatch({
            type: LOGIN_OWNER,
            OwnerloginSuccess: false
        });
      }

       }
   )
  }
  