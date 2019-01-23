import React, {Component} from 'react';
import '../style/Card.scss';
import SearchFoodModal from './SearchFoodModal';
import RecipeDetail from './RecipeDetail';
import {fetchRecipes} from '../utils/apiCall';
import AppStore from '../stores/AppStore';
import {
  MdAdd,
  MdCached,
  MdClear,
  MdInfo,
  MdChevronRight,
  MdPublic,
  MdNearMe
} from "react-icons/md";
import {FaShoppingCart } from "react-icons/fa";
import Cookies from 'universal-cookie';
import {toJS} from 'mobx';

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

  openRecipeDetailPage = (meal, weekday) => {
    const cookies = new Cookies();
    this.setState(() => ({
      selected: cookies.get(weekday + "-" + meal),
      isRecipeDetailPageOpen: true
    }));
  };

  closeRecipeDetailPage = () => {
    this.setState(() => ({isRecipeDetailPageOpen: false}));
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

  removeRecipe(meal, weekday) {
    const cookies = new Cookies();
    this.setState(() => ({isRecipeInfoOpen: false}));
    cookies.remove(weekday + "-" + meal)
  }

  openRecipeInfo(meal, weekday) {
    const cookies = new Cookies();
    this.setState(() => ({
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

  addToShoppingList(ingredients) {
    const cookies = new Cookies();
    let data = cookies.get("shoppinglist");
    if (data === undefined || data.length == 0)
      data = []
    ingredients.forEach(function(element) {
      element["checked"] = false;
      data.push(element);
    });
    cookies.set("shoppinglist", data, {path: '/'});
  }

  render() {
    const {weekday, weekdayDate, selectRecipe, store} = this.props;
    const {recipes, isSearchFoodModalOpen, loading, isRecipeDetailPageOpen} = this.state;

    const mealType = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

    store.fillMeals(weekday, mealType);

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
                          {this.state.selected.text}
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
                          Object.keys(this.state.selected.ingredients).map(item => <li key={item} className="ingredients-container_list">
                            {this.state.selected.ingredients[item].text}
                          </li>)
                        }
                      </ul>
                      <button onClick={() => this.addToShoppingList(this.state.selected.ingredients)} class="btn btn-5 btn-5b icon-cart">
                        <span>
                          Add to Shopping List
                        </span>
                      </button>
                    </div>
                  </div>
                : <div className="card_info">
                    {
                      mealType.map(meal => <div key={meal} className="card_info_type">
                        {
                          store.recipes[weekday][meal]
                            ? <div style={{
                                  backgroundImage: `url(${store.recipes[weekday][meal].image})`
                                }} className="card_info_type_image_container">
                                <div className="card_info_type_image_container_overlay">
                                  <div className="card_info_type_image_container_label">
                                    <p>{meal}</p>
                                  </div>
                                  <div className="card_info_type_recipe_menu_button">
                                    <button onClick={() => this.removeRecipe(meal, weekday)} className="recipeButton">
                                      <MdClear size={20}/></button>
                                    <button onClick={() => this.openSearchFoodModal(meal, weekday)} className="recipeButton">
                                      <MdCached size={20}/></button>
                                    <button onClick={() => this.openRecipeDetailPage(meal, weekday)} className="recipeButton">
                                      <MdInfo size={20}/></button>
                                    <button onClick={() => this.openRecipeDetail(meal, weekday)} className="recipeButton">
                                      <img height="20" width="20" src={require('../assets/ingredients.svg')} alt="ingredients"/>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            : <div className='add-meal-btn'>
                                <p>{meal}</p>
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

export default Card;
