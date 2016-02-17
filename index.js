var express = require ('express');
/*var RedisStore1 = require('connect-redis');
var RedisStore = RedisStore1(express);*/
var app = express();
var crypto = require('crypto'),
			algorithm = 'aes-256-ctr',
			password_for_crypt = 'password';
 function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,password_for_crypt);
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}
function encrypt(text){
  			var cipher = crypto.createCipher(algorithm,password_for_crypt)
  			var crypted = cipher.update(text,'utf8','hex')
  			crypted += cipher.final('hex');
  			return crypted;
}
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var responseTime = require('response-time')
var adding_new_book_data_to_database= require('./adding_new_book_data_to_database.js');
var sign_up = require('./sign_up');
var verification_mail = require('./verification_mail');
var login_page = require('./login_page');
var adding_new_librarian = require('./adding_new_librarian');

var http = require ('http');
http.createServer(app).listen(3000 , function(){
 
	console.log ( 'server started at port 3000');

}) ;
function cookie_checker(argument) {
	try
	{var lambda = argument.indexOf("&");
		var myu = argument.indexOf("&",lambda+1);
		console.log("lambda  : "+lambda);
		console.log("myu  : "+myu);
		var user_id_temp = argument.substring(9,lambda);
		
		var role_temp = argument.substring(lambda+10,myu);
		
		var logged_in_temp = argument.substring(myu +8);
		
		console.log("user_id_temp  : "+user_id_temp);
		console.log("role_temp  : "+role_temp);
		console.log("logged_in_temp  : "+logged_in_temp);
		var user_id = decrypt(user_id_temp);
		var role = decrypt(role_temp);
		var logged_in = decrypt(logged_in_temp);
		console.log("user_id  : "+user_id);
		console.log("role  : "+role);
		console.log("logged_in  : "+logged_in);
		var cookie_checker_array = new Array();
		cookie_checker_array = {user_id , role , logged_in };
		console.log(cookie_checker_array)
		return {
			"user_id":user_id,
			"role":role,
			"logged_in":logged_in
		};}
		catch(err)
		{
			return "Error";
		}
}
/*app.use (express.session({
	store : new RedisStore({
		host : '127.0.0.1',
		port : 6380,
		prefix:'sess'}),secret: 'SEKR37'}));
*/
app.use(express.static('./public'));
app.use(cookieParser('harshrockzzzz'));
//app.use(responseTime());
app.set ( "view engine " , " jade");
app.set ( "views", "./views");

var jsonParser = bodyParser.json();       // to support JSON-encoded bodies
var urlencodedParser =bodyParser.urlencoded({// to support URL-encoded bodies
	extended: true
});
app.locals.pretty = true;

/***********-home page---------************/

/**************----LOGIN----------***********************/
app.get('/',function(req,res){	
	res.render('home.jade');	
});
app.get('/login',function(req,res){	
	res.render('login page.jade');	
});
app.post('/login_to_account',urlencodedParser,function(req,res){	
		login_page(req.body.roll,req.body.mail_id,req.body.password).check_login_user(function(err,data,role){
		if(err)
			console.log("error when signing up : "+err);
		else
			if(data == false)
				{
					console.log("reload page");
					res.render('login page.jade',{error:'invalid input'});
				}
			else 
				{
					res.cookie('user',data,{signed:true});
					if(role == 'headlibrarian')
						res.redirect('http://localhost:3000/headlibrarian/dashboard');
					else if(role == 'librarian')
						res.redirect('http://localhost:3000/librarian/dashboard');
					else if(role == 'student' || role == 'professor')
						res.redirect('http://localhost:3000/user/dashboard');
				}
	});
	});


/**************-------------------***********************/
/*  Get Requests for sign up */

