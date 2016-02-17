//require the Twilio module and create a REST client
var client = require('twilio')('AC57aa7ea291a27d4e3fbb1bfa259f07bf', '6859cdfc6b15c7b9e2bb9e29e9cfd1ca');
var ty="your id is : sadfdsa";
//Send an SMS text message
client.sendMessage({

    to:'+918400700457', // Any number Twilio can deliver to
    from: '(781) 996-4479', // A number you bought from Twilio and can use for outbound communication
    body: 'Hey guys , This is harsh ,'  // body of the SMS message
//Hey guys , This is harsh , I am sending a text message for a thing I am doing .Since you have received it perfectly please text me back :'Message Received'
}, function(err, responseData) { //this function is executed when a response is received from Twilio

    if (!err) { // "err" is an error received during the request, if any

        // "responseData" is a JavaScript object containing data received from Twilio.
        // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
        // http://www.twilio.com/docs/api/rest/sending-sms#example-1

        console.log(responseData.from); // outputs "+14506667788"
        console.log(responseData.body); // outputs "word to your mother."

    }
    else{
        console.log("error" +  err);
    }
});