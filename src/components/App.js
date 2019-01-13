import React, { Component } from 'react';
import '../style/App.css';
import Card from './Card';
import CardExtra from './CardExtra';
import * as moment from 'moment';
class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
    };
  }

  getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    return [d.getUTCFullYear(), weekNo];
}


  render() {

    var result = this.getWeekNumber(new Date());
    var nextResult = parseInt(result[1]) + 1;

    const startOfWeek = moment().startOf('isoWeek');
    const endOfWeek = moment().endOf('isoWeek');

    const days = [];
    let day = startOfWeek;

      while (day <= endOfWeek) {
        days.push({day: day.format('dddd').toString(), date:day.format("Do MMMM YYYY").toString(), });
        day = day.clone().add(1, 'd');
      }


    return (
      <div className="App">
        <header className="App-header">
          <h1>
            Weekly Meal Planner
          </h1>
          <h2>
            Week {result[1]}
          </h2>
          <h4>
            {startOfWeek.format('Do MMMM YYYY').toString()}&nbsp;-&nbsp;{endOfWeek.format('Do MMMM YYYY').toString()}
          </h4>
        </header>
          <div className="card_container">
            {days.map((data, idx) =>
                <Card key={idx} weekday={data.day} weekdayDate={data.date} isWeekday={true}/>
            )}
            <CardExtra key={'extra'} weekday={'Extra'} extra={'Save Recipes'} extraPlus={"In Case you are feelin' it"}/>
          </div>

      </div>
    );
  }
}

export default App;