app.get('/sign_up',function(req,res){
	// -------------check user login ----------
	res.render('addNewNormalUser.jade');
})
app.post('/sign-up',urlencodedParser,function(req,res){
	var sign_up_1 = sign_up(req.body.college_id,req.body.role_of_user,req.body.name,req.body.sex,req.body.branch,req.body.email,req.body.password,req.body.phone,req.body.desc);
	sign_up_1.checking_if_user_exists(function(err,data){
		if(err)
			console.log("Error for checking if user already exists in sign up"+ err);
		else
			if(data == false)
				{	console.log("Entry already Exists : "+data)
					res.send("Entry already Exists.")
					}
			else {
				res.send('done');
				sign_up_1.send_authentication_mail(function(err,data){
					if(err)
						{
							console.log("Error for sending mail : "+err);
							res.send('Verification mail could not be sent');
						}
					else
						{console.log("sent mail");
						}
				});
				
			}
	});
});
/*  Get Requests for verificaion mail  + render if user already exists  */
app.get('/verification_mail',urlencodedParser,function(req,res){
	//console.log(req.query.data);
	verification_mail_1 = verification_mail(req.query['data']);
	var decrypted_verification_mail_data = verification_mail_1.decrypt_data();
	verification_mail_1.checking_if_user_exists([decrypted_verification_mail_data[0] , decrypted_verification_mail_data[5]],function(err,data){
		if(err)
			console.log("Error for check_for_mail_data + "+err);
		else
			if(data != true)
				{
					res.cookie('user',data,{signed:true});
					res.redirect('http://localhost:3000/user/dashboard');
				}
			else
			{
				verification_mail_1.add_into_database(decrypted_verification_mail_data,function(err,data){
					if(err)
						console.log("Error for adding data got from verification mail : ",err);
					else
						res.cookie('user',data,{signed:true});
						res.redirect('http://localhost:3000/user/dashboard');
				});
			}
	})
})



/******home dashboaards of users***********/


app.get('/headlibrarian/dashboard',function(req,res){
	var user_authentication = req.signedCookies.user;
	if(user_authentication)		
	{
		console.log("we get the cookie =  " + user_authentication);
		console.log("cookie array : "+cookie_checker(user_authentication));
		var cookie_checker_array_1 = cookie_checker(user_authentication);
     	console.log("debug : "+cookie_checker_array_1.user_id+" , "+cookie_checker_array_1.role+" , "+cookie_checker_array_1.logged_in);
				if(cookie_checker_array_1.logged_in != 'yes')
					res.send('<script>alert("Please login first")</script>');
				else if(cookie_checker_array_1.role != 'headlibrarian')
					res.send('<script>alert("You are not authorized to login here")</script>');
				else 
				res.render('headlibrarian_dashboard.jade');
	}
	else{
		 res.sendStatus(404);
	}

});

app.get('/librarian/dashboard',function(req,res){
	var user_authentication = req.signedCookies.user;
	if(user_authentication)		
	{
		console.log("we get the cookie =  " + user_authentication);
		console.log("cookie array : "+cookie_checker(user_authentication));
		var cookie_checker_array_1 = cookie_checker(user_authentication);
     	console.log("debug : "+cookie_checker_array_1.user_id+" , "+cookie_checker_array_1.role+" , "+cookie_checker_array_1.logged_in);
				if(cookie_checker_array_1.logged_in != 'yes')
					res.send('<script>alert("Please login first")</script>');
				else if(cookie_checker_array_1.role != 'librarian' )
					res.send('<script>alert("You are not authorized to login here")</script>');
				else 
				res.render('librarian_dashboard.jade');
	}
	else{
		 res.sendStatus(404);
	}

});



app.get('/user/dashboard',function(req,res){
	var user_authentication = req.signedCookies.user;
	if(user_authentication)		
	{
		console.log("we get the cookie =  " + user_authentication);
		console.log("cookie array : "+cookie_checker(user_authentication));
		var cookie_checker_array_1 = cookie_checker(user_authentication);
     	console.log("debug : "+cookie_checker_array_1.user_id+" , "+cookie_checker_array_1.role+" , "+cookie_checker_array_1.logged_in);
				if(cookie_checker_array_1.logged_in != 'yes')
					res.send('<script>alert("Please login first")</script>');
				else if(cookie_checker_array_1.role == 'librarian' || cookie_checker_array_1.role == 'headlibrarian')
					res.send('<script>alert("You are librarian. You cannot login here .")</script>');
				else 
				res.render('user_dashboard.jade');
	}
	else{
		 res.sendStatus(404);
	}
});


