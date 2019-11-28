import React, { Component } from 'react';
import { profileaction ,updateProfile} from '../../actions/profile';
import { connect } from 'react-redux';
import '../Css/profile.css';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { imageDownload ,imageUpload} from '../../actions/image_actions';

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            show: false,
            userdetails: {},
            Name: "",
            Bio: "",
            Location: "",
            Website: "",
            BirthDate: "",
            ProfileImage: "",
            ProfileImagePreview:""
        }

    }
    async componentDidMount() {
        let userID = localStorage.getItem('cookie1');
        let post =
        {
            "userid": userID
        }
        await this.props.profileaction(post);
        console.log("Profile details are "+JSON.stringify(this.props.profiledetails));
        if (this.props.profiledetails) {  
            console.log("USER NAME IS"+this.props.profiledetails.username );
            this.setState({
                userdetails: this.props.profiledetails,
                Name:this.props.profiledetails.username,
                Bio: this.props.profiledetails.description,
                Location: this.props.profiledetails.location,
                Website: this.props.profiledetails.website_url,
                BirthDate: this.props.profiledetails.dateofbirth,
                ProfileImage: this.props.profiledetails.profileimage_url
               
            });

            if (this.state.userdetails.profileimage_url !== null) {
                await this.props.imageDownload(this.state.userdetails.profileimage_url);
                let profileimagePreview = 'data:image/jpg;base64, ' + this.props.imagePreviewresponse;
               
                this.setState({
                    ProfileImagePreview: profileimagePreview
                    
                })
            }

        }
         
    }
    updatesProfile= async (e) => {
       
        let userid = localStorage.getItem('cookie1');
        console.log("the image_upload url is ", this.state.ProfileImage);
        console.log("User id in profile is "+userid);
        axios.defaults.withCredentials = true;
        const data = {
            userID : userid,
            Name: this.state.Name,
            Bio: this.state.Bio,
            Location: this.state.Location,
            Website: this.state.Website,
            BirthDate: this.state.BirthDate,
           ProfileImage: this.state.ProfileImage.imageUrl
          
        }
        console.log("before>>>>>>>>>>>>> update response ", this.state.ProfileImage.imageUrl);
        await this.props.updateProfile(data);

       
       
        if (this.props.profiledetails) {
            this.setState({
                userdetails: this.props.profiledetails,
                show:false
             
            });
        }
  
    }
    handleClose = () => {
        this.setState(
            {
                "show": false
            }
        )
    }

    profileedit = () => {
        this.setState(
            {
                "show": true
            }
        )
    }
    handleChange = async (e) => {
        if (e.target.name === "ProfileImage") {
            console.log(e.target.files);
            var profilePhoto = e.target.files[0];
            var data = new FormData();
            data.append('image', profilePhoto);
            await this.props.imageUpload(data);
            console.log("the image_upload url is ", this.props.imageupload_url);
            this.setState(
                {
                    ProfileImage  : this.props.imageupload_url
                }
            )
            await this.props.imageDownload(this.props.imageupload_url);
                let profileimagePreview = 'data:image/jpg;base64, ' + this.props.imagePreviewresponse;
               
                this.setState({
                    ProfileImagePreview: profileimagePreview
                    
                })

        }
        else
        {
            e.preventDefault();
            const target = e.target;
            const name = target.name;
            const value = target.value;
            console.log("The values are " + name + "    ===========  " + value);
            this.setState({
                [name]: value
            });
 }
        
    }
    render() {
        let profileImageData = <img className="img-style" src="https://img.freepik.com/free-icon/user-filled-person-shape_318-74922.jpg?size=338c&ext=jpg" alt="logo" />
        if (this.state.ProfileImagePreview) {
            profileImageData = <img className="img-style" src={this.state.ProfileImagePreview} alt="logo" />
        }
     
        return (
            <div>
                <div class="row">
                    <div class="col-sm-3">
                        LEFT MENU
              </div>
                    <div class="col-sm-5 profile">
                        <div className="profilename">
                            <p>{this.state.userdetails.name}</p>
                        </div>
                        <div className="jumbotron345">
                           
                            {profileImageData}
                            
                            <div className="jumbo2">
                                <div className="para34">
                                    <br/>
                                    <br/>
                                    <div className="in">
                                        <p className="para2">{this.state.userdetails.username}</p>
                                        <button onClick={this.profileedit} className="para6">Edit Profile</button>
                                    </div><br/><br/>
                                    <p className="para3">@{this.state.userdetails.username}</p><br/><br/>
                                    
                                        <p className="para3">Born 01,Feb 2014{this.state.userdetails.dateofbirth}</p><br/><br/>
                                        <p className="para3">Joined {this.state.userdetails.created_at}</p><br/><br/>
                               
                                   
                                        <p className="para3">2 Followers</p><br/><br/>
                                        <p className="para3">3 Following</p>
                                  

                                </div>
                            </div>
                            <div>
                                <Modal className="setModal" show={this.state.show} onHide={this.handleClose} >

                                    <Modal.Body >
                                        <div className="jumbotron">
                                        <input type="file" className="btn btn-lg photo-upload-btn" onChange={this.handleChange} />
                                        </div>
                                        <h4>Name</h4>
                                        <input className="name1" name="Name" type="text" defaultValue={this.state.Name} onChange={this.handleChange}></input><br/>
                                        <h4>Profile Image</h4>
                                        <input className="name1"name="ProfileImage"  onChange={this.handleChange} type="file" /><br/>
                                        <h4>Bio</h4>
                                        <input className="name34567" type="text" defaultValue={this.state.Bio} name="Bio" className="bio" onChange={this.handleChange}/>
                                        <h4>Location</h4>
                                        <input className="name1" name="Location" defaultValue={this.state.Location} onChange={this.handleChange} type="text"></input>
                                        <h4>Website</h4>
                                        <input className="name1" name="Website" defaultValue={this.state.Website} onChange={this.handleChange} type="text"></input>
                                        <h4>Birth date</h4>
                                        <input  className="name1" name="BirthDate" defaultValue={this.state.BirthDate} onChange={this.handleChange} type="text"></input>
                                        
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={this.handleClose}>
                                            Close
                                        </Button>
                                        <Button variant="primary" onClick={this.updatesProfile}>
                                            Save Changes
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                        </div>

                    </div>
                    <div class="col-sm-4">RIGHT MENU</div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        profiledetails: state.profile.profiledetails,
        imagePreviewresponse: state.image.imagePreviewresponse,
        imageupload_url: state.image.imageupload_url

    };
}
export default connect(
    mapStateToProps,
    { profileaction, updateProfile,imageDownload,imageUpload }
)(Profile);