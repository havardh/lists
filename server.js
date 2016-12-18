
require('babel-core/register');

import app from './server/app';

app.listen(8080, '0.0.0.0', err => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:8080');
})
