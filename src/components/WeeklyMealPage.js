import React, { Component } from 'react';
import '../style/WeeklyMealPage.css';

class WeeklyMealPage extends Component {


  render() {

    let currentDate= new Date();

    return (
      <div>
      <div className="weekdayTitle">
      <p>Monday</p>
      {currentDate.getDate()}
      </div>
      <div className="weekdayTitle">
      <p>Tuesday</p>
      </div>
      <div className="weekdayTitle">
      <p>Wednesday</p>
      </div>
      <div className="weekdayTitle">
      <p>Thursday</p>
      </div>
      <div className="weekdayTitle">
      <p>Friday</p>
      </div>
      <div className="weekdayTitle">
      <p>Saturday</p>
      </div>
      <div className="weekdayTitle">
      <p>Sunday</p>
      </div>

      Hello
      </div>
    );
  }
}

export default WeeklyMealPage;
