import React, {Component} from 'react';
import '../Css/BuyerLogin.css';
import DetailsView from './DetailsView';
import {Redirect} from 'react-router';
import ModalView from './ModalView';
import '../Profile/ProfileOfBuyer.css';
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
    {console.log(" ================="+this.props.section.Items);
       this.setState({
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
         return   ( 
          <div className="col-md-6" onClick={this.itemhandle} key={item.ItemID} item_id={item.ItemID}  item_name={item.NameOfItem}> 
                  <div className="item"  item_id={item.ItemID}  item_name={item.NameOfItem} >
                  <div style={{ display: "inline-flex" }}>
                    <div>
                   <h3 key={item.ItemID} item_id={item.ItemID}  item_name={item.NameOfItem}>   {item.NameOfItem} </h3>
                   <p item_id={item.ItemID}  item_name={item.NameOfItem}>{item.DescriptionOfItem} </p>
                   </div>
                   <div className="rightsidebutton3">
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
