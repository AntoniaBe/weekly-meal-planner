import React, {Component} from 'react';
//import ReactModal from 'react-modal';
import Modal from 'react-responsive-modal';
import '../style/Modal.scss';
import '../style/SearchFoodModal.scss';
import FoodResultList from './FoodResultList';
import {IoIosSearch, IoMdClose} from "react-icons/io";
import Cookies from 'universal-cookie';
import * as moment from 'moment';



class SearchFoodModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dateExpire: moment().endOf('isoWeek')
    };
  }

  addCookieWeekday(recipe, weekday, onClose, mealType) {
      onClose();
      let data = {
          text: recipe.label,
          image: recipe.image,
          label: recipe.label,
          totalTime: recipe.totalTime,
          ingredients: recipe.ingredients,
          id: recipe.uri.toString().split('recipe_')[1],
          shareLink: recipe.shareAs,
          original: recipe.url
      };

      const cookies = new Cookies();
      cookies.remove(weekday+"-"+mealType);
      cookies.set(weekday+"-"+mealType, data, { path: '/', expires: this.state.dateExpire.toDate()});
  }

  addCookieBacklog(recipe, weekday, onClose) {
      onClose();
      let data = {
        text: recipe.label,
        image: recipe.image,
        label: recipe.label,
        totalTime: recipe.totalTime,
        ingredients: recipe.ingredients,
        shareLink: recipe.shareAs,
        id: recipe.uri.toString().split('recipe_')[1],
        original: recipe.url
      };

      const cookies = new Cookies();
      let cookie;
      let size = recipe.label;
        cookies.get(weekday)
          ? cookie = cookies.get(weekday)
          : cookie = {}

      size = Object.keys(cookie).length;

      cookie[size] = data;
      cookies.set(weekday, cookie, { path: '/'});
  }

  render() {

    const {
      isOpen,
      onClose,
      onInputChange,
      searchFood,
      recipes,
      loading,
      weekday,
      mealType
    } = this.props;

    let isWeekday = true;
      weekday === "Extra"
       ? isWeekday = false
       : isWeekday = true;

    return (


      <Modal className='modal' open={isOpen} onClose={onClose} ariaHideApp={false}>
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
                    isWeekday
                    ? this.addCookieWeekday(recipe, weekday, onClose, mealType)
                    : this.addCookieBacklog(recipe, weekday, onClose)
                  }}/>
            }

            </div>
      }
      </Modal>)

  }

}

export default SearchFoodModal;
