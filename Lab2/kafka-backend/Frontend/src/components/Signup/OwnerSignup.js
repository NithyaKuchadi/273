import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { signupOwner } from '../../actions/signup_login_actions';

class OwnerSignup extends Component {
    constructor() {
        super();
        this.state = {
            Name: "",
            Email: "",
            Password: "",
            RestaurantName: "",
            ZipCode: "",
            UserNameError: "",
            ErrorinSignUP: ""
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
    onValidate = () => {
        if (this.state.Name === "" || this.state.Email === "" || this.state.Password === "" || this.state.RestaurantName === "" || this.state.ZipCode === "") {
            this.setState(
                {
                    ErrorinSignUP: "Fields cannot be Empty!!"
                }
            )
            return false;
        }
        else if (!this.state.Email.includes("@")) {
            this.setState(
                {
                    ErrorinSignUP: "Incorrect Email ID"
                }
            )
            return false;
        }
        return true;
    }
    onSignup = async (e) => {
        e.preventDefault();
        let isValid = this.onValidate();
        if (isValid) {
            let post = {
                Name: this.state.Name,
                Email: this.state.Email,
                Password: this.state.Password,
                RestaurantName: this.state.RestaurantName,
                ZipCode: this.state.ZipCode
            }
            await this.props.signupOwner(post);

        }

    }

    render() {
        let redirecting = null;
        if (this.props.OwnersignupSuccess) {
            redirecting = <Redirect to="/Ownerlogin" />
        }
       
        return (
            <div >
                {redirecting}
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
                                        <div style={{ color: "red" }}>{this.state.ErrorinSignUP}</div>


                                        <div className="form-group">
                                            <label>User Name</label>
                                            <input onChange={this.handleChange} type="text" className="form-control" name="Name" placeholder="Name" required />
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
                                            <input onChange={this.handleChange} type="text" className="form-control" name="RestaurantName" placeholder="RestaurantName" required />
                                        </div>
                                        <div className="form-group">
                                            <label>Zipcode</label>
                                            <input onChange={this.handleChange} type="text" className="form-control" name="ZipCode" placeholder="ZipCode" required />
                                        </div>
                                        <div>
                                            <button onClick={this.onSignup} className="mybtn signup_button" style={{ width: "100%" }} >Create your account</button>

                                        </div>
                                        <br></br>
                                        <h4> Have an account? <a className="bg-default" href="/Ownerlogin">Sign in</a></h4>
                                        <br></br>
                                        <br></br>


                                    </div>
                                </form>                            </div>
                        </div>
                    </div>
                </div>


            </div >
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signupOwner: post => {
            dispatch(signupOwner(post));
        }
    };
};
const mapStateToProps = (state) => {
    return {
        OwnersignupSuccess: state.signin.redirect

    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OwnerSignup);

