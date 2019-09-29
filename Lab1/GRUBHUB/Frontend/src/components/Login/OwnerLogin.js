import React, {Component} from 'react';

import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Navbar} from "react-bootstrap";
import '../Css/BuyerLogin.css';
import Background from "../Grubhub_homepageImage.webp";

class OwnerLogin extends Component
{
constructor()
{
    super();
    this.state={
        Email:"",
        Password:"",
        backgroundImage: `url(${Background})`,
        EmptyCredentials:"",
        IncorrectCredentials:""
    }
    this.handleChange=this.handleChange.bind(this);
    
}
handleChange=(e)=>
{this.setState(
        {[ e.target.name] : e.target.value
        }
    )
}
onValidate=(e)=>
{ 
    if(this.state.Email==="" || this.state.Email===" " || this.state.Password==="" || this.state.Password===" ")
    {
        this.setState(
            {
                EmptyCredentials:"Email and Password cannot be Empty!!"
            }
        )
        return false;
    }
return true;
}
onLogin=(e)=>
{
    e.preventDefault();
    let isValid=this.onValidate();
    if(isValid)
    {
    let logindata = {
        Type : "Owner",
        Email : this.state.Email,
        Password: this.state.Password,
    }
    
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:5000/Ownerlogin',logindata)
    .then(response => {
        console.log("Status Code : ====> ",response.status);
        if(response.status === 200 ){
            console.log("successfully logged in");
            window.location.replace('/OwnerHome');
        }else if(response.status === 202)
        {
            console.log("Error in login"); 
            this.setState(
                {
                    IncorrectCredentials:"Incorrect Credentials"
                }
            )
        }
    });
}}
render()
{
    let redirectVar = null;
    console.log(cookie.load('cookie1'));
    if(cookie.load('cookie1')==="Owner")
    {
        redirectVar = <Redirect to="/OwnerHome"/>
    }
    return(
        <div >
            <div className="center test-buyer-login">
            <div className="container">
            <div className="col-sm-6 col-sm-offset-6" style={{left: "400px"}}>
            <div className="login-form">
                <h3>Sign in with your Grubhub account</h3>  
                <br></br>
                {this.state.EmptyCredentials}
                {this.state.IncorrectCredentials}
                        <div className="form-group">
                            <label>Email</label>
                            <input onChange = {this.handleChange} type="text" className="form-control" name="Email" placeholder="Email Address" required/>
                        </div>
                        <div className="form-group">
                           <label>Password</label>
                            <input onChange = {this.handleChange} type="password" className="form-control" name="Password" placeholder="Password" required/>
                        </div>
                        <br></br>
                        <br></br>
                        <div>
                        <button onClick = {this.onLogin} className="s-btn-img mybtn grubhub_button " style={{width:"100%"}} >Sign In</button>
                        </div>
                        <br></br>
                        <div className="mydiv">
                            <span className="myspan">or</span>
                        </div>
                        <br></br>
                        <div>
                            <button className="mybtn facebook_button">Continue with Facebook</button>
                        </div>
                        <br></br>
                        <div>
                            <button className="mybtn google_button" >Continue with Google</button>
                        </div>
                        <br></br>
                        <h4> <a className="bg-default" href="/OwnerSignup">Create your account</a></h4>
                        <br></br>
                        <br></br>
                </div>
            </div>
            </div>
            </div>
            <br></br>
       </div>
    )
}
}
export default OwnerLogin;