import React,{Component} from 'react';
import {  Modal,Button } from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../Profile/ProfileOfBuyer.css';
import { connect } from 'react-redux';
import {getAllItems,addItem,updateItem,deleteItem} from '../../actions/owner_actions';
import {imageDownload,imageUpload } from '../../actions/buyersearch';
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
async componentWillMount()
    {
        let userid=localStorage.getItem('cookie2');
        let updateSectiondata={
            "UserID":userid,
            "SectionID":this.props.data._id
        }
     await this.props.getAllItems(updateSectiondata);
       this.setState(
           {
            showItems: this.props.showItems
           }
       )
    } 

   
    onAddItem= async ()=>
    {
        let addData={
            "NameOfItem": this.state.itemName,
            "DescriptionOfItem":this.state.itemDescription,
            "PriceOfItem":this.state.itemPrice,
            "UserID": localStorage.getItem('cookie2'),
            "SectionName":this.state.SectionName,
            "ItemImage": this.state.ItemImage
            
        }
        await this.props.addItem(addData);
       this.setState(
           {  
               showItems: this.props.showItems,
               show:false
           }
       )
        
    }
    onupdateOfItem= async ()=>
    { 
        let itemid=this.state.completerowofitem._id;
       let nameofitem= this.state.completerowofitem.name;
       let descriptionofitem=this.state.completerowofitem.description;
       let priceofitem=this.state.completerowofitem.price;
       let ItemImage=this.state.completerowofitem.itemimage;
       let userid=localStorage.getItem('cookie2');
        let updateddata={
            "ItemID":itemid,
            "NameOfItem": nameofitem,
            "DescriptionOfItem":descriptionofitem,
            "PriceOfItem":priceofitem,
            "UserID":userid,
            "ItemImage":ItemImage
        }
           await  this.props.updateItem(updateddata);
           
    }
    onAdditionOfItem=()=>
    {
        this.setState(
            {
                show:true
            }
        )
    }
    ondeleteofItem= async ()=>
    {
        let data={
           itemid:this.state.rowSelectItemID
        };
       await this.props.deleteItem(data);
       
     
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
    handleItemImage=async (e)=>
    {
        let profilePhoto=e.target.value;
       let profilePhotoname=profilePhoto.slice(12);
       this.setState(
            {
                ItemImage: e.target.value
            }
        )
        
            var data = new FormData();
            data.append('photos', profilePhotoname);
           
                      await this.props.imageDownload(profilePhotoname);
                       
                                let imagePreview = 'data:image/jpg;base64, ' + this.props.imagePreviewresponse;
                                this.setState({
                                   
                                    ProfileImagePreview: imagePreview
                                })
                    
              
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
                rowSelectItemID  :row._id,
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
             <TableHeaderColumn dataField='_id' isKey={ true } hidden>Item ID</TableHeaderColumn>
             <TableHeaderColumn dataField='name' >Name of Item</TableHeaderColumn>
             <TableHeaderColumn dataField='itemimage'>Image</TableHeaderColumn>
              <TableHeaderColumn dataField='description'>Description of item</TableHeaderColumn>
              <TableHeaderColumn dataField='price'>Price of Item</TableHeaderColumn>
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
  const mapStateToProps = (state) => {
    return {
        showItems : state.owner.showItems,
        imagePreviewresponse: state.buyer.imagePreviewresponse
        
    };
  }
  export default connect(
    mapStateToProps,
    { getAllItems,addItem,updateItem,deleteItem,imageDownload,imageUpload}
  )(Items);


