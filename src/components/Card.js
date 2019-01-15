import React, {Component} from 'react';
import {addRecipe} from "../actions";
import {connect} from 'react-redux';
import '../style/Card.scss';
import SearchFoodModal from './SearchFoodModal';
import RecipeDetail from './RecipeDetail';
import {fetchRecipes} from '../utils/apiCall';
import {
  MdAdd,
  MdCached,
  MdRemoveCircle,
  MdKitchen,
  MdClear,
  MdInfo,
  MdShoppingCart,
  MdChevronRight,
  MdPublic,
  MdNearMe
} from "react-icons/md";
import Cookies from 'universal-cookie';
require('typeface-dancing-script');

class Card extends Component {

  constructor(props) {
    super(props);
    this.openSearchFoodModal = this.openSearchFoodModal.bind(this);
    this.closeSearchFoodModal = this.closeSearchFoodModal.bind(this);
    this.openRecipeDetailPage = this.openRecipeDetailPage.bind(this);

    this.state = {
      isSearchFoodModalOpen: false,
      isRecipeDetailPageOpen: false,
      foodSearchInput: '',
      recipes: null,
      mealType: '',
      weekday: '',
      isRecipeDetailOpen: false,
      isRecipeInfoOpen: false,
      selected: ''
    };
  }

  openRecipeDetailPage = () => {
    this.setState(() => ({
      isRecipeDetailPageOpen: true,
    }));
  };

  closeRecipeDetailPage = () => {
    this.setState(() => ({isRecipeDetailPageOpen: false }));
  };

  openSearchFoodModal = (mealType, weekday) => {
    this.setState(() => ({isSearchFoodModalOpen: true, foodSearchInput: '', mealType: mealType, weekday: weekday}));
  };

  closeSearchFoodModal = () => {
    this.setState(() => ({isSearchFoodModalOpen: false, recipes: null, foodSearchInput: '', mealType: null, weekday: 'unset'}));
  };

  onInputChange = (e) => {
    this.setState({foodSearchInput: e.target.value});
  };

  searchFood = (e) => {
    if (!this.state.foodSearchInput) {
      return;
    }

    e.preventDefault();

    this.setState(() => ({loading: true}));

    fetchRecipes(this.state.foodSearchInput).then((recipes) => this.setState(() => ({recipes, loading: false})));
  };

  fillMeals(weekday, mealType) {
    const cookies = new Cookies();
    let meals = {}
    mealType.forEach(function(element) {
      meals[element] = cookies.get(weekday + "-" + element);
    })
    return meals;
  }

  removeRecipe(meal, weekday) {
    const cookies = new Cookies();
    this.setState(() => ({isRecipeInfoOpen: true}));
    cookies.remove(weekday + "-" + meal)
  }

  openRecipeInfo(meal, weekday) {
    const cookies = new Cookies();
    this.setState(() => ({
      isRecipeInfoOpen: true,
      selected: cookies.get(weekday + "-" + meal)
    }));
  }

  openRecipeDetail(meal, weekday) {
    const cookies = new Cookies();
    this.setState(() => ({
      isRecipeDetailOpen: true,
      selected: cookies.get(weekday + "-" + meal)
    }));
  }

  closeRecipeDetail() {
    this.setState(() => ({isRecipeDetailOpen: false, selected: ""}));
  }

  closeRecipeInfo() {
    this.setState(() => ({isRecipeInfoOpen: false, selected: ""}));
  }

