import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Modal, Button } from 'react-bootstrap';
import Items from './Items'
import '../Profile/ProfileOfBuyer.css';
import swal from 'sweetalert';
import { gql, graphql } from 'react-apollo';
import { Query, Mutation } from 'react-apollo';
import { menuquery } from '../../queries/profilequery';
import { sectionmutation } from '../../mutations/signupLoginprofilemutations';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: [],
      rowSelectSectionID: "",
      completerow: {},
      addnewSection: "",
      show: false,
      SectionName: ""
    }
  }

  componentDidMount() {

  }


  isExpandableRow(row) {

    return true;
  }

  expandComponent(row) {
    return (
      <div>
        <Items data={row} />
      </div>
    )
  }
  onAddSectionbuttonclick = () => {
    this.setState(
      {
        show: true
      }
    )
  }
  onAddSection = () => {

    let restaurantname = localStorage.getItem('cookie3');
    let data = {
      "sectioname": this.state.SectionName,
      "restaurantname": restaurantname
    };
    this.props.mutate({ variables: data })
      .then(res => {
        swal(res.data.createsection.responseMessage);
      })
      .catch(err => {
        console.log(err);
      });


  }
  handleClose = () => {
    this.setState(
      {
        show: false
      }
    )
  }
  handleSectionName = (e) => {
    this.setState(
      {
        SectionName: e.target.value
      }
    )
  }
  handleLogout = () => {
    localStorage.clear();
    window.location.Redirect("/OwnerLogin");
  }
  render() {
    let navLogin = null;
    if (localStorage.getItem('cookie1') === "Owner") {
      navLogin = (
        <div>

          <ul className="nav navbar-right">
            <li><Link to="/OwnerLogin" onClick={this.handleLogout}><span className="glyphicon glyphicon-user"></span>Logout</Link></li>
          </ul>
          <ul className="nav navbar-right">
            <li ><Link to="/ProfileOfOwner"><span className="glyphicon glyphicon-user"></span>Profile</Link></li>
          </ul>
        </div>
      );
    }
    const options = {
      expandRowBgColor: 'rgb(242, 255, 163)',
      expandBy: 'row',
      afterInsertRow: this.onAddSection
    };
    const cellEditProp = {
      mode: 'click'
    };

    let onRowSelect = (row, isSelected) => {
      this.setState(
        {
          rowSelectSectionID: row.SectionID,
          completerow: row,
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
        <Modal className="setModal143" show={this.state.show} onHide={this.handleClose} centered={this.state.show}>
          <Modal.Header className="item2">
            <Modal.Title >Add Section</Modal.Title>
          </Modal.Header>
          <Modal.Body className="item3">
            <div className="form-group">
              Section Name <input type="text" className="form-control" onChange={this.handleSectionName} />
            </div>
          </Modal.Body>
          <Modal.Footer className="item2">
            <Button variant="primary" className="s-btn s-btn-primary u-block-xs--down s-col-sm-5 s-col-xs-12">
              <span className="s-btn-copy" onClick={this.onAddSection}>Save</span>
            </Button>
            <Button variant="secondary" onClick={this.handleClose} className="s-btn s-btn-primary u-block-xs--down s-col-sm-5 s-col-xs-12">
              <span className="s-btn-copy">Close</span>
            </Button>
          </Modal.Footer>
        </Modal>
        <nav className="navbar">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="/OwnerLogin">GRUBHUB</a>
            </div>
            {navLogin}
          </div>
        </nav>
        <Query query={menuquery}
          variables={{ restaurantname: localStorage.getItem('cookie3') }}>
         {({ loading, data }) => {
            console.log("Data is ",data);
            if (loading) return <div> Fetching Profile Data....</div>;
            return (
              <div>
                <button style={{ backgroundColor: 'green', color: "#fefefe" }} onClick={this.onAddSectionbuttonclick}>Add Section</button>
                <BootstrapTable data={data.menu} cellEdit={cellEditProp} options={options} selectRow={selectRow}
                  expandableRow={this.isExpandableRow}
                  expandComponent={this.expandComponent} >
                  <TableHeaderColumn dataField='_id'  isKey={true}>Section ID</TableHeaderColumn>
                  <TableHeaderColumn dataField='sectionname'>Section Name</TableHeaderColumn>
                </BootstrapTable>
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

Menu = graphql(sectionmutation)(Menu)
export default Menu;
