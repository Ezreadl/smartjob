$(function(){  

		 $.ajax({
				url:path_way.seeVideo,
				type:"get",
				dataType:"json",
				success:function(data){
					// alert(data);
					var data = data.allLabInfo;
					var str = "";
					for(var i in data){
						var school = data[i].school;
						// alert(school.schoolName);
						str += "<div class='videoDiv'style='overflow-x:auto'>"+
								"<ul class='videoUl'>"+
								"<li class='schoolName'>"+school.schoolName+"</li>";
					for(var x in school.playParam){
						str += 	"<li>"+
								"<div class='videoPlace'><center><P>"+
								"<OBJECT id='SNMSCloudOcx' classid='clsid:DEEE91FD-B7EE-451A-BF54-F7A289BC422D' align=right hspace=0 vspace=0 width=100% height=150></OBJECT>"+
								"</div>"+
								"<div class='content'>"+
										"<p>"+school.playParam[x].labName+"</p>"+
										"<p>"+school.playParam[x].objectName+"&nbsp;&nbsp;&nbsp;&nbsp;<span class='teacherName'>"+school.playParam[x].teacherName+"</span></p>"+
										"<p>"+school.playParam[x].content+"</p>"+
								"</div>";
				}

						str += "</li></ul></div>";	
			}
			// alert(str);	
			$("#videoContent").html(str);	
		}
	 })
})

 
