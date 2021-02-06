const express = require('express');
const app = express();
const port = process.env.PORT
const cors = require('cors')

app.use(express.static(__dirname + '/client'));
app.use(express.json());

app.use(cors())

require('./server/db/mongoose')
const Bento = require('./server/models/bento')
const bentoRoute = require('./server/routes/bento');
const userRoute = require('./server/routes/user');
app.use('/api', bentoRoute);
app.use('/api/user', userRoute);

app.listen(port, () => {
  console.log('app listening on port', port);
});