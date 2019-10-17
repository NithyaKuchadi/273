import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Modal, Button } from 'react-bootstrap';
import Items from './Items'
import '../Profile/ProfileOfBuyer.css';
import { connect } from 'react-redux';
import {getAllSections,addSection,updateSection,deleteSection} from '../../actions/owner_actions';

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

  async componentDidMount() {
   
    let userid = localStorage.getItem('cookie2');
    let data = {
      "UserID": userid
    }
     await this.props.getAllSections(data);
      this.setState({
          showMenu: this.props.showMenu
        });
  }
  ondelete = async () => {
    let sectiondata = {
      "sectionid": this.state.rowSelectSectionID,
      "UserID": localStorage.getItem('cookie2')
    }
    await this.props.deleteSection(sectiondata);
        this.setState(
          {
            showMenu: this.props.showMenu
          }
        )
     
  }

  onupdate = async () => {
    let sectionid = this.state.rowSelectSectionID;
    let SectionName = this.state.completerow.SectionName;
    let userid = localStorage.getItem('cookie2');
    let updateddata = {
      "SectionId": sectionid,
      "SectionName": SectionName,
      "UserID": userid
    }
   await this.props.updateSection(updateddata);
     
        this.setState
        ({
            showMenu: this.props.showMenu
          })
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
  onAddSection =async () => {

    let userid = localStorage.getItem('cookie2');
    console.log("User id is " + userid);
    let SectionName = this.state.SectionName;
    console.log("IN Add  section.......section name...ui  " + SectionName);
    let addeddata = {
      "SectionName": SectionName,
      "UserID": userid
    }
    await this.props.addSection(addeddata);
    
    this.setState(
    {
      showMenu: this.props.showMenu,
      show: false
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
const mapStateToProps = (state) => {
  return {
      showMenu : state.owner.showMenu
      
  };
}
export default connect(
  mapStateToProps,
  { getAllSections,addSection,updateSection,deleteSection}
)(Menu);

