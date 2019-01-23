import React, { Component } from 'react';
import '../style/App.scss';
import Card from './Card';
import CardExtra from './CardExtra';
import AppStore from '../stores/AppStore';
class App extends Component {



  constructor(props) {
    super(props);
    this.state = {
    };
  }

  fillDays(start, end){
    let days = [];
    let day = start;
    while (day <= end) {
        days.push({day: day.format('dddd').toString(), date:day.format("Do MMMM YYYY").toString(), });
        day = day.clone().add(1, 'd');
    }
    return days;
  }


  render() {
    const appStore = new AppStore();
    var result = appStore.getWeekNumber(new Date());

    let days = this.fillDays(appStore.startOfWeek, appStore.endOfWeek);

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
            {appStore.startOfWeek.format('Do MMMM YYYY').toString()}&nbsp;-&nbsp;{appStore.endOfWeek.format('Do MMMM YYYY').toString()}
          </h4>
        </header>
          <div className="card_container">
            {days.map((data, idx) =>
                <Card key={idx} weekday={data.day} weekdayDate={data.date} isWeekday={true} store={appStore}/>
            )}
            <CardExtra key={'extra'} weekday={'Extra'} extra={'Save Recipes'} extraPlus={"In Case you are feelin' it"} store={appStore}/>
          </div>

      </div>
    );
  }
}

export default App;
