import React, { Component } from 'react';
import _ from 'lodash';

const BuyItem = ({item, del, buy}) => (
  <li>
    {item.name}
    <button onClick={() => del(item.id)}>Slett</button>
    <button onClick={() => buy(item.id)}>Kjøp</button>
  </li>
);

class ToBuy extends Component {

  render() {
    return (
      <div>
        <h3>Kjøp</h3>
        <ul>
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
