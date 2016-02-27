$(document).ready(function(){


$("button").click(function () {
      
      // value of all inputs stored here
      
               $('.c').html("\0");
               
               var data1=$("input").serialize();
               
               $.ajax({
                  type:"post",
                  url:"/login_page",
                  data: data1,
                  dataType:'html',
                  cache:true,
                  success:function(answer_to_send_back)
                  {
                     $("#loader-wrapper").css("visibility","hidden");
                      $("html").css("-webkit-filter"," grayscale(0%)");
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