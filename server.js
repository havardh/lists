require('babel-core/register');

import express from 'express';
import api from './server/src/api';

const app = express();

app.set('port', (process.env.PORT || 3001));

if (process.env.NODE_ENV == 'production') {
  app.use(exress.static('client/build'));
}

app.all('*', (req, res, next) => {
  console.log(`${req.method}: ${req.url}`); // eslint-disable-line no-console
  next();
})

app.use('/api', api);

app.listen(app.get('port'), () => {
  console.log(`Running Api at: http://localhost:${app.get('port')}`);
});
