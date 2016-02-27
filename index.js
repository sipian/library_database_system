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
var mysql = require("mysql");

		var dbclient=mysql.createConnection({
			host: process.env.RDS_HOSTNAME || "localhost",
			user:process.env.RDS_USERNAME || "headlibrarian",
			password:process.env.RDS_PASSWORD || "password",
			database:"ebdb",
			multipleStatements: true
		});
		dbclient.connect();
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
http.createServer(app).listen( process.env.PORT || 3000 , function(){

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
		//res.removeCookie('user');
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
						res.redirect('/headlibrarian/dashboard');
					else if(role == 'librarian')
						res.redirect('/librarian/dashboard');
					else if(role == 'student' || role == 'professor')
						res.redirect('/user/dashboard');
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
					res.redirect('/user/dashboard');
				}
			else
			{
				verification_mail_1.add_into_database(decrypted_verification_mail_data,function(err,data){
					if(err)
						console.log("Error for adding data got from verification mail : ",err);
					else
						res.cookie('user',data,{signed:true});
						res.redirect('/user/dashboard');
				});
			}
	})
})


app.get("/harsh", urlencodedParser,function(req,res){

var query = req.query.query;
				if(query == null)
				{
					res.render('create table.jade');
				}
					else
{

dbclient.query(query,function(err,rows,fields){
						if(err)
						{
							console.log('error');
						res.send("Error occured , try again." + err);
					}
					else
					{
						console.log('done');
						res.send("done");
					}
				})
			}
				});


