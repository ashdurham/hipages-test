import React, { Component } from 'react';
import './App.css';

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
          // this.setS  tate({
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
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
