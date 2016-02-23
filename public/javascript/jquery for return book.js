$(document).ready(function(){


function displayError(message ,error_message ,error_row) {
      $(error_message).fadeIn("fast");
      $(error_row).fadeIn("fast");
      $(error_message).html(message);   
      

   };

   //function to fade out

function notDisplayError (error_row) {
      
      $(error_row).fadeOut("fast");
   };

$("#book").blur(function(){
   $("#date").fadeOut("slow"); 
   $("#fine234").fadeOut("slow"); 
   if($("#book").val()!="")
   {
   var data1=$("#book").serialize();
   $.ajax({
      type:"get",
      url:"/check_correct_book_for_transaction",
      data: data1,
      dataType:'html',
      cache:true,
      success:function(answer_to_send_back)
         {
            if(answer_to_send_back == "Error occured.")
                        {
                           alert("Some error happened");
                        }
                     else if(answer_to_send_back == "not exists")
                        {$("#error_message_1").html("Book with given I.D.<ul> <li>does not exists</li>OR <li>has not been issued yet</li>OR <li> has already been returned</li></ul>");
                                 $("#error_message_3").html("");}
                     else
                        $("#error_message_1").html("");
      }
   })
}
})
 //*********checking number of books input is valid or not********      
     



// for checking empty fields and if no errors send ajax request to server 

$("button").click(function () {
      
      // value of all inputs stored here
      
               if($("#error_message_1").html() == "")               
               {
                  $("#error_message_3").html("");
                  var data1=$("#book").serialize();
                              
                              $.ajax({
                                 type:"post",
                                 url:"/return_book",
                                 data: data1,
                                 dataType:'html',
                                 cache:true,
                                 success:function(answer_to_send_back)
                                 {
                                    if(answer_to_send_back == "Error occured.")
                                       {
                                          alert("Some error happened");
                                       }
                                    else if(answer_to_send_back.startsWith("early"))
                                    {
                                     $("#last_day").html(answer_to_send_back.substring(5));
                                    $("#date").fadeIn("slow"); 
                                    $("#fine134").html("0");
                                    $("#fine234").fadeIn("slow"); 
                                    $("#error_message_3").html("");
                                       }
                                       else if(answer_to_send_back.startsWith("late")){
                                    $("#last_day").html(answer_to_send_back.substring(4,answer_to_send_back.indexOf(',')));
                                    $("#date").fadeIn("slow"); 
                                    $("#fine134").html(answer_to_send_back.substring((answer_to_send_back.indexOf(',')+5)));
                                    $("#fine234").fadeIn("slow"); 
                                    $("#error_message_3").html("");
                                       }
                                    }
                                 })
                           }
               else
               {
                  $("#date").css("display","none");
                  $("#fine234").css("display","none");
                  $("#error_message_3").html("Please check the input.");  
               }

            });

});
