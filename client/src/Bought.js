import React, { Component } from 'react';
import _ from 'lodash';
import './List.css';

const BuyItem = ({item, undo}) => (
  <li className="list-item">
    <div>- {item.name}</div>
    <button className="item" onClick={() => undo(item.id)}>
      Angre
    </button>
    <button className="item hidden" />
  </li>
);

class ToBuy extends Component {

  render() {
    return (
      <div>
        <h3>Kjøpt</h3>
        <ul className="list">
          {this.props.list.map(item =>
            <BuyItem
              key={item.id}
              item={item}
              undo={this.props.undo}
            />
          )}
        </ul>
      </div>
    );
  }
}

export default ToBuy;
