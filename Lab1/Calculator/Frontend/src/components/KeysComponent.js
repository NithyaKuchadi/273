import React, {Component} from 'react';
import '../index.css';

class KeysComponent extends Component {

    render() {
        return (
            <div >

            <button className="buttonstyling" value="0" onClick={val => this.props.getvalueOfButton(val.target.value)}>0</button>
            <button className="buttonstyling" value="1" onClick={val => this.props.getvalueOfButton(val.target.value)}>1</button>
            <button className="buttonstyling" value="2" onClick={val => this.props.getvalueOfButton(val.target.value)}>2</button>
            <button className="buttonstyling" value="3" onClick={val=> this.props.getvalueOfButton(val.target.value)}>3</button>
            <br/>
            <button className="buttonstyling" value="4" onClick={val=> this.props.getvalueOfButton(val.target.value)}>4</button>
            <button className="buttonstyling" value="5" onClick={val => this.props.getvalueOfButton(val.target.value)}>5</button>
            <button className="buttonstyling" value="6" onClick={val => this.props.getvalueOfButton(val.target.value)}>6</button>
            <button className="buttonstyling" value="7" onClick={val => this.props.getvalueOfButton(val.target.value)}>7</button>
            <br/> 
            <button className="buttonstyling" value="8" onClick={val=> this.props.getvalueOfButton(val.target.value)}>8</button>
            <button className="buttonstyling" value="9" onClick={val => this.props.getvalueOfButton(val.target.value)}>9</button>
            <button className="buttonstyling" value="." onClick={val => this.props.getvalueOfButton(val.target.value)}>.</button>
            <button className="buttonstyling" value="AC" onClick={val => this.props.getvalueOfButton(val.target.value)}>AC</button>
            <br/>
            <button className="buttonstyling" value="+" onClick={val=> this.props.getvalueOfButton(val.target.value)}>+</button>
            <button className="buttonstyling" value="-" onClick={val => this.props.getvalueOfButton(val.target.value)}>-</button>
            <button className="buttonstyling" value="*" onClick={val => this.props.getvalueOfButton(val.target.value)}>*</button>
            <button className="buttonstyling" value="/" onClick={val => this.props.getvalueOfButton(val.target.value)}>÷</button>
            <button className="ResultStyling" value="=" onClick={val=> this.props.getvalueOfButton(val.target.value)}>=</button>
             
        </div>

        );
    }
}


export default KeysComponent;