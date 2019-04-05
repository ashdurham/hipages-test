import React, { Component } from 'react';
import Icon from '../../atoms/Icon';
import Button from '../../atoms/Button';

import './LeadCard.css';

class LeadCard extends Component {
    render() {
        
        return (
            <div className="m-card">
                <div className="line l-contactDetail">
                    <div className="detail avatar">A</div>
                    <div>
                        <div className="detail name">Ash</div>
                        <div className="detail created">April, 5 @ 11:30 pm</div>
                    </div>
                </div>

                <div className="line l-jobDetail">
                    <div className="detail location">
                        <Icon name="map-marker-alt" /> Schofields 2762
                    </div>
                    <div className="detail category">
                        <Icon name="briefcase" /> Development
                    </div>
                    <div className="detail jobId">
                        Job ID: {this.props.id}
                    </div>
                </div>

                <div className="line l-description">
                    This is test data for markup
                </div>

                <div className="line l-action">
                    <Button label="Accept" />
                    <Button label="Decline" type="secondary" />
                    <div className="detail price">
                        <span>$99</span> Lead Invitation
                    </div>
                </div>
            </div>
        )
    }
}

export default LeadCard