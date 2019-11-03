import React, { Component } from 'react';
import '../Css/BuyerLogin.css';
import DetailsView from './DetailsView';
import axios from 'axios';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { imageDownload } from '../../actions/buyersearch';
class RestComponent extends Component {
    constructor() {
        super();
        this.state = {
            restaurantID: "",
            restaurantName: "",
            DetailsView: false,
            ProfileImage: "",
            ProfileImagePreview: null
        }
    }
    async componentDidMount() {
        await this.props.imageDownload(this.props.restaurant.restaurantimage);
        let imagePreview = 'data:image/jpg;base64, ' + this.props.imagePreviewresponse;

        this.setState({
            ProfileImage: this.props.restaurant.restaurantimage,
            ProfileImagePreview: imagePreview
        })



    }
    jumbotron = (e) => {
        e.preventDefault();

        this.setState(
            {
                restaurantID: e.currentTarget.getAttribute("rest_id"),
                restaurantName: e.currentTarget.getAttribute("rest_name"),
                DetailsView: true
            }
        )
    }
    render() {
        let Details = null;
        if (this.state.DetailsView) {
            Details = <Redirect to={{
                pathname: '/DetailsView',
                state:
                {
                    RestaurantID: this.state.restaurantID,
                    RestaurantName: this.state.restaurantName
                }
            }}

            />
        }
        let profileImageData = <img className="img-style" src="https://img.freepik.com/free-icon/user-filled-person-shape_318-74922.jpg?size=338c&ext=jpg" alt="logo" />
        if (this.state.ProfileImagePreview) {
            profileImageData = <img className="img-style" src={this.state.ProfileImagePreview} alt="logo" />
        }
        return (
            <div className="jumbotron1234" rest_id={this.props.restaurant._id} rest_name={this.props.restaurant.restaurantname} onClick={this.jumbotron}>
                <div className="sameline">
                    <div>
                        <p> {profileImageData}</p>
                    </div>
                    <div className="container">
                        <li><h3> {this.props.restaurant.restaurantname}</h3>
                            <p>  {this.props.restaurant.cuisine} </p>
                            <p> {this.props.restaurant.zipcode} </p>
                        </li>
                    </div>
                    {Details}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        imagePreviewresponse: state.buyer.imagePreviewresponse


    };
}
export default connect(
    mapStateToProps,
    { imageDownload }
)(RestComponent);