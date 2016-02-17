var mysql = require("mysql");
var crypto = require('crypto'),
    										algorithm = 'aes-256-ctr',
    										password_for_crypt = 'password';
module.exports=function(college_id,email_id,password){
	return {
		check_login_user:function(callback){
			var dbclient=mysql.createConnection({
			host:"localhost",
			user:"headlibrarian",
			password:"password",
			database:"library",
			debug:true,			
		});
			
		dbclient.connect();
		var pass = require('crypto').createHash('sha512').update(password).digest('hex');
		var query_for_sql ="select user_id,role from user where (roll_no = '"+college_id+"' AND email_id = '"+email_id+"' AND password_of_user = '"+pass+"')";
		console.log(query_for_sql);
		dbclient.query(query_for_sql,function(err,rows,fields){
					if(err)
						callback(err);
					else
						{
							if(rows.length>0)
								{
									function encrypt(text){
  										var cipher = crypto.createCipher(algorithm,password_for_crypt)
  										var crypted = cipher.update(text,'utf8','hex')
  										crypted += cipher.final('hex');
  										return crypted;
									}
									console.log("reached login");
									var randomstring = require('randomstring');	
									console.log("cookie : "+rows[0].user_id);
									console.log("cookie : "+rows[0].role);		
									var temporary_rows = rows[0].user_id.toString();	
									var o1 = encrypt(temporary_rows);
									console.log("cookie : "+ o1);
									var o2 = encrypt(rows[0].role);
									console.log("cookie : "+ o2);		
									var o3 = encrypt("yes");
									var cookieString = randomstring.generate({length: 9,charset: 'alphanumeric'})+o1+"&"+randomstring.generate({length:9,charset: 'alphanumeric'})+o2+"&"+randomstring.generate({length:7,charset: 'alphanumeric'})+o3;
									console.log("cookie : " + cookieString);
									callback(null,cookieString,rows[0].role);
								}
							else
								{
									
									callback(null,false);
								}
						}



		});
	}


}
}