import React, { Component } from 'react';

import './Button.css';

class Button extends Component {
    render() {
        return (
            <button className={`a-button ${this.props.type}`} onClick={() => this.props.onClickEvent()}>
                {this.props.label}
            </button>
        )
    }
}

Button.defaultProps = {
    type: "primary",
    onClickEvent: null,
    label: null
}

export default Button