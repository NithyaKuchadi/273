import React, { Component, useState } from 'react';
import '../Css/BuyerLogin.css';
import { Modal, Button } from 'react-bootstrap';
import ItemsView from './ItemsView';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getItem, getSectionItems, imageDownload, orderItems } from '../../actions/buyersearch';
import Pagination from '../pagination/Pagination';

class DetailsView extends Component {
    constructor() {
        super();

        this.state = {
            showItems: [],
            RestaurantName: "",
            itemName: "",
            TotalPrice: 0,
            viewBag: false,
            RestaurantID: "",
            Quantity: "",
            itemID: "",
            listOfOrders: [],
            itemSelected: {},
            FinalPrice: 0,
            OrderID: "",
            modalView: true,
            show: false,
            price: 0,
            total_price: 0,
            description: "",
            orderedSuccessfully: "",
            errorInOrdering: "",
            QuantityNegativeError: "",
            item: {},
            currentPage:1,
            itemsPerPage:1
        }
        this.callBackfromItems = this.callBackfromItems.bind(this);
        this.callBackfromModal = this.callBackfromModal.bind(this);
    }
    callBackfromItems = async (listobj) => {
        this.state["itemSelected"] = listobj;
        this.state["itemName"] = listobj.ItemName;
        this.state["itemID"] = listobj.itemID;
        this.setState(
            {
                show: true
            }
        )
        let item = {
            "itemID": this.state.itemID
        }
        await this.props.getItem(item);
                let data = this.props.Itemfromreducer;
               this.setState(
                    {
                        item: data,
                        price: data.price,
                        total_price: data.price,
                        description: data.description,
                        Quantity: 1

                    }
                )
           

    }
    callBackfromModal = (childdatafrommodal) => {
        this.state["totalPrice"] = childdatafrommodal.totalPrice;
        this.state["Quantity"] = childdatafrommodal.Quantity;
        this.state["modalView"] = childdatafrommodal.modalView;

    }
    async componentDidMount() {
        let resid = this.props.location.state.RestaurantID;
        this.setState(
            {
                RestaurantName: this.props.location.state.RestaurantName,
                RestaurantID: this.props.location.state.RestaurantID
            }
        )
        let restaurantID = {
            "RestaurantID": resid
        }
        await this.props.getSectionItems(restaurantID);

        let arr = this.props.SectionITEMS;

        for (let i = 0; i < arr.length; i++) {

            let itemsarr = [];
            for (let j = 0; j < arr[i].Items.length; j++) {
                let imagePreview;
                let itemImage = arr[i].Items[j].ItemImage;
                itemImage = itemImage.slice(12);
                if (itemImage !== null) {
                    await this.props.imageDownload(itemImage);
                    imagePreview = 'data:image/jpg;base64, ' + this.props.imagePreviewresponse;
                }

                let item = {
                    "ItemID": arr[i].Items[j].ItemID,
                    "NameOfItem": arr[i].Items[j].NameOfItem,
                    "DescriptionOfItem": arr[i].Items[j].DescriptionOfItem,
                    "PriceOfItem": arr[i].Items[j].PriceOfItem,
                    "ItemImage": arr[i].Items[j].ItemImage,
                    "ProfileImagePreview": imagePreview
                }
                itemsarr.push(item);
            }
            let obj = {
                "SectionID": arr[i].SectionID,
                "SectionName": arr[i].SectionName,
                "Items": itemsarr
            }
            this.setState(
                {
                    showItems: this.state.showItems.concat(obj)
                }
            )
        }
    }

