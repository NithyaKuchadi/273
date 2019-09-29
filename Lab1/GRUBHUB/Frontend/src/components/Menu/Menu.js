import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import axios from 'axios';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Items from './Items'
class Menu extends Component {
    constructor(props){
        super(props);
        this.state={
            showMenu:[],
            rowSelectSectionID:"",
            completerow:{},
            update:"false",
            delete:"false",
            addnewSection:""
        }
    }

    componentDidMount()
    {
        let userid=cookie.load('cookie2');
     
        let data={
            "UserID":userid
        }
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:5000/getAllSections',data)
        .then((response) => {
           this.setState({
            showMenu : this.state.showMenu.concat(response.data) 
           });
       });
      } 
    ondelete=()=>
    {
        let sectiondata={
            "sectionid":this.state.rowSelectSectionID,
            "UserID":cookie.load('cookie2')
        }
        axios.defaults.withCredentials = true;
        
        axios.post('http://localhost:5000/deleteSection',sectiondata)
        .then((response) => {
            let objs=this.state.showMenu;
          for(let j=0;j<objs.length;j++)
          {
              if(objs[j].SectionID===this.state.rowSelectSectionID)
              {
                  objs.splice(j,1);
              }
          }
          this.setState(
              {
                showMenu:objs
              }
          )
       });
    }
   
    onupdate=()=>
    { 
        let sectionid=this.state.rowSelectSectionID;
       let SectionName= this.state.completerow.SectionName;
       let userid=cookie.load('cookie2');
        let updateddata={
            "SectionId":sectionid,
            "SectionName": SectionName,
            "UserID":userid
        }
       axios.defaults.withCredentials = true;
        axios.post('http://localhost:5000/UpdateSection',updateddata)
        .then((response) => {
            let data=[...this.state.showMenu];
           this.setState(
               {
                showMenu:data
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
           <Items data={ row } />
          </div>
        )
      }
      onAddSection=(row)=>
      {
          
        let userid=cookie.load('cookie2');
        console.log("User id is "+userid);
       let SectionName= row.SectionName;
       console.log("IN Add  section.......section name...ui  "+SectionName);
        let addeddata={
            "SectionName": SectionName,
            "UserID":userid
        }
       
           axios.defaults.withCredentials = true;
        axios.post('http://localhost:5000/addSection',addeddata)
        .then((response) => {
            
            
          let SectionID= response.data.SectionID;
          console.log("Coming to response  and section ID is "+SectionID);
          let obj={
              "SectionID":SectionID,
              "SectionName":SectionName
          }
           this.setState={
            showMenu:this.state.showMenu.concat(obj)
           }
       });
        

      } 
      
    render() {
      
     const options = {
        expandRowBgColor: 'rgb(242, 255, 163)',
        expandBy: 'row',
        afterInsertRow: this.onAddSection
      };
       const cellEditProp = {
            mode: 'click'
          };
         
         let onRowSelect=(row, isSelected)=>
          {
          this.setState(
              {
                rowSelectSectionID  :row.SectionID,
                completerow:row,
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
               <button style={ { backgroundColor: 'red' , color:"#fefefe"} } onClick={this.ondelete}>Delete Section</button>
               <button style={ { backgroundColor: 'green' , color:"#fefefe"} } onClick={this.onupdate}>Update Section</button>
              
              <BootstrapTable  data={ this.state.showMenu } cellEdit={ cellEditProp} insertRow={true}  options={ options } selectRow={ selectRow }  
              expandableRow= {this.isExpandableRow}
              expandComponent= {this.expandComponent} >
              <TableHeaderColumn dataField='SectionID'  isKey={true}  width="50" hidden >Section ID</TableHeaderColumn> 
              <TableHeaderColumn dataField='SectionName' width="50">Section Name</TableHeaderColumn>
            </BootstrapTable>
          </div>
        );
      }
}

export default Menu;
