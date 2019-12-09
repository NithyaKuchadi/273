import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { graphql } from "react-apollo";
import { signupmutation } from '../../mutations/signupLoginprofilemutations';
import swal from 'sweetalert';
class BuyerSignUp extends Component {
    constructor() {
        super();
        this.State = {
            FirstName: "",
            LastName:"",
            Email: "",
            Password: "",
            Error:""
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
       
        // console.log(this.state.UserName+"     "+this.state.Email+"      "+this.state.Password);
    }
    onSignUp = (e) => {

        e.preventDefault();
        if (true) {
            let data = {
                firstname: this.state.FirstName,
                lastname:this.state.LastName,
                email: this.state.Email,
                password: this.state.Password,
              
                usertype: "Buyer"
            }
            
            this.props.mutate({variables: data })
            .then( res => {
                console.log(res);
                swal(res.data.signup.responseMessage+"\n Try logging in");
                window.location.replace('/BuyerLogin');
            })
            .catch( err => {
                console.log(err);
            });
          
        }
       
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
                        <form onSubmit={this.onSignUp} method="post" autoComplete="off">
                            <div className="login-form">
                                <h3>Create your account</h3>
                                <br></br>
                                
                                <div className="form-group">
                                        <label>First Name</label>
                                        <input onChange={this.handleChange} type="text" className="form-control" name="FirstName" placeholder="First name" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name</label>
                                        <input onChange={this.handleChange} type="text" className="form-control" name="LastName" placeholder="Last name" required />
                                    </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input onChange={this.handleChange} type="email" className="form-control" name="Email" placeholder="Email Address" required />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input onChange={this.handleChange} type="password" className="form-control" name="Password" placeholder="Password" required />
                                </div>
                                <br></br>
                                <br></br>
                                <div>
                                <input type="submit" className="mybtn signup_button" style={{width:"100%"}} value="Create your account" />
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
                            </form>
                        </div>
                    </div>
                </div>
                <br></br>

            </div>
        )
    }
}
BuyerSignUp = graphql (signupmutation) (BuyerSignUp)
export default BuyerSignUp;
