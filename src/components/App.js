import React, { Component } from 'react';
import '../style/App.css';
import WeeklyMealPage from './WeeklyMealPage';
class App extends Component {



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

    return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
                <WeeklyMealPage/>
        </header>
      </div>
    );
  }
}

export default App;
