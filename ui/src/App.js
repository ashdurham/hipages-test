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
            data: []
        }
    }
  
    componentDidMount() {
      fetch('http://localhost:8080/jobs', {
      })
      .then(response => {
        console.log(response);
        return response.clone().json();
      })
      .then((data) => {
        console.log(data);
          // Set the state of data.
          // this.setState({
          //     data: data
          // })
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
            <TabGroup />
            <Leads leads={[{id: 1}, {id: 2}]} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
