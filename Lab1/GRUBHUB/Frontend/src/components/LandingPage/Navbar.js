import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Background from "../Grubhub_homepageImage.webp";

class Navbar extends Component {
    constructor(props){
        super(props);
       this.state={
        backgroundImage: `url(${Background})`
       }
        this.handleLogout = this.handleLogout.bind(this);
    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        cookie.remove('cookie1', { path: '/' })
        cookie.remove('cookie2', { path: '/' })
        cookie.remove('cookie3', { path: '/' })
        window.location.Redirect("/");
    }
   
    render(){
        //if Cookie is set render Logout Button
        let navLogin = null;
        if(cookie.load('cookie1')==="Buyer"){
            console.log("Able to read cookie, in buyer");
            navLogin = (
                <div>
               
                <ul className="nav navbar-right">
                        <li><Link to="/" onClick = {this.handleLogout}><span className="glyphicon glyphicon-user"></span>Logout</Link></li>
                </ul>
                <ul className="nav navbar-right">
                        <li ><Link to="/ProfileOfBuyer"><span className="glyphicon glyphicon-user"></span>Profile</Link></li>
                </ul>
                </div>
            );
        }
        else if(cookie.load('cookie1')==="Owner"){
            console.log("Able to read cookie,in owner cookie");
            navLogin = (
                <div>
               
                <ul className="nav navbar-right">
                        <li><Link to="/" onClick = {this.handleLogout}><span className="glyphicon glyphicon-user"></span>Logout</Link></li>
                </ul>
                <ul className="nav navbar-right">
                        <li ><Link to="/ProfileOfOwner"><span className="glyphicon glyphicon-user"></span>Profile</Link></li>
                </ul>
                </div>
            );
        }
        
        else{
            //Else display login button
            console.log("Not Able to read cookie");
            navLogin = (
                <div>
                <ul className="nav navbar-right">
                        <li><Link to="/Buyerlogin"><span className="glyphicon glyphicon-log-in"></span>Buyer Login</Link></li>
                </ul>
               <ul className="nav navbar-right">
                         <li><Link to="/OwnerLogin"><span className="glyphicon glyphicon-log-in"></span>Owner Login</Link></li>
               </ul>
               </div>
            )
        }
        return(
           <div>
            <nav className="navbar">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="/">GRUBHUB</a>
                    </div>
                    {navLogin}
                </div>
            </nav>    
        </div>
        )
    }
}

export default Navbar;