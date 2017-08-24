var pg = require('pg')
var format = require('pg-format')

var express    = require('express');        
var app        = express();               
var bodyParser = require('body-parser');

var promise = require('bluebird');
var options = {
  // Initialization Options
  promiseLib: promise
};
var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/notes';
var db = pgp(connectionString);

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();          

// middleware to use for all requests
router.use(function(req, res, next) {
    console.log('Middleware running.');
    next(); 
});

// Test route (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// GET all the notes (accessed at GET http://localhost:8080/api/note/add)
router.get('/note', function(req, res) {
        console.log("GET request at /note");
        // console.log("req is: ", req);
		db.any('select * from notestable')
			.then(function (data) {
				console.log("data is: ", data);
				res.status(200)
				.json({
					status: 'success',
					data: data,
					message: 'Retrieved ALL notes'
				});
			})
			.catch(function (err) {
				console.log("err is: ", err);
				return next(err);
			});
		// res.json("GET request at /note");
    });

// Create a note (accessed at POST http://localhost:8080/api/note/add)
router.post('/note/add', function(req, res) {
    	console.log("post request at /note/add");
    	// console.log("req.body is: ", req.body);
    	var title = req.body.title;
    	var description = req.body.description;
    	console.log("title is: ", title);
    	console.log("description is: ", description);

		db.none('insert into notestable(title, description)' +
			'values(${title}, ${description})',
				req.body)
		.then(function () {
			res.status(200)
			.json({
				status: 'success',
				message: 'Inserted one note'
			});
		})
		.catch(function (err) {
			console.log("err is: ", err);
			return next(err);
		});
		
    	// res.json("post request at /note/add");
    });
    

// Register our routes
app.use('/api', router); // all of our routes will be prefixed with /api

// Start the server.
console.log('Server listening on port ' + port);
app.listen(port);

