const express = require('express');
const auth = require('./src/routes/auth')
const cors = require('cors');
//const bodyParser = require('body-parser');
const app = express();
const port = 8080;
//const knexConfig = require('knexfile');
//const knex = require('knex')(knexConfig[process.env.NODE_ENV])
//app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors());

app.use('/api/auth', auth);

app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


/*app.post("/api/auth/register", function(req, res) {
  console.log(req.body);
  res.send({ status: 'SUCCESS' });
});*/