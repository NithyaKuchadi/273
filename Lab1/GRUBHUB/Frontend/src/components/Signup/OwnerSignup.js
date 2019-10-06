import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

class OwnerSignup extends Component {
    constructor() {
        super();
        this.state = {
            Name: "",
            Email: "",
            Password: "",
            RestaurantName: "",
            ZipCode: "",
            UserNameError: ""
        }
    }

    onChangeOfName = (e) => {
        this.setState(
            {
                Name: e.target.value
            }
        )
    }
    onChangeOfEmail = (e) => {
        this.setState(
            {
                Email: e.target.value
            }
        )
    }
    onChangeOfPassword = (e) => {
        this.setState(
            {
                Password: e.target.value
            }
        )

    }
    onChangeOfRestaurantName = (e) => {

        this.setState(
            {
                RestaurantName: e.target.value
            }
        )
    }

    onChangeOfZipCode = (e) => {
        this.setState(
            {
                ZipCode: e.target.value
            }
        )
    }
    onValidate = () => {
        if (this.state.Name === "") {
            this.setState(
                {
                    UserNameError: "User name is Empty!!"
                }
            )
            return false;
        }
        return true;
    }
    onSignup = (e) => {
        e.preventDefault();
        let isValid = this.onValidate();
        if (isValid) {
            let Userdata = {
                Name: this.state.Name,
                Email: this.state.Email,
                Password: this.state.Password,
                RestaurantName: this.state.RestaurantName,
                ZipCode: this.state.ZipCode
            }

            axios.defaults.withCredentials = true;
            axios.post('http://localhost:5000/Ownersignup', Userdata)
                .then(response => {
                    console.log("Status Code : ====> ", response.status);
                    if (response.status === 200) {
                        console.log("successfully signuped");
                        window.location.replace('/Ownerlogin')
                    } else {
                        console.log("Error !!! in create");
                    }
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
                                <div className="login-form">
                                    <h3>Create your account</h3>
                                    
                                    <div className="form-group">
                                        <label>User Name</label>
                                        <input onChange={this.onChangeOfName} type="text" className="form-control" name="Name" placeholder="Name" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input onChange={this.onChangeOfEmail} type="email" className="form-control" name="Email" placeholder="Email" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input onChange={this.onChangeOfPassword} type="password" className="form-control" name="Password" placeholder="Password" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Restaurant Name</label>
                                        <input onChange={this.onChangeOfRestaurantName} type="text" className="form-control" name="RestaurantName" placeholder="RestaurantName" />
                                    </div>
                                    <div className="form-group">
                                        <label>Zipcode</label>
                                        <input onChange={this.onChangeOfZipCode} type="text" className="form-control" name="ZipCode" placeholder="ZipCode" />
                                    </div>
                                    <div>
                                        <button onClick={this.onSignup} className="mybtn signup_button" style={{ width: "100%" }} >Create your account</button>
                                       
                                    </div>
                                    <br></br>
                                    <h4> Have an account? <a className="bg-default" href="/Ownerlogin">Sign in</a></h4>
                                    <br></br>
                                    <br></br>

                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

        
            </div >
        )
    }
}

export default OwnerSignup;