    newOrderId() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    orderItems = (e) => {
        let userID = localStorage.getItem('cookie2');
       
        this.state.listOfOrders.map(async (order) => {
            let ordereddata = {
                "usersofid": userID,
                "RestaurantID": this.state.RestaurantID,
                "Price": order.priceoforder,
                "itemsofid": order.itemID,
                "Quantity": order.Quantity,
                "StatusOfOrder": "New"
            }
          await this.props.orderItems(ordereddata);

            if (this.props.OrderSuccessfull) {
                this.state["orderedSuccessfully"] = "Order placed Successfully!!";
                this.setState(
                    {
                        FinalPrice: 0,
                        listOfOrders: []
                    }
                )
            }
            else {
                this.state["errorInOrdering"] = "Error in Ordering!!";
               
            }
        });

    }

handleClose = () => {
    this.setState(
        {
            "show": false
        }
    )
}

handleQuantity = (e) => {
    if (e.target.value > 0) {
        this.setState(
            {
                Quantity: e.target.value,
                total_price: e.target.value * this.state.price,
                QuantityNegativeError: ""
            }
        )

    }
    else {
       
        this.setState(
            {
                QuantityNegativeError: "Quantity cannot be Zero or Negative!!"
            }
        )
    }
}

handleOrders = (e) => {
    if (this.state.QuantityNegativeError === "") {
        let orderobj = {
            "itemID": this.state.itemID,
            "ItemName": this.state.itemName,
            "Quantity": this.state.Quantity,
            "priceoforder": this.state.total_price
        }
        this.setState(
            {
                show: false
            }
        )
        this.setState(
            {
                viewBag: true,
                listOfOrders: this.state.listOfOrders.concat(orderobj)
            }
        )
        this.state["FinalPrice"] = this.state.FinalPrice + parseInt(this.state.total_price);
      
    }
    else {
        this.setState(
            {
                viewBag: false,
                show: true

            }
        )
    }
}
handleLogout = () => {
    localStorage.clear();
    window.location.Redirect("/");
}
render() {
    let navLogin = null;
    if (localStorage.getItem('cookie1') === "Buyer") {
        
        navLogin = (
            <div>

                <ul className="nav navbar-right">
                    <li><Link to="/" onClick={this.handleLogout}><span className="glyphicon glyphicon-user"></span>Logout</Link></li>
                </ul>
                <ul className="nav navbar-right">
                    <li ><Link to="/ProfileOfBuyer"><span className="glyphicon glyphicon-user"></span>Profile</Link></li>
                </ul>
            </div>
        );
    }
    let view = null;
    if (this.state.viewBag) {

        view = this.state.listOfOrders.map((order) => {
            
            return (
                <div className="liststyle" key={order.itemID}>
                    <a href="#"><li className="liststyle">{order.Quantity}</li></a>
                    <a href="#"><li className="liststyle" > {order.ItemName}</li></a>
                    <a href="#"> <li className="liststyle"> ${order.priceoforder}</li></a>
                    <br></br>
                </div>

            )
        })


    }
    const indexOfLastOrder=this.state.currentPage* this.state.itemsPerPage;
    const indexOfFirstOrder= indexOfLastOrder-this.state.itemsPerPage;
    const items=this.state.showItems.slice(indexOfFirstOrder,indexOfLastOrder);
    
    let paginate=(pageNumber)=>
    {
        this.setState(
            {
            currentPage: pageNumber
            }
        )
    }
    return (
        <div>
            <div>
                <nav className="navbar">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="/Buyerlogin">GRUBHUB</a>
                        </div>
                        {navLogin}
                    </div>
                </nav>
            </div>
            <div style={{ display: "inline-flex" }}>
                <div className="restaurantCard-leftPane">
                    <div className="jumbotron3">

                    </div>
                    <h2 className="resname">{this.state.RestaurantName}</h2>
                    <ul>
                        {items.map(
                            (section) => {
                                return <ItemsView section={section} key={section._id} callBackfromItems={this.callBackfromItems} />
                            }
                        )
                        }
                        <Pagination ordersPerPage={this.state.itemsPerPage} totalOrders={this.state.showItems.length} paginate={paginate}/> 
               
                    </ul>
                </div>
                <div>
                    <Modal className="setModal" show={this.state.show} onHide={this.handleClose} centered={this.state.show}>
                        <Modal.Header className="item2">
                            <Modal.Title >{this.state.itemName}</Modal.Title>

                        </Modal.Header>
                        <Modal.Body className="item343">
                            <div className="form-group">
                                <h3>{this.state.price}$</h3>
                                <br />
                                <h3>{this.state.description}</h3>
                                <br />
                                <div style={{ color: "red" }}>{this.state.QuantityNegativeError}</div>
                                Quantity <input type="Number" defaultValue="1" min="1" max="20" className="form-group" style={{ textAlign: "center" }} onChange={this.handleQuantity} />

                            </div>
                        </Modal.Body>
                        <Modal.Footer className="item2">
                            <Button variant="primary" className="s-btn s-btn-primary u-block-xs--down s-col-sm-5 s-col-xs-12">
                                <span className="s-btn-copy" onClick={this.handleOrders}>Add to Bag: {this.state.total_price}$</span>
                            </Button>
                            <Button variant="secondary" onClick={this.handleClose} className="s-btn s-btn-primary u-block-xs--down s-col-sm-5 s-col-xs-12">
                                <span className="s-btn-copy">Close</span>
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <div className="globalCart-container s-hidden-xs s-col-xs-12 s-col-md-5 s-col-lg-3 s-pull-right isAlwaysOpen">
                    <div className="resname1">
                        <h3>Your Order</h3>
                    </div>
                    <div className="inline">
                        <ul>
                            {view}
                        </ul>
                    </div>
                    <h4>Total Price: {this.state.FinalPrice}$</h4>
                    <br />

                    <button onClick={this.orderItems}>Place Order</button>
                </div>
            </div>
        </div>
    )
}
}
const mapStateToProps = (state) => {
    return {
        Itemfromreducer: state.buyer.item,
        SectionITEMS: state.buyer.ItemSections,
        imagePreviewresponse: state.buyer.imagePreviewresponse,
        OrderSuccessfull: state.buyer.OrderSuccessfull
    };
}
export default connect(
    mapStateToProps,
    { getItem, getSectionItems, imageDownload, orderItems }
)(DetailsView);
