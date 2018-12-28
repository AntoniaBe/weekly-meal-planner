import React, {Component} from 'react';
import ReactModal from 'react-modal';
import '../style/Modal.scss';

class RecipeDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    const {
      isOpen,
      onClose,
    } = this.props;

    return (
      <ReactModal className='modal' isRecipeDetailOpen={isOpen} onRequestClose={onClose} ariaHideApp={false}>
        hello
        </ReactModal>
    )

  }

}

export default RecipeDetail;
