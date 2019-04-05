import React, { Component } from 'react';
import Tab from '../../atoms/Tab';

import './TabGroup.css';

class TabGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 'invited'
        }
        this.tabs = [
            {
                label: "Invited",
                key: "invited"
            },
            {
                label: "Accepted",
                key: "accepted"
            }
        ];
    }

    render() {
        const Tabs = () => {
            return this.tabs.map((tab, i) => {
                return <Tab key={i} label={tab.label} tabKey={tab.key} classes={this.state.activeTab === tab.key ? "active" : ""} />
            })
        }

        return (
            <div className="m-tabGroup">
                <Tabs />
            </div>
        )
    }
}

export default TabGroup