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
     





// for checking empty fields and if no errors send ajax request to server 

$("#max1").click(function () {
      
      // value of all inputs stored here
      
               $('.c').html("\0");
               
               var data1=$("#max").serialize();
               
               //data1=data1+"&genre="+$("#genre").val()+"&edition="+$("input:eq(7)").val()+"&status="+$("#status").val()+"&";
               //data1=data1+$("input:gt(7)").serialize();
               //alert(data1);
               //var other_data = $('input').serializeArray();
               //$.each(other_data,function(key,input){
                //  fd.append(input.name,input.value);
               //})
               $.ajax({
                  type:"get",
                  url:"/change_max_books",
                  data: data1,
                  dataType:'html',
                  cache:true,
                  success:function(answer_to_send_back)
                  {
                      $("#loader-wrapper").css("visibility","hidden");
                      $("html").css("-webkit-filter"," grayscale(0%)");
                     if(answer_to_send_back == "Error occured.")
                        {
                           alert("Some error happened");
                        }
                     else
                     {
                     alert("value is changed");
                      }
                     //alert(string_to_print);
                     
                  },
                  error: function (xhr, status, error) {
                      $("#loader-wrapper").css("visibility","hidden");
                      $("html").css("-webkit-filter"," grayscale(0%)");
                     $('.c').html('Error : '+error);
                  }
            });
                $("#loader-wrapper").css("visibility","visible");
                       $("html").css("-webkit-filter"," grayscale(50%)");

            });
$("button:eq(1)").click(function () {
      
      // value of all inputs stored here
      
               $('.c').html("\0");
               
               var data1=$("#fine1 , #fine2 , #fine3").serialize();
               
               //data1=data1+"&genre="+$("#genre").val()+"&edition="+$("input:eq(7)").val()+"&status="+$("#status").val()+"&";
               //data1=data1+$("input:gt(7)").serialize();
               //alert(data1);
               //var other_data = $('input').serializeArray();
               //$.each(other_data,function(key,input){
                //  fd.append(input.name,input.value);
               //})
               $.ajax({
                  type:"get",
                  url:"/change_fine",
                  data: data1,
                  dataType:'html',
                  cache:true,
                  success:function(answer_to_send_back)
                  {
                     $("#loader-wrapper").css("visibility","hidden");
                      $("html").css("-webkit-filter"," grayscale(0%)");
                     if(answer_to_send_back == "Error occured.")
                        {
                           alert("Some error happened");
                        }
                     else
                     {
                     alert("value is changed");
                      }
                     //alert(string_to_print);
                     
                  },
                  error: function (xhr, status, error) {
                     $("#loader-wrapper").css("visibility","hidden");
                      $("html").css("-webkit-filter"," grayscale(0%)");
                     $('.c').html('Error : '+error);
                  }
            });
               $("#loader-wrapper").css("visibility","visible");
                       $("html").css("-webkit-filter"," grayscale(50%)");
});
});