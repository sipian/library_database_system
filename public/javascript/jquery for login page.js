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
                     
                  },
                  error: function (xhr, status, error) {
                     $('.c').html('Error : '+error);
                  }
            });
            });