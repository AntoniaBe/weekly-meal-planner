import React, {Component} from 'react';
import { addRecipe } from "../actions";
import { connect } from 'react-redux';
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
      recipes: null,
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
    recipes: null,
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
      .then((recipes) => this.setState(() => ({
        recipes,
        loading: false,
      })));
  };

  render() {
    const {weekday, weekdayDate, isWeekday, selectRecipe, recipe} = this.props;
    const {recipes, isSearchFoodModalOpen, loading } = this.state;

    const mealType = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

    let {isMeal} = this.props;

    isMeal = false;



    console.log("recipe " + recipe);


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
                      recipe
                        ? <div>
                        <img className="Imageeee" alt="" src={recipe.image}/>
                          </div>
                        :
                        <div className='add-meal-btn'>
                          <button onClick={() => this.openSearchFoodModal()} className="addButton"><MdAdd size={30}/></button>
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
