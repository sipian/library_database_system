var mysql = require("mysql");

    var dbclient=mysql.createConnection({
      host: process.env.RDS_HOSTNAME || "localhost",
      user:process.env.RDS_USERNAME || "headlibrarian",
      password:process.env.RDS_PASSWORD || "password",
      database:"ebdb"
    });
    dbclient.connect();
module.exports=function(college_id,name,sex,email,password_of_user,phone,desc){

return{
	add_into_database:function(array,callback){
      console.log("reached database");
       var validator = require("validator");
      const crypto = require('crypto');
      const hash = crypto.createHash('sha512');
       
    for(var loop_variable = 0;loop_variable <=6;loop_variable++)
    {
      array[loop_variable]=validator.escape(array[loop_variable]);
      array[loop_variable]=validator.trim(array[loop_variable]);
      array[loop_variable]=validator.stripLow(array[loop_variable],false);
      if(array[loop_variable]=="")
      array[loop_variable] = 'null';
      console.log(array[loop_variable]);
    }
    hash.update(array[4]);
    var query_for_sql ="insert into user(roll_no,role,name_of_user,sex,email_id,password_of_user,phone,description) values ('"+array[0]+"','"+"librarian"+"','"+array[1]+"','"+array[2]+"','"+array[3]+"','"+hash.digest('hex')+"','"+array[5]+"','"+array[6]+"')";
    console.log(query_for_sql);
    dbclient.query(query_for_sql,function(err,rows,fields){
          if(err)
            callback(err);
          else
            {
              var query_for_sql ="select user_id from user where (roll_no = '"+array[0]+"' OR email_id = '"+array[3]+"')";
                console.log(query_for_sql);
                dbclient.query(query_for_sql,function(err,rows,fields){
                  if(err)
                    callback(err);
                  else
              {

                callback(null,name.substring(0,4)+rows[0].user_id);
              }
          
    })
    }
})
},
checking_if_user_exists:function(callback){
     
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