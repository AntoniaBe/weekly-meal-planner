import React, {Component} from 'react';
import '../style/Modal.scss';
import '../style/SearchFoodModal.scss';
import AccordionContainer from './AccordionContainer';


class FoodResultList extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    const { recipes, onSelect } = this.props;
    return (
       recipes.map((recipe, index) => (<div className='search-food-results_item' key={index}>
                    <div className='search-food-results_item_title'>
                      <h3>{recipe.label}</h3>
                    </div>
                    <img src={recipe.image} alt={recipe.label}/>
                    <div className='search-food-results_item_infos'>
                      <p className='search-food-results_item_infos_dietLabel'>{recipe.dietLabels.join(", ")}
                      </p>
                      <div className='search-food-results_item_infos_calories_preptime'>
                        <p>{Math.ceil(recipe.calories)}
                          &nbsp;Calories</p>
                        <p>{recipe.totalTime}
                          &nbsp;Minutes</p>
                      </div>
                      <div className='search-food-results_item_infos_healthLabels'>{recipe.healthLabels.length > 0 ? recipe.healthLabels.map(i => '#' + i).reduce((prev, curr) => [prev, ', ', curr]) : '' }</div>
                      <AccordionContainer ingredients={recipe.ingredients} nutrients={recipe.digest}/>
                      <button onClick={() => onSelect(recipe)}>Add Recipe</button>
                    </div>
                  </div>))
                )

  }

}

export default FoodResultList;
