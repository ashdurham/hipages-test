import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMapMarkerAlt, faBriefcase } from '@fortawesome/free-solid-svg-icons';

import './App.css';

import Header from './components/organisms/Header';
import TabGroup from './components/molecules/TabGroup';
import Leads from './components/organisms/Leads';

library.add(faMapMarkerAlt, faBriefcase);

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          leads: []
      }
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

  render() {
    this.queryLeads('invited');

    return (
      <div className="App">
        <Header />
        <div className="adminBlock">
          <div className="container">
            <TabGroup />
            <Leads leads={this.state.leads} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
