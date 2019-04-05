import React, { Component } from 'react';
import Icon from '../../atoms/Icon';
import Button from '../../atoms/Button';
import moment from 'moment'

import './LeadCard.css';

class LeadCard extends Component {
    render() {
        const cardData = {}

        /* 
         *  Get first name 
         */

        cardData.name = this.props.contact_name.split(' ')[0];

        /* 
         *  Get contact initial 
         */

        cardData.initial = this.props.contact_name.charAt(0);

        /* 
         *  Format Date 
         */

        cardData.createdAt = moment(this.props.created_at).format("MMMM, d @ h:mm a");

        /* 
         *  Format and Output Price 
         */

        const moneyFormat = new Intl.NumberFormat('en-AU', {
            style: 'currency',
            currency: 'AUD',
        });
        cardData.price = moneyFormat.format(this.props.price);

        return (
            <div className="m-card">
                <div className="line l-contactDetail">
                    <div className="detail avatar">{cardData.initial}</div>
                    <div>
                        <div className="detail name">{cardData.name}</div>
                        <div className="detail created">{cardData.createdAt}</div>
                    </div>
                </div>

                <div className="line l-jobDetail">
                    <div className="detail location">
                        <Icon name="map-marker-alt" /> {this.props.suburb_name} {this.props.postcode}
                    </div>
                    <div className="detail category">
                        <Icon name="briefcase" /> {this.props.category_name}
                    </div>
                    <div className="detail jobId">
                        Job ID: {this.props.id}
                    </div>
                </div>

                <div className="line l-description">
                    {this.props.description}
                </div>

                <div className="line l-action">
                    <Button label="Accept" />
                    <Button label="Decline" type="secondary" />
                    <div className="detail price">
                        <span>{cardData.price}</span> Lead Invitation
                    </div>
                </div>
            </div>
        )
    }
}

export default LeadCard