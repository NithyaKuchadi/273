import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import axios from 'axios';
import '../Profile/ProfileOfBuyer.css';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { Row, Col } from "react-bootstrap";
import { connect } from 'react-redux';
import {getOrders_old, getOrders_new,updateOrder} from '../../actions/owner_actions';

//create the Navbar Component
class Order extends Component {
    constructor(props){
        super(props);
        this.state={
            showOrders:[],
            rowSelectOrderID:"",
            completerow:{},
            update:"false",
            delete:"false",
            showOrders_old:[],
            showOrders_new:[]
        }
    }

    async componentDidMount()
    {
       let userid= localStorage.getItem('cookie2');
        await this.props.getOrders_old(userid);
        await this.props.getOrders_new(userid);
           this.setState({
            showOrders_old : this.props.showOrders_old,
            showOrders_new : this.props.showOrders_new
           });
    } 
   
    onupdate= async ()=>
    { 
        let id=this.state.rowSelectOrderID;
       let StatusOfOrder= this.state.completerow.StatusOfOrder;
       let userid=cookie.load('cookie2');
        let updateddata={
            "id":id,
            "StatusOfOrder": StatusOfOrder,
            "UserID":userid
        }
        console.log("updated data"+updateddata.id+updateddata.StatusOfOrder+updateddata.UserID);
        await this.props.updateOrder(updateddata);
       
        this.setState(
               {
                showOrders:this.props.showOrders
               }
           )
    }
    handleLogout = () => {
        localStorage.clear();
        window.location.Redirect("/OwnerLogin");
    }
    render() {
        let navLogin=null;
    if(localStorage.getItem('cookie1')==="Owner"){
        console.log("Able to read cookie, in Owner");
        navLogin = (
            <div>
           
            <ul className="nav navbar-right">
                    <li><Link to="/OwnerLogin" onClick = {this.handleLogout}><span className="glyphicon glyphicon-user"></span>Logout</Link></li>
            </ul>
            <ul className="nav navbar-right">
                    <li ><Link to="/ProfileOfOwner"><span className="glyphicon glyphicon-user"></span>Profile</Link></li>
            </ul>
            <ul className="nav navbar-right">
                    <li ><Link to="/Menu"><span></span>Menu</Link></li>
            </ul>
            </div>
        );
    }
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
              <nav className="navbar">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="/OwnerLogin">GRUBHUB</a>
                    </div>
                    {navLogin}
                </div>
            </nav> 
            <h2 className="Container" style={{textAlign:"center"}}>Orders</h2>
               
               <button style={ { backgroundColor: 'green' , color:"#fefefe"} } onClick={this.onupdate}>Update Order</button>
              <div >
              <h3>New Orders</h3>   
            <BootstrapTable className="halfsize" data={ this.state.showOrders_new } selectRow={ selectRow}  cellEdit={ cellEditProp}>
              <TableHeaderColumn dataField='OrderID' isKey={ true } hidden >Order ID</TableHeaderColumn>
              <TableHeaderColumn dataField='PersonName' >Name</TableHeaderColumn>
              <TableHeaderColumn dataField='Address' >Address</TableHeaderColumn>
              <TableHeaderColumn dataField='Item' >Item</TableHeaderColumn>
              <TableHeaderColumn dataField='Quantity' >Quantity</TableHeaderColumn>
              <TableHeaderColumn dataField='Price' >Price</TableHeaderColumn>
              <TableHeaderColumn dataField='StatusOfOrder'  >StatusOfOrder</TableHeaderColumn>
            </BootstrapTable>
            <h3>Old Orders</h3>
            <BootstrapTable  className="halfsize" data={ this.state.showOrders_old } selectRow={ selectRow}  cellEdit={ cellEditProp}>
            <TableHeaderColumn dataField='OrderID' isKey={ true } hidden >Order ID</TableHeaderColumn>
              <TableHeaderColumn dataField='PersonName' >Name</TableHeaderColumn>
              <TableHeaderColumn dataField='Address' >Address</TableHeaderColumn>
              <TableHeaderColumn dataField='Item' >Item</TableHeaderColumn>
              <TableHeaderColumn dataField='Quantity' >Quantity</TableHeaderColumn>
              <TableHeaderColumn dataField='Price' >Price</TableHeaderColumn>
              <TableHeaderColumn dataField='StatusOfOrder'>StatusOfOrder</TableHeaderColumn>
            </BootstrapTable>
            </div>
          </div>
        );
      }


}
const mapStateToProps = (state) => {
    return {
        showOrders_old : state.owner.showOrders_old,
        showOrders_new : state.owner.showOrders_new,
        showOrders : state.owner.showOrders
        
    };
}
export default connect(
    mapStateToProps,
    { getOrders_old, getOrders_new ,updateOrder}
)(Order);

