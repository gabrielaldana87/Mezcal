import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import CardOptions from './CardOptions';
import './CardModal.scss';

class CardModal extends Component {
  static propTypes = {
    card: PropTypes.shape({
      text: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
    }).isRequired,
    cardElement: PropTypes.shape({
      getBoundingClientRect: PropTypes.func.isRequired
    }),
    isOpen: PropTypes.bool.isRequired,
    toggleCardEditor: PropTypes.func.isRequired
  }
  ;
  constructor(props) {
    super(props);
    this.state = {
      isNotePadEditOpen: false,
      isCalendarIconOpen: false
    };
    if (typeof document !== "undefined") {
      Modal.setAppElement("#root");
    }
  }
  toggleNotePadPicker = () => {
    this.setState({ isNotePadEditOpen: !this.state.isNotePadEditOpen })
  }
  ;
  handleRequestClose = () => {
    const { isNotePadEditOpen } = this.state;
    const { toggleCardEditor } = this.props;
    if (!isNotePadEditOpen) {
      toggleCardEditor();
    }
  }
  ;
  render () {
    const { isNotePadEditOpen, isCalendarIconOpen } =  this.state;
    const { cardElement, card, background, color, listId, isOpen } = this.props;
    if (!cardElement) {
      return null;
    }
    /*
     Create style of modal in order to not clip outside the edges no matter what device.
     */
    // Get dimensions of the card to calculate dimensions of cardModal.
    const boundingRect = cardElement.getBoundingClientRect();

    // Returns true if card is closer to right border than to the left
    const isCardNearRightBorder = window.innerWidth - boundingRect.right < boundingRect.left;

    // Check if the display is so thin that we need to trigger a centered, vertical layout
    const isThinDisplay = window.innerWidth < 550;


    // Position textarea at the same place as the card and position everything else away from closest edge
    const style = {
      content: {
        top: Math.min(
          boundingRect.top - 35,
          window.innerHeight - boundingRect.height - 18
        ),
        left: isCardNearRightBorder ? null : boundingRect.left + boundingRect.width,
        right: isCardNearRightBorder
          ? window.innerWidth - boundingRect.right
          : null,
        flexDirection: isCardNearRightBorder ? "row-reverse" : "row"
      }
    };

    // For layouts that are less wide than 550px, let the modal take up the entire width at the top of the screen
    const mobileStyle = {
      content: {
        flexDirection: "column",
        top: 3,
        left: 3,
        right: 3
      }
    };
    return (
      <Modal
      closeTimeoutMS={150}
      isOpen={isOpen}
      onRequestClose={ this.handleRequestClose }
      overlayClassName='modal-underlay'
      style={isThinDisplay ? mobileStyle : style }
      className='modal'
      includeDefaultStyles={ false }
      onClick={ this.handleRequestClose }
      >
        <CardOptions
          isNotePadEditOpen={ isNotePadEditOpen }
          card={ card }
          color={ color }
          background={ background }
          boundingRect={ boundingRect }
          isCardNearRightBorder={ isCardNearRightBorder }
          isThinDisplay={ isThinDisplay }
          toggleNotePadPicker={ this.toggleNotePadPicker }
        />
      </Modal>

    )
  }

}

export default CardModal;