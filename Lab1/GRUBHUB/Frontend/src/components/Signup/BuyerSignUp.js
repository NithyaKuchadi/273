import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

class BuyerSignUp extends Component {
    constructor() {
        super();
        this.State = {
            UserName: "",
            Email: "",
            Password: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.onSignUp = this.onSignUp.bind(this);
    }
    handleChange = (e) => {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
       
    }
    onSignUp = (e) => {
        e.preventDefault();
        let Userdata = {
            Type: "Buyer",
            UserName: this.state.UserName,
            Email: this.state.Email,
            Password: this.state.Password,
        }
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:5000/Buyersignup', Userdata)
            .then(response => {
                
                if (response.status === 200) {
                    
                    window.location.replace('/BuyerLogin')
                } else {
                    console.log("Error !!! in create");
                }
            });
    }
    render() {
        return (
            <div>
                <nav className="navbar">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="/Buyerlogin">GRUBHUB</a>
                        </div>
                    </div>
                </nav>
                <div className="center test-buyer-login">
                    <div className="container">
                        <div className="col-sm-6 col-sm-offset-6" style={{ left: "0px" }}>
                            <div className="login-form">
                                <h3>Create your account</h3>
                                <br></br>
                                <div className="form-group">
                                    <label>User Name</label>
                                    <input onChange={this.handleChange} type="text" className="form-control" name="UserName" placeholder="User Name" required />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input onChange={this.handleChange} type="text" className="form-control" name="Email" placeholder="Email Address" required />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input onChange={this.handleChange} type="password" className="form-control" name="Password" placeholder="Password" required />
                                </div>
                                <br></br>
                                <br></br>
                                <div>
                                    <button onClick={this.onSignUp} className="mybtn signup_button" style={{ width: "100%" }} >Create your account</button>
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
                                <h4> Have an account? <a className="bg-default" href="/BuyerLogin">Sign in</a></h4>
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
export default BuyerSignUp;
