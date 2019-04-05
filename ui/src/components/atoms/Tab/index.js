import React, { Component } from 'react';

import './Tab.css';

class Tab extends Component {
    render() {
        return (
            <div className={`a-tab ${this.props.classes || ''}`}>
                {this.props.label}
            </div>
        )
    }
}

export default Tab