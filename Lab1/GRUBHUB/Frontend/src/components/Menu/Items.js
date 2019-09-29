import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import axios from 'axios';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
//create the Navbar Component
class Items extends React.Component {
    constructor(props){
        super(props);
        this.state={
            showItems:[],
            rowSelectItemID:"",
            completerowofitem:{},
            update:"false",
            delete:"false"
        }
    }
componentWillMount()
    {
        let userid=cookie.load('cookie2');
        let updateSectiondata={
            "UserID":userid,
            "SectionID":this.props.data.SectionID
        }
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:5000/getAllItems',updateSectiondata)
        .then((response) => {
           this.setState({
            showItems : this.state.showItems.concat(response.data) 
           });
       });
    } 
    onupdateOfItem=()=>
    { 
        let itemid=this.state.rowSelectItemID;
       let nameofitem= this.state.completerowofitem.NameOfItem;
       let descriptionofitem=this.state.completerowofitem.DescriptionOfItem;
       let priceofitem=this.state.completerowofitem.PriceOfItem;
       let userid=cookie.load('cookie2');
        let updateddata={
            "ItemID":itemid,
            "NameOfItem": nameofitem,
            "DescriptionOfItem":descriptionofitem,
            "PriceOfItem":priceofitem,
            "UserID":userid
        }
           axios.defaults.withCredentials = true;
        axios.post('http://localhost:5000/UpdateItem',updateddata)
        .then((response) => {
            let data=[...this.state.showItems];
           this.setState(
               {
                showItems:data
               }
           )

       });
    }
    ondeleteofItem=()=>
    {
        let data={
           itemid:this.state.rowSelectItemID
        };
        console.log("item id is "+data.itemid);
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:5000/deleteItem',data)
        .then((response) => {
            let objs=this.state.showItems;
          for(let j=0;j<objs.length;j++)
          {
              if(objs[j].ItemID===this.state.rowSelectItemID)
              {
                  objs.splice(j,1);
              }
          }
          this.setState(
              {
                showItems:objs
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
                rowSelectItemID  :row.ItemID,
                completerowofitem:row,
                update:true,
                delete:true
              }
          ); }
         
          const selectRow = {
            mode: 'checkbox',
            clickToSelect: true,
            onSelect: onRowSelect,
            clickToExpand: true  
          };

        return (
            <div>
            <button style={ { backgroundColor: 'red' , color:"#fefefe"} } onClick={this.ondeleteofItem}>Delete Item</button>
            <button style={ { backgroundColor: 'green' , color:"#fefefe"} } onClick={this.onupdateOfItem}>Update Item</button>
          <BootstrapTable data={this.state.showItems}  selectRow={selectRow} cellEdit={ cellEditProp}>
             <TableHeaderColumn dataField='ItemID' isKey={ true } width="50">Item ID</TableHeaderColumn>
             <TableHeaderColumn dataField='NameOfItem' width="50">Name of Item</TableHeaderColumn>
              <TableHeaderColumn dataField='DescriptionOfItem' width="50">Description of item</TableHeaderColumn>
              <TableHeaderColumn dataField='PriceOfItem' width="50">Price of Item</TableHeaderColumn>
          </BootstrapTable>
          </div>);
      
    }
  }

  export default Items;