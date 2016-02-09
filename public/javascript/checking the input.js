$(document).ready(function(){

/*
	$("button").on("mouseover", function(){
		$("button").css("background-color","red");
		$("#error_id_1").fadeIn(100);
				});
	$("button").on("mouseout", function(){
		$("button").css("background-color","gray");
		$("#error_id_1").fadeOut(100);
				});
			});

*/
            $("#azxc").keyup(function (e) {
             
                    var pos = $("#azxc").position();
                    $('#error_id_2').css({
                        top: pos.top + $("#azxc").height()  + 5,
                        left: pos.left,
                        width: '300px',
                        position: 'absolute',
                        display : none
                    })
                     $("#error_id_2").html("enter validdfsdafasdf");
                    $("#error_id_2").fadeIn("slow").insertAfter($("#azxc"));
                
            });

            $("#azxc").dblclick(function (e) {
            	$("#error_id_2").fadeOut("slow");
            });
            	
            
        });