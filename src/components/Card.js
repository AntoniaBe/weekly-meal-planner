import React, {Component} from 'react';
import '../style/Card.scss';
require('typeface-dancing-script');

class Card extends Component {

  constructor(props) {
    super(props);
    this.state = {
      food: null
    };
  }

  render() {
    const {weekday, weekdayDate, isWeekday} = this.props;
    const {food} = this.state;

    const mealType = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

    let {isMeal} = this.props;

    isMeal = false;

    return (<div className="card">
      {
        isWeekday
          ? <div>
              <div className="card_weekday">
                <h3>{weekday}</h3>
                <h4>{weekdayDate}</h4>
              </div>
              <div className="card_info">
                {
                  mealType.map(mealType => <div className="card_info_type">
                    <p key={mealType}>{mealType}</p>
                    {
                      !isMeal
                        ? <div className='add-meal-btn'>
                            <button className="addButton">+</button>
                          </div>
                        : <div>
                        <img alt="" src ="http://3.bp.blogspot.com/-3qtfXtEYEnU/T4h2XzL19FI/AAAAAAAADEo/1oS1ncBvD3M/s1600/DSCN4013.JPG" />
                          </div>
                    }
                  </div>)
                }
              </div>
            </div>
          : <div className="card_randomRecipe">hello im a random recipe</div>
      }
    </div>)

  }

}

export default Card;
