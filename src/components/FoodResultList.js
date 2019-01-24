import React, {Component} from 'react';
import '../style/Modal.scss';
import '../style/SearchFoodModal.scss';
import AccordionContainer from './AccordionContainer';
import Cookies from 'universal-cookie';
import {MdStar} from "react-icons/md";
import {FaCertificate } from "react-icons/fa";


class FoodResultList extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  addFavorite(recipe){
    console.log("add fav");
    const cookies = new Cookies();
      let data = {
        text: recipe.label,
        image: recipe.image,
        ingredients: recipe.ingredients,
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
                    <div className="image_container">
                    <img src={recipe.image} alt={recipe.label}/>
                    <div className="unq_btn">
                      <button onClick={() => this.addFavorite(recipe)} className="add_fav">
                        <span class="md-stack">
                          <FaCertificate className="star" size={35}/>
                        </span>
                      </button>
                    </div>
                    </div>

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
                      <button className={"button btn"} onClick={() => onSelect(recipe)}>Add Recipe</button>
                    </div>
                  </div>))
                )

  }

}

export default FoodResultList;
