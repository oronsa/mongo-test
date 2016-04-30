var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

/* GET home page. */
// Defines the root route. router.get receives a path and a function
// The req object represents the HTTP request and contains
// the query string, parameters, body, header
// The res object is the response Express sends when it receives
// a request
// render says to use the views/index.jade file for the layout
// and to set the value for title to 'Express'


router.get('/', function(req, res)
{
    res.sendFile('index.html', {root: 'client'});
});

router.get('/thelist', function(req, res){

    // Get a Mongo client to work with the Mongo server
    var MongoClient = mongodb.MongoClient;

    // Define where the MongoDB server is
    var url ='mongodb://oron570:o5709572r@ds021299.mlab.com:21299/mongo_test';

    // Connect to the server
    MongoClient.connect(url, function (err, db) {
        if (err) {
            debug("Error connecting to Mongo database: ", err);
            return;
        } else {
            // We are connected
            console.log('Connection established to', url);

            // Get the documents collection
            var collection = db.collection('students');

            // Find all students
            collection.find({}).toArray(function (err, result) {
                if (err) {
                    res.send(err);
                } else if (result.length) {
                    res.render('studentList',{

                        // Pass the returned database documents to Jade
                        "studentList" : result
                    });
                } else {
                    res.send('No documents found');
                }
                //Close connection
                db.close();
            });
        }
    });
});

// Route to the page we can add students from using newstudent.jade
router.get('/newstudent', function(req, res){
    res.render('newstudent', {title: 'Add New Student'});
});


router.post('/addstudent', urlencodedParser,function(req, res){

    // Get a Mongo client to work with the Mongo server
    var MongoClient = mongodb.MongoClient;

    // Define where the MongoDB server is
    var url ='mongodb://oron570:o5709572r@ds021299.mlab.com:21299/mongo_test';

    // Connect to the server
    MongoClient.connect(url, function(err, db){
        if (err) {
            console.log('Unable to connect to the Server:', err);
        } else {
            console.log('Connected to Server');

            // Get the documents collection
            var collection = db.collection('students');
            // Get the student data passed from the form
            var student1 = {student:req.body.student, street: req.body.street,
                city: req.body.city, state: req.body.state, sex: req.body.sex,
                gpa: req.body.gpa};
            // Insert the student data into the database
            collection.insert([student1], function (err, result){
                if (err) {
                    console.log(err);
                } else {

                    // Redirect to the updated student list
                    res.redirect("thelist");
                }

                // Close the database
                db.close();
            });
        }
    });

});
router.delete

module.exports = router;