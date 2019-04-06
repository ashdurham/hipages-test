import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMapMarkerAlt, faBriefcase, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

import './App.css';

import Header from './components/organisms/Header';
import TabGroup from './components/molecules/TabGroup';
import Leads from './components/organisms/Leads';

library.add(faMapMarkerAlt, faBriefcase, faPhone, faEnvelope);

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          activeView: '',
          leads: []
      }
  }

  clickEvent = (activeView) => {
    this.setState({
        activeView: activeView
    });

    this.queryLeads(activeView);
    
    return true;
  }

  queryLeads = (activeView) => {
    if (!activeView) return;

    const endpoint = `http://localhost:8080/${activeView}-jobs`;
    fetch(endpoint)
        .then(response => {
            return response.clone().json();
        })
        .then((data) => {
            console.log(data);
            this.setState({
              leads: data
            });
        })
        .catch((error) => {
            console.log('Error: ', error);
        });
  }

  updateLeadStatus = (id, status) => {
    const endpoint = `http://localhost:8080/update-status?id=${id}&status=${status}`;
    fetch(endpoint)
        .then(response => {
            return response.clone().json();
        })
        .then((data) => {
            /* TODO: Code in error handling */
            //console.log(data);
            this.queryLeads(this.state.activeView);
        })
        .catch((error) => {
            console.log('Error: ', error);
        });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="adminBlock">
          <div className="container">
            <TabGroup clickEvent={this.clickEvent} />
            <Leads leads={this.state.leads} updateEvent={this.updateLeadStatus} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
