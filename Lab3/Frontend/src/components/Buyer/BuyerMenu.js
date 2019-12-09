import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Modal, Button } from 'react-bootstrap';
import BuyerItems from './BuyerItems'
import '../Profile/ProfileOfBuyer.css';
import swal from 'sweetalert';
import { Query } from 'react-apollo';
import { menuquery } from '../../queries/profilequery';

class BuyerMenu extends Component {
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
        <BuyerItems data={row} />
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

export default BuyerMenu;
