import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';
import webpack from 'webpack';

const api = express();

const actions = [];

api.use(bodyParser.json());

api.get('/actions', (req, res) => {
  res.json(actions);
  res.end();
});

api.post('/actions', (req, res) => {
  const {action} = req.body;

  action.persisted = true;

  actions.push(action);
  res.json(action)
  res.end();
});

export default api;
