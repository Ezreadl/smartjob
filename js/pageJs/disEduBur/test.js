$(function(){  
	
	$.ajax({
		
			 url:path_way.testJson,
			 type:"get",
			 dataType:"json",
			 success:function(data){
			 	var str = "";
//			 	for(var i in data.playParam){
//			 		alert(i);
			 		 var appUrl = data.playParam.appUrl;
					 var devKey = data.playParam.devKey;
					 var password = data.playParam.password;
					 var serverIp = data.playParam.serverIp;
					 var serverPort = data.playParam.serverPort;
					 var userName = data.playParam.userName;
//					 str += "<div class='videoPlay'>"+
//							"<center><P>"+
//							"<OBJECT id='SNMSCloudOcx"+i+"' classid='clsid:DEEE91FD-B7EE-451A-BF54-F7A289BC422D' align=right hspace=0 vspace=0 width=400 height=350></OBJECT>"+
//							"</div>"
							
						DbsIP = serverIp;
					 	DbsPort = serverPort;
					 	PlatformUserName = userName; 
					 	PlatfromUserPwd = password; 
					 	ChannelID = devKey;
					 	StartVideo();	
//			 	}
//			 	$("body").html(str);			


		}					 
	});
 
})
