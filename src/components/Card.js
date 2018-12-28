import React, {Component} from 'react';
import '../style/Card.scss';
import SearchFoodModal from './SearchFoodModal';
import { fetchRecipes } from '../utils/apiCall';
import {MdAdd} from "react-icons/md";
require('typeface-dancing-script');


class Card extends Component {

  constructor(props) {
    super(props);
    this.openSearchFoodModal= this.openSearchFoodModal.bind(this);
    this.closeSearchFoodModal= this.closeSearchFoodModal.bind(this);
    this.state = {
      isSearchFoodModalOpen: false,
      foodSearchInput: '',
      food: null,
    };
  }


  openSearchFoodModal = () => {
    this.setState(() => ({
      isSearchFoodModalOpen: true,
      foodSearchInput: ''
    }));
  };


  closeSearchFoodModal = () => {
  this.setState(() => ({
    isSearchFoodModalOpen: false,
    food: null,
    foodSearchInput: '',
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
      .then((food) => this.setState(() => ({
        food,
        loading: false,
      })));
  };

  render() {
    const {weekday, weekdayDate, isWeekday} = this.props;
    const {food, isSearchFoodModalOpen, loading } = this.state;

    const mealType = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

    let {isMeal} = this.props;

    isMeal = false;

  console.log(food);
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
                  mealType.map(mealType => <div key={mealType} className="card_info_type">
                    <p>{mealType}</p>
                    {
                      !isMeal
                        ? <div className='add-meal-btn'>
                            <button onClick={() => this.openSearchFoodModal()} className="addButton"><MdAdd size={30}/></button>
                          </div>
                        : <div>
                            <img alt="" src="http://3.bp.blogspot.com/-3qtfXtEYEnU/T4h2XzL19FI/AAAAAAAADEo/1oS1ncBvD3M/s1600/DSCN4013.JPG"/>
                          </div>
                    }
                  </div>)
                }
              </div>
            </div>
          : <div className="card_randomRecipe">hello im a random recipe</div>
      }
    </div>


    <SearchFoodModal
      isOpen={isSearchFoodModalOpen}
      onClose={this.closeSearchFoodModal}
      searchFood={this.searchFood}
      onInputChange={this.onInputChange}
      recipes={food}
      loading={loading}
      />
    </div>
  )
  }
}

export default Card;
