import React, {Component} from 'react';
import Modal from 'react-responsive-modal';
import {fetchRecipes} from '../utils/apiCall';
import '../style/Modal.scss';
import '../style/RecipeDetail.scss';
import AccordionContainer from './AccordionContainer';

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

    return (

      recipe === null
      ? <div></div>
      : <Modal className='modal' open={isOpen} onClose={onClose} ariaHideApp={false}>
        <div className="recipe-detail-container">
          <div className="recipe-detail-container_first-row">
            <h1 className="recipe-detail-container_first-row_first-detail_label">
              {recipe.label}
            </h1>
          </div>
          <div className="recipe-detail-container_second-row">
            <div className="recipe-detail-container_second-row_first-detail">
              <div className="recipe-detail-container_second-row_first-detail_image">
                <img src={recipe.image} alt={recipe.label}></img>
              </div>
            </div>
            <div className="recipe-detail-container_second-row_second-detail">
              <div className="recipe-detail-container_second-row_second-detail_item">
                <p><b>Servings</b>:</p> &nbsp;<p className="content">{recipe.yield}</p>
              </div>
              <div className="recipe-detail-container_second-row_second-detail_item">
                <p><b>Calories</b>:</p> &nbsp;<p className="content">{Math.ceil(recipe.calories)}</p>
              </div>
              <div className="recipe-detail-container_second-row_second-detail_item">
                  <p><b>Preparation Time</b>:</p> <p className="content">&nbsp;{recipe.totalTime} &nbsp;Minutes</p>
              </div>
              <div className="recipe-detail-container_second-row_second-detail_item">
                  <p><b>Cautions</b>:</p> <p className="content">&nbsp;{recipe.cautions.join(", ")}</p>
              </div>
              <div className="recipe-detail-container_second-row_second-detail_item">
                  <p><b>Diet Labels</b>:</p> <p className="content">&nbsp;{recipe.dietLabels.join(", ")}</p>
              </div>
              <div className="recipe-detail-container_second-row_second-detail_item">
                  <p><b>Healt Labels</b>:</p> <p className="content">&nbsp;{recipe.healthLabels.join(", ")}</p>
              </div>
              <div className="recipe-detail-container_second-row_second-detail_item">
                  <p><b>Source</b>:</p><p className="source">&nbsp;<a href={recipe.url} target="_blank" rel="noopener noreferrer">{recipe.source}</a></p>
              </div>
            </div>
          </div>
          <div className="recipe-detail-container_third-row">
            <AccordionContainer ingredients={recipe.ingredients} nutrients={recipe.digest} allowMultiple={true} expanded={true}/>
          </div>
        </div>
      </Modal>)

  }

}

export default RecipeDetail;
