import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../Profile/ProfileOfBuyer.css';
import swal from 'sweetalert';
import { gql, graphql } from 'react-apollo';
import { Query, Mutation } from 'react-apollo';
import { menuquery } from '../../queries/profilequery';
import { itemmutation } from '../../mutations/signupLoginprofilemutations';

class Items extends React.Component {
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

                <button style={{ backgroundColor: 'green', color: "#fefefe" }} onClick={this.onAdditionOfItem}>Add Item</button>
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
                               <Modal className="setModal" show={this.state.show} onHide={this.handleClose} centered={this.state.show}>
                                        <Modal.Header className="Itemsitem2">
                                            <Modal.Title >Add Item</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body className="Itemsitem3">
                                            <div style={{ display: "inline-flex" }} >
                                                <div className="leftsidebutton143">

                                                </div>
                                                <div className="rightsidebutton143">

                                                    Name <input type="text" className="form-control" onChange={this.handleItemName} />
                                                    Description <input type="text" className="form-control" onChange={this.handleItemDescription} />
                                                    Price <input type="text" className="form-control" onChange={this.handleItemPrice} />
                                                    Menu Section <input type="text" className="form-control" onChange={this.handleMenuSection} />
                                                </div>
                                            </div>
                                        </Modal.Body>
                                        <Modal.Footer className="Itemsitem2">
                                            <Button variant="primary" className="s-btn s-btn-primary u-block-xs--down s-col-sm-5 s-col-xs-12">
                                                <span className="s-btn-copy" onClick={this.onAddItem}>Save</span>
                                            </Button>
                                            <Button variant="secondary" onClick={this.handleClose} className="s-btn s-btn-primary u-block-xs--down s-col-sm-5 s-col-xs-12">
                                                <span className="s-btn-copy">Close</span>
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </div>
                            </BootstrapTable>
                        );
                    }}
                </Query>
            </div>);

    }
}

Items = graphql(itemmutation)(Items)
export default Items;

