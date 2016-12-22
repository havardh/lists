import React, { Component } from 'react';
import './App.css';

import {initialize} from './actions';
import ShoppingList from './ShoppingList';

class App extends Component {
  componentDidMount() {
    initialize();
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>/handleliste</h2>
        </div>

        <ShoppingList />
      </div>
    );
  }
}

export default App;
