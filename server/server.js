/**
 * Created by lizwestberg on 1/22/16.
 */

var express = require('express');
var index = require('./routes/index');

var app = express();

app.use(express.static('server/public'));

app.use('/', index);

var server = app.listen(5000, function(){
    var port = server.address().port;
    console.log('Listening on port', port);
});