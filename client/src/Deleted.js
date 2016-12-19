import React, { Component } from 'react';
import _ from 'lodash';

const BuyItem = ({item, undo, del}) => (
  <li>
    {item.name}
    <button onClick={() => undo(item.id)}>Angre</button>
    <button onClick={() => del(item.id)}>Slett</button>
  </li>
);

class ToBuy extends Component {

  render() {
    return (
      <div>
        <h3>Slettet</h3>
        <ul>
          {this.props.list.map(item =>
            <BuyItem
              key={item.id}
              item={item}
              undo={this.props.undo}
              del={this.props.del}
            />
          )}
        </ul>
      </div>
    );
  }
}

export default ToBuy;
