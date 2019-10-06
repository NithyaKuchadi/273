import React, { Component, useState } from 'react';
import '../Css/BuyerLogin.css';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import ItemsView from './ItemsView';
import cookie from 'react-cookies';
import { runInThisContext } from 'vm';
import { Link } from 'react-router-dom';
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
            QuantityNegativeError: ""
        }
        this.callBackfromItems = this.callBackfromItems.bind(this);
        this.callBackfromModal = this.callBackfromModal.bind(this);
    }
    callBackfromItems = (listobj) => {
        console.log("selected item: " + listobj.itemID);
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
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:5000/getItemsONItemID', item)
            .then((response) => {
                let data = response.data;
                console.log("Response data:" + data.PriceOfItem);
                this.setState(
                    {
                        item: data,
                        price: data.PriceOfItem,
                        total_price: data.PriceOfItem,
                        description: data.DescriptionOfItem,
                        Quantity: 1

                    }
                )
            })

    }
    callBackfromModal = (childdatafrommodal) => {
        this.state["totalPrice"] = childdatafrommodal.totalPrice;
        this.state["Quantity"] = childdatafrommodal.Quantity;
        this.state["modalView"] = childdatafrommodal.modalView;

        if (this.state["itemsArray"] != null && this.state["itemsArray"] != 'None') {
            console.log("Total items (old): " + this.state["itemsArray"].length)
        }

    }
    componentDidMount() {
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
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:5000/getItemsSections', restaurantID)
            .then(async (response) => {
                let arr = response.data;

                for (let i = 0; i < arr.length; i++) {

                    let itemsarr = [];
                    for (let j = 0; j < arr[i].Items.length; j++) {
                        let imagePreview;
                        let itemImage = arr[i].Items[j].ItemImage;
                        itemImage = itemImage.slice(12);
                        if (itemImage !== null) {
                            await axios.post('http://localhost:5000/download-file/' + itemImage)
                                .then(response => {
                                    imagePreview = 'data:image/jpg;base64, ' + response.data;

                                });
                        }

                        let item = {
                            "ItemID":arr[i].Items[j].ItemID,
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
                console.log("SHOW ITEMS data ------------ " + response.data);
            })
        console.log("SHOW ITEMS ------------ " + this.state.showItems);
    }

    newOrderId() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    orderItems = (e) => {

        console.log("going to backend");
        let userID = cookie.load("cookie2");
        this.state.listOfOrders.map((order) => {
            let ordereddata = {
                "usersofid": userID,
                "RestaurantID": this.state.RestaurantID,
                "Price": order.priceoforder,
                "itemsofid": order.itemID,
                "Quantity": order.Quantity,
                "StatusOfOrder": "New"
            }
            console.log("itemsofid is " + order.itemID);
            axios.defaults.withCredentials = true;
            axios.post('http://localhost:5000/OrderItem', ordereddata)
                .then(response => {
                    console.log("Status Code : ====> ", response.status);
                    if (response.status === 200) {
                        console.log("successfully Ordered");
                        this.state["orderedSuccessfully"] = "Order placed Successfully!!";
                        this.setState(
                            {
                                FinalPrice: 0,
                                listOfOrders:[]
                            }
                        )
                    }
                    else {
                        this.state["errorInOrdering"] = "Error in Ordering!!";
                        console.log("Error !!! in Order");
                    }
                });

        })
       

    }
    handleClose = () => {
        this.setState(
            {
                "show": false
            }
        )
    }

    handleQuantity = (e) => {
        console.log("Quantity value is " + e.target.value);
        if (e.target.value > 0) {
            this.setState(
                {
                    Quantity: e.target.value,
                    total_price: e.target.value * this.state.price,
                    QuantityNegativeError: ""
                }
            )

            console.log("price after quantity change is " + this.state.price);
        }
        else {
            console.log("is it in negative loop?");
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
            console.log("View Bag state is " + this.state.viewBag);
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
        cookie.remove('cookie1', { path: '/' })
        cookie.remove('cookie2', { path: '/' })
        cookie.remove('cookie3', { path: '/' })
        window.location.Redirect("/");
    }
    render() {
        let navLogin = null;
        if (cookie.load('cookie1') === "Buyer") {
            console.log("Able to read cookie, in buyer");
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
                            {this.state.showItems.map(
                                (section) => {
                                    return <ItemsView section={section} key={section.SectionID} callBackfromItems={this.callBackfromItems} />
                                }
                            )
                            }
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
export default DetailsView;
