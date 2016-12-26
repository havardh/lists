import React, { Component } from 'react';
import _ from 'lodash';
import './List.css'

const BuyItem = ({item, undo, del}) => (
  <li className="list-item">
    <div>- {item.name}</div>
    <button className="item" onClick={() => undo(item.id)}>Angre</button>
    <button className="item hidden" />
  </li>
);

class ToBuy extends Component {

  constructor(props) {
    super(props);
    this.state = {isVisible: false};
  }

  toggle = () => {
    this.setState(({isVisible}) => ({
      isVisible: !isVisible,
    }));
  }

  render() {
    return (
      <div>
        <h3 onClick={this.toggle}>Slettet</h3>
        {this.state.isVisible && <ul className="list">
          {this.props.list.map(item =>
            <BuyItem
              key={item.id}
              item={item}
              undo={this.props.undo}
              del={this.props.del}
            />
          )}
        </ul>}
      </div>
    );
  }
}

export default ToBuy;
