import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMapMarkerAlt, faBriefcase, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

import './App.css';

import Header from './components/organisms/Header';
import TabGroup from './components/molecules/TabGroup';
import Popup from './components/molecules/Popup';
import Leads from './components/organisms/Leads';

library.add(faMapMarkerAlt, faBriefcase, faPhone, faEnvelope);

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          activeView: '',
          leads: [],
          displayPopup: false,
          jobData: {}
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
            let leadsData = false;

            if (Array.isArray(data)) {
              leadsData = data;
            }

            this.setState({
              leads: leadsData
            });
        })
        .catch((error) => {
            console.log('Error: ', error);

            this.setState({
              leads: false
            });
        });
  }

  checkLeadStatus = (id, status) => {
    const endpoint = `http://localhost:8080/check-status?id=${id}&status=${status}`;
    fetch(endpoint)
        .then(response => {
            return response.clone().json();
        })
        .then((data) => {
            if (data.confirm) {
              // Display popup
              this.setState({
                displayPopup: true,
                jobData: {id: id}
              });
            } else {
              if (data.affectedRows > 0) {
                this.queryLeads(this.state.activeView);
              } else {
                console.log("Error occured");
                /*
                 *  TODO: Add error notification to page to notify user.
                 */
              }
            }
            
        })
        .catch((error) => {
            console.log('Error: ', error);
        });
  }

  updateLeadStatus = (id, status) => {
    const endpoint = `http://localhost:8080/update-status?id=${id}&status=${status}`;
    this.setState({
      displayPopup: false,
      jobData: {}
    });
    if (status === "waitlisted") {
      fetch(endpoint)
        .then(response => {
            return response.clone().json();
        })
        .then((data) => {
            if (data.affectedRows > 0) {
              this.queryLeads(this.state.activeView);
            } else {
              console.log("Error occured");
              /*
               *  TODO: Add error notification to page to notify user.
               */
            }
        })
        .catch((error) => {
            console.log('Error: ', error);
        });
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="adminBlock">
          <div className="container">
            <TabGroup clickEvent={this.clickEvent} />
            <Leads leads={this.state.leads} updateEvent={this.checkLeadStatus} />
            <Popup display={this.state.displayPopup} jobData={this.state.jobData} updateEvent={this.updateLeadStatus} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
