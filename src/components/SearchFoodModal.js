import React, {Component} from 'react';
import ReactModal from 'react-modal';
import '../style/Modal.scss';
import '../style/SearchFoodModal.scss';
import loading from '../assets/loading.gif';
import {IoIosSearch, IoMdClose} from "react-icons/io";

class SearchFoodModal extends Component {

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

    const {
      isOpen,
      onClose,
      onInputChange,
      searchFood,
      recipes,
      loading
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
          ?
          <div className='loading-container'>
          <img src={require('../assets/loading.gif')} alt="loading..." />
          </div>
            :
            <div className='search-food-results'>
              {
                recipes === null
                  ? ''
                  : recipes.length === 0
                    ? <p>Sorry, we  couldn't find any recipes for this search. Try again!</p>
                    : recipes.map((recipe, index) => (<div className='search-food-results_item' key={index}>
                      <div className='search-food-results_item_title'>
                        <h3>{recipe.label}</h3>
                      </div>
                      <img src={recipe.image} alt={recipe.label}/>
                      <div className='search-food-results_item_infos'>
                        <p className='search-food-results_item_infos_dietLabel'>{recipe.dietLabels.join(", ")}
                        </p>
                        <div className='search-food-results_item_infos_calories_preptime'>
                          <p>{Math.floor(recipe.calories)}
                            Calories</p>
                          <p>{randomPrepTime[Math.floor(Math.random() * randomPrepTime.length)]}
                            Minutes</p>
                        </div>
                        <div className='search-food-results_item_infos_healthLabels'>{recipe.healthLabels.map(i => '#' + i).reduce((prev, curr) => [prev, ', ', curr])}</div>
                      </div>
                    </div>))
              }

            </div>
            }
    </ReactModal>)

  }

}

export default SearchFoodModal;
