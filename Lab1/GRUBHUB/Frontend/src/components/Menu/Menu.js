import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import axios from 'axios';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Modal, Button } from 'react-bootstrap';
import Items from './Items'
import '../Profile/ProfileOfBuyer.css';
class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: [],
      rowSelectSectionID: "",
      completerow: {},
      update: "false",
      delete: "false",
      addnewSection: "",
      show: false,
      SectionName: ""
    }
  }

  componentDidMount() {
    let userid = cookie.load('cookie2');
    console.log("user id is " + userid);

    let data = {
      "UserID": userid
    }
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:5000/getAllSections', data)
      .then((response) => {
        console.log("All sections data is " + response.data.SectionID);
        this.setState({
          showMenu: this.state.showMenu.concat(response.data)
        });
        console.log("show menu state is " + this.state.showMenu);
      });
  }
  ondelete = () => {
    let sectiondata = {
      "sectionid": this.state.rowSelectSectionID,
      "UserID": cookie.load('cookie2')
    }
    axios.defaults.withCredentials = true;

    axios.post('http://localhost:5000/deleteSection', sectiondata)
      .then((response) => {

        console.log("response data is " + response.data);
        this.setState(
          {
            showMenu: response.data
          }
        )
      });
  }

  onupdate = () => {
    let sectionid = this.state.rowSelectSectionID;
    let SectionName = this.state.completerow.SectionName;
    let userid = cookie.load('cookie2');
    let updateddata = {
      "SectionId": sectionid,
      "SectionName": SectionName,
      "UserID": userid
    }
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:5000/UpdateSection', updateddata)
      .then((response) => {
        let data = [...this.state.showMenu];
        this.setState(
          {
            showMenu: data
          }
        )

      });
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

    let userid = cookie.load('cookie2');
    console.log("User id is " + userid);
    let SectionName = this.state.SectionName;
    console.log("IN Add  section.......section name...ui  " + SectionName);
    let addeddata = {
      "SectionName": SectionName,
      "UserID": userid
    }

    axios.defaults.withCredentials = true;
    axios.post('http://localhost:5000/addSection', addeddata)
      .then((response) => {
        this.setState(
          {
            showMenu: response.data,
            show: false

          }
        )

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
    cookie.remove('cookie1', { path: '/' })
    cookie.remove('cookie2', { path: '/' })
    cookie.remove('cookie3', { path: '/' })
    window.location.Redirect("/OwnerLogin");
  }
  render() {
    let navLogin = null;
    if (cookie.load('cookie1') === "Owner") {
      console.log("Able to read cookie, in Owner");
      navLogin = (
        <div>

          <ul className="nav navbar-right">
            <li><Link to="/OwnerLogin" onClick={this.handleLogout}><span className="glyphicon glyphicon-user"></span>Logout</Link></li>
          </ul>
          <ul className="nav navbar-right">
            <li ><Link to="/ProfileOfOwner"><span className="glyphicon glyphicon-user"></span>Profile</Link></li>
          </ul>
          <ul className="nav navbar-right">
            <li ><Link to="/Order"><span></span>Orders</Link></li>
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
        <button style={{ backgroundColor: 'red', color: "#fefefe" }} onClick={this.ondelete}>Delete Section</button>
        <button style={{ backgroundColor: 'orange', color: "#fefefe" }} onClick={this.onupdate}>Update Section</button>
        <button style={{ backgroundColor: 'green', color: "#fefefe" }} onClick={this.onAddSectionbuttonclick}>Add Section</button>
        <BootstrapTable data={this.state.showMenu} cellEdit={cellEditProp} options={options} selectRow={selectRow}
          expandableRow={this.isExpandableRow}
          expandComponent={this.expandComponent} >
          <TableHeaderColumn dataField='SectionID'  isKey={true}>Section ID</TableHeaderColumn>
          <TableHeaderColumn dataField='SectionName'>Section Name</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default Menu;
