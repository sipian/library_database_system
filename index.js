var express = require ('express');
var bodyParser = require('body-parser');
var responseTime = require('response-time')
var just_a_temporary_variable_to_store_parameters= require('./adding_new_book_data_to_database.js');
var app = express();
var http = require ('http');
http.createServer(app).listen(3000 , function(){
 
	console.log ( 'server started at port 3000');

}) 
app.use(express.static('./public'));
app.use(responseTime());
app.set ( "view engine " , " jade");
app.set ( "views", "./views");

var jsonParser = bodyParser.json();       // to support JSON-encoded bodies
var urlencodedParser =bodyParser.urlencoded({// to support URL-encoded bodies
	extended: true
});
app.locals.pretty = true;
app.get('/add_new_book',function(req,res){
	res.render('addNewBooks.jade');
});
app.post('/test-page',urlencodedParser, function(req, res) {
	 adding_new_book_data_to_database = just_a_temporary_variable_to_store_parameters(req.body.dateOfPurchase,req.body.title,req.body.author,req.body.copies,req.body.issuable,req.body.publisher,req.body.place,req.body.genre,req.body.edition,req.body.status,req.body.year,req.body.pages,req.body.booksource,req.body.bill,req.body.cost,req.body.desc);
	 var answer_to_send_back = adding_new_book_data_to_database.books_data(function(err,data){
	 	if(err){console.log(err);}
	 	else {
	 		//console.log(data);
	 		res.send(data);
	 	}
	 });
	 //console.log(adding_new_book_data_to_database.trial());
     
    // ...
});
app.get('/add_new_normal_user',function(req,res){
	res.render('addNewNormalUser.jade');
});