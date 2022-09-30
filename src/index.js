const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.set('port', 7123 || 4000);

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/', require('./router'));

app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});
