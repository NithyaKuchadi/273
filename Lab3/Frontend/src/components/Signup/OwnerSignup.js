import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { graphql } from "react-apollo";
import { signupmutation } from '../../mutations/signupLoginprofilemutations';
import swal from 'sweetalert';
class OwnerSignup extends Component {
    constructor() {
        super();
        this.state = {
            FirstName: "",
            LastName:"",
            Email: "",
            Password: "",
            RestaurantName: "",
            Cuisine:"",
            UserNameError: "",
            ErrorinSignUP:""
        }

        this.onSignup = this.onSignup.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (e) => {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
        }
    
    onSignup = (e) => {
        e.preventDefault();
        if (true) {
            let data = {
                firstname: this.state.FirstName,
                lastname:this.state.LastName,
                email: this.state.Email,
                password: this.state.Password,
                restaurant: this.state.RestaurantName,
                cuisine: this.state.Cuisine,
                usertype: "Owner"
            }
            
            this.props.mutate({variables: data })
            .then( res => {
                console.log(res);
                swal(res.data.signup.responseMessage+"\n Try logging in");
                window.location.replace('/Ownerlogin');
            })
            .catch( err => {
                console.log(err);
            });
          
        }
    }
    render() {
        return (
            <div >
                <nav className="navbar">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="/Ownerlogin">GRUBHUB</a>
                        </div>
                    </div>
                </nav>
                <div>
                    <div className="center test-buyer-login">
                        <div className="container">
                            <div className="col-sm-6 col-sm-offset-6" style={{ left: "0px" }}>
                            <form onSubmit={this.onSignUp} method="post" autoComplete="off">
                                <div className="login-form">

                                    <h3>Create your account</h3>
                                    <div style={{color: "red"}}>{this.state.ErrorinSignUP}</div>
                                   

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
                                        <input onChange={this.handleChange} type="email" className="form-control" name="Email" placeholder="Email" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input onChange={this.handleChange} type="password" className="form-control" name="Password" placeholder="Password" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Restaurant Name</label>
                                        <input onChange={this.handleChange} type="text" className="form-control" name="RestaurantName" placeholder="RestaurantName" required/>
                                    </div>
                                    <div className="form-group">
                                        <label>Cuisine</label>
                                        <input onChange={this.handleChange} type="text" className="form-control" name="Cuisine" placeholder="Cuisine" required/>
                                    </div>
                                    <div>
                                        <button onClick={this.onSignup} className="mybtn signup_button" style={{ width: "100%" }} >Create your account</button>
                                       
                                    </div>
                                    <br></br>
                                    <h4> Have an account? <a className="bg-default" href="/Ownerlogin">Sign in</a></h4>
                                    <br></br>
                                    <br></br>
                              </div>
                                </form></div>
                        </div>
                    </div>
                </div>

        
            </div >
        )
    }
}

OwnerSignup = graphql (signupmutation) (OwnerSignup)
export default OwnerSignup;
