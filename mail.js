   var nodemailer = require('nodemailer');
var fs=require("fs");
    var smtpTransport = nodemailer.createTransport("SMTP",{
        service: "Gmail",
        auth: {
            user: "cs15btech11019@iith.ac.in",
            pass: "Bbarcelona"
        }
    });
    fs.readFile("./file_for_upload_account_data.txt",function(err,data)
    {
    var mailOptions = {
        from: "cs15btech11019@iith.ac.in",
        to: "harsh.mufc.786@gmail.com", 
        subject: 'Verification mail for library signup', // Subject line
        html: "Please click on the link below to <br><h1><a href = 'http://localhost:3000/add_new_normal_user'> Click me</a></h1>" // plaintext body

     // html body
    }
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("done");
        }
    });

});