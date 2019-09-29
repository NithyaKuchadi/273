import React, { Component } from 'react';
import KeysComponent from './components/KeysComponent';
import DisplayComponent from './components/DisplayComponent';

class App extends Component {

  constructor(){
    super();
    this.state = {
        result: ""
       
    }
}
valueOfButton = button => {
  if(button==='=')
  {
    console.log("Result button "+encodeURIComponent(this.state.result));
    try {
      console.log(typeof(this.state.result));
//encodeURIComponent(_this.state.result)

fetch("/"+encodeURIComponent(this.state.result)).then(res=>res.json()).then(x=>this.setState({result: x}));
   
    } catch (error) {
      console.log("Error: Address in Use or couldnot fetch from backend server"+error);
    }


  }
  else if(button==="AC")
  {
 this.setState(
   {result: ""}
 )
  }
 else{
   this.setState(
     {
       result: this.state.result+button
     }
   )

 }

  } 
render() {
    return (
        <div>
            <div className="calculator-body">
                <h1>Calculator Application</h1>
                <DisplayComponent result={this.state.result}/>
                <KeysComponent getvalueOfButton={this.valueOfButton}/>
            </div>
        </div>
    );
}
}
export default App;
