import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Navbar } from "react-bootstrap";
import '../Css/home.css';
import Search from '../Buyer/Search';
import { Link } from 'react-router-dom';
import Background from "../Grubhub_homepageImage.webp";

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            backgroundImage: `url(${Background})`
        }


    }

    render() {
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

        return (
            <div>
                <div >
                    <div class="col-sm-8 home-banner-container">
                        <h1>GRUBHUB</h1>
                    </div>
                    <div class="signinPage">
                         <Link to="/Buyerlogin">Sign in</Link>
                    </div>
                </div>
            </div>

        )
    }

}

export default Home;