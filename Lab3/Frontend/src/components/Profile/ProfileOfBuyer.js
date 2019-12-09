import React, { Component } from 'react';
import { Redirect } from 'react-router';
import './ProfileOfBuyer.css';
import { Link } from 'react-router-dom';
import { gql, graphql } from 'react-apollo';
import { Query, Mutation } from 'react-apollo';
import { profilequery } from '../../queries/profilequery';
import { updateprofilemutation } from '../../mutations/signupLoginprofilemutations';
import swal from 'sweetalert';
class ProfileOfBuyer extends Component {
    constructor() {
        super();
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            phoneNumber: "",
            Address: "",
            readonly:'readOnly',
            isDisabled: true,
            showButton: false

        }
    }

    handleLogout = () => {
        localStorage.clear();
        window.location.Redirect("/");
    }
    editclick=()=>
    {
        this.setState({
            readonly: null,
            isDisabled: false,
            showButton: true
        });
    }
    updateprofile=(e)=>
    { 
        
        console.log("IN UPDATE PROFILE ");
        let data = {
            "id":localStorage.getItem('cookie2'),
            "firstname": this.state.firstname,
            "lastname": this.state.lastname,
            "email": this.state.email,
            "phoneNumber": this.state.phoneNumber,
            "Address": this.state.Address,

        };
        console.log("THE DATA IS ",data );
        this.props.mutate({variables: data })
        .then( res => {
            console.log(res);
            swal(res.data.updateProfile.responseMessage);
        })
        .catch( err => {
            console.log(err);
        });
        this.setState({
            readonly: 'readonly',
            isDisabled: true,
            showButton: false
        });
    }
    handleChange=(e)=>
    {
        const target = e.target;
            const name = target.name;
            const value = target.value;
            this.setState({
                [name]: value
            });
            console.log("value changed: " + [name] + "   " + value);
    }
    render() {
        if (!localStorage.getItem('cookie1')) {
            <Redirect to="/Buyerlogin" />
        }
        let navLogin = null;
        if (localStorage.getItem('cookie1') === "Buyer") {
            console.log("Able to read cookie, in Owner");
            navLogin = (
                <div>
                    <ul className="nav navbar-right">
                        <li><Link to="/Buyerlogin" onClick={this.handleLogout}><span className="glyphicon glyphicon-user"></span>Logout</Link></li>
                    </ul>
                    <ul className="nav navbar-right">
                        <li ><Link to="/BuyerMenu"><span></span>Home</Link></li>
                    </ul>
                </div>
            );
        }
     
        return (
            <div>
                <nav className="navbar">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="/Ownerlogin">GRUBHUB</a>
                        </div>
                        {navLogin}
                    </div>
                </nav>
                <Query
                    query={profilequery}
                    variables={{ id: localStorage.getItem('cookie2') }}
                >
                    {({ loading, data }) => {
                        if (loading) return <div> Fetching Profile Data....</div>;
                       return (
                            <div className="row">
                                <div className="col-md-4"></div>

                                <div className="col-md-4">
                                    <h3>Your Profile Information</h3>
                                    <div style={{ display: "inline-flex" }}>
                                        <p className="name">First Name</p>
                                        <input type="text" name="firstname" onChange={this.handleChange} defaultValue={data.profile.firstname} readOnly={this.state.readonly}/>
                                    </div>
                                    <div className="rightsidebutton">
                                            <p onClick={this.editclick} >Edit</p>
                                            </div><br/><br/>
                                    <div style={{ display: "inline-flex" }}>
                                        <p className="name">Last Name</p>
                                        <input type="text" name="lastname" onChange={this.handleChange} defaultValue={data.profile.lastname} readOnly={this.state.readonly}/>
                                    </div><br/><br/>
                                    <div style={{ display: "inline-flex" }}>
                                        <p className="name">Email</p>
                                        <input type="email" name="email" onChange={this.handleChange} defaultValue={data.profile.email} readOnly={this.state.readonly}/>
                                    </div><br/><br/>
                                    <div style={{ display: "inline-flex" }}>
                                        <p className="name">Phone Number</p>
                                        <input type="text" name="phoneNumber" onChange={this.handleChange}  defaultValue={data.profile.phoneNumber} readOnly={this.state.readonly}/>
                                    </div><br/><br/>
                                    <div style={{ display: "inline-flex" }}>
                                        <p className="name">Address</p>
                                        <input type="text" name="Address" onChange={this.handleChange} defaultValue={data.profile.Address} readOnly={this.state.readonly}/>
                                    </div><br/><br/>
                                   
                                      <button onClick={this.updateprofile} className="profilename">Save</button>
                                  </div>
                                
                            </div>
                        );
                    }}
                </Query>
            </div>

        );
    }
}
ProfileOfBuyer = graphql(updateprofilemutation)(ProfileOfBuyer)
export default ProfileOfBuyer;
