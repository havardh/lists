import React, { Component } from 'react';
import _ from "lodash";

import {guid} from './util.js';
import AddItem from './AddItem';
import ToBuy from './ToBuy';
import Bought from './Bought';
import Deleted from './Deleted';

class ShoppingList extends Component {

  constructor(props) {
    super(props)

    const list = JSON.parse(localStorage.getItem('list') || "[]");
    this.state = {list};
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem('list', JSON.stringify(nextState.list));
  }

  toBuy = () => {
    return this.state.list.filter(({bought, deleted}) =>
      bought === null && deleted === null
    );
  }

  bought = () => {
    return this.state.list.filter(({bought}) => bought !== null);
  }

  deleted = () => {
    return this.state.list.filter(({deleted}) => deleted !== null);
  }

  addItem = (name) => {
    this.setState((prevState) => {
      return {
        list: _.concat(prevState.list, {
          id: guid(),
          name,
          added: new Date(),
          bought: null,
          deleted: null
        })
      };
    });
  }

  buyItem = (id) => {
    this.updateItem(id, (item) => {
      item.bought = new Date();
    });
  }

  delItem = (id) => {
    this.updateItem(id, (item) => {
      item.deleted = new Date();
    });
  }

  undoBuy = (id) => {
    this.updateItem(id, (item) => {
      item.bought = null;
    });
  }

  undoDelete = (id) => {
    this.updateItem(id, (item) => {
      item.deleted = null;
    });
  }

  delDeleted = (idToDelete) => {
    this.setState((prevState) => {
      return {list: _.filter((prevState.list), ({id}) => id !== idToDelete) };
    });
  }

  updateItem = (id, cb) => {
    this.setState((prevState) => {
      const list = prevState.list;
      const item = _.find(list, {id});
      if (item) {
        cb(item);
      } else {
        console.error("Could not find item with id: ", id);
      }
      return {list};
    });
  }

  render() {
    return (
      <div className="App-intro">
        <AddItem add={this.addItem} />
        <ToBuy
          buy={this.buyItem}
          del={this.delItem}
          list={this.toBuy()}
        />
        <Bought
          undo={this.undoBuy}
          list={this.bought()}
        />
        <Deleted
          undo={this.undoDelete}
          del={this.delDeleted}
          list={this.deleted()}
        />
      </div>
    );
  }
}

export default ShoppingList;
