import React, { Component } from 'react';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import axios from 'axios';
import './ProfileOfBuyer.css';
import { Link } from 'react-router-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import validator from 'validator';
import { connect } from 'react-redux';
import { profileDetailsofBuyer, pastOrdersofBuyer, upcomingOrdersofBuyer, updateBuyerProfile } from '../../actions/profile_actions';
import { imageDownload ,imageUpload} from '../../actions/buyersearch';
import Card from './Card';
import Reorder from 'react-reorder';
import Pagination from '../pagination/Pagination';

class ProfileOfBuyer extends Component {
    constructor() {
        super();
        this.state = {
            Name: "",
            Email: "",
            hide_profile: false,
            hide_pastOrders: true,
            hide_upcomingOrders: true,
            hide_address: true,
            update_Name: false,
            Original_Name: true,
            update_Email: false,
            Original_Email: true,
            errorRedirect: false,
            PhoneNumber: "",
            update_PhoneNumber: false,
            Original_PhoneNumber: true,
            ProfileImage: "",
            ProfileImagePreview: undefined,
            update_ProfileImage: false,
            Original_ProfileImage: true,
            showPastOrders: [],
            showUpcomingOrders: [],
            Address: "",
            Original_Address: true,
            update_Address: false,
            PhoneNumberError: "",
            currentPage: 1,
            ordersPerPage: 3
        }
    }
    updateProfileName = async (e) => {
        e.preventDefault();
        let userID = localStorage.getItem('cookie2');
        axios.defaults.withCredentials = true;

        const data = {
            Name: this.state.Name,
            Email: this.state.Email,
            ProfileImage: this.state.ProfileImage,
            Address: this.state.Address,
            PhoneNumber: this.state.PhoneNumber,
            UserID: userID
        }
        await this.props.updateBuyerProfile(data);

        this.setState(
            {
                Original_Name: true,
                update_Name: false
            })

    }
    updatePhoneNumber = async (e) => {
        e.preventDefault();
        let userID = localStorage.getItem('cookie2');
        axios.defaults.withCredentials = true;
        const data = {
            Name: this.state.Name,
            Email: this.state.Email,
            ProfileImage: this.state.ProfileImage,
            Address: this.state.Address,
            PhoneNumber: this.state.PhoneNumber,
            UserID: userID
        }
        if (!validator.isMobilePhone(this.state.PhoneNumber)) {
            this.setState(
                {
                    PhoneNumberError: "Not in Correct Format!!"
                }
            )
        }
        else {
            await this.props.updateBuyerProfile(data);

            this.setState(
                {
                    Original_PhoneNumber: true,
                    update_PhoneNumber: false

                })

        }
    }
    updateAddress = async (e) => {
        e.preventDefault();
        let userID = localStorage.getItem('cookie2');
        axios.defaults.withCredentials = true;
        const data = {
            Name: this.state.Name,
            Email: this.state.Email,
            ProfileImage: this.state.ProfileImage,
            Address: this.state.Address,
            PhoneNumber: this.state.PhoneNumber,
            UserID: userID
        }
        await this.props.updateBuyerProfile(data);

        this.setState(
            {
                Original_Address: true,
                update_Address: false

            })

    }
    updateProfileImage = async (e) => {
        e.preventDefault();
        let userID = localStorage.getItem('cookie2');
        axios.defaults.withCredentials = true;

        const data = {
            Name: this.state.Name,
            Email: this.state.Email,
            ProfileImage: this.state.ProfileImage,
            Address: this.state.Address,
            PhoneNumber: this.state.PhoneNumber,
            UserID: userID
        }
        await this.props.updateBuyerProfile(data);

        this.setState(
            {
                Original_ProfileImage: true,
                update_ProfileImage: false

            })
    }
    updateProfileEmail = async (e) => {
        e.preventDefault();
        let userID = localStorage.getItem('cookie2');
        axios.defaults.withCredentials = true;

        const data = {
            Name: this.state.Name,
            Email: this.state.Email,
            ProfileImage: this.state.ProfileImage,
            Address: this.state.Address,
            PhoneNumber: this.state.PhoneNumber,
            UserID: userID
        }
        await this.props.updateBuyerProfile(data);

        this.setState(
            {
                Original_Email: true,
                update_Email: false

            })

    }
    handleChange = async (e) => {

        if (e.target.name === "ProfileImage") {
           var profilePhoto = e.target.files[0];
            var data = new FormData();
            data.append('photos', profilePhoto);
            
            this.setState({
                ProfileImage: profilePhoto.name
            })
            await this.props.imageUpload(profilePhoto.name);
        
              if (this.props.imageupload_success) {

                        await this.props.imageDownload(profilePhoto.name);
                        let imagePreview = 'data:image/jpg;base64, ' + this.props.imagePreviewresponse;
                        this.setState({
                            ProfileImage: profilePhoto.name,
                            ProfileImagePreview: imagePreview
                        })


                    }
                
        }
        else {
            const target = e.target;
            const name = target.name;
            const value = target.value;
            this.setState({
                [name]: value
            });
           
        }
    }

