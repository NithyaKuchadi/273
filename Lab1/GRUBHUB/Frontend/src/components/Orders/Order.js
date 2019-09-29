import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import axios from 'axios';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
//create the Navbar Component
class Order extends Component {
    constructor(props){
        super(props);
        this.state={
            showOrders:[],
            rowSelectOrderID:"",
            completerow:{},
            update:"false",
            delete:"false"
        }
    }

    componentDidMount()
    {
        let userid=cookie.load('cookie2');
     
        let updateSectiondata={
            "UserID":userid
        }
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:5000/showOrders',updateSectiondata)
        .then((response) => {
           //update the state with the response data
           this.setState({
               showOrders : this.state.showOrders.concat(response.data) 
           });
       });
       console.log("output is "+this.state.showOrders);

    } 
    ondelete=()=>
    {
        let id={
            "id":this.state.rowSelectOrderID,
            "UserID":cookie.load('cookie2')
        }
        axios.defaults.withCredentials = true;
        
        axios.post('http://localhost:5000/CancelOrder',id)
        .then((response) => {
            let objs=this.state.showOrders;
          for(let j=0;j<objs.length;j++)
          {
              if(objs[j].OrderID===this.state.rowSelectOrderID)
              {
                  objs.splice(j,1);
              }
          }
          this.setState(
              {
                showOrders:objs
              }
          )
       });
    }
    
    onupdate=()=>
    { let id=this.state.rowSelectOrderID;
       let StatusOfOrder= this.state.completerow.StatusOfOrder;
       let userid=cookie.load('cookie2');
        let updateddata={
            "id":id,
            "StatusOfOrder": StatusOfOrder,
            "UserID":userid
        }
        console.log("updated data"+updateddata.id+updateddata.StatusOfOrder+updateddata.UserID);
      
           axios.defaults.withCredentials = true;
        axios.post('http://localhost:5000/UpdateOrder',updateddata)
        .then((response) => {
            let data=[...this.state.showOrders];
            // data.push(this.state.completerow);
           this.setState(
               {
                showOrders:data
               }
           )

       });
    
    }
   
    render() {
       const cellEditProp = {
            mode: 'click'
          };
        
         let onRowSelect=(row, isSelected)=>
          {
          this.setState(
              {
                rowSelectOrderID  :row.OrderID,
                completerow:row,
                update:true,
                delete:true
              }
          );
          
          }
         
          const selectRow = {
            mode: 'checkbox',
            clickToSelect: true,
            onSelect: onRowSelect,
          
          };
        const status=["New","Ready","Delivered"];
        return (
           <div>
              
               <button style={ { backgroundColor: 'red' , color:"#fefefe"} } onClick={this.ondelete}>Delete Order</button>
               
               <button style={ { backgroundColor: 'green' , color:"#fefefe"} } onClick={this.onupdate}>Update Order</button>
               
              <BootstrapTable  data={ this.state.showOrders } selectRow={ selectRow}  cellEdit={ cellEditProp}>
              <TableHeaderColumn dataField='OrderID' isKey={ true }>Order ID</TableHeaderColumn>
              <TableHeaderColumn dataField='PersonName' >Person Name</TableHeaderColumn>
              <TableHeaderColumn dataField='Address' >Person Address</TableHeaderColumn>
              <TableHeaderColumn dataField='Item' >Item</TableHeaderColumn>
              <TableHeaderColumn dataField='Quantity' >Quantity</TableHeaderColumn>
              <TableHeaderColumn dataField='Price' >Price</TableHeaderColumn>
              <TableHeaderColumn dataField='StatusOfOrder'  >Status Of Order</TableHeaderColumn>
            </BootstrapTable>
          </div>
        );
      }


}

export default Order;
