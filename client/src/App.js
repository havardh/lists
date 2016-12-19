import React, { Component } from 'react';
import './App.css';

import ShoppingList from './ShoppingList';

class App extends Component {
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
