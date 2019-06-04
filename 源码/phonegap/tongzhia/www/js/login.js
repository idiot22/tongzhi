$(document).ready(function(){

    $("#username").focus(function(){
        $(".name").css("borderColor","#41b883");
    });
    $("#username").blur(function(){
        $(".name").css("borderColor","#f2f2f2");
    });
    $("#password").focus(function(){
        $(".password").css("borderColor","#41b883");
    });
    $("#password").blur(function(){
        $(".password").css("borderColor","#f2f2f2");
    });
    $("#zcemail").focus(function(){
        $(".name").css("borderColor","#41b883");
    });
    $("#zcemail").blur(function(){
        $(".name").css("borderColor","#f2f2f2");
    });
    $("#yanzheng").focus(function(){
        $(".password").css("borderColor","#41b883");
    });
    $("#yanzheng").blur(function(){
        $(".password").css("borderColor","#f2f2f2");
    });
   $("#btn").click(
       function(){
        lianjie()
        
       }
       
   )
   function lianjie(){
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
    $.ajax({
        type:'get',
        url: `http://itcmsg.bnuz.edu.cn:8090/test/login?log=${username}&pwd=${password}`,
        dataType:'text',
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("连接错误")
        },
        success:function(data){
            if(username!="test"||password!="12345678"){
                $("#check").css("display","block")
                $("#mask").css("display","block")
                playBeep()
            }
            else{
                window.location.href="zhuce.html"
                console.log(data);
            }
        }
    })
}




//弹出框
$(".button2").on("click",function(){
    $("#check").css("display","none")
    $("#mask").css("display","none")
})
        //轰鸣声
        function playBeep() {
            navigator.notification.beep(3); 
        }
});