import React, {Component} from 'react';
import { addRecipe } from "../actions";
import { connect } from 'react-redux';
import '../style/Card.scss';
import SearchFoodModal from './SearchFoodModal';
import { fetchRecipes } from '../utils/apiCall';
import {MdAdd} from "react-icons/md";
import Cookies from 'universal-cookie';
require('typeface-dancing-script');


class Card extends Component {

  constructor(props) {
    super(props);
    this.openSearchFoodModal= this.openSearchFoodModal.bind(this);
    this.closeSearchFoodModal= this.closeSearchFoodModal.bind(this);
    this.state = {
      isSearchFoodModalOpen: false,
      foodSearchInput: '',
      recipes: null,
      mealType: '',
      weekday: ''
    };
  }


  openSearchFoodModal = (mealType, weekday ) => {
    console.log("Before", mealType, weekday);
    this.setState(() => ({
      isSearchFoodModalOpen: true,
      foodSearchInput: '',
      mealType: mealType,
      weekday: weekday,
    }));
  };


  closeSearchFoodModal = () => {
  this.setState(() => ({
    isSearchFoodModalOpen: false,
    recipes: null,
    foodSearchInput: '',
    mealType: null,
    weekday: 'unset',
  }));
  };

  onInputChange = (e) => {
    this.setState({ foodSearchInput: e.target.value });
  };

  searchFood = (e) => {
    if (!this.state.foodSearchInput) {
      return;
    }

    e.preventDefault();

    this.setState(() => ({ loading: true }));

    fetchRecipes(this.state.foodSearchInput)
      .then((recipes) => this.setState(() => ({
        recipes,
        loading: false,
      })));
  };

  fillMeals(weekday, mealType){
    const cookies = new Cookies();
    let meals = {}
    mealType.forEach(function(element){
      console.log("Cookie:");
      console.log(cookies.get(weekday+"-"+element));
      console.log("CookieName:"+weekday+"-"+element);
      meals[element] = cookies.get(weekday+"-"+element);
    })
    return meals;
  }

  render() {
    const {weekday, weekdayDate, isWeekday, selectRecipe, recipe} = this.props;
    const {recipes, isSearchFoodModalOpen, loading } = this.state;

    const mealType = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

    let {isMeal} = this.props;

    isMeal = false;

    let meals = this.fillMeals(weekday, mealType);
    console.log(meals);

    return (
      <div className="card-container">
      <div className="card">
      {
        isWeekday
          ? <div>
              <div className="card_weekday">
                <h3>{weekday}</h3>
                <h4>{weekdayDate}</h4>
              </div>
              <div className="card_info">
                {
                  mealType.map(meal =>
                    <div key={meal} className="card_info_type">
                    <p>{meal}</p>
                    {
                      meals[meal]
                        ? <div>
                        <img className="Imageeee" alt="" src={meals[meal].src}/>
                          </div>
                        :
                        <div className='add-meal-btn'>
                          <button onClick={() => this.openSearchFoodModal(meal, weekday)} className="addButton"><MdAdd size={30}/></button>
                        </div>
                    }
                  </div>)
                }
              </div>
            </div>
          : <div className="card_add-Recipe">Add a Recipe!</div>
      }
    </div>


    <SearchFoodModal
      isOpen={isSearchFoodModalOpen}
      onClose={this.closeSearchFoodModal}
      searchFood={this.searchFood}
      onInputChange={this.onInputChange}
      recipes={recipes}
      loading={loading}
      selectRecipe={selectRecipe}
      weekday={this.state.weekday}
      mealType={this.state.mealType}
      />
    </div>
  )
  }
}


const mapStateToProps = state  => {


    return {
        recipe: state.addRecipe.recipe,
    }
}
const mapDispatchToProps = (dispatch) => ({
  selectRecipe: (data) => dispatch(addRecipe(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Card);
