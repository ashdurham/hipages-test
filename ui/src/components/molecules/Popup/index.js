import React, { Component } from 'react'
import Button from '../../atoms/Button';

import './Popup.css';

class Popup extends Component {
    render() {
        const {display, jobData, updateEvent} = this.props;

        console.log("render", jobData);

        return (
            <div id="popup" className={display ? "show" : ""}>
                <div>
                    <h6>Sorry, this lead has been claimed</h6>
                    <p>3 tradies....</p>
                </div>
                <div className="buttons">
                    <Button label="No thanks" type="secondary" onClickEvent={() => updateEvent(jobData.id, 'no')} />
                    <Button label="Share my details" onClickEvent={() => updateEvent(jobData.id, 'waitlisted')} />
                </div>
            </div>
        )
    }
}

export default Popup;

// Icon.defaultProps = {
//     name: 'question-circle'
// }