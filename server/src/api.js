import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';
import webpack from 'webpack';
import * as Store from "./store";

import {reduceList} from '../../client/src/reducers';

const api = express();

api.use(bodyParser.json());

api.get('/actions', async (req, res) => {
  res.json(await Store.all());
  res.end();
});

api.get('/state', async (req, res) => {
  const actions = await Store.all()

  let state = {};
  for (let action of actions) {
    state = reduceList(state, action);
  }

  res.json(state);
  res.end();
})

export default api;
