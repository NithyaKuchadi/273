import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import axios from 'axios';
import {  Modal,Button } from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../Profile/ProfileOfBuyer.css';
//create the Navbar Component
class Items extends React.Component {
    constructor(props){
        super(props);
        this.state={
            showItems:[],
            rowSelectItemID:"",
            completerowofitem:{},
            update:"false",
            delete:"false",
            show:false,
            itemName:"",
            itemDescription:"",
            itemPrice:0,
            SectionName:"",
            ItemImage:"",
            ProfileImagePreview:undefined
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
    onAddItem=()=>
    {
        let addData={
            "NameOfItem": this.state.itemName,
            "DescriptionOfItem":this.state.itemDescription,
            "PriceOfItem":this.state.itemPrice,
            "UserID": cookie.load('cookie2'),
            "SectionName":this.state.SectionName,
            "ItemImage": this.state.ItemImage
            
        }
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:5000/addItem',addData)
        .then((response) => {
            console.log("In response..."+response.data);
           this.setState(
               {
                showItems:response.data,
                show:false,
                ProfileImagePreview:undefined
               }
           )

       });

    }
    onupdateOfItem=()=>
    { 
        let itemid=this.state.rowSelectItemID;
       let nameofitem= this.state.completerowofitem.NameOfItem;
       let descriptionofitem=this.state.completerowofitem.DescriptionOfItem;
       let priceofitem=this.state.completerowofitem.PriceOfItem;
       let ItemImage=this.state.completerowofitem.ItemImage;
       let userid=cookie.load('cookie2');
        let updateddata={
            "ItemID":itemid,
            "NameOfItem": nameofitem,
            "DescriptionOfItem":descriptionofitem,
            "PriceOfItem":priceofitem,
            "UserID":userid,
            "ItemImage":ItemImage
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
    onAdditionOfItem=()=>
    {
        this.setState(
            {
                show:true
            }
        )
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
    handleClose=()=>
    {
      this.setState(
        {
          show:false
        }
      )
    }
    handleItemName=(e)=>
    {
       this.setState(
           {
            itemName: e.target.value
           }
       )
    }
    handleItemDescription=(e)=>
    {
       this.setState(
           {
            itemDescription: e.target.value
           }
       )
    }
    handleItemPrice=(e)=>
    {
        this.setState(
            {
                itemPrice:e.target.value
            }
        )
    }
    handleItemImage=(e)=>
    {
        let profilePhoto=e.target.value;
        console.log("profile photo is "+profilePhoto);
        let profilePhotoname=profilePhoto.slice(12);
        console.log("name is "+profilePhotoname);
        this.setState(
            {
                ItemImage: e.target.value
            }
        )
        
            var data = new FormData();
            data.append('photos', profilePhotoname);
            axios.defaults.withCredentials = true;
            axios.post('http://localhost:5000/upload-file', data)
                .then(response => {
                    if (response.status === 200) {
                       
                        //Download image
                        axios.post('http://localhost:5000/download-file/' + profilePhotoname)
                            .then(response => {
                                let imagePreview = 'data:image/jpg;base64, ' + response.data;
                                this.setState({
                                   
                                    ProfileImagePreview: imagePreview
                                })

                            }).catch((err) => {
                                if (err) {
                                    this.setState({
                                        errorRedirect: true
                                    })
                                }
                            });
                    }
                });
       
    }
    handleMenuSection=(e)=>
    {
        this.setState(
            {
                SectionName:e.target.value
            }
        )
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
          let profileImageData = <img className="img-style" src="https://img.freepik.com/free-icon/user-filled-person-shape_318-74922.jpg?size=338c&ext=jpg" alt="logo" />
          if (this.state.ProfileImagePreview) {
              profileImageData = <img className="img-style" src={this.state.ProfileImagePreview} alt="logo" />
          }
        return (
            <div>
            <button style={ { backgroundColor: 'red' , color:"#fefefe"} } onClick={this.ondeleteofItem}>Delete Item</button>
            <button style={ { backgroundColor: 'orange' , color:"#fefefe"} } onClick={this.onupdateOfItem}>Update Item</button>
            <button style={ { backgroundColor: 'green' , color:"#fefefe"} } onClick={this.onAdditionOfItem}>Add Item</button>
          <BootstrapTable data={this.state.showItems}  selectRow={selectRow} cellEdit={ cellEditProp}>
             <TableHeaderColumn dataField='ItemID' isKey={ true } hidden>Item ID</TableHeaderColumn>
             <TableHeaderColumn dataField='NameOfItem' >Name of Item</TableHeaderColumn>
             <TableHeaderColumn dataField='ItemImage'>Image</TableHeaderColumn>
              <TableHeaderColumn dataField='DescriptionOfItem'>Description of item</TableHeaderColumn>
              <TableHeaderColumn dataField='PriceOfItem'>Price of Item</TableHeaderColumn>
              <div>
              <Modal  className="setModal"  show={this.state.show} onHide={this.handleClose} centered={this.state.show}>
             <Modal.Header  className="Itemsitem2">
            <Modal.Title >Add Item</Modal.Title>
             </Modal.Header>
             <Modal.Body className="Itemsitem3">
                     <div style={{ display: "inline-flex" }} >
                    <div className="leftsidebutton143">
                    {profileImageData}
                    </div>
                    <div className="rightsidebutton143">
                    Image  <input type="file" name="ProfileImage" id="ProfileImage" className="btn btn-lg photo-upload-btn" onChange={this.handleItemImage} />  
                     Name <input type="text" className="form-control" onChange={this.handleItemName}/>
                     Description <input type="text" className="form-control" onChange={this.handleItemDescription}/>
                     Price <input type="text" className="form-control" onChange={this.handleItemPrice}/>
                     Menu Section <input type="text" className="form-control" onChange={this.handleMenuSection}/>
                     </div>
                     </div>
              </Modal.Body>
              <Modal.Footer  className="Itemsitem2">
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
          </div>);
      
    }
  }

  export default Items;
