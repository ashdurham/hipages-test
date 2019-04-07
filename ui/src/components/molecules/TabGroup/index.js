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
        this.clickEvent = this.clickEvent.bind(this);
    }

    componentDidMount() {
        this.props.clickEvent(this.state.activeTab);
    }

    clickEvent(tabKey) {
        this.setState({
            activeTab: tabKey
        });
        this.props.clickEvent(tabKey);
        
        return true;
    }

    render() {
        const Tabs = () => {
            return this.tabs.map((tab, i) => {
                return <Tab key={i} label={tab.label} tabKey={tab.key} classes={this.state.activeTab === tab.key ? "active" : ""} onClickEvent={this.clickEvent} />
            })
        }

        return (
            <div className="m-tabGroup">
                <Tabs />
            </div>
        )
    }
}

TabGroup.defaultProps = {
    clickEvent: null
}

export default TabGroup