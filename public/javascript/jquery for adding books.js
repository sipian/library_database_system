$(document).ready(function(){


$("#datepicker").datepicker();
   //function to display error and fade in 

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
     

var flag =0,flag1=0;

 $("#copies").keyup(function(){
      
      if(!(Number.isInteger(parseInt($(this).val(),10))))
      {
         displayError("*Invalid Number","#error_message_4",".error_row_4");
         $("#glyphicon4").attr("class","glyphicon glyphicon-remove form-control-feedback");
      //$("button").attr('disabled', true);
      }
      
   else{
      //$("button").removeAttr('disabled');
     var string = $(this).val();
         if(string.indexOf('.')!=-1)
            {displayError("*No fractional input Allowed","#error_message_4",".error_row_4");
            $("#glyphicon4").attr("class","glyphicon glyphicon-remove form-control-feedback");}
            else if(parseInt(string,10)<=0)
                  {displayError("*No Non Positive Number Allowed","#error_message_4",".error_row_4");
                     $("#glyphicon4").attr("class","glyphicon glyphicon-remove form-control-feedback");}
               else if(string.indexOf('e')!=-1)
            {displayError("*Mathematical function 'e' is not Allowed","#error_message_4",".error_row_4");
             $("#glyphicon4").attr("class","glyphicon glyphicon-remove form-control-feedback"); }
         else if(parseInt(string,10)>=4294967295)
            {displayError("*Value Of Copies Is Too Big","#error_message_4",".error_row_4"); 
              $("#glyphicon4").attr("class","glyphicon glyphicon-remove form-control-feedback");}
         else   
            {
               $("#error_message_4").text("");
               notDisplayError(".error_row_4");
               $("#glyphicon4").attr("class","glyphicon glyphicon-ok form-control-feedback");
            } 
   }    
})
$("#cost").keyup(function(){
   
      if(!(Number.isInteger(parseInt($(this).val(),10))))
      {
         displayError("*Invalid Number","#error_message_13",".error_row_10");
         $("#glyphicon12").attr("class","glyphicon glyphicon-remove form-control-feedback");
      //$("button").attr('disabled', true);
      }
      //$("button").removeAttr('disabled');s
      else 
         {
            var string = $(this).val();
            if(parseInt(string,10)<=0)
                  {displayError("*No Non Positive Number Allowed","#error_message_13",".error_row_10");
                  $("#glyphicon12").attr("class","glyphicon glyphicon-remove form-control-feedback");}
               else if(string.indexOf('e')!=-1)
            {displayError("*Mathematical function 'e' is not Allowed","#error_message_13",".error_row_10");
            $("#glyphicon12").attr("class","glyphicon glyphicon-remove form-control-feedback"); }
         
         else   
            {
               $("#error_message_13").text("");
               $("#glyphicon12").attr("class","glyphicon glyphicon-ok form-control-feedback");
               notDisplayError(".error_row_10");
            } 
         }
   })
 $("#publisher").keyup(function(){
     var string = $(this).val();
         if(string.length>=25)
            {displayError("*Value Of Publisher Is Too Big","#error_message_5",".error_row_5");
            $("#glyphicon5").attr("class","glyphicon glyphicon-remove form-control-feedback");
             }
         else   
            {
               $("#error_message_5").text("");
               notDisplayError(".error_row_5");
               $("#glyphicon5").attr("class","glyphicon glyphicon-ok form-control-feedback");
              
            } 
   });
 $("#place").keyup(function(){
     var string = $(this).val();
         if(string.length>=14)
            {displayError("*Value Of Place Is Too Big","#error_message_6",".error_row_6");
            $("#glyphicon6").attr("class","glyphicon glyphicon-remove form-control-feedback");
             }
         else   
            {
               $("#error_message_6").text("");
               $("#glyphicon6").attr("class","glyphicon glyphicon-ok form-control-feedback");
               notDisplayError(".error_row_6");
               
            } 
   });

 
   

 $("#pages").keyup(function(){
      if(!(Number.isInteger(parseInt($(this).val(),10))))
      {
         displayError("*Invalid Number","#error_message_10",".error_row_8");
         $("#glyphicon9").attr("class","glyphicon glyphicon-remove form-control-feedback");
         flag=0;
      //$("button").attr('disabled', true);
      }
      
   else{
      //$("button").removeAttr('disabled');
     var string = $(this).val();
         if(string.indexOf('.')!=-1)
            {displayError("*No fractional input Allowed","#error_message_10",".error_row_8"); flag=0;
               $("#glyphicon9").attr("class","glyphicon glyphicon-remove form-control-feedback");}
            else if(parseInt(string,10)<=0)
                  {displayError("*No Non Positive Number Allowed","#error_message_10",".error_row_8"); flag=0;
                  $("#glyphicon9").attr("class","glyphicon glyphicon-remove form-control-feedback");}
               else if(string.indexOf('e')!=-1)
            {displayError("*Mathematical function 'e' is not Allowed","#error_message_10",".error_row_8"); flag=0;
               $("#glyphicon9").attr("class","glyphicon glyphicon-remove form-control-feedback");}
         else if(parseInt(string,10)>=65534)
            {displayError("*Value Of Pages Is Too Big","#error_message_10",".error_row_8"); flag=0;
               $("#glyphicon9").attr("class","glyphicon glyphicon-remove form-control-feedback");}
         else   
            {
               $("#error_message_10").text("");
               notDisplayError(".error_row_8");
               $("#glyphicon9").attr("class","glyphicon glyphicon-ok form-control-feedback");
               flag=1;
            } 
   }
   
   })
 $("#pages").focusout(function(){
      if(flag ==0)
            {
               $("#pages").val("");
               notDisplayError(".error_row_8");
               $("#glyphicon9").attr("class","");
               $("#error_message_10").text("");
            }
   });
 $("#edition").keyup(function(){
      if(!(Number.isInteger(parseInt($(this).val(),10))))
      {
         displayError("*Invalid Number","#error_message_7",".error_row_7");
         flag=0;
         $("#glyphicon7").attr("class","glyphicon glyphicon-remove form-control-feedback");
      //$("button").attr('disabled', true);
      }
      
   else{
      //$("button").removeAttr('disabled');
     var string = $(this).val();
         if(string.indexOf('.')!=-1)
            {displayError("*No fractional input Allowed","#error_message_7",".error_row_7"); flag=0;
            $("#glyphicon7").attr("class","glyphicon glyphicon-remove form-control-feedback");
      }
            else if(parseInt(string,10)<=0)
                  {displayError("*No Non Positive Number Allowed","#error_message_7",".error_row_7"); flag=0;
                     $("#glyphicon7").attr("class","glyphicon glyphicon-remove form-control-feedback");}
               else if(string.indexOf('e')!=-1)
            {displayError("*Mathematical function 'e' is not Allowed","#error_message_7",".error_row_7"); flag=0;
               $("#glyphicon7").attr("class","glyphicon glyphicon-remove form-control-feedback");}
               else if(parseInt(string,10)>=244)
                  {displayError("*Value Of Edition Is Too Big","#error_message_7",".error_row_7"); flag=0;
                     $("#glyphicon7").attr("class","glyphicon glyphicon-remove form-control-feedback");}
         else   
            {
               $("#error_message_7").text("");
               notDisplayError(".error_row_7");
               $("#glyphicon7").attr("class","glyphicon glyphicon-ok form-control-feedback");
               flag=1;
            } 
   }
   
   })
 $("#edition").focusout(function(){
      if(flag ==0)
            {
               $("#edition").val("");
               notDisplayError(".error_row_7");
               $("#glyphicon7").attr("class","");
               $("#error_message_7").text("");
            }
   });
$("#year").keyup(function(){
      if(!(Number.isInteger(parseInt($(this).val(),10))))
      {
         displayError("*Invalid Number","#error_message_9",".error_row_8");
         flag1=0;
         $("#glyphicon8").attr("class","glyphicon glyphicon-remove form-control-feedback");
      //$("button").attr('disabled', true);
      }
      
   else{
      //$("button").removeAttr('disabled');
     var string = $(this).val();
         if(string.indexOf('.')!=-1)
            {displayError("*No fractional input Allowed","#error_message_9",".error_row_8"); flag1=0;
               $("#glyphicon8").attr("class","glyphicon glyphicon-remove form-control-feedback");}
            else if(parseInt(string,10)<=0)
                  {displayError("*No Non Positive Number Allowed","#error_message_9",".error_row_8"); flag1=0;
                  $("#glyphicon8").attr("class","glyphicon glyphicon-remove form-control-feedback");}
               else if(string.indexOf('e')!=-1)
            {displayError("*Mathematical function 'e' is not Allowed","#error_message_9",".error_row_8"); flag1=0;
               $("#glyphicon8").attr("class","glyphicon glyphicon-remove form-control-feedback");}
         else if(parseInt(string,10)>=65534)
            {displayError("*Value Of Year Is Too Big","#error_message_9",".error_row_8"); flag1=0;
            $("#glyphicon8").attr("class","glyphicon glyphicon-remove form-control-feedback");}
         else   
            {
               $("#error_message_9").text("");
               notDisplayError(".error_row_8");
               $("#glyphicon8").attr("class","glyphicon glyphicon-ok form-control-feedback");
               flag1=1;
            } 
   }
   
   })
 $("#year").focusout(function(){
      if(flag1 ==0)
            {
               $("#error_message_9").text("");
               notDisplayError(".error_row_8");
               $("#glyphicon8").attr("class","");
               $("#year").val("");
            }
   });


//  ******to fade out the error message when user starts typing ********

$("#datepicker").on({
      click:function(){notDisplayError(".error_row_1");},
      keyup:function(){commonvariable=$("#datepicker").val();if(commonvariable != ""){notDisplayError(".error_row_1");}}
         
});
$("#title").keyup(function (){
   commonvariable=$("#title").val();
   if(commonvariable != "")
      {
         $("#glyphicon2").attr("class","glyphicon glyphicon-ok form-control-feedback");
         notDisplayError(".error_row_2"); 
      }
      else{
         $("#glyphicon2").attr("class","");
      }
})


$("#author").keyup(function (){
   commonvariable=$("#author").val();
   if(commonvariable != "")
      {
         $("#glyphicon3").attr("class","glyphicon glyphicon-ok form-control-feedback");
         notDisplayError(".error_row_3"); 
      }
      else $("#glyphicon3").attr("class","");
})
$("#publisher").keyup(function (){
   commonvariable=$("#publisher").val();
   error_text=$('#error_message_5').text();

   if(commonvariable != "" && error_text=="*Empty Field")
      {
         $("#glyphicon5").attr("class","glyphicon glyphicon-ok form-control-feedback");
         notDisplayError(".error_row_5");
         
      }
   else if(commonvariable == "") $("#glyphicon5").attr("class","glyphicon glyphicon-ok form-control-feedback"); 
      
})
 
$("#booksource").keyup(function (){
   commonvariable=$("#bill").val();
   commonvariable1=$("#booksource").val();
   var length1 = commonvariable1.length;
   var length2 = commonvariable.length;
   if(commonvariable != "" && commonvariable1 != "" && length1<=30 && length2<=15)
      {
         notDisplayError(".error_row_9");
         $("#glyphicon10").attr("class","glyphicon glyphicon-ok form-control-feedback");
         $("#glyphicon11").attr("class","glyphicon glyphicon-ok form-control-feedback");
         $("#error_message_12").text();
         $("#error_message_11").text();
      }
      else
   if(commonvariable1 != "" && length1<=30)
      {  $("#error_message_11").text("");
         notDisplayError("#error_message_11");
      $("#glyphicon10").attr("class","glyphicon glyphicon-ok form-control-feedback");
       }
   else if (length1>=30) {
      $("#glyphicon10").attr("class","glyphicon glyphicon-remove form-control-feedback");
      displayError("*Value of Booksource too long","#error_message_11",".error_row_9");
   };
})
$("#bill").keyup(function (){
   commonvariable=$("#bill").val();
   commonvariable1=$("#booksource").val();
   var length1 = commonvariable1.length;
   var length2 = commonvariable.length;
   if(commonvariable != "" && commonvariable1 != "" && length1<=15 && length2<=30)
      {
         notDisplayError(".error_row_9");
         $("#glyphicon10").attr("class","glyphicon glyphicon-ok form-control-feedback");
         $("#glyphicon11").attr("class","glyphicon glyphicon-ok form-control-feedback");
         $("#error_message_12").text();
         $("#error_message_11").text();
      }
      else
   if(commonvariable != "" && length2<=15)
      {$("#error_message_12").text("");
         notDisplayError("#error_message_12");
      $("#glyphicon11").attr("class","glyphicon glyphicon-ok form-control-feedback");
       }
       else if (length2>=15) {
      $("#glyphicon11").attr("class","glyphicon glyphicon-remove form-control-feedback");
      displayError("*Value of bill too long","#error_message_12",".error_row_9");
   };
})

// for checking empty fields and if no errors send ajax request to server 

$("#reset").click(function(){
   location.reload(false);
});
$("#submit").click(function () {
      
      // value of all inputs
      var commonvariable  = "";
      commonvariable=$("#datepicker").val();
      if(commonvariable == "")
      {
         displayError("*Empty Field","#error_message_1",".error_row_1");
         commonvariable  = "a";
      }
      

      // value of title 

      commonvariable=$("#title").val();
      if(commonvariable == "")
      {
         displayError("*Empty Field","#error_message_2",".error_row_2");
         $("#glyphicon2").attr("class","glyphicon glyphicon-remove form-control-feedback");

         commonvariable  = "a";
      }
      
      // value of author

      commonvariable=$("#author").val();
      if(commonvariable == "")
      {
         $("#glyphicon3").attr("class","glyphicon glyphicon-remove form-control-feedback");
         displayError("*Empty Field","#error_message_3",".error_row_3");
         commonvariable  = "a";
      }
      
      // value of no. of copies 

      commonvariable=$("#copies").val();
      if(commonvariable == "")
      {
         displayError("*Empty Field","#error_message_4",".error_row_4");
         $("#glyphicon4").attr("class","glyphicon glyphicon-remove form-control-feedback");
         commonvariable  = "a";
      }
       

      

      // value of publisher

      commonvariable=$("#publisher").val();
      if(commonvariable == "")
      {
         displayError("*Empty Field","#error_message_5",".error_row_5");
         $("#glyphicon5").attr("class","glyphicon glyphicon-remove form-control-feedback");
         commonvariable  = "a";
      }
      

      // shop for book supplier

      commonvariable=$("#booksource").val();
      commonvariable1=$("#bill").val();
      if(commonvariable == "" && commonvariable1 != "")
      {

         displayError("*Empty Field","#error_message_11",".error_row_9");
         $("#error_message_12").text("");
         $("#glyphicon10").attr("class","glyphicon glyphicon-remove form-control-feedback");
         //commonvariable  = "a";
      }
      
      // bill number on shop bill

      if(commonvariable1 == "" && commonvariable != "")
      {
         displayError("*Empty Field","#error_message_12",".error_row_9");
         $("#error_message_11").text("");
         $("#glyphicon11").attr("class","glyphicon glyphicon-remove form-control-feedback");
         //commonvariable  = "a";
      }
      if(commonvariable1 == "" && commonvariable == "")
      {
         displayError("*Empty Field","#error_message_12",".error_row_9");
         displayError("*Empty Field","#error_message_11",".error_row_9");
         $("#glyphicon10").attr("class","glyphicon glyphicon-remove form-control-feedback");
         $("#glyphicon11").attr("class","glyphicon glyphicon-remove form-control-feedback");
         //commonvariable  = "a";
      
      }   
      
      // cost of book

      commonvariable=$("#cost").val();
      if(commonvariable == "")
      {
         displayError("*Empty Field","#error_message_13",".error_row_10");
         $("#glyphicon12").attr("class","glyphicon glyphicon-remove form-control-feedback");
         commonvariable  = "a";
      }
      
      
      var counter=0;

      for(var t=1;t<=11;t++)
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
               
               var data1=$("input:lt(7)").serialize();
               data1=data1+"&genre="+$("#genre").val()+"&edition="+$("input:eq(7)").val()+"&status="+$("#status").val()+"&";
               data1=data1+$("input:gt(7)").serialize();
               data1=data1+"&desc="+$('textarea').val();
               //var other_data = $('input').serializeArray();
               //$.each(other_data,function(key,input){
                //  fd.append(input.name,input.value);
               //})
               $.ajax({
                  type:"POST",
                  url:"/test-page",
                  data: data1,
                  dataType:'html',
                  cache:true,
                  success:function(answer_to_send_back)
                  {
                      $("#loader-wrapper").css("visibility","hidden");
                      $("html").css("-webkit-filter"," grayscale(0%)");
                     answer_to_send_back = JSON.parse(answer_to_send_back);
                     //alert($('.c').text());
                     //alert(answer_to_send_back[0]);
                     //alert()
                     //$('#append_here').html(answer_to_send_back);
                     var loopvariable = parseInt($("#copies").val(),10);
                     var string_to_print ="";
                     for(var y=1;y<=loopvariable;y++)
                     {

                        //alert(loopvariable+2);
                        
                        string_to_print="<p>"+string_to_print+y.toString()+" : "+answer_to_send_back[y-1]+"</p>";
                        
                     }
                     //alert(string_to_print);
                     string_to_print = "<h2 class='col-xs-14'>The Book Id's: </h1><br><h3>"+string_to_print+"</h3>";
                     $('#print_the_status').append(string_to_print);
                     $("#submit").attr("class","btn btn-primary btn-block disabled");
                     $( "input" ).prop( "disabled", true );
                     $( "select" ).prop( "disabled", true );
                     $( "textarea" ).prop( "disabled", true );
                     $("#submit").off("click");
                  },
                  error: function (xhr, status, error) {
                     $("#loader-wrapper").css("visibility","hidden");
                      $("html").css("-webkit-filter"," grayscale(0%)");
                     string_to_print = "<pre><h2 class='col-xs-14'>Error Report: </h1><br><h3>"+error+"</h3></pre>";
                     $('.c').html(string_to_print);
                  }
               })
               $("#loader-wrapper").css("visibility","visible");
               $("html").css("-webkit-filter"," grayscale(50%)");
            }
   });   
  
});
