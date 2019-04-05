import React, { Component } from 'react';
import LeadCard from '../../molecules/LeadCard';

import './Leads.css';

class Leads extends Component {

    render() {
        const DisplayCards = () => {
            return this.props.leads.map((lead, i) => {
                return <LeadCard key={i} {...lead} />
            })
        }

        return (
            <div className="o-leads">
                <DisplayCards />
            </div>
        )
    }
}

export default Leads