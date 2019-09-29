import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Navbar} from "react-bootstrap";
import '../Css/BuyerLogin.css';
import Search from '../Buyer/Search';
import {Link} from 'react-router-dom';

class BuyerHome extends Component
{
constructor()
{
    super();
    this.state={
        itemName:"",
        viewSearch:false
    }
    this.changehandler=this.changehandler.bind(this);
    this.findfood=this.findfood.bind(this);
  
}
changehandler=(e)=>
{
    this.setState(
        {
            itemName: e.target.value 
        }
    )
   
}
findfood=(e)=>
{
    e.preventDefault();
    console.log("Search for => " + e.target.value);
    this.setState(
        {
            viewSearch:true   
        }
    ) 
}


render()
{let navLogin=null;
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
    let searchView=null;
    if(this.state.viewSearch)
     {
        let name=this.state.itemName;
        console.log("it has come here"+this.state.itemName);
    searchView= <Redirect to={{
        pathname: '/Search',
        state: 
        { ItemName : name}
    }}
/>
    
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
<div className="jumbotron1" >
 <div className="container">
<h3>Who delivers in your neighborhood?</h3>
</div>
<br></br>
<form className="form-inline active-cyan-3 active-cyan-4">
  <i className="fas fa-search" aria-hidden="true"></i>
  <input className="form-control form-control-sm ml-3 w-75" type="text" onChange={this.changehandler} placeholder="Search"
    aria-label="Search"/>
    <button type="button" onClick={this.findfood} className="btn btn-primary" >Find food</button>
    <div className='form-container'>
  {searchView}
</div>
</form>
</div>
</div>
);
}
}
export default BuyerHome;
