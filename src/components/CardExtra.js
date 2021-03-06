import React, {Component} from 'react';
import '../style/Card.scss';
import SearchFoodModal from './SearchFoodModal';
import ShoppingList from './ShoppingList';
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
    this.openShoppingListModal= this.openShoppingListModal.bind(this);
    this.closeShoppingListModal= this.closeShoppingListModal.bind(this);
    this.state = {
      daySelected: 'Monday',
      mealSelected: 'Breakfast',
      isSearchFoodModalOpen: false,
      isShoppingListModalOpen: false,
      foodSearchInput: '',
      recipes: null,
      mealType: null,
      weekday: '',
      backlog: this.getBacklog('Extra')
    };
  }


  openSearchFoodModal = (weekday ) => {
    this.setState(() => ({
      isSearchFoodModalOpen: true,
      foodSearchInput: '',
      weekday: weekday,
    }));
  };
  openShoppingListModal = (weekday ) => {
    this.setState(() => ({
      isShoppingListModalOpen: true
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

  closeShoppingListModal = () => {
    this.setState(() => ({
      isShoppingListModalOpen: false
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
    let data = this.state.backlog;
    delete data[key];
    this.setState(() => ({
      backlog: data,
    }));
    delete cookie[key];
    cookies.set(weekday, cookie);
  }

  getBacklog(weekday){
    const cookies = new Cookies();
    return cookies.get(weekday);
  }

  handleDayChange = (e) => {
    this.setState({ daySelected: e.target.value });
  };
  handleMealChange = (e) => {
    this.setState({ mealSelected: e.target.value });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();

    const cookies = new Cookies();
    cookies.set(this.state.daySelected+"-"+this.state.mealSelected, this.state.backlog[e.target.getAttribute('value')], { path: '/'});
    this.forceUpdate();
  };

  render() {
    const {weekday, extra, extraPlus, selectRecipe } = this.props;
    const {recipes, isSearchFoodModalOpen, isShoppingListModalOpen, loading } = this.state;

    let day = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    let meal = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

    return (
      <div className="card-container  card_extra">
      <div className="card">
          <div>
              <div className="card_backlog">
                <h3>{extra}</h3>
                <h4>{extraPlus}</h4>
              </div>
              <div className="card_info_backlog">
                <Accordion>
                  {
                    this.state.backlog ?
                    Object.keys(this.state.backlog).map(key =>
                      <AccordionItem key={key} className="accordion-backlog" title={this.state.backlog[key].text}>
                        <div>

                          <form className="container" value={key} onSubmit={this.handleFormSubmit}>
                            <select name="day" value={this.state.daySelected} onChange={this.handleDayChange}	className="form-select theme-blue">
                                 { day.map(opt => {
                                       return (
                                              <option key={opt} value={opt}>{opt}</option>
                                               );
                                    })
                                }
                            </select>
                            <select name="meal" value={this.state.mealSelected} onChange={this.handleMealChange}	className="form-select theme-blue">
                        			   { meal.map(opt => {
                        				       return (
                        					            <option key={opt} value={opt}>{opt}</option>
                        			                 );
                                    })
                                }
                            </select>
                            <button value={key}  className="button btn"><span value={key}>Submit</span></button>
                            <button onClick={() => this.removeRecipe(key, weekday)} className="button btn"><span>Remove</span></button>
                          </form>
                        </div>
                      </AccordionItem>
                    ) : ''
                  }
                </Accordion>
                <button onClick={() => this.openSearchFoodModal(weekday)} className="addButton"><MdAdd size={30}/></button>
              </div>
            </div>
    </div>

    <div className="card">
      <button onClick={() => this.openShoppingListModal()} className="shopping_list_button"><h3>Shopping List</h3></button>
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
    <ShoppingList
        isOpen={isShoppingListModalOpen}
        onClose={this.closeShoppingListModal}
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
