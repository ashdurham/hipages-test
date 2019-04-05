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
        
      </div>
    );
  }
}

export default App;
