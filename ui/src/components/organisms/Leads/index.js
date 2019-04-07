import React, { Component } from 'react';
import LeadCard from '../../molecules/LeadCard';

import './Leads.css';

class Leads extends Component {

    render() {

        const DisplayCards = () => {

            if (Array.isArray(this.props.leads) && this.props.leads.length > 0) {
                return this.props.leads.map((lead, i) => {
                    return <LeadCard key={i} updateEvent={this.props.updateEvent} {...lead} />
                })
            } else if (Array.isArray(this.props.leads) && this.props.leads.length === 0) {
                return (
                    <div className="noRecords">
                        There are currently no records to display
                    </div>
                )
            } else {
                return (
                    <div className="errorOccured">
                        Oh no, something went wrong - please try again. If this persists, please <a href="/">contact us</a>.
                    </div>
                )
            }
        }

        return (
            <div className="o-leads">
                <DisplayCards />
            </div>
        )
    }
}

Leads.defaultProps = {
    leads: [],
    updateEvent: null
}

export default Leads