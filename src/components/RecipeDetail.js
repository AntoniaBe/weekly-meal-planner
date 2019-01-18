import React, {Component} from 'react';
import ReactModal from 'react-modal';
import { fetchRecipes } from '../utils/apiCall';
import '../style/Modal.scss';
import '../style/SearchFoodModal.scss';
import AccordionContainer from './AccordionContainer';

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
         recipe: recipe[0],

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

           : <div>
                <h1>
                    {this.state.recipe.label}
                </h1>
                <div className={"image_div"}>
                    <img src={this.state.recipe.image}></img>
                </div>

                <AccordionContainer ingredients={this.state.recipe.ingredients} nutrients={this.state.recipe.digest}/>


                <div className={""}></div>
                <div className={""}></div>
                <div className={""}></div>

                </div>

        }
        </ReactModal>
    )

  }

}

export default RecipeDetail;
