import React, { Component } from 'react';
import '../style/WeeklyMealPage.css';
import * as moment from 'moment';
require('typeface-dancing-script');

class WeeklyMealPage extends Component {


  render() {
    const mealType= ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];
     const startOfWeek = moment().startOf('isoWeek');
     const endOfWeek = moment().endOf('isoWeek');

     const days = [];
     let day = startOfWeek;

     while (day <= endOfWeek) {
       days.push({day: day.format('dddd').toString(), date:day.format("Do MMMM YYYY").toString(), });
       day = day.clone().add(1, 'd');
     }
     console.log(days);


  return(
    <div className="container">
    <ul className="meal-types">
  {
    mealType.map(mealType => <li className="subheader" key={mealType}>{mealType}</li>)
  }
    </ul>

    <div className='calendar'>
      <div className='days-container'>
        {days.map((data, idx) =>
        <div className="days-container_day" key={idx}>
          <h1 className="handschrift">{data.day}</h1>
          <h2>{data.date}</h2>
        </div>
        )}
      </div>
      <div className='icon-grid'>
        <ul>

          <div className='add-meal-btn'>
                  <button className="addButton">+</button>
          </div>




      </ul>

</div>
  </div>
</div>
  )

  }


}

export default WeeklyMealPage;
