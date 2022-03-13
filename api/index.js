const express = require('express');
const config = require('config');
const app = express();
const router = require('./routes/providers');
const bodyParser = require('body-parser');
const { acceptsFormats, ErrorSerializer } = require('./serializer');

app.use(bodyParser.json());

app.use((req, res, next) => {
    let reqFormat = req.header('Accept')

    console.log(reqFormat)
    if (reqFormat === '*/*') {
        reqFormat = 'application/json'
    }

    if (!acceptsFormats.includes(reqFormat)) {
        res.status(406)
        res.end
        return
    }

    res.setHeader('Content-Type', reqFormat)
    next()
})

app.use('/api/providers', router)

app.use((error, _, res, next) => {
    const serializer = new ErrorSerializer(
        res.getHeader('Content-Type')
    )
    res.status(error.status);
    res.send(
        serializer.serializer({
            message: error.message,
            id: error.idError
        })
    );
})

app.listen(config.get('api.port'), () => console.log('The API is working!'));