import React, { Component } from 'react';

import './Tab.css';

class Tab extends Component {
    render() {
        return (
            <div className={`a-tab ${this.props.classes}`} onClick={() => this.props.onClickEvent(this.props.tabKey)}>
                {this.props.label}
            </div>
        )
    }
}

Tab.defaultProps = {
    classes: "",
    onClickEvent: null,
    label: null
}

export default Tab