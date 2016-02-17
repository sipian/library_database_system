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


 
$("#roll_no").blur(function(){
   if($("#roll_no").val()!="")
   {
   var data1=$("#roll_no").serialize();
   $.ajax({
      type:"get",
      url:"/check_correct_user_detail",
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
                        {$("#error_message_1").html("User with given roll no. does not exists .");
                                             $("#error_message_3").html("");}
                     else
                        {$("#error_message_1").html("");
                                             $("#error_message_3").html("");}
      }
   })
}
})

$("#book").blur(function(){
   if($("#book").val()!="")
   {
   var data1=$("#book").serialize();
   $.ajax({
      type:"get",
      url:"/check_correct_book",
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
                        {$("#error_message_2").html("Book with given I.D. does not exists .");
                                             $("#error_message_3").html("");}
                     else
                        $("#error_message_2").html("");
      }
   })
}
})
 //*********checking number of books input is valid or not********      
     



// for checking empty fields and if no errors send ajax request to server 

$("button").click(function () {
      
      // value of all inputs stored here
      
               if($("#error_message_1").html() == "" && $("#error_message_2").html() == "")               
               {
                  $("#error_message_3").html("");
                  var data1=$("#roll_no , #book").serialize();
                              
                              //data1=data1+"&genre="+$("#genre").val()+"&edition="+$("input:eq(7)").val()+"&status="+$("#status").val()+"&";
                              //data1=data1+$("input:gt(7)").serialize();
                              //alert(data1);
                              //var other_data = $('input').serializeArray();
                              //$.each(other_data,function(key,input){
                               //  fd.append(input.name,input.value);
                              //})
                              $.ajax({
                                 type:"get",
                                 url:"/check_user_count",
                                 data: data1,
                                 dataType:'html',
                                 cache:true,
                                 success:function(answer_to_send_back)
                                 {
                                    if(answer_to_send_back == "Error occured.")
                                       {
                                          alert("Some error happened");
                                       }
                                    else
                                    {
                                       if(answer_to_send_back == "can issue")
                                       {
                                          $.ajax({
                                                                        type:"post",
                                                                        url:"/issue_book",
                                                                        data: data1,
                                                                        dataType:'html',
                                                                        cache:true,
                                                                        success:function(answer_to_send_back)
                                                                        {
                                                                           if(answer_to_send_back == "Error occured.")
                                                                              {
                                                                                 alert("Some error happened");
                                                                              }
                                                                           else
                                                                           {
                                                                              $("#date").fadeIn("slow");
                                                                           $("#last_day").html(answer_to_send_back);
                                                                           $("#date").fadeIn("slow");
                                                                            }
                                                                           //alert(string_to_print);
                                                                           
                                                                        },
                                                                        error: function (xhr, status, error) {
                                                                           $('.c').html('Error : '+error);
                                                                        }
                                                                  });
                                                                           
                                                                            }
                                             else{
                                                $("#last_day").html('');
                                                $("#date").css("display","none");
                                                $("#error_message_3").html("User Maximum Limit Reached.");
                                             }
                                                                           //alert(string_to_print);
                                                                           
                                                                        }
                                                                     },
                                                                        error: function (xhr, status, error) {
                                                                           $('.c').html('Error : '+error);
                                                                        }
                                                                  });
}
               else
               {
                  $("#date").css("display","none");
                  $("#error_message_3").html("Please check the input.");
               }

            });

});
