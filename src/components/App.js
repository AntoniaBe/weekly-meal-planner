import React, { Component } from 'react';
import '../style/App.scss';
import Card from './Card';
import CardExtra from './CardExtra';
import * as moment from 'moment';
import Cookies from 'universal-cookie';
class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
      startOfWeek: moment().startOf('isoWeek'),
      endOfWeek: moment().endOf('isoWeek'),
      weeklyRecipes: this.getAll(),
    };
  }
  getAll(){
    const cookies = new Cookies();
    const mealType = ['Breakfast', 'Lunch', 'Dinner', 'Snacks']
    const days = this.getDays();
    let data = {};
    let meals = {}
    days.forEach(function(weekday) {
      let dayMeals = {};
      mealType.forEach(function(meal){
        dayMeals[meal] = cookies.get(weekday["day"] + "-" + meal);
      })
      meals[weekday["day"]] = dayMeals;
    })
    data['days'] = days;
    data['mealType'] = mealType;
    data['meals'] = meals;
    return data;
  }

  getDays(){
    const days = [];
    let day = moment().startOf('isoWeek');

      while (day <= moment().endOf('isoWeek')) {
        days.push({day: day.format('dddd').toString(), date:day.format("Do MMMM YYYY").toString(), });
        day = day.clone().add(1, 'd');
      }
    return days;
  }

  getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    return [d.getUTCFullYear(), weekNo];
  }

  changeRecipe(meal, weekday){
    //let data = this.state.weeklyRecipes;
  //  data["meals"][meal][weekday] = "test";
    let data = "test"
    this.setState(() => ({weeklyRecipes: data}));
  }


  render() {

    var result = this.getWeekNumber(new Date());
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
            {this.state.startOfWeek.format('Do MMMM YYYY').toString()}&nbsp;-&nbsp;{this.state.endOfWeek.format('Do MMMM YYYY').toString()}
          </h4>
        </header>
          <div className="card_container">
            {this.state.weeklyRecipes.days.map((data, idx) =>
                <Card changeRecipe={this.changeRecipe} key={idx} weekday={data.day} weekdayDate={data.date} isWeekday={true} mealType={this.state.weeklyRecipes.mealType} meals={this.state.weeklyRecipes.meals[data.day]}/>
            )}
            <CardExtra key={'extra'} weekday={'Extra'} extra={'Save Recipes'} extraPlus={"In Case you are feelin' it"}/>
          </div>

      </div>
    );
  }
}

export default App;
