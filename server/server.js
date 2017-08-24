var pg = require('pg')
var format = require('pg-format')


var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    console.log('Middleware running.');
    next(); 
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.route('/note')
	// get all the notes (accessed at GET http://localhost:8080/api/note/add)
    .get(function(req, res) {
        console.log("GET request at /note");
        // console.log("req is: ", req);
        res.json("GET request at /note");
    });

router.route('/note/add')
	// create a note (accessed at POST http://localhost:8080/api/note/add)
    .post(function(req, res) {
    	console.log("post request at /note/add");
    	// console.log("req is: ", req);
    	res.json("post request at /note/add");
    });
    

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
app.listen(port);
console.log('Server listening on port ' + port);

// var PGUSER = 'shafaafhossain'
// var PGDATABASE = 'examplez'
// var age = 724
// var config = {
//   user: PGUSER, // name of the user account
//   database: PGDATABASE, // name of the database
//   max: 10, // max number of clients in the pool
//   idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
// }

// var pool = new pg.Pool(config)
// var myClient

// pool.connect(function (err, client, done) {
//   if (err) console.log(err)
//   app.listen(3000, function () {
//     console.log('listening on 3000')
//   })
//   myClient = client
//   var ageQuery = format('SELECT * from numbers WHERE age = %L', age)
//   myClient.query(ageQuery, function (err, result) {
//     if (err) {
//       console.log(err)
//     }
//     console.log(result.rows[0])
//   })
// })

