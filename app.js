/*
    Copyright 2019 SER401 Project 14 Team - All Rights Reserved

    Team Members: 
    RAYMOND ACEVEDO
    SHAWN WEINER
    CHRISTOPHER SALAZAR
    ROBERT PILLITTERI
    SHELTON LACY 

    Unauthorized copying of this file, via any medium is strictly prohibited
    Proprietary and confidential
*/




// module imports
const express = require('express');
const app = express();
const data = require ('./database');
const students = require('./routes/students');
const teachers = require('./routes/teachers');
const tests = require('./routes/tests');
const results = require ('./routes/results');
const apptest = require('./routes/apptest');
const HttpStatus = require('http-status-codes');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocs = YAML.load('./mathapp.apiDocs.yaml');
const router = express.Router();
const bodyParser = require('body-parser');

require('dotenv').config();

// load & Parse api spec
const apiSpec = YAML.load('./mathapp.apiDocs.yaml');


// define true constants

const SERVER_PORT = process.env.PORT || 8000;

/*
    Middleware
*/
// express settings
app.set('trust proxy', true);

// initialize app settings
// Added functionality to process text/plain into JSON, just in case it is not set correctly

app.use(bodyParser.json());
app.use(bodyParser.text());


// try to convert raw text to json
app.use(function (req, res, next) {
    console.log(req.method);
    console.log(next);
    if (req.method === "GET") {
        console.log("Confirmed Get");
        next();
    } else if (req.is('json')) {
        console.log("Json Request");
        console.log(req.body);
        next();
    } else if (req.is('text/plain')) {
        console.log("Plain text recieved")
        console.log(req.body);
        req.body = JSON.parse(req.body);
        console.log(req.body);
        next();
    } else {
        console.log("Request not JSON");
        var result = {};
        result['data'] = {
            "endpoint": req.path,
            "payload": "Expects JSON request",
        };
        result['responseCode'] = HttpStatus.UNSUPPORTED_MEDIA_TYPE;
        result['response'] = 'UNSUPPORTED_MEDIA_TYPE';
        res.status(result.responseCode);
        res.json(result);
        return;
    }
});


// troubleshooting
/*
app.use(function (req,res,next) {
    console.log(req.url);
    console.log(req.ip);
    console.log(req.body);
    next();
});
*/


/*
    Routes
*/

router.use('/students', students);
router.use('/teachers', teachers);
router.use('/tests', tests);
router.use('/results', results);
router.use('/apptest', apptest);
router.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use('/api/v1', router);
app.use('/', router);


/*
    Default base route
*/
// default handler
// anything not implemented gets a response not implemented
// this HAS to be last in file to ensure it doesn't trigger on anything else that might match
app.use(function(req,res) {
    var result = {};
    result['data'] = {};
    result['responseCode'] = HttpStatus.NOT_IMPLEMENTED;
    result['response'] = "Not Implemented";
    res.status(result.responseCode);
    res.json(result);
    return;
});




/*
    Server
*/
// force ipv4
// app.listen(SERVER_PORT, '0.0.0.0', () => console.log(`Starting server, listening on ${SERVER_PORT}`));

// ipv6 compatible
app.listen(SERVER_PORT, () => console.log(`Starting server, listening on ${SERVER_PORT}`));