/********------  Get Requests for adding new books---------**********/

app.get('/librarian/add_new_book',function(req,res){
	// -------------check user login ----------
	var user_authentication = req.signedCookies.user;
	if(user_authentication)		
	{
		console.log("we get the cookie =  " + user_authentication);
		console.log("cookie array : "+cookie_checker(user_authentication));
		var cookie_checker_array_1 = cookie_checker(user_authentication);
     	console.log("debug : "+cookie_checker_array_1.user_id+" , "+cookie_checker_array_1.role+" , "+cookie_checker_array_1.logged_in);
				if(cookie_checker_array_1.logged_in != 'yes')
					res.send('<script>alert("Please login first")</script>');
				else if(cookie_checker_array_1.role != 'librarian' && cookie_checker_array_1.role != 'headlibrarian')
					res.send('<script>alert("You are not authorized to enter here.")</script>');
				else 
				res.render('addNewBooks.jade');
	}
	else{
		 res.sendStatus(404);
	}
});
/*    Handling AJAX requests*/
app.post('/test-page',urlencodedParser, function(req, res) {
	 add_books_object = adding_new_book_data_to_database(req.body.dateOfPurchase,req.body.title,req.body.author,req.body.copies,req.body.issuable,req.body.publisher,req.body.place,req.body.genre,req.body.edition,req.body.status,req.body.year,req.body.pages,req.body.booksource,req.body.bill,req.body.cost,req.body.desc);
	 var answer_to_send_back = add_books_object.books_data(function(err,data){
	 	if(err){console.log(err);}
	 	else {
	 		//console.log(data);
	 		res.send(data);
	 	}
	 });
	 //console.log(adding_new_book_data_to_database.trial());
     
    // ...
});


/*  Get Requests for adding new librarian*/


app.get('/headlibrarian/dashboard/add_librarian',function(req,res){
	var user_authentication = req.signedCookies.user;
	if(user_authentication)		
	{
		console.log("we get the cookie =  " + user_authentication);
		console.log("cookie array : "+cookie_checker(user_authentication));
		var cookie_checker_array_1 = cookie_checker(user_authentication);
     	console.log("debug : "+cookie_checker_array_1.user_id+" , "+cookie_checker_array_1.role+" , "+cookie_checker_array_1.logged_in);
				if(cookie_checker_array_1.logged_in != 'yes')
					res.send('<script>alert("Please login first")</script>');
				else if(cookie_checker_array_1.role != 'headlibrarian')
					res.send('<script>alert("You are not authorized to enter here.")</script>');
				else 
				res.render('add_new_librarian.jade');
	}
	else{
		 res.sendStatus(404);
	}
})
app.post('/add_new_librarian',urlencodedParser,function(req,res){
	var adding_new_librarian_1 = adding_new_librarian(req.body.college_id,req.body.name,req.body.gender,req.body.email,req.body.password,req.body.phone,req.body.desc);
	adding_new_librarian_1.checking_if_user_exists(function(err,data){
		if(err)
			console.log("Error for checking if user already exists in sign up"+ err);
		else
			if(data == false)
				{	console.log("Entry already Exists : "+data)
					res.send("Entry already Exists.")
					}
			else {
				adding_new_librarian_1.add_into_database([req.body.college_id,req.body.name,req.body.gender,req.body.email,req.body.password,req.body.phone,req.body.desc],function(err,data){
					if(err)
						{
							console.log("Error for adding into database : "+err);
							res.send('Librarian could not be added');
						}
					else
						{
							res.send(data);
						}
				});
				
			}
	});
});


