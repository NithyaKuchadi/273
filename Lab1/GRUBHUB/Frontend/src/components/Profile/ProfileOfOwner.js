import React, { Component } from 'react';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import axios from 'axios';
import './ProfileOfBuyer.css';
import {Link} from 'react-router-dom';
const sha1 = require('sha1');
class ProfileOfOwner extends Component
{
   constructor()
  {
    super();
    this.state={
        Name: "",
        Email:"",
        hide_profile:false,
        update_Name:false,
        Original_Name:true,
        update_Email:false,
        Original_Email:true,
        PhoneNumber:"",
        RestaurantName:"",
        Cuisine:"",
        update_PhoneNumber:false,
        Original_PhoneNumber:true,
        update_RestaurantName:false,
        Original_RestaurantName:true,
        update_Cuisine:false,
        Original_Cuisine:true,
        errorRedirect:false,
        ProfileImage: "",
        ProfileImagePreview: undefined,
        update_ProfileImage:false,
        Original_ProfileImage:true,
        RestaurantImage:"",
        RestaurantImagePreview: undefined,
        update_RestaurantImage:false,
        Original_RestaurantImage:true
        
    }
    }
    updateProfileName=(e)=>
    {
        e.preventDefault();
        let userID=  cookie.load('cookie2');
            axios.defaults.withCredentials = true;
    
            const data = {
                        Name: this.state.Name,
                        UserID:userID
            }
            console.log('Data: ', data);
            axios.post('http://localhost:5000/updateUserName', data)
                .then(response => {
                    if (response.status === 200) {
                        console.log('Updated the profile');
                       this.setState(
                       {
                        Original_Name:true,
                        update_Name:false
                       })
                    }
                }).catch((err) =>{
                    if(err){
                        this.setState({
                            errorRedirect: true
                        })
                    }
                });
    }
    updateProfileImage=(e)=>
    {
        e.preventDefault();
        let userID=  cookie.load('cookie2');
          axios.defaults.withCredentials = true;
  
          const data = {
              ProfileImage: this.state.ProfileImage,
              UserID:userID
          }
          console.log('Data: ', data);
          axios.post('http://localhost:5000/updateProfileImage', data)
              .then(response => {
                  if (response.status === 200) {
                      console.log('Updated the profile');
                      this.setState(
                        {
                            Original_ProfileImage:true,
                            update_ProfileImage:false

                        })
                }
            }).catch((err) =>{
                if(err){
                    this.setState({
                        errorRedirect: true
                    })
                }
            });
    }
    updateRestaurantImage=(e)=>
    {
        e.preventDefault();
        let userID=  cookie.load('cookie2');
          axios.defaults.withCredentials = true;
  
          const data = {
              RestaurantImage: this.state.RestaurantImage,
              UserID:userID
          }
          console.log('Data: ', data);
          axios.post('http://localhost:5000/updateRestaurantImage', data)
              .then(response => {
                  if (response.status === 200) {
                      console.log('Updated the profile');
                      this.setState(
                        {
                            Original_RestaurantImage:true,
                            update_RestaurantImage:false

                        })
                }
            }).catch((err) =>{
                if(err){
                    this.setState({
                        errorRedirect: true
                    })
                }
            });
    }
    updateProfileEmail=(e)=>
    {
        e.preventDefault();
      let userID=  cookie.load('cookie2');
        axios.defaults.withCredentials = true;
        const data = {
            Email: this.state.Email,
            UserID:userID
        }
        console.log('Data: ', data);
        axios.post('http://localhost:5000/updateEmail', data)
            .then(response => {
                if (response.status === 200) {
                    console.log('Updated the profile');
                    this.setState(
                        {
                            Original_Email:true,
                            update_Email:false

                        })
                }
            }).catch((err) =>{
                if(err){
                    this.setState({
                        errorRedirect: true
                    })
                }
            });
    }
    updatePhoneNumber=(e)=>
    {
      e.preventDefault();
      let userID =  cookie.load('cookie2');
        axios.defaults.withCredentials = true;
        const data = {
            PhoneNumber: this.state.PhoneNumber,
            UserID:userID
        }
        console.log('Data: ', data);
        axios.post('http://localhost:5000/updatePhoneNumber', data)
            .then(response => {
                if (response.status === 200) {
                    console.log('Updated the profile');
                    this.setState(
                        {
                            Original_PhoneNumber:true,
                            update_PhoneNumber:false

                        })
                }
            }).catch((err) =>{
                if(err){
                    this.setState({
                        errorRedirect: true
                    })
                }
            });
    }
    updateRestaurantName=(e)=>
    {
      e.preventDefault();
      let userID =  cookie.load('cookie2');
        axios.defaults.withCredentials = true;
        const data = {
            RestaurantName: this.state.RestaurantName,
            UserID:userID
        }
        console.log('Data: ', data);
        axios.post('http://localhost:5000/updateRestaurantName', data)
            .then(response => {
                if (response.status === 200) {
                    console.log('Updated the profile');
                    this.setState(
                        {
                            Original_RestaurantName:true,
                            update_RestaurantName:false

                        })
                }
            }).catch((err) =>{
                if(err){
                    this.setState({
                        errorRedirect: true
                    })
                }
            });
    }
    updateCuisine=(e)=>
    {
      e.preventDefault();
      let userID =  cookie.load('cookie2');
        axios.defaults.withCredentials = true;
        const data = {
            Cuisine: this.state.Cuisine,
            UserID:userID
        }
        console.log('Data: ', data);
        axios.post('http://localhost:5000/updateCuisine', data)
            .then(response => {
                if (response.status === 200) {
                    console.log('Updated the profile');
                    this.setState(
                        {
                            Original_Cuisine:true,
                            update_Cuisine:false

                        })
                }
            }).catch((err) =>{
                if(err){
                    this.setState({
                        errorRedirect: true
                    })
                }
            });
    }
    handleChange = (e) => {
        if (e.target.name === "ProfileImage") {
            console.log(e.target.files);
            var profilePhoto = e.target.files[0];
            var data = new FormData();
            data.append('photos', profilePhoto);
            axios.defaults.withCredentials = true;
            axios.post('http://localhost:5000/upload-file', data)
                .then(response => {
                    if (response.status === 200) {
                        console.log('Profile Photo Name: ', profilePhoto.name);
                        console.log(profilePhoto);
                        //Download image
                        axios.post('http://localhost:5000/download-file/' + profilePhoto.name)
                            .then(response => {
                                let imagePreview = 'data:image/jpg;base64, ' + response.data;
                                this.setState({
                                    ProfileImage: profilePhoto.name,
                                    ProfileImagePreview: imagePreview
                                })

                            }).catch((err) =>{
                                if(err){
                                    this.setState({
                                        errorRedirect: true
                                    })
                                }
                            });
                    }
                });
        }
        else if (e.target.name === "RestaurantImage") {
            console.log(e.target.files);
            var profilePhoto = e.target.files[0];
            var data = new FormData();
            data.append('photos', profilePhoto);
            axios.defaults.withCredentials = true;
            axios.post('http://localhost:5000/upload-file', data)
                .then(response => {
                    if (response.status === 200) {
                        console.log('Profile Photo Name: ', profilePhoto.name);
                        //Download image
                        axios.post('http://localhost:5000/download-file/' + profilePhoto.name)
                            .then(response => {
                                let imagePreview = 'data:image/jpg;base64, ' + response.data;
                                this.setState({
                                    RestaurantImage: profilePhoto.name,
                                    RestaurantImagePreview: imagePreview
                                })

                            }).catch((err) =>{
                                if(err){
                                    this.setState({
                                        errorRedirect: true
                                    })
                                }
                            });
                    }
                });
        }
        else
        {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        });
        console.log("value changed: "+[name]+"   "+value);
    }
    }

    componentDidMount() 
    {
        let emailID=cookie.load('cookie3');
        let data={
            "Email": emailID
        }
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:5000/getProfileDetails',data)
            .then(response => {
                if (response.status === 200) {
                    var data = response.data;
                    this.setState({
                        Name: data.UserName,
                        Email: data.Email,
                        PhoneNumber: data.PhoneNumber,
                        RestaurantName:data.RestName,
                        Cuisine:data.Cuisine,
                        ProfileImage:data.ProfileImage,
                        RestaurantImage:data.RestaurantImage

 });
 console.log('Profile Photo Name: ', data.ProfileImage);

 //Download image
 if(data.ProfileImage!==null)
 {
 axios.post('http://localhost:5000/download-file/' + data.ProfileImage)
     .then(response => {
         let imagePreview = 'data:image/jpg;base64, ' + response.data;
         this.setState({
             ProfileImagePreview: imagePreview
         })

     });
 }
                }
                else
                {
           console.log("Could not fetch data");
                }
            })
        }
   render()
  {
      if(!cookie.load('cookie1'))
      {
          <Redirect to="/Ownerlogin"/>
      }
     let ProfileClick=(e)=>
      {
         this.setState(
             {
                hide_profile:false 
             }
         )
       }
       let updateName=(e)=>
      {
         this.setState(
             {
                update_Name:true ,
                Original_Name:false
             }
         )
       }
       let updateEmail=(e)=>
      {
         this.setState(
             {
                update_Email:true ,
                Original_Email:false
             }
         )
       }
       let updatePhoneNumber=(e)=>
       {
          this.setState(
              {
                update_PhoneNumber:true ,
                 Original_PhoneNumber:false
              }
          )
        }
        
        let updateCuisine=(e)=>
        {
           this.setState(
               {
                 update_Cuisine:true ,
                  Original_Cuisine:false
               }
           )
         }
         let updateRestaurantName=(e)=>
        {
           this.setState(
               {
                 update_RestaurantName:true ,
                  Original_RestaurantName:false
               }
           )
         }
         let updateImage=(e)=>
        {
           this.setState(
               {
                 update_ProfileImage:true ,
                  Original_ProfileImage:false
               }
           )
         }
         let updateRestaurantImage=(e)=>
         {
            this.setState(
                {
                  update_RestaurantImage:true ,
                   Original_RestaurantImage:false
                }
            )
          }
        let profileImageData = <img className="img-style" src="https://img.freepik.com/free-icon/user-filled-person-shape_318-74922.jpg?size=338c&ext=jpg" alt="logo" />
        if (this.state.ProfileImagePreview) {
            profileImageData = <img class="img-style" src={this.state.ProfileImagePreview} alt="logo" />
        }
        let restaurantImageData = <img className="img-style" src="https://img.freepik.com/free-icon/user-filled-person-shape_318-74922.jpg?size=338c&ext=jpg" alt="logo" />
        if (this.state.RestaurantImagePreview) {
            restaurantImageData = <img class="img-style" src={this.state.RestaurantImagePreview} alt="logo" />
        }
     return(    
        <div className="row">
            <div className="col-sm-3">
                <h3 className="h2-id">Your Account</h3>
                {profileImageData}
                {restaurantImageData}
                <ul>
                     <button onClick={ProfileClick}><li className="li-id">Profile</li></button>  
                    <li className="li-id"><Link to="/ProfileOfBuyer">Past orders</Link></li>
                    <li className="li-id"><Link to="/ProfileOfBuyer">Upcoming orders</Link></li>
                </ul>
             </div>

             {!this.state.hide_profile && <div className="col-sm-9 mar" >
                <h3> Your Account</h3>
                {this.state.Original_ProfileImage &&  <div>
                     <li className="li-id1"> <p className="name">Profile Image</p> <p>{this.state.ProfileImage}</p> <button onClick={updateImage}>Edit</button> </li>
                     </div>}
                {this.state.update_ProfileImage && <div>
                      <form>
                      <div className="form-group">
                          <h4>Edit ProfileImage</h4>
                          <input type="file" name="ProfileImage" id="ProfileImage" className="btn btn-lg photo-upload-btn" onChange={this.handleChange}/>   
                       </div>
                        <button onClick={this.updateProfileImage} className="profilename">Save</button>
                        <button className="profileCancel">Cancel</button>
                        <br/>
                       </form>
                     </div>}
                <div>
                   <ul>
                   {this.state.Original_Name && <div>
                     <li className="li-id1"> 
                     <p className="name">Name</p> 
                     <p>{this.state.Name}</p> 
                     <button onClick={updateName}>Edit</button> 
                     </li >
                     </div>}
                     {this.state.update_Name && <div>
                      <form>
                      <div className="form-group">
                          <h4>Edit name</h4>

                          <input type="text" name="Name" id="Name" className="form-control form-control-lg" placeholder="UserName" onChange={this.handleChange} value={this.state.Name} />
                          
                       </div>
                        <button onClick={this.updateProfileName} className="profilename">Save Changes</button>
                        <button className="profileCancel">Cancel</button>
                        <br/>
                       </form>
                     </div>}
                     {this.state.Original_Email &&  <div>
                     <li className="li-id1"> <p className="name">Email</p> <p>{this.state.Email}</p> <button onClick={updateEmail}>Edit</button> </li>
                     </div>}
                     {this.state.update_Email && <div>
                      <form>
                      <div className="form-group">
                          <h4>Edit email</h4>
                          <input type="text" name="Email" id="Email" className="form-control form-control-lg" placeholder="Email address" onChange={this.handleChange} value={this.state.Email} />
                       </div>
                        <button onClick={this.updateProfileEmail} className="profilename">Save Changes</button><br/>
                        <button className="profileCancel">Cancel</button>
                        <br/>
                       </form>
                     </div>}
                     {this.state.Original_PhoneNumber &&  <div>
                     <li className="li-id1"> <p className="name">Phone Number</p> <p>{this.state.PhoneNumber}</p> <button onClick={updatePhoneNumber}>Edit</button> </li>
                     </div>}
                     {this.state.update_PhoneNumber && <div>
                      <form>
                      <div className="form-group">
                          <h4>Edit Phone Number</h4>

                          <input type="text" name="PhoneNumber" id="PhoneNumber" className="form-control form-control-lg" placeholder="Phone Number" onChange={this.handleChange} value={this.state.PhoneNumber} />
                          
                       </div>
                        <button onClick={this.updatePhoneNumber} className="profilename">Save Changes</button>
                        <button className="profileCancel">Cancel</button>
                        <br/>
                       </form>
                     </div>}
                     {this.state.Original_RestaurantName &&  <div>
                     <li className="li-id1"> <p className="name">Restaurant Name</p> <p>{this.state.RestaurantName}</p> <button onClick={updateRestaurantName}>Edit</button> </li>
                     </div>}
                     {this.state.update_RestaurantName && <div>
                      <form>
                      <div className="form-group">
                          <h4>Edit RestaurantName</h4>

                          <input type="text" name="RestaurantName" id="RestaurantName" className="form-control form-control-lg" placeholder="RestaurantName" onChange={this.handleChange} value={this.state.RestaurantName} />
                          
                       </div>
                        <button onClick={this.updateRestaurantName} className="profilename">Save Changes</button>
                        <button className="profileCancel">Cancel</button>
                        <br/>
                       </form>
                     </div>}
                    
                {this.state.Original_RestaurantImage &&  <div>
                     <li className="li-id1"> <p className="name">Restaurant Image</p> <p>{this.state.RestaurantImage}</p> <button onClick={updateRestaurantImage}>Edit</button> </li>
                     </div>}
                {this.state.update_RestaurantImage && <div>
                      <form>
                      <div className="form-group">
                          <h4>Edit RestaurantImage</h4>
                          <input type="file" name="RestaurantImage" id="RestaurantImage" className="btn btn-lg photo-upload-btn" onChange={this.handleChange}/>   
                       </div>
                        <button onClick={this.updateRestaurantImage} className="profilename">Save</button>
                        <button className="profileCancel">Cancel</button>
                        <br/>
                       </form>
                     </div>}
                     {this.state.Original_Cuisine &&  <div>
                     <li className="li-id1"> <p className="name">Cuisine</p> <p>{this.state.Cuisine}</p> <button onClick={updateCuisine}>Edit</button> </li>
                     </div>}
                     {this.state.update_Cuisine && <div>
                      <form>
                      <div className="form-group">
                          <h4>Edit Cuisine</h4>

                          <input type="text" name="Cuisine" id="Cuisine" className="form-control form-control-lg" placeholder="Cuisine" onChange={this.handleChange} value={this.state.Cuisine} />
                          
                       </div>
                        <button onClick={this.updateCuisine} className="profilename">Save Changes</button>
                        <button className="profileCancel">Cancel</button>
                        <br/>
                       </form>
                     </div>}
                    </ul>   
                </div>
            </div>}
          
           

        </div>
);
}
}
export default ProfileOfOwner;