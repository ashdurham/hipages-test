import React, { Component } from 'react';
import LeadCard from '../../molecules/LeadCard';

import './Leads.css';

class Leads extends Component {

    render() {
        const DisplayCards = () => {
            if (this.props.leads.length > 0) {
                return this.props.leads.map((lead, i) => {
                    return <LeadCard key={i} updateEvent={this.props.updateEvent} {...lead} />
                })
            } else {
                return (
                    <div className="noRecords">
                        There are currently no records to display
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

TabGroup.defaultProps = {
    leads: [],
    updateEvent: null
}

export default Leads