/***------------change settings --------***/
app.get('/librarian/dashboard/settings',function(req,res){
	var user_authentication = req.signedCookies.user;
	if(user_authentication)		
	{
		console.log("we get the cookie =  " + user_authentication);
		console.log("cookie array : "+cookie_checker(user_authentication));
		var cookie_checker_array_1 = cookie_checker(user_authentication);
     	console.log("debug : "+cookie_checker_array_1.user_id+" , "+cookie_checker_array_1.role+" , "+cookie_checker_array_1.logged_in);
				if(cookie_checker_array_1.logged_in != 'yes')
					res.send('<script>alert("Please login first")</script>');
				else if(cookie_checker_array_1.role != 'librarian' && cookie_checker_array_1.role != 'headlibrarian')
					res.send('<script>alert("You are not authorized to enter here.")</script>');
				else 
				res.render('settings.jade');
	}
	else{
		 res.sendStatus(404);
	}
});
app.get('/change_max_books',urlencodedParser,function(req,res){
		var mysql = require("mysql");
		
		var dbclient=mysql.createConnection({
			host:"localhost",
			user:"headlibrarian",
			password:"password",
			database:"library",
			debug:true,		
		});
		
		// checking for null in input 
		dbclient.connect();
		var query_for_sql ="update setting set max_books = "+req.query.max;
				dbclient.query(query_for_sql,function(err,rows,fields){
					if(err)
						{console.log("change max books  error "+err);
												res.send("Error occured.");}
					else
						res.send("added");
				})
			});
app.get('/change_fine',urlencodedParser,function(req,res){
		var mysql = require("mysql");
		
		var dbclient=mysql.createConnection({
			host:"localhost",
			user:"headlibrarian",
			password:"password",
			database:"library",
			debug:true,		
		});
		
		// checking for null in input 
		dbclient.connect();
		if(req.query.fine1!=null)
		{var query_for_sql ="update setting set fine_1st_week = "+req.query.fine1;
						dbclient.query(query_for_sql,function(err,rows,fields){
							if(err)
								{console.log("change fine 1  error "+err);
														res.send("Error occured.");}
							else
								res.send("added");
						})}
		if(req.query.fine2!=null)
		{var query_for_sql ="update setting set fine_2nd_week = "+req.query.fine2;
						dbclient.query(query_for_sql,function(err,rows,fields){
							if(err)
								{console.log("change fine 2  error "+err);
														res.send("Error occured.");}
							else
								res.send("added");
						})}
		if(req.query.fine3!=null)
		{var query_for_sql ="update setting set fine_3rd_week = "+req.query.fine3;
						dbclient.query(query_for_sql,function(err,rows,fields){
							if(err)
								{console.log("change fine 3  error "+err);
														res.send("Error occured.");}
							else
								res.send("added");
						})}

			});


/******----- issue books --------********/

app.get('/librarian/dashboard/issue',function(req,res){
	var user_authentication = req.signedCookies.user;
	if(user_authentication)		
	{
		console.log("we get the cookie =  " + user_authentication);
		console.log("cookie array : "+cookie_checker(user_authentication));
		var cookie_checker_array_1 = cookie_checker(user_authentication);
     	console.log("debug : "+cookie_checker_array_1.user_id+" , "+cookie_checker_array_1.role+" , "+cookie_checker_array_1.logged_in);
				if(cookie_checker_array_1.logged_in != 'yes')
					res.send('<script>alert("Please login first")</script>');
				else if(cookie_checker_array_1.role != 'librarian' && cookie_checker_array_1.role != 'headlibrarian')
					res.send('<script>alert("You are not authorized to enter here.")</script>');
				else 
				res.render('issue_book.jade');
	}
	else{
		 res.sendStatus(404);
	}
});


