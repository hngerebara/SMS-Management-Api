const express = require('express'),
    winston = require('winston'),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    models = require('./server/models/index.js'),
    app = express();


// Assign port and create server
const port = process.env.PORT || '5000';
app.set('port', port);


app.use(logger('dev'));

winston.info('adding middleware - body parser...');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


winston.info('Configuring routes...');
require('./server/routes/')(app);

// Catch all other routes.
app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to hopeaz sms application.',
}));

try {
    //Listen on assigned port
    app.listen(port, () => winston.info(`App running on localhost:${port}`));
    
} catch (e) {
    winston.error(`Error startig servers`, e);
}

module.exports = app;