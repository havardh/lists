import React, { Component } from 'react';
import _ from 'lodash';

const BuyItem = ({item, undo}) => (
  <li>
    {item.name}
    <button onClick={() => undo(item.id)}>
      Angre
    </button>
  </li>
);

class ToBuy extends Component {

  render() {
    return (
      <div>
        <h3>Kjøpt</h3>
        <ul>
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
