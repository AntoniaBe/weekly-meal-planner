import React, {Component} from 'react';
import Modal from 'react-responsive-modal';
import {fetchRecipes} from '../utils/apiCall';
import '../style/Modal.scss';
import '../style/RecipeDetail.scss';
import AccordionContainer from './AccordionContainer';
import {IoMdClose} from "react-icons/io";

class RecipeDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      recipe: null
    };
  }

  componentDidMount() {

    if (!this.props.selectRecipe.id) {
      return;
    }
    fetchRecipes(this.props.selectRecipe.id).then((recipe) => this.setState(() => ({recipe: recipe[0]})));
  }

  render() {

    const {isOpen, onClose} = this.props;

    const {recipe} = this.state;

    console.log(recipe);
    return (

          recipe === null ? <div></div> : 
          <Modal className='modal' open={isOpen} onClose={onClose} ariaHideApp={false}>
     <div className="recipe-detail-container">
                  <div className="recipe-detail-container_first-row">
                    <div className="recipe-detail-container_first-row_first-detail">
                      <h1 className="recipe-detail-container_first-row_first-detail_label">
                        {recipe.label}
                      </h1>
                      <div className="recipe-detail-container_first-row_first-detail_image">
                        <img src={recipe.image} alt={recipe.label}></img>
                      </div>
                    </div>
                    <div className="recipe-detail-container_first-row_second-detail">
                      <div >
                        Servings: {recipe.yield}
                      </div>
                      <div>
                        Calories: {Math.ceil(recipe.calories)}
                      </div>
                      <div>
                        Preptime: {recipe.totalTime}
                        Minutes
                      </div>
                      <div>
                        Cautions: {recipe.cautions}
                      </div>
                      <div>
                        Diet Labels: {recipe.dietLabels}
                      </div>
                      <div>
                        Healt Labels: {recipe.healthLabels}
                      </div>
                      <div>
                        Source:
                        <a href={recipe.url} target="_blank" rel="noopener noreferrer">{recipe.source}</a>
                      </div>
                    </div>
                  </div>
                  <div className="recipe-detail-container_second-row">
                    <AccordionContainer ingredients={recipe.ingredients} nutrients={recipe.digest}/>
                  </div>
                </div>
        </Modal>
      )

  }

}

export default RecipeDetail;
