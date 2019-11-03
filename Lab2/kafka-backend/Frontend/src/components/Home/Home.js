import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Navbar } from "react-bootstrap";
import '../Css/home.css';
import Search from '../Buyer/Search';
import { Link } from 'react-router-dom';


class Home extends Component {

    constructor(props) {
        super(props);


    }

    render() {

        return (
            <div>
                <div style={{ display: "inline-flex" }}>
                    <div className="home-banner-container">
                        <h2>GRUBHUB</h2>
                    </div>
                    <div className="rightsidebutton666">
                        <p className="size"> <Link to="/Buyerlogin">Sign in</Link></p>
                    </div>
                </div>
            </div>

        )
    }

}

export default Home;
