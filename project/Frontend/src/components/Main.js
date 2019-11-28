import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Home from "./Home/Home";
import Login from "./Login/Login";
import Profile from "./Profile/Profile";
import Signup from "./Signup/Signup";
import Messages from "./Messages/Messages";
//Create a Main Component
class Main extends Component {
    constructor(props){
        super(props);
    }
    render(){
        let redirectimage=null;
       
        return(
            <div className="App">
                <Route path="/Home" component={Home}/>
                <Route path="/Login" component={Login}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/Signup" component={Signup}/>
                <Route path="/Message" component={Messages}/>
             {redirectimage}
            </div>
        );
    }
}
//Export The Main Component
export default Main;
