import React from 'react';
import {Container} from 'flux/utils';

import AddItem from './AddItem';
import ToBuy from './ToBuy';
import Bought from './Bought';
import Deleted from './Deleted';
import Store from './store';
import {add, buy, del, delDeleted, undoDelete, undoBuy} from './actions';
import {toBuy, bought, deleted} from './selectors';

function ShoppingList ({list, add, buy, del, undoBuy, undoDelete, delDeleted}) {
  return (
    <div className="App-intro">
      <AddItem add={add} />
      <ToBuy
        buy={buy}
        del={del}
        list={toBuy(list)}
      />
      <Bought
        undo={undoBuy}
        list={bought(list)}
      />
      <Deleted
        undo={undoDelete}
        del={delDeleted}
        list={deleted(list)}
      />
    </div>
  );
}

function getStores() {
  return [Store];
}

function getState() {
  return {
    list: Store.getState(),
    add,
    buy,
    del,
    undoBuy,
    undoDelete,
    delDeleted
  };
}

export default Container.createFunctional(ShoppingList, getStores, getState);
