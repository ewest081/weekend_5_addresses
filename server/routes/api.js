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

        var query = client.query('SELECT * FROM users');

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
    })
});

router.get('/getAddress', function(request, response){

    var clientID = {id: request.query.id};
    var results = [];

    pg.connect(connectionString, function(err, client){
        var query = client.query('SELECT * FROM addresses WHERE user_id = ($1)', [clientID.id]);

        query.on('row', function(row){
            results.push(row);
        });

        query.on('end', function(){
            client.end();
            return response.json(results);
        });

        if(err){
            console.log(Error);
        }
    })

});

router.get('/getOrders', function(request, response){

    var clientID = {id: request.query.id,
                    earlyDate: request.query.earlyDate,
                    lateDate: request.query.lateDate};
    var results = [];

    pg.connect(connectionString, function(err, client){
        var query = client.query('SELECT * FROM users JOIN orders ON users.id = orders.user_id JOIN addresses ON orders.ship_address_id = addresses.address_id WHERE orders.user_id = ($1) AND orders.order_date BETWEEN ($2) AND ($3)', [clientID.id, clientID.earlyDate, clientID.lateDate]);

        query.on('row', function(row){
            results.push(row);
        });

        query.on('end', function(){
            client.end();
            return response.json(results);
        });

        if(err){
            console.log(Error);
        }
    })

});

module.exports = router;