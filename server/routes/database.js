var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoUtils = require('../mongoUtils');
var debug = require('debug')('routes/database');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

/* GET home page. */
// Defines the root route. router.get receives a path and a function
// The req object represents the HTTP request and contains
// the query string, parameters, body, header
// The res object is the response Express sends when it receives
// a request
// render says to use the views/index.jade file for the layout
// and to set the value for title to 'Express'


router.get('/thelist', function(req, res,db){

            // Get the documents collection
            mongoUtils.query('students',{},(function (err, result) {
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
            })
    );
});

// Route to the page we can add students from using newstudent.jade
router.get('/newstudent', function(req, res){
    res.render('newstudent', {title: 'Add New Student'});
});


router.post('/addstudent', urlencodedParser,function(req, res,db){


            var student1 = {student:req.body.student, street: req.body.street,
                city: req.body.city, state: req.body.state, sex: req.body.sex,
                gpa: req.body.gpa};
            // Insert the student data into the database
                mongoUtils.insert('students',[student1], function (err, result){
                if (err) {
                    console.log(err);
                } else {

                    // Redirect to the updated student list
                    res.redirect("thelist");
                }

                // Close the database
            });
});
router.delete

module.exports = router;