app.post('/issue_book',urlencodedParser,function(req,res){
		var mysql = require("mysql");
		
		var dbclient=mysql.createConnection({
			host:"localhost",
			user:"headlibrarian",
			password:"password",
			database:"library",
			debug:true,		
		});
		
			var fullDate = new Date();
			var future = new Date();
			future.setDate(fullDate.getDate() + 30); 

		var currentDate = fullDate.getFullYear() + "/" + (fullDate.getMonth()+1) + "/" + fullDate.getDate();
		var newDate = future.getFullYear() + "/" + (future.getMonth()+1) + "/" + future.getDate();
		// checking for null in input 
		dbclient.connect();
		var query_for_sql ="insert into book_transaction(roll_no,book_id,issue,estimated_return_date) values('"+req.body.roll_no+"','"+req.body.book+"','"+currentDate+"','"+newDate+"')"
				dbclient.query(query_for_sql,function(err,rows,fields){
					if(err)
						{console.log("change max books  error "+err);
												res.send("Error occured.");}
					else
						res.send(newDate);
				})
			});
app.get("/check_user_count",urlencodedParser,function(req,res){
	var mysql = require("mysql");
		
		var dbclient=mysql.createConnection({
			host:"localhost",
			user:"headlibrarian",
			password:"password",
			database:"library",
			debug:true,		
		});
		var query_for_sql ="select max_books from setting";
				dbclient.query(query_for_sql,function(err,rows,fields){
					if(err)
					{
						 
						res.send("Error occured.");
					}
					else{
						var max_books = rows[0].max_books;
						var query_for_sql ="select count(*) as user_count from book_transaction where roll_no = '"+req.query.roll_no+"' AND  receiving IS NULL";
						dbclient.query(query_for_sql,function(err,rows,fields){
							if(err)
							{
						 
						res.send("Error occured.");
							}
							else
							{
								if(rows[0].user_count >= max_books)
								res.send("cannot issue");
								else
									res.send("can issue");
							}
						})
						
						}
				})
			});
app.get("/check_correct_user_detail",urlencodedParser,function(req,res){
	var mysql = require("mysql");
		
		var dbclient=mysql.createConnection({
			host:"localhost",
			user:"headlibrarian",
			password:"password",
			database:"library",
			debug:true,		
		});
		var query_for_sql ="select user_id from user where roll_no = '"+req.query.roll_no+"'";
				dbclient.query(query_for_sql,function(err,rows,fields){
					if(err)
					{
						 
						res.send("Error occured.");
					}
					else{
						if(rows.length>0)
						{
							res.send("exists");
						}
						else
						{
							res.send("not exists");
						}
					}
				})
			});

app.get("/check_correct_book",urlencodedParser,function(req,res){
	var mysql = require("mysql");
		
		var dbclient=mysql.createConnection({
			host:"localhost",
			user:"headlibrarian",
			password:"password",
			database:"library",
			debug:true,		
		});
		var query_for_sql ="select book_id from books where book_id = '"+req.query.book+"'";
		console.log(query_for_sql);
				dbclient.query(query_for_sql,function(err,rows,fields){
					if(err)
					{
						console.log("change max books  error "+err);
						res.send("Error occured.");
					}
					else{
						if(rows.length>0)
						{
							res.send("exists");
						}
						else
						{
							res.send("not exists");
						}
					}
				})
			});


/*app.get('/librarian/dashboard/return',function(req,res){
	var user_authentication = req.cookies.user;
	if(user_authentication == undefined)
		 res.send('<script>alert("Please login first or check your cookies")</script>');
	else
	{console.log("we get the cookie =  " + user_authentication);
		console.log("cookie array : "+cookie_checker(user_authentication));
		var cookie_checker_array_1 = cookie_checker(user_authentication);
		if(cookie_checker_array_1 =="Error")
			res.send("Don't tamper with cookies");
		else

		{console.log("debug : "+cookie_checker_array_1.user_id+" , "+cookie_checker_array_1.role+" , "+cookie_checker_array_1.logged_in);
				if(cookie_checker_array_1.logged_in != 'yes')
					res.send('<script>alert("Please login first12")</script>');
				else if(cookie_checker_array_1.role != 'librarian' && cookie_checker_array_1.role != 'headlibrarian')
					res.send('<script>alert("You are not authorized to enter here.")</script>');
				else 
		res.render('return_book.jade');
	}
}
});

	*/
	
		

