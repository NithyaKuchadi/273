import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import OwnerSignup from "./Signup/OwnerSignup";
import BuyerSignUp from "./Signup/BuyerSignUp";
import OwnerLogin from "./Login/OwnerLogin";
import ProfileOfOwner from "./Profile/ProfileOfOwner";
import ProfileOfBuyer from "./Profile/ProfileOfBuyer";
import Menu from "./Menu/Menu";
import BuyerLogin from "./Login/BuyerLogin";
import Home from "./Home/Home";
import BuyerMenu from "./Buyer/BuyerMenu";



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
               <Route path="/ProfileOfOwner" component={ProfileOfOwner}/>
                <Route path="/ProfileOfBuyer" component={ProfileOfBuyer}/>
                <Route path="/Menu" component={Menu}/>
                <Route path="/BuyerMenu" component={BuyerMenu}/>
                
               
             {redirectimage}
            </div>
        );
    }
}
//Export The Main Component
export default Main;
