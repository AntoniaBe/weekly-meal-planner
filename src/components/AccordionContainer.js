import React, {Component} from 'react';
import '../style/Accordion.scss';
import {Accordion, AccordionItem} from 'react-sanfona';

class AccordionContainer extends Component {

  render() {
    const {ingredients, nutrients, allowMultiple, expanded} = this.props;

    return (<Accordion allowMultiple={allowMultiple}>

      <AccordionItem title={`Ingredients`} expanded={expanded}>
        <div>
          <ul className="accordion-list">
            {ingredients.map((ingredient, index) => (<li className="accordion-list_item" key={index}>{ingredient.text}</li>))}
          </ul>
        </div>
      </AccordionItem>
      <AccordionItem title={`Nutrients`} expanded={expanded}>
        <div>
          <ul className="accordion-list nutrients">
            {nutrients.map((nutrient, index) => (
              <li className="accordion-list_item"key={index}>
                <div className="nutrients-label">{nutrient.label}:</div>
                <div>{Math.ceil(nutrient.total)}{nutrient.unit}</div>
              </li>))}
          </ul>
        </div>
      </AccordionItem>

    </Accordion>);
  }
}

export default AccordionContainer;
