import React, { Component } from 'react';

import './Button.css';

class Button extends Component {
    render() {
        return (
            <button className={`a-button ${this.props.type || 'primary'}`}>
                {this.props.label}
            </button>
        )
    }
}

export default Button