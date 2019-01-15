import React, {Component} from 'react';
import ReactModal from 'react-modal';
import { fetchRecipes } from '../utils/apiCall';
import '../style/Modal.scss';
import '../style/SearchFoodModal.scss';

class RecipeDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      recipe: null,
    };
  }


  searchFood = (e) => {
    if (!this.props.selectRecipe.id) {
         return;
       }

       fetchRecipes(this.props.selectRecipe.id)
         .then((recipe) => this.setState(() => ({
           recipe,

         })));
  };


   componentDidMount(){

    if (!this.props.selectRecipe.id) {
       return;
     }
     fetchRecipes(this.props.selectRecipe.id)
       .then((recipe) => this.setState(() => ({
         recipe,

       })));
   }


  render() {

    const {
      isOpen,
      onClose,
    } = this.props;

    console.log(this.state.recipe);
    return (
      <ReactModal className='modal' isOpen={isOpen} onRequestClose={onClose} ariaHideApp={false}>
        {this.state.recipe === null ? console.log("loading")

           : <div>{this.state.recipe[0].label}</div>

        }
          <div className="recipeDetail">hello</div>
        </ReactModal>
    )

  }

}

export default RecipeDetail;
