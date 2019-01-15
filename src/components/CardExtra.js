import React, {Component} from 'react';
import '../style/Card.scss';
import SearchFoodModal from './SearchFoodModal';
import { fetchRecipes } from '../utils/apiCall';
import {MdAdd, MdClear} from "react-icons/md";
import Cookies from 'universal-cookie';
import {Accordion, AccordionItem} from 'react-sanfona';
require('typeface-dancing-script');


class CardExtra extends Component {

  constructor(props) {
    super(props);
    this.openSearchFoodModal= this.openSearchFoodModal.bind(this);
    this.closeSearchFoodModal= this.closeSearchFoodModal.bind(this);
    this.state = {
      isSearchFoodModalOpen: false,
      foodSearchInput: '',
      recipes: null,
      mealType: null,
      weekday: ''
    };
  }


  openSearchFoodModal = (weekday ) => {
    this.setState(() => ({
      isSearchFoodModalOpen: true,
      foodSearchInput: '',
      weekday: weekday,
    }));
  };


  closeSearchFoodModal = () => {
  this.setState(() => ({
    isSearchFoodModalOpen: false,
    recipes: null,
    foodSearchInput: '',
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

  removeRecipe(key, weekday){
    const cookies = new Cookies();
    let cookie = cookies.get(weekday);
    delete cookie[key];
    cookies.set(weekday, cookie);
  }

  getBacklog(weekday){
    const cookies = new Cookies();
    return cookies.get(weekday);
  }

  render() {
    const {weekday, extra, extraPlus, selectRecipe } = this.props;
    const {recipes, isSearchFoodModalOpen, loading } = this.state;

    const recipeBacklog = this.getBacklog(weekday);

    console.log(recipeBacklog);

    return (
      <div className="card-container">
      <div className="card">
          <div>
              <div className="card_backlog">
                <h3>{extra}</h3>
                <h4>{extraPlus}</h4>
              </div>
              <div className="card_info_backlog">
                <Accordion>
                  {
                    recipeBacklog ?
                    Object.keys(recipeBacklog).map(key =>
                      <AccordionItem className="accordion-backlog" title={recipeBacklog[key].text}>
                        <div>
                          <button onClick={() => this.removeRecipe(key, weekday)} className="addButton"><MdClear size={20}/></button>
                        </div>
                      </AccordionItem>
                    ) : ''
                  }
                </Accordion>
                <button onClick={() => this.openSearchFoodModal(weekday)} className="addButton"><MdAdd size={30}/></button>
              </div>
            </div>
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

//Object.keys(recipeBacklog).map(key =>
  //<AccordionItem className="accordion-backlog" title={recipeBacklog[key].text}>
  //<button onClick={() => this.removeRecipe(key, weekday)} className="addButton"><MdClear size={20}/></button>
//)
export default CardExtra;
