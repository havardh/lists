import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';
import webpack from 'webpack';
import * as Store from "./store";

const api = express();

api.use(bodyParser.json());

api.get('/actions', async (req, res) => {
  res.json(await Store.all());
  res.end();
});

export default api;
