const express = require('express');
const bodyParser = require('body-parser');
const app = express();


const port = process.env.port || 8080;
const config = require('./config/database');
const api = require('./routes/api');
const path = require('path');
const methodOverride = require('method-override');


const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(config.uri, function (err) {
    if(err){
        console.log('Error: Not Connect to Database ' + err);
    }else {
        console.log('Connect to Database ' + config.uri);
    }
});

app.use(function(req, res, next) {
//set headers to allow cross origin request.
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(methodOverride('_method'));

app.use('/', api);
app.listen(port, function () {
    console.log('listening on port ' + port);
});