import React, {Component} from 'react';
import '../Css/BuyerLogin.css';
import axios from 'axios';
import { Jumbotron } from 'react-bootstrap';
import ItemsView from './ItemsView';
import {Button, Modal} from 'react-bootstrap';
import {Redirect} from 'react-router';


class ModalView extends Component
{
    constructor() {
        super();
        this.state={
            itemID:"",
            item:{},
            Quantity:1,
            price:1,
            total_price: 0,
            bagView:false,
            modalView:true
          
        }
        this.handleQuantity=this.handleQuantity.bind(this);
     }
     
     handleQuantity=(e)=>
     {
        console.log("Quantity value is "+e.target.value);

        this.setState(
            {
                Quantity: e.target.value,
                total_price: e.target.value * this.state.price
            }
        )
    
        console.log("price after quantity change is " +this.state.price);
     }
     handleOrders=(e)=>
     { 
         console.log("Adding item-id: "+ this.state.itemID + " Qty: " + this.state.Quantity + " to cart");
         this.setState(
             {
                 bagView:true
             }
         )
         let obj={
             "totalPrice": this.state.total_price,
             "Quantity":this.state.Quantity,
             "bagView": true,
             "modalView":false
         }
       let sendData = () => {
        this.props.callBackfromModal(obj);
        }

        console.log(JSON.stringify(this.state))
        sendData();
        
     }

    componentDidMount()
    { console.log("in modal view did mount");
        let itemID=this.props.result;
        this.setState({itemID: itemID});

        let item={
            "itemID":itemID
        }
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:5000/getItemsONItemID',item)
        .then((response) => {
            let data=response.data;
            console.log("Response data:"+data.PriceOfItem);
                    this.setState(
                        {
                        item : data,
                        price: data.PriceOfItem,
                        total_price: data.PriceOfItem,
                        Quantity: 1

                    }
                    )
                console.log("item name "+this.state.item.NameOfItem);  
  
                console.log("item description "+this.state.item.DescriptionOfItem); 
                })
    }
    
    componentWillUnmount() {
        this.state.modalView = false;
      }

render()
{ console.log("is it cumng here??");
    return (
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Modal heading
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Centered Modal</h4>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
              consectetur ac, vestibulum at eros.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      );     

}   
}
export default ModalView;
