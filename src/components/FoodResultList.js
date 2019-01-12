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
    const randomPrepTime = [
      30,
      120,
      60,
      40,
      10,
      180,
      45,
      115,
      100,
      80,
      90,
      15,
      20,
      30,
      35,
      55
    ];


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
                        <p>{Math.floor(recipe.calories)}
                          &nbsp; Calories</p>
                        <p>{randomPrepTime[Math.floor(Math.random() * randomPrepTime.length)]}
                          &nbsp; Minutes</p>
                      </div>
                      <div className='search-food-results_item_infos_healthLabels'>{recipe.healthLabels.map(i => '#' + i).reduce((prev, curr) => [prev, ', ', curr])}</div>
                      <AccordionContainer ingredients={recipe.ingredients} nutrients={recipe.digest}/>
                      <button onClick={() => onSelect(recipe)}>Add Recipe</button>
                    </div>
                  </div>))
                )

  }

}

export default FoodResultList;
