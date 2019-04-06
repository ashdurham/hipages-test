import React, { Component } from 'react';

import './Tab.css';

class Tab extends Component {
    render() {
        return (
            <div className={`a-tab ${this.props.classes || ''}`} onClick={() => this.props.onClickEvent(this.props.tabKey) || null}>
                {this.props.label}
            </div>
        )
    }
}

export default Tab