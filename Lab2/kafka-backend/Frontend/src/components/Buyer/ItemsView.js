import React, {Component} from 'react';
import '../Css/BuyerLogin.css';
import DetailsView from './DetailsView';
import {Redirect} from 'react-router';
import '../Profile/ProfileOfBuyer.css';
import axios from 'axios';
class ItemsView extends Component
{
    constructor()
    {
        super();
        this.state={
            section:[],
            Items:[],
            itemID:"",
            itemName:"",
            modalView:false,
            selectedItemName:"",
            obj:{},
            totalPrice:0,
           Quantity:1
        }
        this.itemhandle=this.itemhandle.bind(this);
       
    }
    componentDidMount()
    {this.setState({
        section: this.state.section.concat(this.props.section),
        Items: this.state.Items.concat(this.props.section.Items)
       } )
     
    }
 
    itemhandle=(e)=>
    { 
        this.state["itemID"]=e.target.getAttribute("item_id");
        this.state["itemName"]=e.target.getAttribute("item_name");
        this.state["modalView"]=true;
      if(this.state.modalView)
        { 
                  let data={
                      "ItemName":this.state.itemName,
                      "itemID": this.state.itemID
                  }
                  this.state["obj"]= data;
              
                  let x=this.state.obj;
                 
            this.props.callBackfromItems(data);
            }
      
    }
    
    render()
    {

       let items= this.props.section.Items.map( (item)=>{

        let profileImageData = <img className="img-style2" src="https://img.freepik.com/free-icon/user-filled-person-shape_318-74922.jpg?size=338c&ext=jpg" alt="logo" />
        if (item.ProfileImagePreview) {

            profileImageData = <img className="img-style2" src={item.ProfileImagePreview} alt="logo" />
        }
        
         return   ( 
          <div className="col-md-6" onClick={this.itemhandle} key={item.ItemID} item_id={item.ItemID}  item_name={item.NameOfItem}> 
                  <div className="imageitem"  item_id={item.ItemID}  item_name={item.NameOfItem} >
                  <div item_id={item.ItemID}  item_name={item.NameOfItem} style={{ display: "inline-flex" }}>
                    <div item_id={item.ItemID}  item_name={item.NameOfItem} className="imageitem">
                    <p key={item.ItemID} item_id={item.ItemID}  item_name={item.NameOfItem}>  {profileImageData} </p>
                   
                   </div>
                   <div className="rightsidebutton311" item_id={item.ItemID}  item_name={item.NameOfItem}> 
                   <h3  item_id={item.ItemID}  item_name={item.NameOfItem}>   {item.NameOfItem} </h3>
                   <p item_id={item.ItemID}  item_name={item.NameOfItem}>{item.DescriptionOfItem} </p>
                   <p item_id={item.ItemID}  item_name={item.NameOfItem}>${item.PriceOfItem}</p>
                   </div>
                   </div>
                   </div>
           </div>


         )
        }
   ) 
        
       return( 
           <div>
           <div className="container">
       <div className="box-1" >
          <li>
            <h3 style={{"font-weight":"bold"}}> {this.props.section.SectionName}</h3> 
          </li>
          </div>
          </div>
          <div className="row">
            <ul>
                {items}  
              </ul>
             </div>
 </div>
          ) 
    }
}
export default ItemsView;
