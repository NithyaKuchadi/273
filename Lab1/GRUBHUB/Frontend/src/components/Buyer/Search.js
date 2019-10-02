import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Navbar, Jumbotron} from "react-bootstrap";
import '../Css/BuyerLogin.css';
import RestComponent from './RestComponent';
import {Link} from 'react-router-dom';
import {
    Container,
    Row,
    Col,
    Nav,
    FormControl,
    Form,
    Button
  } from 'react-bootstrap';
class Search extends Component
{
constructor()
{
    super();
    this.state={
        itemName:"",
        Restaurants:[],
        searchText:"",
        filteredRestaurants:[]
    }
}
changeSearchText=(e)=>
{
    console.log("In search...value is "+e.target.value);
    this.setState(
        {
            searchText: e.target.value  
        }
    )
}
componentDidMount()
    {
        let itemName=this.props.location.state.ItemName;
       console.log("itemName is"+itemName);
        let item={
            "NameOfItem":itemName
        }
        
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:5000/getRestaurantNames',item)
        .then((response) => {
           //update the state with the response data
       let arraydata=response.data;

       console.log("array data is"+arraydata[0].RestaurantID);

    for(let i=0;i<arraydata.length;i++)
    {
        
       console.log(arraydata[i].RestaurantName); 
    }
         this.setState(
             {
                Restaurants: response.data
             }
         )  

         this.setState(
            {
                filteredRestaurants: response.data
            }
        )  
         console.log("Printing Restaurant STates "+this.state.Restaurants[0].RestaurantName);

    })
 }
 handleLogout = () => {
    cookie.remove('cookie1', { path: '/' })
    cookie.remove('cookie2', { path: '/' })
    cookie.remove('cookie3', { path: '/' })
    window.location.Redirect("/");
}
searchCusine=(e)=>
{  
    this.state["filteredRestaurants"]=this.state.Restaurants;
    if(!(this.state.searchText === "" || this.state.searchText===" "))
      {
        let nameArray=this.state.filteredRestaurants.slice();
         this.state.filteredRestaurants.map(
         (restaurant,i)=> 
        {
           console.log("Restaurant Cuisine is "+restaurant.Cuisine);
          if(restaurant.Cuisine !== this.state.searchText )
          {
              console.log("it is cumng here for delete count");
              nameArray.splice(i,1);
          }
            
          })
          this.setState(
            {
                filteredRestaurants: nameArray
            }
        )
        console.log("*************"+this.state.filteredRestaurants);
    }
    else
    {
        this.setState(
            {
                filteredRestaurants: this.state.Restaurants 
            }
        )
    }
  
}
render()
{
    let navLogin=null;
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
            <ul>
            <Form inline>
                <Button variant="outline-primary" className="nav navbar-right" onClick={this.searchCusine}>Search</Button>
                <FormControl type="text" placeholder="Search" className="mr-sm-2 nav navbar-right" onChange={this.changeSearchText} />
                </Form>
                </ul>
            </div>
        );
    }
   return(
    <div>
    <nav className="navbar">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="/">GRUBHUB</a>
                        </div>
                        <div>
                          
                
                </div>
                        {navLogin}
                    </div>
                </nav>  
<ul>
   { this.state.filteredRestaurants.map(
        (restaurant)=>
        {
            console.log("restaurant image in search is "+restaurant.Cuisine);
            return <RestComponent restaurant={restaurant} key={restaurant.RestaurantID}/>
        }
    )
   }
</ul>
</div>
 )
}
}
export default Search;
