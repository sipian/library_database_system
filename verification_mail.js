var mysql = require("mysql");

		var dbclient=mysql.createConnection({
			host: process.env.RDS_HOSTNAME || "localhost",
			user:process.env.RDS_USERNAME || "headlibrarian",
			password:process.env.RDS_PASSWORD || "password",
			database:"ebdb"
		});
		dbclient.connect();
module.exports=function(data){
	return{
		decrypt_data:function(){
			console.log("reached decrypt_data");
			var crypto = require('crypto'),
    					 algorithm = 'aes-256-ctr',
    					 password = 'password';
    		var t='password';
  			function decrypt(text){
  				var decipher = crypto.createDecipher(algorithm,t)
  				var dec = decipher.update(text,'hex','utf8')
  				dec += decipher.final('utf8');
  				return dec;
			}
			data=decrypt(data);
			return data.split("&");
			/*console.log(t[0]);
			console.log(t[1]);
			console.log(t[2]);
			console.log(t[3]);
			console.log(t[4]);
			console.log(t[5]);
			console.log(t[6]);
			console.log(t[7]);
			console.log(t[8]);*/
		},
		checking_if_user_exists:function(array,callback){
				
    			 
    		var query_for_sql ="select user_id,role from user where (roll_no = '"+array[0]+"' OR email_id = '"+array[1]+"')";
    		console.log(query_for_sql);
    		dbclient.query(query_for_sql,function(err,rows,fields){
          if(err)
            callback(err);
          else
            {
              if(rows.length>0)
              {
              	var crypto = require('crypto'),
    						algorithm = 'aes-256-ctr',
    						password_for_crypt = 'password';
				function encrypt(text){
  					var cipher = crypto.createCipher(algorithm,password_for_crypt)
  					var crypted = cipher.update(text,'utf8','hex')
  					crypted += cipher.final('hex');
  					return crypted;
				}
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
                callback(null,cookieString);
            }
              else
                callback(null,true);
            }
        })
        },  
		add_into_database:function(array,callback){
			console.log("reached database");
 			var validator = require("validator");
			const crypto = require('crypto');
			const hash = crypto.createHash('sha512');
			 
		//loop for sanitizing input

		for(var loop_variable = 0;loop_variable <=8;loop_variable++)
		{
			array[loop_variable]=validator.escape(array[loop_variable]);
			array[loop_variable]=validator.trim(array[loop_variable]);
			array[loop_variable]=validator.stripLow(array[loop_variable],false);
			if(array[loop_variable]=="")
			array[loop_variable] = 'null';
			console.log(array[loop_variable]);

		}
		hash.update(array[6]);
		var query_for_sql ="insert into user(roll_no,role,name_of_user,sex,branch,email_id,password_of_user,phone,description) values ('"+array[0]+"','"+array[1]+"','"+array[2]+"','"+array[3]+"','"+array[4]+"','"+array[5]+"','"+hash.digest('hex')+"','"+array[7]+"','"+array[8]+"')";
		console.log(query_for_sql);
		dbclient.query(query_for_sql,function(err,rows,fields){
					if(err)
						callback(err);
					else
						{
							var query_for_sql ="select user_id,role from user where (roll_no = '"+array[0]+"' OR email_id = '"+array[5]+"')";
    						console.log(query_for_sql);
    						dbclient.query(query_for_sql,function(err,rows,fields){
    							if(err)
    								callback(err);
    							else
							{
								var crypto = require('crypto'),
							    algorithm = 'aes-256-ctr',
							    password_for_crypt = 'password';
								function encrypt(text){
							  		var cipher = crypto.createCipher(algorithm,password_for_crypt)
							  		var crypted = cipher.update(text,'utf8','hex')
							  		crypted += cipher.final('hex');
							  		return crypted;
								}
							    var randomstring = require('randomstring');	
								console.log("cookie : "+rows[0].role);		
								var temporary_rows = rows[0].user_id.toString();	
								var o1 = encrypt(temporary_rows);
								console.log("cookie : "+ o1);
								var o2 = encrypt(rows[0].role);
								console.log("cookie : "+ o2);		
								var o3 = encrypt("yes");
								var cookieString = randomstring.generate({length: 9,charset: 'alphanumeric'})+o1+"&"+randomstring.generate({length:9,charset: 'alphanumeric'})+o2+"&"+randomstring.generate({length:7,charset: 'alphanumeric'})+o3;
							    callback(null,cookieString);
							}
					
		})
		}
})
}
}
}