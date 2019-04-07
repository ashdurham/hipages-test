import React, { Component } from 'react';
import Icon from '../../atoms/Icon';
import Button from '../../atoms/Button';
import moment from 'moment'

import './LeadCard.css';

class LeadCard extends Component {
    render() {
        const cardData = {}

        /* 
         *  Handle display name 
         */

        const displayName = () => {
            let output = '';
            switch (this.props.status) {
                case 'accepted':
                    output = this.props.contact_name;
                    break;

                default:
                    // Default to first name to protect contacts privicy in the event of a different status
                    output = this.props.contact_name.split(' ')[0];
            }
            
            return output;
        }
        cardData.name = displayName();

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

        const PriceData = ({displayStatus}) => {
            if (this.props.status === displayStatus) {
                return (
                    <div className="detail price">
                        <span>{cardData.price}</span> Lead Invitation
                    </div>
                )
            }

            return null;
        }

        /*
         *  Display contact details
         */

        const ContactDetails = () => {
            if (this.props.status === 'accepted') {
                return (
                    <div className="line l-contactInfo">
                        <div className="detail phone">
                            <Icon name="phone" /> <a href={`tel:${this.props.contact_phone}`}>{this.props.contact_phone}</a>
                        </div>
                        <div className="detail email">
                            <Icon name="envelope" /> <a href={`mailto:${this.props.contact_email}`}>{this.props.contact_email}</a>
                        </div>
                    </div>
                )
            }

            return null;
        }

        /* 
         *  Display action line 
         */

        const ActionLine = () => {
            if (this.props.status === 'new') {
                return (
                    <div className="line l-action">
                        <Button label="Accept" onClickEvent={() => this.props.updateEvent(this.props.id, 'accepted')} />
                        <Button label="Decline" type="secondary" onClickEvent={() => this.props.updateEvent(this.props.id, 'declined')} />
                        <PriceData displayStatus="new" />
                    </div>
                )
            }

            return null;
        }

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
                    <PriceData displayStatus="accepted" />
                </div>

                <ContactDetails />

                <div className="line l-description">
                    {this.props.description}
                </div>

                <ActionLine />
            </div>
        )
    }
}

export default LeadCard