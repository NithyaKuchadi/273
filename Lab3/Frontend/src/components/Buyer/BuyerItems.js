import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../Profile/ProfileOfBuyer.css';
import swal from 'sweetalert';
import { Query } from 'react-apollo';
import { menuquery } from '../../queries/profilequery';


class BuyerItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showItems:[],
            rowSelectItemID: "",
            completerowofitem: {},
            update: "false",
            delete: "false",
            show: false,
            itemName: "",
            itemDescription: "",
            itemPrice: 0,
            SectionName: "",
            ItemImage: "",
            ProfileImagePreview: undefined
        }
    }

    onAddItem = () => {
        let data = {
            "name": this.state.itemName,
            "description": this.state.itemDescription,
            "price": this.state.itemPrice,
            "restaurantname": localStorage.getItem('cookie3'),

        }
        this.props.mutate({ variables: data })
            .then(res => {
                swal(res.data.item.responseMessage);
            })
            .catch(err => {
                console.log(err);
            });


    }

    onAdditionOfItem = () => {
        this.setState(
            {
                show: true
            }
        )
    }

    handleClose = () => {
        this.setState(
            {
                show: false
            }
        )
    }
    handleItemName = (e) => {
        this.setState(
            {
                itemName: e.target.value
            }
        )
    }
    handleItemDescription = (e) => {
        this.setState(
            {
                itemDescription: e.target.value
            }
        )
    }
    handleItemPrice = (e) => {
        this.setState(
            {
                itemPrice: e.target.value
            }
        )
    }

    handleMenuSection = (e) => {
        this.setState(
            {
                SectionName: e.target.value
            }
        )
    }
    render() {
        const cellEditProp = {
            mode: 'click'
        };

        let onRowSelect = (row, isSelected) => {
            this.setState(
                {
                    rowSelectItemID: row.ItemID,
                    completerowofitem: row,
                    update: true,
                    delete: true
                }
            );
        }

        const selectRow = {
            mode: 'checkbox',
            clickToSelect: true,
            onSelect: onRowSelect,
            clickToExpand: true
        };

        return (
            <div>

               
                <Query query={menuquery}
                    variables={{ restaurantname: localStorage.getItem('cookie3') }}>

                    {({ loading, data }) => {
                        console.log("IN ITEMS   Data is ", data);
                      
                        console.log("items are ",data.menu );
                        if (loading) return <div> Fetching Profile Data....</div>;
                        return (
                            <BootstrapTable data={data.menu} selectRow={selectRow} cellEdit={cellEditProp}>
                                <TableHeaderColumn dataField='ItemID' isKey={true} hidden>Item ID</TableHeaderColumn>
                                <TableHeaderColumn dataField='name' >Name of Item</TableHeaderColumn>
                                <TableHeaderColumn dataField='description'>Description of item</TableHeaderColumn>
                                <TableHeaderColumn dataField='price'>Price of Item</TableHeaderColumn>
                               <div>
                              
                                </div>
                            </BootstrapTable>
                        );
                    }}
                </Query>
            </div>);

    }
}

export default BuyerItems;

