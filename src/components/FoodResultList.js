import React, {Component} from 'react';
import '../style/Modal.scss';
import '../style/SearchFoodModal.scss';
import AccordionContainer from './AccordionContainer';
import Cookies from 'universal-cookie';
import {
    MdStar
} from "react-icons/md";


class FoodResultList extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  addFavorite(recipe){
    const cookies = new Cookies();
      let data = {
          text: recipe.label,
          id: recipe.uri.toString().split('recipe_')[1]
      };

    let cookie;
    let size = 0;
    cookies.get("Extra")
        ? cookie = cookies.get("Extra")
        : cookie = {}

      size = Object.keys(cookie).length;

      cookie[size] = data;
      cookies.set("Extra", cookie, { path: '/'});

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
                          <button onClick={() => this.addFavorite(recipe)} className="add_fav">
                              <MdStar size={25}/>
                          </button>
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
