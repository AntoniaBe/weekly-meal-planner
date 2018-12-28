import React, { Component } from 'react';
import '../style/App.css';
import Card from './Card';
import * as moment from 'moment';
class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
    };
  }

  getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    // Return array of year and week number
    return [d.getUTCFullYear(), weekNo];
}


  render() {

    var result = this.getWeekNumber(new Date());
    var nextResult = parseInt(result[1]) + 1;
    console.log('It\'s currently week ' + result[1] + ' of ' + result[0]);
        console.log('Next week is ' + nextResult + ' of ' + result[0]);

    const startOfWeek = moment().startOf('isoWeek');
    const endOfWeek = moment().endOf('isoWeek');

    const days = [];
    let day = startOfWeek;

      while (day <= endOfWeek) {
        days.push({day: day.format('dddd').toString(), date:day.format("Do MMMM YYYY").toString(), });
        day = day.clone().add(1, 'd');
      }
        console.log(days);


    return (
      <div className="App">
        <header className="App-header">
          <h1>
            Weekly Meal Planner
          </h1>
          <h2>
            Week {result[1]}
          </h2>
        </header>
          <div className="card_container">
            {days.map((data, idx) =>
                <Card key={idx} weekday={data.day} weekdayDate={data.date} isWeekday={true}/>
            )}
            <Card isWeekday={false}/>
          </div>

      </div>
    );
  }
}

export default App;
