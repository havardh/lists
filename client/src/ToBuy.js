import React, { Component } from 'react';
import _ from 'lodash';
import './List.css';

const BuyItem = ({item, del, buy}) => (
  <li className="list-item">
    <div>- {item.name}</div>
    <button className="item" onClick={() => buy(item.id)}>Kjøp</button>
    <button className="item" onClick={() => del(item.id)}>Slett</button>
  </li>
);

class ToBuy extends Component {
  render() {
    return (
      <div>
        <h3>Kjøp</h3>
        <ul className="list">
          {this.props.list.map(item =>
            <BuyItem
              key={item.id}
              item={item}
              del={this.props.del}
              buy={this.props.buy}
            />
          )}
        </ul>
      </div>
    );
  }
}

export default ToBuy;
