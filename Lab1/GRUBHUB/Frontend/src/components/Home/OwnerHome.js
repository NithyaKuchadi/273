import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Navbar} from "react-bootstrap";
import '../Css/BuyerLogin.css';
class OwnerHome extends Component
{
constructor()
{
    super();
}

render()
{
return(
    <div>
         <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">GRUBHUB</a>
                    </div>
                    </div>
                    </nav>

<div>
<h2>Your Account </h2>

</div>
    </div>
);


}
}
export default OwnerHome;