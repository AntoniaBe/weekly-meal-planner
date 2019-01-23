import {observable, computed, reaction, action, decorate, configure, toJS} from 'mobx';
import * as moment from 'moment';
import Cookies from 'universal-cookie';

export default class AppStore{
  recipes = {};
  startOfWeek = moment().startOf('isoWeek');
  endOfWeek = moment().endOf('isoWeek');

  getWeekNumber(d){
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    return [d.getUTCFullYear(), weekNo];
  }

  fillMeals(weekday, mealType) {
    const cookies = new Cookies();
    let data = [];
    let meals = {}
    mealType.forEach(function(element) {
      meals[element] = cookies.get(weekday + "-" + element);
    })
    this.recipes[weekday] = meals;
  }

}
decorate(AppStore, {
  recipes: observable,
  startOfWeek: observable,
  endOfWeek: observable,
  getWeekNumber: action,
  fillMeals: action,
});
