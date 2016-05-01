/**
 * Created by oron sason on 01/05/2016.
 */
var MongoClient = require('mongodb').MongoClient;
var _db;
var debug = require('debug')('mongoUtils');

module.exports= {
    connect: function (url) {
        MongoClient.connect(url, function (err, db) {
            if (err) {
                debug("Error connecting to Mongo database: ", err);
                return;
            }
            else {
                debug("connected to Mongo");
                _db = db;
            }
        });
    }
}