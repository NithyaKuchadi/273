import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { signupBuyer } from '../../actions/signup_login_actions';
import { connect } from 'react-redux';
class BuyerSignUp extends Component {
    constructor() {
        super();
        this.State = {
            UserName: "",
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
        console.log(this.state);
        // console.log(this.state.UserName+"     "+this.state.Email+"      "+this.state.Password);
    }
    onSignUp = (e) => {
        e.preventDefault();
        let post = {
            Type: "Buyer",
            UserName: this.state.UserName,
            Email: this.state.Email,
            Password: this.state.Password,
        }
        this.props.signupBuyer(post);
    }
    render() {
        let redirecting=null;
    if (this.props.BuyersignupSuccess) {
        console.log("after result in loop");
        redirecting = <Redirect to="/BuyerLogin" />
    }
    else
    {
       this.setState(
           {
            Error:"Error in Signup!!"
           }
       ) 
    }
        return (
            <div>
                {redirecting}
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
                                {this.state.Error}
                                <div className="form-group">
                                    <label>User Name</label>
                                    <input onChange={this.handleChange} type="text" className="form-control" name="UserName" placeholder="User Name" required />
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
const mapDispatchToProps = dispatch => {
    return {
        signupBuyer: post => {
            dispatch(signupBuyer(post));
        }
    };
};
const mapStateToProps = (state) => {
    return {
       BuyersignupSuccess: state.signin.redirect

    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BuyerSignUp);