  render() {
    const {weekday, weekdayDate, selectRecipe, recipe} = this.props;
    const {recipes, isSearchFoodModalOpen, loading, isRecipeDetailPageOpen} = this.state;

    const mealType = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

    let {isMeal} = this.props;

    isMeal = false;

    let meals = this.fillMeals(weekday, mealType);

    return (<div className="card-container">
      <div className="card">
        <div>
          <div>
            <div className="card_weekday">
              <h3>{weekday}</h3>
              <h4>{weekdayDate}</h4>
            </div>
            {
              this.state.isRecipeDetailOpen
                ? <div className="card_detail">
                    <div className="label_container">
                      <div>
                        <h3 className="label_container-label">
                          {this.state.selected.label}
                        </h3>
                        </div>
                        <div>
                        <button onClick={() => this.closeRecipeDetail()} className="return_button">
                          <MdChevronRight size={35}/>
                        </button>
                        </div>
                    </div>
                    <div className="ingredients-container">
                      <ul>
                      {
                        Object.keys(this.state.selected.ingredients).map(item =>
                          <li key={item} className="ingredients-container_list">
                          {this.state.selected.ingredients[item].text}
                        </li>)
                      }
                      </ul>
                      <button onClick={() => this.openRecipeDetailPage()}>
                        See more!
                      </button>
                    </div>
                  </div>
                : this.state.isRecipeInfoOpen
                  ? <div className="card_link">
                      <img className="image" alt="" src={this.state.selected.image}/>
                      <div className="info_container">
                        <h3>
                          {this.state.selected.label}
                        </h3>
                        <div className="button_container">
                          <button onClick={() => this.closeRecipeInfo()} className="return_button">
                            <MdChevronRight size={35}/>
                          </button>
                        </div>
                      </div>
                      <div className="info_details">
                        <a href={this.state.selected.shareLink} target="_blank">
                          <button onClick={() => this.closeRecipeInfo()} className="return_button">
                            <MdPublic size={35}/>
                            Find more details on Edamam.com!
                          </button>
                        </a>
                        <a href={this.state.selected.original} target="_blank">
                          <button onClick={() => this.closeRecipeInfo()} className="return_button">
                            <MdNearMe size={35}/>
                            Find the original recipe here!
                          </button>
                        </a>
                      </div>
                    </div>
                  : <div className="card_info">
                      {
                        mealType.map(meal => <div key={meal} className="card_info_type">
                          <p>{meal}</p>
                          {
                            meals[meal]
                              ? <div className="image_container">
                                  <img className="image" alt="" src={meals[meal].image}/>
                                  <div className="recipe_menu_button">
                                    <button onClick={() => this.removeRecipe(meal, weekday)} className="recipeButton">
                                      <MdClear size={20}/></button>
                                    <button onClick={() => this.openSearchFoodModal(meal, weekday)} className="recipeButton">
                                      <MdCached size={20}/></button>
                                    <button onClick={() => this.openRecipeInfo(meal, weekday)} className="recipeButton">
                                      <MdInfo size={20}/></button>
                                    <button onClick={() => this.openRecipeDetail(meal, weekday)} className="recipeButton">
                                      <img height="20" width="20" src={require('../assets/ingredients.svg')} alt="ingredients"/>
                                    </button>
                                  </div>
                                </div>
                              : <div className='add-meal-btn'>
                                  <button onClick={() => this.openSearchFoodModal(meal, weekday)} className="addButton">
                                    <MdAdd size={30}/></button>
                                </div>
                          }
                        </div>)
                      }
                    </div>
            }
          </div>
        </div>
      </div>

      {
        this.state.isSearchFoodModalOpen
          ? <SearchFoodModal isOpen={isSearchFoodModalOpen} onClose={this.closeSearchFoodModal} searchFood={this.searchFood} onInputChange={this.onInputChange} recipes={recipes} loading={loading} selectRecipe={selectRecipe} weekday={this.state.weekday} mealType={this.state.mealType}/>
          : ''
      }

      {
        this.state.isRecipeDetailPageOpen
          ? <RecipeDetail isOpen={isRecipeDetailPageOpen} onClose={this.closeRecipeDetailPage} selectRecipe={this.state.selected}/>
          : ''
      }
    </div>)
  }
}

// const mapStateToProps = state  => {
//
//
//     return {
//         recipe: state.addRecipe.recipe,
//     }
// }
// const mapDispatchToProps = (dispatch) => ({
//   selectRecipe: (data) => dispatch(addRecipe(data)),
// });
//
// export default connect(mapStateToProps, mapDispatchToProps)(Card);
export default Card;
