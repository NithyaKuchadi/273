import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import OwnerSignup from "./Signup/OwnerSignup";
import BuyerSignUp from "./Signup/BuyerSignUp";
import OwnerLogin from "./Login/OwnerLogin";
import ProfileOfOwner from "./Profile/ProfileOfOwner";
import ProfileOfBuyer from "./Profile/ProfileOfBuyer";
import Orders from "./Orders/Order";
import Menu from "./Menu/Menu";
import BuyerLogin from "./Login/BuyerLogin";
import BuyerHome from "./Home/BuyerHome";
import Home from "./Home/Home";
import Search from "./Buyer/Search";
import cookie from 'react-cookies';
import RestComponent from "./Buyer/RestComponent";
import DetailsView from './Buyer/DetailsView';
import ComposeMessage from './Inbox/ComposeMessage';
import Inbox from './Inbox/Inbox';
//Create a Main Component
class Main extends Component {
    constructor(props){
        super(props);
    }
    render(){
        let redirectimage=null;
       
        return(
            <div className="App">
                {/*Render Different Component based on Route*/}
                <Route path="/Home" component={Home}/>
                <Route path="/OwnerSignup" component={OwnerSignup}/>
                <Route path="/BuyerSignUp" component={BuyerSignUp}/>
                <Route path="/Ownerlogin" component={OwnerLogin}/>
                <Route path="/Buyerlogin" component={BuyerLogin}/>
                <Route path="/BuyerHome" component={BuyerHome}/>
                <Route path="/ProfileOfOwner" component={ProfileOfOwner}/>
                <Route path="/ProfileOfBuyer" component={ProfileOfBuyer}/>
                <Route path="/Order" component={Orders}/>
                <Route path="/Menu" component={Menu}/>
                <Route path="/Search" component={Search}/>
                <Route path="/RestComponent" component={RestComponent}/>
                <Route path="/DetailsView" component={DetailsView}/>
                <Route path="/ComposeMessage" component={ComposeMessage}/>
                <Route path="/Inbox" component={Inbox}/>
             {redirectimage}
            </div>
        );
    }
}
//Export The Main Component
export default Main;
