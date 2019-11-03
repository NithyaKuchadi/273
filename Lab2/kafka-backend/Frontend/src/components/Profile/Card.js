import React, { Component } from 'react';
import './ProfileOfBuyer.css';
export default class Card extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (

      <div className="card card-indi mx-5 mb-5" key={this.props.item.course_id} style={{ boxShadow: "2px 2px 2px #888888" }}>

        RestaurantName: <label className="card-text">{this.props.item.RestaurantName}</label><br />

        Item Name: <label className="card-text">{this.props.item.NameOfItem}</label><br />
        Quantity: <label className="card-text">{this.props.item.Quantity}</label><br />
        Price: <label className="card-text">{this.props.item.Price}</label><br />
        StatusOfOrder: <label className="card-text">{this.props.item.StatusOfOrder}</label><br />

      </div>


    );
  }
}