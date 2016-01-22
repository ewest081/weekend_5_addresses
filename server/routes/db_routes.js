/**
 * Created by lizwestberg on 1/22/16.
 */
var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/addresses_database';

router.get('/getUsers', function(request, response){

    var results = [];

    pg.connect(connectionString, function(err, client){

        var query = client.query('SELECT name FROM users');

        query.on('row', function(row){
            results.push(row);
        });

        query.on('end', function(){
            client.end();
            return response.json(results);
        });

        if(err) {
            console.log(Error)
        }

        //console.log(response)
    })
});

module.exports = router;