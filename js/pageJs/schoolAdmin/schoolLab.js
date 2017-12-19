$(function(){
    $.ajax({
        url:path_way.seeVideo,
        type:"get",
        dataType:"json",
        success:function(data){
            var appUrl = data.playParam.appUrl;
            var devKey = data.playParam.devKey;
            var password = data.playParam.password;
            var serverIp = data.playParam.serverIp;
            var serverPort = data.playParam.serverPort;
            var userName = data.playParam.userName;
            DbsIP = serverIp;
            DbsPort = serverPort;
            PlatfromUserPwd = password; 
            ChannelID = devKey;	

            layui.use('element',function(){
                 element.on('tab(docDemo)', function(data){
                    if(this.getAttribute('lay-id')=='num1'){
                            StartVideo();
                    }else if(this.getAttribute('lay-id')=='num2'){
                            StartVideo();
                    }else if(this.getAttribute('lay-id')=='num3'){
                            StartVideo();
                    }
                })
            })
        }
    })

 
})