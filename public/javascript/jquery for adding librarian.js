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


 

 //*********checking number of books input is valid or not********      
     



var regex_for_phone = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/; 
var flag =0,flag1=0;

 $("#phone").keyup(function(){
      
      if(regex_for_phone.test($(this).val())==false)
      {
         displayError("*Invalid Phone Number","#error_message_7",".error_row_7");
      //$("button").attr('disabled', true);
      }
      else if($(this).val().length>=18)
            {displayError("*Value Of Phone Number Is Too Big","#error_message_7",".error_row_7"); }
      else{
         notDisplayError(".error_row_7");
      }
});
var regex_for_mail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
$("#email").keyup(function(){
   
      if(regex_for_mail.test($(this).val())==false)
      {
         displayError("*Invalid Email Id","#error_message_4",".error_row_4");
      //$("button").attr('disabled', true);
      }
      else if($(this).val().length>=35)
            {displayError("*Value Of Email Is Too Big","#error_message_4",".error_row_4"); }
      else{
         notDisplayError(".error_row_4");
      }
   });
 $("#college_id").keyup(function(){
         if($(this).val().length>=18)
            {displayError("*Value Of College Id Is Too Big","#error_message_1",".error_row_1"); }
         else   
            {
               $("#error_message_1").text("");
               notDisplayError(".error_row_1");
              
            } 
   });
 $("#name").keyup(function(){

         if($(this).val().length>=25)
            {displayError("*Value Of Name Is Too Big","#error_message_2",".error_row_2"); }
         else   
            {
               $("#error_message_2").text("");
               notDisplayError(".error_row_2");
               
            } 
   });
 $("#cnfpassword").keyup(function (){
   commonvariable=$(this).val();
   var password_checker = $("#password").val();
    if(commonvariable == password_checker  && password_checker!="")
      {
         $("#error_message_6").text("");
         notDisplayError(".error_row_6"); 
      }
      else if(commonvariable != password_checker  && password_checker!="")
      {
         displayError("*Renter Correct Password ","#error_message_6",".error_row_6");
      }
     
})
//  ******to fade out the error message when user starts typing ********


$("#college_id").keyup(function (){
   commonvariable=$(this).val();
   error_text=$('#error_message_1').text();
   if(commonvariable != "" && error_text=="*Empty Field")
      {
         notDisplayError(".error_row_1"); 
      }
})

$("input:radio[name='gender']").click(function(){
        notDisplayError(".error_row_3"); 
      })

$("#name").keyup(function (){
   commonvariable=$(this).val();   
   error_text=$('#error_message_2').text();
   if(commonvariable != "" && error_text=="*Empty Field")
      {
         notDisplayError(".error_row_2"); 
      }
})
$("#email").keyup(function (){
   commonvariable=$(this).val();
   error_text=$('#error_message_4').text();
   if(commonvariable != "" && error_text=="*Empty Field")
      {
         notDisplayError(".error_row_4"); 
      }
})

$("#phone").keyup(function (){
   commonvariable=$(this).val();
   error_text=$('#error_message_7').text();
   if(commonvariable != ""  && error_text=="*Empty Field")
      {
         notDisplayError(".error_row_7"); 
      }
     
})
$("#password").keyup(function (){
   commonvariable=$(this).val();
   error_text=$('#error_message_5').text();
   if(commonvariable != ""  && error_text=="*Empty Field")
      {
         notDisplayError(".error_row_5"); 
      }
     
})
$("#cnfpassword").keyup(function (){
   commonvariable=$(this).val();
   error_text=$('#error_message_6').text();
   if(commonvariable != ""  && error_text=="*Empty Field")
      {
         notDisplayError(".error_row_6"); 
      }
     
})
$("#reset").click(function(){
   location.reload(false);
});
// for checking empty fields and if no errors send ajax request to server 

$("#add").click(function () {
      
      // value of all inputs stored here
      var commonvariable  = "";
      commonvariable=$("#college_id").val();

      if(commonvariable == "")
      {
         displayError("*Empty Field","#error_message_1",".error_row_1");
         commonvariable  = "a";
      }
      

      commonvariable=$("#name").val();
      if(commonvariable == "")
      {
         displayError("*Empty Field","#error_message_2",".error_row_2");
         commonvariable  = "a";
      }
      

      if (!$("input:radio[name='gender']").is(':checked')) {
         displayError("*Empty Field","#error_message_3",".error_row_3");
         commonvariable  = "a";
      }
      

       
      commonvariable=$("#email").val();
      if(commonvariable == "")
      {
         displayError("*Empty Field","#error_message_4",".error_row_4");
         commonvariable  = "a";
      }
      


      commonvariable=$("#phone").val();
      if(commonvariable == "")
      {
         displayError("*Empty Field","#error_message_7",".error_row_7");
         commonvariable  = "a";
      }   
      commonvariable=$("#password").val();
      if(commonvariable == "")
      {
         displayError("*Empty Field","#error_message_5",".error_row_5");
         commonvariable  = "a";
      }   
      commonvariable=$("#cnfpassword").val();
      if(commonvariable == "")
      {
         displayError("*Empty Field","#error_message_6",".error_row_6");
         commonvariable  = "a";
      }      

       
      var counter=0;

      for(var t=1;t<=8;t++)
         {
         
         var stringtocheck=".error_row_"+t;
         if(!($(stringtocheck).css('display')=='none'))
         {
            
            counter=1;
            /*window.setTimeout(function() {
        alert("Please check all the input that you entered");
    }, 500);*/
            
            break;            
         }
         }
         if(counter==0)
            {
               
               var data1=$("input").serialize();
               
               //data1=data1+"&genre="+$("#genre").val()+"&edition="+$("input:eq(7)").val()+"&status="+$("#status").val()+"&";
               //data1=data1+$("input:gt(7)").serialize();
               data1=data1+"&desc="+$('textarea').val();
               //alert(data1);
               //
               //var other_data = $('input').serializeArray();
               //$.each(other_data,function(key,input){
                //  fd.append(input.name,input.value);
               //})
               $.ajax({
                  type:"POST",
                  url:"/add_new_librarian",
                  data: data1,
                  dataType:'html',
                  cache:true,
                  success:function(answer_to_send_back)
                  {
                     $("#loader-wrapper").css("visibility","hidden");
                      $("html").css("-webkit-filter"," grayscale(0%)");
                     if(answer_to_send_back == "Entry already Exists.")
                        {
                           alert("User with the given details already exists.\nPlease Again Reenter Correct Details");
                           location.reload(false);
                        }
                     else if(answer_to_send_back == "Librarian could not be added")
                     {
                        alert("Librarian could not be added.\nPlease try later.");
                     }
                     else{
                     string_to_print = "<pre><h1 class='col-xs-14'><strong>Librarian Id : </strong><br></h1><h3>"+answer_to_send_back+"</h3></pre>";
                     $('.c').append(string_to_print);
                     $("#add").attr("class","btn btn-primary btn-block disabled");
                     $( "input" ).prop( "disabled", true );
                     $( "textarea" ).prop( "disabled", true );
                     $("#add").off("click");
                     }
                     
                     //alert($('.c').text());
                     //alert(answer_to_send_back[0]);
                     //alert()
                     //$('#append_here').html(answer_to_send_back);
                     
                  },
                  error: function (xhr, status, error) {
                     $("#loader-wrapper").css("visibility","hidden");
                      $("html").css("-webkit-filter"," grayscale(0%)");
                     $('.c').html('Error : '+error);
                  }
               })
               $("#loader-wrapper").css("visibility","visible");
                       $("html").css("-webkit-filter"," grayscale(50%)");
            }
   });   
   
});
