import React, {Component} from 'react';
import ReactModal from 'react-modal';
import '../style/Modal.scss';
import '../style/SearchFoodModal.scss';
import FoodResultList from './FoodResultList';
import {IoIosSearch, IoMdClose} from "react-icons/io";

class SearchFoodModal extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    const {
      isOpen,
      onClose,
      onInputChange,
      searchFood,
      recipes,
      loading,
      selectRecipe
    } = this.props;
    return (<ReactModal className='modal' isOpen={isOpen} onRequestClose={onClose} ariaHideApp={false}>
      <button className="modal_closeButton" onClick={onClose}><IoMdClose size={30}/></button>
      <div className='search-container'>
        <input className='search-container_input' type='text' placeholder='Search for Recipes' onChange={onInputChange} onKeyDown={(e) => e.key === 'Enter' && searchFood(e)} autoFocus="autoFocus"/>
        <button className='search-container_search-button' onClick={(e) => searchFood(e)}>
          <IoIosSearch size={30}/>
        </button>
      </div>
      {
        loading
          ? <div className='loading-container'>
              <img src={require('../assets/loading.gif')} alt="loading..."/>
            </div>
          : <div className='search-food-results'>
            {
              recipes === null
                ? ''
                : recipes.length === 0
                  ? <p>Sorry, we couldn't find any recipes for this search. Try again!</p>
                  : <FoodResultList recipes={recipes} onSelect={(recipe) => {
                    selectRecipe({ recipe });
                    onClose();
                  }}/>
            }

            </div>
      }
      </ReactModal>)

  }

}

export default SearchFoodModal;