    async componentDidMount() {
        let userID = localStorage.getItem('cookie2');
        let userid =
        {
            "userID": userID
        }
        await this.props.pastOrdersofBuyer(userid);
        this.setState({
            showPastOrders: this.props.pastOrders
        });

        await this.props.upcomingOrdersofBuyer(userid);
        this.setState({
            showUpcomingOrders: this.props.upcomingOrders
        });

        let emailID = localStorage.getItem('cookie3');
        let userType = localStorage.getItem('cookie1');
        let data1 = {
            "Email": emailID,
            "UserType": userType
        }

        await this.props.profileDetailsofBuyer(data1);

        if (this.props.buyerProfile) {
            var data = this.props.buyerProfile;
            this.setState({
                Name: data.UserName,
                Email: data.Email,
                PhoneNumber: data.PhoneNumber,
                ProfileImage: data.ProfileImage,
                Address: data.Address

            });
           if (data.ProfileImage !== null) {
                await this.props.imageDownload(data.ProfileImage);
                let imagePreview = 'data:image/jpg;base64, ' + this.props.imagePreviewresponse;
                this.setState({
                    ProfileImagePreview: imagePreview
                })


            }
        }


    }
    handleLogout = () => {
        localStorage.clear();
        window.location.Redirect("/");
    }
    render() {
        if (!cookie.load('cookie1')) {
            <Redirect to="/Buyerlogin" />
        }
        let navLogin = null;
        if (localStorage.getItem('cookie1') === "Buyer") {
           navLogin = (
                <div>

                    <ul className="nav navbar-right">
                        <li><Link to="/Buyerlogin" onClick={this.handleLogout}><span className="glyphicon glyphicon-user"></span>Logout</Link></li>
                    </ul>
                    <ul className="nav navbar-right">
                        <li ><Link to="/Inbox"><span className="glyphicon glyphicon-user"></span>Inbox</Link></li>
                    </ul>
                </div>
            );
        }

        let ProfileClick = (e) => {
            this.setState(
                {
                    hide_profile: false,
                    hide_pastOrders: true,
                    hide_address: true,
                    hide_upcomingOrders: true
                }
            )
        }

        let PastOrdersClick = (e) => {
            this.setState(
                {
                    hide_profile: true,
                    hide_pastOrders: false,
                    hide_address: true,
                    hide_upcomingOrders: true
                }
            )
        }
        let AddressClick = (e) => {
            this.setState(
                {
                    hide_address: false,
                    hide_profile: true,
                    hide_pastOrders: true,
                    hide_upcomingOrders: true

                }
            )
        }
        let UpcomingOrdersClick = (e) => {
            this.setState(
                {
                    hide_profile: true,
                    hide_pastOrders: true,
                    hide_upcomingOrders: false
                }
            )
        }
        let InboxClick = (e) => {
            this.setState(
                {
                    hide_profile: true,
                    hide_pastOrders: true,
                    hide_upcomingOrders: true
                }
            )
        }
        
        let updateName = (e) => {
            this.setState(
                {
                    update_Name: true,
                    Original_Name: false
                }
            )
        }
        let updateEmail = (e) => {
            this.setState(
                {
                    update_Email: true,
                    Original_Email: false
                }
            )
        }
        let updatePhoneNumber = (e) => {
            this.setState(
                {
                    update_PhoneNumber: true,
                    Original_PhoneNumber: false
                }
            )
        }
        let updateAddress = (e) => {
            this.setState(
                {
                    update_Address: true,
                    Original_Address: false
                }
            )
        }
        let updateImage = (e) => {
            this.setState(
                {
                    update_ProfileImage: true,
                    Original_ProfileImage: false
                }
            )
        }


        let profileImageData = <img className="img-style" src="https://img.freepik.com/free-icon/user-filled-person-shape_318-74922.jpg?size=338c&ext=jpg" alt="logo" />
        if (this.state.ProfileImagePreview) {
            profileImageData = <img className="img-style" src={this.state.ProfileImagePreview} alt="logo" />
        }
        
        const indexOfLastOrder = this.state.currentPage * this.state.ordersPerPage;
        const indexOfFirstOrder = indexOfLastOrder - this.state.ordersPerPage;
        const orders = this.state.showUpcomingOrders.slice(indexOfFirstOrder, indexOfLastOrder);
        
        let paginate = (pageNumber) => {
            this.setState(
                {
                    currentPage: pageNumber
                }
            )
        }
        return (
            <div className="row">
                <nav className="navbar">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="/Buyerlogin">GRUBHUB</a>
                        </div>
                        {navLogin}
                    </div>
                </nav>
                <div className="col-sm-3">
                    <h3 className="h2-id">Your Account</h3>
                    {profileImageData}
                    <ul>
                        <li onClick={ProfileClick} className="li-id"><Link to="/ProfileOfBuyer">Profile</Link></li>
                        <li onClick={AddressClick} className="li-id"><Link to="/ProfileOfBuyer">Address and Phone</Link></li>
                        <li onClick={PastOrdersClick} className="li-id"><Link to="/ProfileOfBuyer">Past orders</Link></li>
                        <li onClick={UpcomingOrdersClick} className="li-id"><Link to="/ProfileOfBuyer">Upcoming orders</Link></li>
                        <li onClick={InboxClick} className="li-id"><Link to="/Inbox">Messaging</Link></li>
                       
                    </ul>
                </div>

                {!this.state.hide_profile && <div className="col-sm-9" >
                    <h3> Your Account</h3>

                    {this.state.Original_ProfileImage && <div>
                        <li className="li-id1">
                            <div style={{ display: "inline-flex" }}>
                                <div>
                                    <p className="name">Profile Image</p>
                                    <p>{this.state.ProfileImage}</p>
                                </div>
                                <div className="rightsidebutton">
                                    <p className="testing" onClick={updateImage}> <Link to="/ProfileOfBuyer">Edit</Link></p>
                                </div>
                            </div>
                        </li>
                    </div>}
                    {this.state.update_ProfileImage && <div>
                        <form>
                            <div className="form-group">
                                <h4>Edit ProfileImage</h4>
                                <input type="file" name="ProfileImage" id="ProfileImage" className="btn btn-lg photo-upload-btn" onChange={this.handleChange} />
                            </div>
                            <button onClick={this.updateProfileImage} className="profilename">Save</button>
                            <button className="profileCancel">Cancel</button>
                            <br />
                        </form>
                    </div>}
                    <div>
                        <ul>
                            {this.state.Original_Name && <div>
                                <li className="li-id1">
                                    <div style={{ display: "inline-flex" }}>
                                        <div>
                                            <p className="name">Name</p>
                                            <p>{this.state.Name}</p>
                                        </div>
                                        <div className="rightsidebutton">
                                            <p onClick={updateName}> <Link to="/ProfileOfBuyer">Edit</Link></p>
                                        </div>
                                    </div>
                                </li >
                            </div>}
                            {this.state.update_Name && <div>
                                <form>
                                    <div className="form-group">
                                        <h4>Edit name</h4>

                                        <input type="text" name="Name" id="Name" className="form-control form-control-lg" placeholder="UserName" onChange={this.handleChange} value={this.state.Name} />

                                    </div>
                                    <button onClick={this.updateProfileName} className="profilename">Edit name</button>
                                    <button className="profileCancel">Cancel</button>
                                    <br />
                                </form>
                            </div>}
                            {this.state.Original_Email && <div>
                                <li className="li-id1">
                                    <div style={{ display: "inline-flex" }}>
                                        <div>
                                            <p className="name">Email</p>
                                            <p>{this.state.Email}</p>
                                        </div>
                                        <div className="rightsidebutton">
                                            <p onClick={updateEmail}> <Link to="/ProfileOfBuyer">Edit</Link></p>

                                        </div>
                                    </div>
                                </li>
                            </div>}
                            {this.state.update_Email && <div>
                                <form onSubmit={this.updateProfileEmail} method="post" autoComplete="off">
                                    <div className="form-group">
                                        <h4>Edit email</h4>
                                        <input type="email" name="Email" id="Email" className="form-control form-control-lg" placeholder="Email address" onChange={this.handleChange} value={this.state.Email} />
                                    </div>
                                    <input type="submit" className="profilename" value="Update email" />
                                    <br />
                                    <button className="profileCancel">Cancel</button>
                                    <br />
                                </form>
                            </div>}

                            <div>
                                <li className="li-id1"> <a href="/"> <button className="facebook_button_profile"> </button><span>Continue with Facebook</span> </a></li>
                            </div>
                            <div>
                                <li className="li-id1">
                                    <a href="/">
                                        <button className="google_button_profile"> </button>
                                        <span>Continue with Google</span> </a>
                                </li>
                            </div>
                        </ul>
                    </div>
                </div>}

                {!this.state.hide_pastOrders && <div className="col-sm-9">
                    <h3>Past Orders </h3>
                    <BootstrapTable className="col-sm-9" data={this.state.showPastOrders}>
                        <TableHeaderColumn dataField='OrderID' hidden isKey={true} width="40">Order ID</TableHeaderColumn>
                        <TableHeaderColumn dataField='RestaurantName' width="40">Restaurant Name</TableHeaderColumn>
                        <TableHeaderColumn dataField='NameOfItem' width="40">Item</TableHeaderColumn>
                        <TableHeaderColumn dataField='Quantity' width="40">Quantity</TableHeaderColumn>
                        <TableHeaderColumn dataField='Price' width="40">Price</TableHeaderColumn>
                        <TableHeaderColumn dataField='StatusOfOrder' width="40">Status</TableHeaderColumn>
                    </BootstrapTable>
                </div>}

                {!this.state.hide_upcomingOrders && <div >

                    <div>
                        {this.state.showUpcomingOrders.length > 0 ?
                            <div style={{ display: "flex" }}>

                                <Reorder
                                    // The key of each object in your list to use as the element key
                                    itemKey='OrderID'
                                    // The milliseconds to hold an item for before dragging begins
                                    holdTime={200}
                                    // The list to display
                                    list={orders}
                                    // A template to display for each list item
                                    template={Card}
                                    // Function that is called once a reorder has been performed
                                    callback={this.callback}
                                    // Class to be applied to the outer list element
                                    listClass='row'
                                    // Class to be applied to each list item's wrapper element
                                    itemClass=''
                                />

                            </div>
                            :
                            <div>
                                <h2 style={{ margin: "3em" }}>No Upcoming Orders!</h2>
                            </div>
                        }
                    </div>
                    <Pagination ordersPerPage={this.state.ordersPerPage} totalOrders={this.state.showUpcomingOrders.length} paginate={paginate} />
                </div>}
                {!this.state.hide_address && <div className="col-sm-9" >
                    <h3>Addresses </h3>

                    {this.state.Original_Address && <div>
                        <li className="li-id1">
                            <div style={{ display: "inline-flex" }}>
                                <div>
                                    <p className="name">Address</p>
                                    <p>{this.state.Address}</p>
                                </div>
                                <div className="rightsidebutton">
                                    <p onClick={updateAddress}> <Link to="/ProfileOfBuyer">Edit</Link></p>
                                </div>
                            </div>
                        </li>
                    </div>}
                    {this.state.update_Address && <div>
                        <form>
                            <div className="form-group">
                                <h4>Edit Address</h4>

                                <input type="text" name="Address" id="Address" className="form-control form-control-lg" placeholder="Address" onChange={this.handleChange} value={this.state.Address} />

                            </div>
                            <button onClick={this.updateAddress} className="profilename">Edit Address</button>
                            <button className="profileCancel">Cancel</button>
                            <br />
                        </form>
                    </div>}

                    {this.state.Original_PhoneNumber && <div>
                        <li className="li-id1">
                            <div style={{ display: "inline-flex" }}>
                                <div>
                                    <p className="name">Phone Number</p>
                                    <p>{this.state.PhoneNumber}</p>
                                </div>
                                <div className="rightsidebutton">

                                    <p onClick={updatePhoneNumber}> <Link to="/ProfileOfBuyer">Edit</Link></p>
                                </div>
                            </div>
                        </li>
                    </div>}
                    {this.state.update_PhoneNumber && <div>
                        <form>
                            <div className="form-group">
                                <h4>Edit Phone Number</h4>
                                <div style={{ color: "red" }}>{this.state.PhoneNumberError}</div>
                                <input type="text" name="PhoneNumber" id="PhoneNumber" className="form-control form-control-lg" placeholder="Phone Number" onChange={this.handleChange} value={this.state.PhoneNumber} />

                            </div>
                            <button onClick={this.updatePhoneNumber} className="profilename">Save Changes</button>
                            <button className="profileCancel">Cancel</button>
                            <br />
                        </form>
                    </div>}
                </div>}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        buyerProfile: state.profile.buyerProfileDetails,
        pastOrders: state.profile.getPastOrders,
        upcomingOrders: state.profile.getUpcomingOrders,
        imagePreviewresponse: state.buyer.imagePreviewresponse,
        imageupload_success: state.buyer.imageupload_success
    };
}
export default connect(
    mapStateToProps,
    { profileDetailsofBuyer, pastOrdersofBuyer, upcomingOrdersofBuyer, imageDownload, updateBuyerProfile,imageUpload }
)(ProfileOfBuyer);
