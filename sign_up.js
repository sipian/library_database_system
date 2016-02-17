var nodemailer=require('nodemailer');

module.exports=function(college_id,role,name,sex,branch,email,password_of_user,phone,desc){
return{
	send_authentication_mail:function(callback){
			var crypto = require('crypto'),
    					 algorithm = 'aes-256-ctr',
    					 password = 'password';
    		var text_to_encrypt = college_id+"&"+role+"&"+name+"&"+sex+"&"+branch+"&"+email+"&"+password_of_user+"&"+phone+"&"+desc;
    		function encrypt(text){
  				var cipher = crypto.createCipher(algorithm,password)
  				var crypted = cipher.update(text,'utf8','hex')
  				crypted += cipher.final('hex');
  				return crypted;
			}
			var encrypted = encrypt(text_to_encrypt);
			var smtpTransport = nodemailer.createTransport("SMTP",{
        		service: "Gmail",
        		auth: {
            		user: "cs15btech11019@iith.ac.in",
            		pass: "Bbarcelona"
        		}
    		});
    		var mailOptions = {
        		from: "cs15btech11019@iith.ac.in",
        		to: email, 
        		subject: 'Verification mail for new user in library signup', // Subject line
    			html: "Please click on the link below to verify your account<br><h1><a href = 'http://localhost:3000/verification_mail?data="+encrypted+"'> Click me</a></h1>" // plaintext body

     // html body
    			}
    			smtpTransport.sendMail(mailOptions, function(error, response){
        			if(error){
            			callback(error);
        			}else{
            			callback(null);
        		}
    			});

			var t="password";
			function decrypt(text){
  				var decipher = crypto.createDecipher(algorithm,t)
  				var dec = decipher.update(text,'hex','utf8')
  				dec += decipher.final('utf8');
  				return dec;
			}
			
			console.log(encrypted);
			console.log(decrypt(encrypted));
	},
checking_if_user_exists:function(callback){
    var mysql = require("mysql");
    var dbclient=mysql.createConnection({
      host:"localhost",
      user:"headlibrarian",
      password:"password",
      database:"library",
      debug:true,     
    });
      
    dbclient.connect();
    var query_for_sql ="select user_id from user where (roll_no = '"+college_id+"' OR email_id = '"+email+"')";
    console.log(query_for_sql);
    dbclient.query(query_for_sql,function(err,rows,fields){
          if(err)
            callback(err);
          else
            {
              if(rows.length>0)
                callback(null,false);
              else
                callback(null,true);
            }
          });
}
}
};