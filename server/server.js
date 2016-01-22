/**
 * Created by lizwestberg on 1/22/16.
 */
var express = require('express');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var dbRoute = require('./routes/db_routes');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}));

app.use('/dbRoute', dbRoute);
app.use('/', index);

app.use(express.static('server/public/'));

app.listen(app.get('port'), function(){
    console.log("Listening on port:", app.get('port'));
});
