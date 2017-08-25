var pg = require('pg')
var format = require('pg-format')

var express    = require('express');        
var app        = express();               
var bodyParser = require('body-parser');
var cors = require('cors');


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

// Allow CORS
app.use(cors())

var port = process.env.PORT || 8080;        

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();          

// middleware to use for all requests
router.use(function(req, res, next) {
    console.log('Middleware running.\n\n');
    next(); 
});

// Test route (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// Todo: Query Paramters
// GET all the notes (accessed at GET http://localhost:8080/api/note/add)
router.get('/note', function(req, res) {
        console.log("GET request at /note");
        // console.log("req is: ", req);
        
        var limitSQL = "";
        if(req.query.limit != undefined){
        	var limit = req.query.limit;
        	limitSQL = "limit " + limit;
        }

        var orderSQL = "order by creationtime desc";
       	if(req.query.order != undefined){
        	var order = req.query.order;
        	orderSQL = "order by creationtime " + order;
        }

		var startSQL = "";
		if(req.query.start != undefined){
        	var start = req.query.start - 1;
        	startSQL = "offset " + start;
        }       

        console.log("limit is: ", limit);
		console.log("order is: ", order);
        console.log("start is: ", start);
        var sqlQuery = 'select * from notestable ' + orderSQL + " " + limitSQL + " " + startSQL;
        console.log("sqlQuery is: ", sqlQuery);
		db.any(sqlQuery)
			.then(function (data) {
				console.log("data is: ", data);
				res.status(200)
				.json({
					status: 'success',
					data: data,
					message: 'Retrieved notes'
				});
			})
			.catch(function (err) {
				console.log("err is: ", err);
				res.json(400, {
					status: 'error',
					message: err.message
				});
			});
    });
	
// GET specific note based on id (accessed at GET http://localhost:8080/api/note/:note_id)
router.get('/note/:id', function(req, res) {
        console.log("GET request at /note/:id");
        console.log("req.params is: ", req.params);
		var noteId = parseInt(req.params.id);
		console.log("noteId is: ", noteId);
		db.one('select * from notestable where id = $1', [noteId])
		.then(function (data) {
			console.log("data is: ", data);
			res.status(200)
			.json({
				status: 'success',
				data: data,
				message: 'Retrieved specific note based on note_id'
			});
		})
		.catch(function (err) {
			// return next(err);
			console.log("err is: ", err);
			res.json(400, {
				status: 'error',
				message: err.message
			});
		});
    });


// Todo: catch errors
// UPDATE specific note based on id (accessed at PUT http://localhost:8080/api/note/:note_id)
router.put('/note/:id', function(req, res) {
        console.log("PUT request at /note/:id");
        console.log("req.params is: ", req.params);
		var noteId = parseInt(req.params.id);
		var title = req.body.title;
    	var description = req.body.description;
    	console.log("noteId is: ", noteId);
    	console.log("title is: ", title);
    	console.log("description is: ", description);
		
		db.none('update notestable set title=$1, description=$2 where id=$3',
			[title, description, noteId])
		.then(function () {
			res.status(200)
			.json({
				status: 'success',
				message: 'Updated note'
			});
		})
		.catch(function (err) {
			console.log("err is: ", err);
			res.json({
				status: 'error',
				message: err.message
			});
		});	
    });

// Todo: catch errors
// GET specific note based on id (accessed at GET http://localhost:8080/api/note/:note_id)
router.delete('/note/:id', function(req, res) {
        console.log("delete request at /note/:id");
        console.log("req.params is: ", req.params);
		var noteId = parseInt(req.params.id);
		console.log("noteId is: ", noteId);
		db.result('delete from notestable where id = $1', noteId)
	    .then(function (result) {
	    	console.log("result is: ", result);
	      	res.status(200)
	        .json({
	          status: 'success',
	          message: `Removed ${result.rowCount} notes`
	        });
	    })
	    .catch(function (err) {
	      	console.log("err is: ", err);
			res.json(400, {
				status: 'error',
				message: err.message
			});
	    });
    });

// Create a note (accessed at POST http://localhost:8080/api/note/add)
router.post('/note/add', function(req, res) {
    	console.log("post request at /note/add");
    	// console.log("req.body is: ", req.body);
    	var title = req.body.title;
    	var description = req.body.description;
    	console.log("title is: ", title);
    	console.log("description is: ", description);
		db.one('INSERT INTO notestable(title, description)' +
			' values($1, $2) RETURNING id, creationtime, description, title', [title, description])
		.then(function (data) {
			console.log("data from query is: ", data);
			var note = {};
			note.id = data.id;
			note.creationtime = data.creationtime;
			note.description = data.description;
			note.title = data.title;
			
			res.status(200)
			.json({
				note: note,
				status: 'success',
				message: 'Inserted note'
			});
		})
		.catch(function (err) {
			console.log("err is: ", err);
			// return next(err);
			res.json(400, {
				status: 'error',
				message: err.message
			});
		});		
    });


// Register our routes
app.use('/api', router); // all of our routes will be prefixed with /api

// Start the server.
console.log('Server listening on port ' + port);
app.listen(port);

