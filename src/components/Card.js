import React, { Component } from 'react';
import '../style/Card.css';
require('typeface-dancing-script');

class Card extends Component {

  constructor(props) {
   super(props);
    this.state = { term: '' };
  }


  render() {
    const { weekday, weekdayDate} = this.props;

  return(
  <div className="card">
    <div className="card_weekday">
      <h1>{weekday}</h1>
      <h2>{weekdayDate}</h2>
    </div>
    <div className="card_info">
      <div className="card_info_mealType">
        <h2>Breakfast</h2>
        <h2>Lunch</h2>
        <h2>Dinner</h2>
        <h2>Snack</h2>
      </div>
      <div className="card_info_meal">
        <h2 className="card_info_meal_info">Essen</h2>
        <h2 className="card_info_meal_info">Essen</h2>
        <h2 className="card_info_meal_info">Essen</h2>
        <h2 className="card_info_meal_info">Essen</h2>
      </div>
    </div>

  </div>
  )

  }


}

export default Card;
