import React, {Component} from 'react';
import Modal from 'react-responsive-modal';
import { fetchRecipes } from '../utils/apiCall';
import '../style/Modal.scss';
import '../style/SearchFoodModal.scss';
import AccordionContainer from './AccordionContainer';
import Cookies from 'universal-cookie';

class ShoppingList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: this.getShoppinglist(),
      empty: this.isShoppingListEmpty()
    };
  }

  getShoppinglist(){
    const cookies = new Cookies();
    return cookies.get("shoppinglist");
  }
  isShoppingListEmpty(){
    const cookies = new Cookies();
    let shoppingList = cookies.get("shoppinglist");
    if(shoppingList === undefined || shoppingList.length == 0) return true
    return false;
  }
  onChange = (e) => {
    const target = e.target.value;
    const cookies = new Cookies();
    let data = cookies.get("shoppinglist");
      data[target].checked
        ? data[target].checked = false
        : data[target].checked = true
    this.setState(() => ({
      list: data
    }));
    cookies.set("shoppinglist", data, { path: '/'});
  };

  render() {

    const {
      isOpen,
      onClose,
    } = this.props;
    return (
      <Modal className='modal' open={isOpen} onClose={onClose} ariaHideApp={false}>
        {
          this.state.empty
            ? <div className="emtpy_list">
                <h2>You have no items on your Shooping List. Add some by using the button in the ingredients view of a recipe!</h2>
              </div>
            : <div className="full_list">
                <h1>Shopping List</h1>
                <div className="shopping-container">
                    {
                      Object.keys(this.state.list).map(item =>
                        <div key={item} className="item">
                          <input className="form-checkbox" key={item} name="checked" onChange={this.onChange} value={item} checked={this.state.list[item].checked} type="checkbox" />
                          {this.state.list[item].text}
                        </div>
                      )
                    }
                </div>
              </div>
        }
      </Modal>
    )

  }

}

export default ShoppingList;
