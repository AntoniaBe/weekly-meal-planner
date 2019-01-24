import React, {Component} from 'react';
import Modal from 'react-responsive-modal';
import { fetchRecipes } from '../utils/apiCall';
import '../style/Modal.scss';
import '../style/SearchFoodModal.scss';
import AccordionContainer from './AccordionContainer';
import {
    MdSave
} from "react-icons/md";
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

    removeAll = (e) => {
        const cookies = new Cookies();
        this.setState(() => ({
            list: {}
        }));
        cookies.remove("shoppinglist");
    };
    removeChecked = (e) => {
        const cookies = new Cookies();
        let data = cookies.get("shoppinglist");
        for(let i = 0; i<Object.keys(data).length; i++){
            if(data[i].checked){
                data.splice(i,i-1);
            }
        }
        this.setState(() => ({
            list: data
        }));
        cookies.set("shoppinglist", data, { path: '/'});
    };

    download() {
        const cookies = new Cookies();
        const list =  cookies.get("shoppinglist");
        let data = "";
        for (let i = 0; i < Object.keys(list).length; i++){
            data += list[i].text;
            data += '\n';
        }
        var file = new Blob([data], {type: "text/plain"});
        if (window.navigator.msSaveOrOpenBlob) // IE10+
            window.navigator.msSaveOrOpenBlob(file, "ShoppingList");
        else { // Others
            var a = document.createElement("a"),
                url = URL.createObjectURL(file);
            a.href = url;
            a.download = "ShoppingList";
            document.body.appendChild(a);
            a.click();
            setTimeout(function() {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
        }
    }

  render() {

    const {
      isOpen,
      onClose,
    } = this.props;
    console.log(this.state.list);
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
                    <button className={"button btn "} onClick={this.removeAll}>Remove All</button>
                    <button className={"button btn "} onClick={this.removeChecked}>Remove Checked</button>
                    <button className={"button btn download "} onClick={this.download}><MdSave size={18}/></button>
                </div>
              </div>
        }
      </Modal>
    )

  }

}

export default ShoppingList;
