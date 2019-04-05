import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Icon extends Component {
    render() {
        const {name} = this.props;

        return <FontAwesomeIcon icon={name} />
    }
}

export default Icon;

Icon.defaultProps = {
    name: 'question-circle'
}