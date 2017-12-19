$(function(){
	$.ajax({
		url:path_way.menuList,
		dataType:"json",
		type:"get",
		success:function(data){
			if(data){
				var menuData = data.rows;
				var str = "";
				for(var i=0;i<menuData.length;i++){
					if(menuData[i].childrenMenu){			
//						alert(menuData[i].icon);
						str += "<li class='layui-nav-item layui-anim layui-anim-up '>"+
                        	   "<a href='javascript:;' ><i class='layui-icon'>"+menuData[i].icon+"</i><span>"+menuData[i].menuName+"</span></a>"+
                        	   "<dl class='layui-nav-child'>";
                               
						for(var j=0;j<menuData[i].childrenMenu.length;j++){
							str +=  "<dd>"+
									'<a href="javascript:;" data-url="'+menuData[i].childrenMenu[j].url+'" data-icon="'+menuData[i].childrenMenu[j].icon+'" data-title="'+menuData[i].childrenMenu[j].menuName+'" kit-target data-id="'+menuData[i].childrenMenu[j].menuID+'">'+
									"<i class='layui-icon'>"+menuData[i].childrenMenu[j].icon+"</i><span>"+menuData[i].childrenMenu[j].menuName+"</span></a>"+
                           			 "</dd>";
						}
						
						str+="</dl>"+"</li>";
					}else{		
						str= str+'<li class="layui-nav-item layui-nav-itemed  layui-anim layui-anim-up ">'+
                                 '<a href="javascript:;" data-url="'+menuData[i].url+'" data-icon="'+menuData[i].icon+'" data-title="'+menuData[i].menuName+'" kit-target data-id="'+menuData[i].menuID+'"><i class="layui-icon">'+menuData[i].icon+'</i><span>'+menuData[i].menuName+'</span></a>'+
                            	"</li>";						
					}				
				}
				$("#menuUl").html(str);	
				// alert(str);		
			}else{
				alert("数据读取错误");
			}
			
		}
		
	})
	
	
})
