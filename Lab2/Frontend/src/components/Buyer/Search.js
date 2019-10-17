import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Navbar, Jumbotron } from "react-bootstrap";
import '../Css/BuyerLogin.css';
import RestComponent from './RestComponent';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { restaurantNames } from '../../actions/buyersearch';
import {
    Container,
    Row,
    Col,
    Nav,
    FormControl,
    Form,
    Button
} from 'react-bootstrap';
class Search extends Component {
    constructor() {
        super();
        this.state = {
            itemName: "",
            Restaurants: [],
            searchText: "",
            filteredRestaurants: [],
            RestaurantSearchError:""
        }
    }
    changeSearchText = (e) => {
        console.log("In search...value is " + e.target.value);
        this.setState(
            {
                searchText: e.target.value
            }
        )
    }
   async componentDidMount() {
        let itemName = this.props.location.state.ItemName;
        
        let post = {
            "NameOfItem": itemName
        }
     await this.props.restaurantNames(post);
 
       if (this.props.restaurant_response)
                 {
                let arraydata = this.props.RestaurantNames;

                for (let i = 0; i < arraydata.length; i++) {

                    console.log(arraydata[i].RestaurantName);
                }
                this.setState(
                    {
                        Restaurants: this.props.RestaurantNames
                    }
                )

                this.setState(
                    {
                        filteredRestaurants: this.props.RestaurantNames
                    }
                )
               
                }
        else
            {    this.setState(
                     {
                        RestaurantSearchError: "Could not find this item in any restaurants!!"
                     }
                 )
            }
     
    }
    handleLogout = () => {
        localStorage.clear();
        window.location.Redirect("/home");
    }
    searchCusine = (e) => {
        this.state["filteredRestaurants"] = this.props.RestaurantNames;
        if (!(this.state.searchText === "" || this.state.searchText === " ")) {
            let nameArray = this.state.filteredRestaurants;
            
                for(let i=0;i< nameArray.length;)
                {
                   
                    if (nameArray[i].Cuisine !== this.state.searchText) {
                       
                        nameArray.splice(i, 1);
                        i=i;
                    }
                    else
                    {
                        i=i+1;
                    }
                }
            this.setState(
                {
                    filteredRestaurants: nameArray
                }
            )
            console.log("*************" + this.state.filteredRestaurants);
        }
        else {
            this.setState(
                {
                    filteredRestaurants: this.props.RestaurantNames
                }
            )
        }

    }
    render() {
        let navLogin = null;
        if (localStorage.getItem('cookie1') === "Buyer") {
            console.log("Able to read cookie, in buyer");
            navLogin = (
                <div>
                   <ul className="nav navbar-right">
                        <li><Link to="/" onClick={this.handleLogout}><span className="glyphicon glyphicon-user"></span>Logout</Link></li>
                    </ul>
                    <ul className="nav navbar-right">
                        <li ><Link to="/ProfileOfBuyer"><span className="glyphicon glyphicon-user"></span>Profile</Link></li>
                    </ul>
                    <ul>
                        <Form inline>
                            <Button variant="outline-primary" className="nav navbar-right" onClick={this.searchCusine}>Search</Button>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2 nav navbar-right" onChange={this.changeSearchText} />
                        </Form>
                    </ul>
                </div>
            );
        }
        return (
            <div>
                <nav className="navbar">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="/Buyerlogin">GRUBHUB</a>
                        </div>
                        <div>
                        </div>
                        {navLogin}
                    </div>
                </nav>
                <ul>
                    <div style={{color:"red"}}>{this.state.RestaurantSearchError}</div>
                    {this.state.filteredRestaurants.map(
                        (restaurant) => {
                            console.log("restaurant image in search is " + restaurant.Cuisine);
                            return <RestComponent restaurant={restaurant} key={restaurant.RestaurantID} />
                        }
                    )
                    }
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        RestaurantNames : state.buyer.restaurantNames,
        restaurant_response : state.buyer.restaurant_response

    };
}
export default connect(
    mapStateToProps,
    {restaurantNames}
)(Search);