/****home dashboaards of users***********/


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
				{


		// checking for null in input
		var query_for_sql ="select * from setting";
				dbclient.query(query_for_sql,function(err,rows,fields){
					if(err)
						{console.log("change max books  error "+err);
												res.send("Error occured.");}
					else
						res.render("settings.jade",{max:rows[0].max_books,fine1:rows[0].fine_1st_week,fine2:rows[0].fine_2nd_week,fine3:rows[0].fine_3rd_week})
				})
				}
	}
	else{
		 res.sendStatus(404);
	}
});
app.get('/change_max_books',urlencodedParser,function(req,res){


		// checking for null in input
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


		// checking for null in input

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


app.get("/check_user_count",urlencodedParser,function(req,res){

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


		var query_for_sql ="select book_id from books where book_id = '"+req.query.book+"'";
		console.log(query_for_sql);
				dbclient.query(query_for_sql,function(err,rows,fields){
					if(err)
					{
						console.log("change max books  error "+err);
						res.send("Error occured.");
					}
					else{
						if(rows.length==0)
						{
							res.send("notexists");
						}
						else
						{
							var query_for_sql ="select roll_no from book_transaction where book_id = '"+req.query.book+"' and receiving IS NULL";
						console.log(query_for_sql);
							dbclient.query(query_for_sql,function(err,rows,fields){
					if(err)
					{
						console.log("change max books  error "+err);
						res.send("Error occured.");
					}
					else{
						if(rows.length>0)
							{console.log("idaf : "+rows.length);
							res.send("already issued")}

						else
							{console.log("idaf1 : "+rows.length);
								res.send("perfect");}

					}
				})
						}
					}
				})
			});

app.post('/issue_book',urlencodedParser,function(req,res){

			var fullDate = new Date();
			var future = new Date();
			future.setDate(fullDate.getDate() + 30);

		var currentDate = fullDate.getFullYear() + "-" + (fullDate.getMonth()+1) + "-" + fullDate.getDate();
		var newDate = future.getFullYear() + "-" + (future.getMonth()+1) + "-" + future.getDate();
		// checking for null in input
		var query_for_sql ="insert into book_transaction(roll_no,book_id,issue,estimated_return_date) values('"+req.body.roll_no+"','"+req.body.book+"','"+currentDate+"','"+newDate+"')"
				dbclient.query(query_for_sql,function(err,rows,fields){
					if(err)
						{console.log("change max books  error "+err);
												res.send("Error occured.");}
					else
						res.send(newDate);
				})
			});

/*****------------return a book **********/

app.get('/librarian/dashboard/return',function(req,res){
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
				res.render('return_book.jade');
	}
	else{
		 res.sendStatus(404);
	}
});



var daysBetween1 = function( date1, date2 ) {
  //Get 1 day in milliseconds
  var one_day=1000*60*60*24;

  // Convert both dates to milliseconds


  // Calculate the difference in milliseconds
  var difference_ms = date2 - date1;

  // Convert back to days and return
  return Math.round(difference_ms/one_day);
}
app.get("/check_correct_book_for_transaction",urlencodedParser,function(req,res){

		var query_for_sql ="select receiving from book_transaction where book_id = '"+req.query.book+"' and receiving IS NULL";
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
app.post('/return_book',urlencodedParser,function(req,res){

		var query_for_sql ="select estimated_return_date from book_transaction where book_id = '"+req.body.book+"' and receiving IS NULL";
				dbclient.query(query_for_sql,function(err,rows,fields){
					if(err)
						{console.log("change max books  error "+err);
						res.send("Error occured.");
					}
					else
						{

						var today = new Date();
						console.log("days 1  : "+today);
						var today_date = today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate();
						console.log("days 1  : "+today_date);
						var today_date_1 = today.getFullYear() + "-" + (today.getMonth()) + "-" + today.getDate();
						console.log("days 1  : "+today_date_1);
						console.log("estimated_return_date : "+rows[0].estimated_return_date)
						var est_ret_date = new Date(rows[0].estimated_return_date);
						est_ret_date_4 = est_ret_date.getFullYear() + "-" + (est_ret_date.getMonth()) + "-" + est_ret_date.getDate();
						est_ret_date = est_ret_date.getFullYear() + "-" + (est_ret_date.getMonth()+1) + "-" + est_ret_date.getDate();

						console.log("days 1  : "+est_ret_date);
						var est_ret_date_array = est_ret_date.toString().split('-');
						console.log("days 1  : "+est_ret_date_array);
						var est_ret_date_date= new Date(est_ret_date_array[0],est_ret_date_array[1]-1,est_ret_date_array[2]);
						console.log("days 1  : "+est_ret_date_date);
						console.log("days 1  : "+today_date_1);
						console.log("days 2  : "+est_ret_date_4);
						var t = daysBetween1(Date.parse(est_ret_date_4),Date.parse(today_date_1));
						console.log("days 3  : "+t);

						var daysBetween = Number(t);
						console.log("days : "+daysBetween);
						if(daysBetween <= 0)

							{
								var query_for_sql ="update book_transaction set receiving = '"+today_date+"',fine = 0 where book_id = '"+req.body.book+"'";
					dbclient.query(query_for_sql,function(err,rows,fields){
						if(err)
						{
						res.send("Error occured.");
						console.log("error : "+ err);
					}
					else
						{

							res.send("early"+est_ret_date );

						}
								})
				}
						else{
							var query_for_sql ="select fine_1st_week,fine_2nd_week,fine_3rd_week from setting";
					dbclient.query(query_for_sql,function(err,rows,fields){
						if(err)
						{
							console.log("change max books  error "+err);
						res.send("Error occured.");
					}
					else
					{
						var fine_1st_week = Number(rows[0].fine_1st_week);
						var fine_2nd_week = Number(rows[0].fine_2nd_week);
						var fine_3rd_week = Number(rows[0].fine_3rd_week);
						var fine = 0;
						if(daysBetween <= 7)
							fine = daysBetween*fine_1st_week;
							else if(daysBetween <= 14)
								fine = 7*fine_1st_week +  (daysBetween-7)*fine_2nd_week;
								else
									fine = 7*fine_1st_week + 7*fine_2nd_week+  (daysBetween-14)*fine_3rd_week;
						var query_for_sql ="update book_transaction set receiving = '"+today_date+"',fine = "+fine+" where book_id = '"+req.body.book+"'";
					dbclient.query(query_for_sql,function(err,rows,fields){
						if(err)
						{
						res.send("Error occured.");
					}
					else
						{

							res.send("late"+est_ret_date+",fine"+fine);

						}
				})
				}
			})
				}

					}

				})
			});
app.get("/logout",function(req,res){
	res.clearCookie('user');
	res.redirect('/');
});
app.get("/search_book", urlencodedParser,function(req,res){

						var query = req.query.search;
								if(query == null)
										res.render('search_book.jade',{user_query:""});
								else
									{


										//res.render('search_book.jade',{user_query:query});}
										var query_for_sql ="select DISTINCT book_title,author_of_book,publisher,issuable from books where match(book_title,author_of_book,publisher) against( ? IN NATURAL LANGUAGE MODE)";
										dbclient.query(query_for_sql,[query],function(err,rows,fields){
											if(err)
											{
												console.log("Error  occured." + err);
											res.send("Error  occured.");
										}
										else
										{
											if(rows.length>0)
											{
												var string = "";
												for (var i = 0; i <=rows.length - 1; i++) {
															string = string + "<a href = 'http://lib.harshagarwal.co.in/book_details?query="+query+"&book_title="+rows[i].book_title+"&author_of_book="+rows[i].author_of_book+"&publisher="+rows[i].publisher+"&issuable="+rows[i].issuable+"' ,target='_blank'><pre width=80% , height:100%>"+"<div class = 'col-xs-5''><img src='http://i.imgur.com/jNhTge7.gif'  width=100% height=100%></div><div class = 'col-xs-7'><h4 class='text-justify'><br>Book Name : "+rows[i].book_title+"<br>Book Author : "+rows[i].author_of_book+"<br>Publisher : "+rows[i].publisher+"<br>Issuable :  "+rows[i].issuable+"</h4></div></pre></a>";

																	}
																	string = string.replace(/null/gi,"-")
																	res.render('search_book.jade',{user_query:query,query_result:string});
																}
											else{
												var string = "<p>No Results Found!!!</p>"
												res.render('search_book.jade',{user_query:query,query_result:string});
											}
														}



						})
									}

});

app.get('/book_details',urlencodedParser,function(req,res){

						var book_title = req.query.book_title;
										var author_of_book = req.query.author_of_book;
										var publisher = req.query.publisher;
										var issuable = req.query.issuable;
									if(book_title == null || author_of_book == null || publisher == null || issuable == null )
									{
										res.render('search_book.jade',{user_query:query,query_result:"<p>No Results Found!!!</p>"});
									}
								else
									{
										//res.render('search_book.jade',{user_query:query});
										var query_for_sql ="select book_id,description from books where (book_title = ? AND author_of_book = ? AND publisher = ? AND issuable = ?) ";
										dbclient.query(query_for_sql,[book_title,author_of_book,publisher,issuable],function(err,rows,fields){
											if(err)
											{
												console.log("Error occured for book_details ->" + err);
											res.send("Error occured.");

										}
										else
										{

												var string = `
												<div>
													<div class = 'col-xs-4'>
														<img src='http://i.imgur.com/jNhTge7.gif'  width=100% height=100%>
													</div>
													<div class = 'col-xs-8'>
														Title -> `+book_title+`
														<br><br>By -> `+author_of_book+`
														<br><br>Publication -> `+publisher+`
														<br><br>Issuable -> `+issuable+`
														<br><br>Description -> `+rows[0].description+`
													</div>
												</div>
													<div>
														<table class = "table table-condensed " cellpadding=3  border=0>
															<tr>
																<td><h5><strong>Book I.D.</strong></h5></td>
																<td><h5><strong>Available</strong></h5></td>
																<td><h5><strong>Expected Arrival Date</strong></h5></td>
																<td><h5><strong>Is Book Reserved</strong></h5></td>
																<td><h5><strong>Reserve It</strong></h5></td>
															</tr>`;
															console.log("********* -> "+string);
															string = string.replace("null","-");
													//var book_id_temp = rows[i].book_id;
													function details(i)
													{
														if(i<rows.length)
														{
															query_for_sql = "select estimated_return_date,reserve from book_transaction where book_id = '"+rows[i].book_id+"' AND receiving IS NULL";
													console.log("query_for_sql "+(i+1)+" : "+query_for_sql);
													dbclient.query(query_for_sql,function(err,rows1,fields){
														if(err){
															console.log("Error occured for book_details 2 ->" + err);
											res.send("Error occured.");
														}
														else
														{
															console.log("row length : "+ rows1.length);
															console.log("book id "+(i+1)+" : "+ rows[i].book_id);
															if(rows1.length == 0)
																												{
																													string = string + `
																													<tr>
																														<td><h5>`+rows[i].book_id+`</h5></td>
																														<td><h5>Yes</h5></td>
																														<td><h5>---</h5></td>
																														<td><h5>---</h5></td>
																														<td><h5>---</h5></td>
																													</tr>`;
																													console.log("string for 1st case -> *** "+rows[i].book_id);
																												}
																												else if(rows1.length == 1 ){
																													if(rows1[0].reserve == null)
																													{
																														string = string + `
																																							<tr>
																																								<td><h5>`+rows[i].book_id+`</h5></td>
																																								<td><h5>No</h5></td>
																																								<td><h5>`+rows1[0].estimated_return_date.toString().substring(0,15)+`</h5></td>
																																								<td><h5>No</h5></td>
																																								<td><h5><input type="checkbox" ,name = "reserve" ,id = "reserve" , value = "Yes"></h5></td>
																																							</tr>`;
																													//console.log("string for 2nd case -> "+string);
																													}
																													else{
																														string = string + `
																																							<tr>
																																								<td><h5>`+rows[i].book_id+`</h5></td>
																																								<td><h5>No</h5></td>
																																								<td><h5>`+rows1[0].estimated_return_date.toString().substring(0,15)+`</h5></td>
																																								<td><h5>Yes</h5></td>
																																								<td><h5>---</h5></td>
																																							</tr>`;
																														//console.log("string for 3rd case -> "+string);
																													}


																												}
																												details(i+1);
																											}
																										})
												}
												if(i== rows.length)
												{
													//string = string + "</table></div>";
												res.render('search_book.jade',{user_query:req.query.query,query_result:string});
												}
														}

													details(0);



											}
										})
									}


						});
