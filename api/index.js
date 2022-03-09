const express = require('express');
const config = require('config');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const router = require('./routes/providers');
app.use('/api/providers', router)

app.listen(config.get('api.port'), () => console.log('A API está funcionando!'));