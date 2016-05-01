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
                debug(url+"Error connecting to Mongo database: ", err);
                return;
            }
            else {
                debug("connected to Mongo");
                _db = db;
            }
        });
    },
    getCollection:function(collectionName)
    {
        return _db.collection(collectionName);
    },
    insert:function(collectionName,data,callback)
    {
        _db.collection(collectionName).insert(data,function(error,result)
        {
            if(error)
            {
                debug('error', error);
                callback(error, result);

            }
            else
            {
                debug('Inserted %d document into the %s collection. The document inserted is ', result.insertedCount,collectionName , result);
                callback(error, result);
            }
        });
    },
    update : function(collectionName ,query, updatedData, options, callback) {
        _db.collection(collectionName).update(query, updatedData, options, function (error, result) {
            if (error) {
                debug(error);
                callback(error, result);
                return;
            }
            else if (result) {
                debug('Updated Successfully %d document(s).', result.result.n);
            } else {
                debug('No document found with defined "find" criteria!');

            }
            callback(error, result);

        });
    },
    delete:function(collectionName,query,callback) {

        _db.collection(collectionName).remove(query, function (error, result) {
            if (error) {
                debug(error);
                callback(error, result);

            }
            else {
                debug("Removed  %d doc(s)", result.result.n);
                callback(error, result);
            }


        });
    },
    query:function(collectionName,query,callback)
    {
        _db.collection(collectionName).find(query).toArray(function (error,result)
        {
            if(error)
            {
                debug(error);
                callback(error, result);
            }
            else
            {
                debug("The result is : ",result);
                callback(error, result);
            }
        });
    }

};