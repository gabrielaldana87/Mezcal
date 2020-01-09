import React, { Component } from "react";
import PropTypes from "prop-types";
import "./ListHeader.scss";

class ListTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      newTitle: props.listTitle
    };
  }
  ;
  render () {
    const { isOpen,  newTitle } = this.state;
    const { listTitle } = this.props;
    return (
      <div className="list-header">
        <div className="list-title-button">
          {listTitle}
        </div>
      </div>
    )
  }
}

export default  ListTitle;