$(function(){  
	$.ajaxSetup({cache:false});
	var option1 = {
	  elem: '#course' 
	  ,even: true
	  ,limits: [20]
  	  ,limit: 20 //默认采用20
	  ,height:"full-160" //容器高度
	  ,url:path_way.courseCenter1
	  ,page:true
	  ,cols: [[
	  			{field:'school',sort: true, fixed: true,title:'学校'},
	  			{field:'lessonTime',title:'开课时间'},
	  			{field:'className',title:'班级'},	  			
	  			{field:'teacherName', sort: true,title:'开课教师'},	  			
	  			{field:'course',title:'科目'},
	  			{field:'organ',title:'实验室'},
	  			{field:'lessonInfo', sort: true,title:'实验内容'},	  			
	  			{field:'lessonStatus',width:200,title:'开课状态',fixed:'right',templet:'#state'}	  			
	  ]]//设置表头  
	};

layui.use(['laypage', 'layer', 'table','form','element','laydate'], function(){
	
   var laypage = layui.laypage //分页
  ,layer = layui.layer //弹层
  ,table = layui.table //表格
  ,form = layui.form
  ,laydate = layui.laydate
  ,element = layui.element; //元素操作
  
  table.render(option1);
  
   laydate.render({
    elem: '#date'
  });
  laydate.render({
    elem: '#date1'
  });
	 
table.on('tool(demo)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
    var data = obj.data //获得当前行数据
    ,layEvent = obj.event; //获得 lay-event 对应的值
    if(layEvent === 'state'){
    	var school = obj.data.school; 
    	var lessonTime = obj.data.lessonTime; 
    	var className = obj.data.className; 
    	var teacherName = obj.data.teacherName; 
    	var course = obj.data.course; 
    	var organ = obj.data.organ; 
    	var lessonInfo = obj.data.lessonInfo; 
    	var lessonGroup = obj.data.lessonGroup; 
    	var apptComt = obj.data.apptComt; 
		var require = obj.data.require;
    	   	
      	parent.layer.open({
    		type: 2,
    		title: ["视频回看","font-size:18px"], //不显示标题栏   title : false/标题
	      	area: ['800px','610px'],
	      	shade: 0.8,
	      	anim:2,
	      	skin: 'layui-layer-lan',
	      	maxmin:true,
	     	id: '111', //设定一个id，防止重复弹出
	      	resize: false,
	     	moveType: 1, //拖拽模式，0或者1
	     	content:'./alertInfo/disEduBur/seeVideo.html',
	     	success:function(layero,index){
	     		var iframeWin = parent.parent.window[layero.find('iframe')[0]['name']];
		     		iframeWin.$("#school").attr("value",school);
		     		iframeWin.$("#lessonTime").attr("value",lessonTime);
		     		iframeWin.$("#className").attr("value",className);
		     		iframeWin.$("#teacherName").attr("value",teacherName);
		     		iframeWin.$("#course").attr("value",course);
		     		iframeWin.$("#organ").attr("value",organ);
		     		iframeWin.$("#lessonInfo").attr("value",lessonInfo);
		     		iframeWin.$("#lessonGroup").attr("value",lessonGroup);
		     		iframeWin.$("#apptComt").html(apptComt);
					 iframeWin.$("#require").html(require);
		     	
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
							 iframeWin.DbsIP = serverIp;
							 iframeWin.DbsPort = serverPort;
							 iframeWin.PlatformUserName = userName; 
							 iframeWin.PlatfromUserPwd = password; 
							 iframeWin.ChannelID = devKey;
							 iframeWin.StartVideo();	

							 var picPaths = data.schedule.picPath;
							 var schedule = picPaths.split(",");
							 var str = "";
							for(var i=0;i<schedule.length;i++){
								str += "<div><img src='"+schedule[i]+"'/></div>";
							}
							 	iframeWin.$("#carouselImg").html(str);	
								 var test10 = iframeWin.$("#test10");
									iframeWin.layui.use(['carousel', 'form'], function(){
										var carousel = layui.carousel
										,form = layui.form;	
										//图片轮播
										carousel.render({
											elem: test10
											,width: '100%'
											,height: '55%'
											,interval: 5000
										});
																		
										//监听开关
										form.on('switch(autoplay)', function(){
											ins3.reload({
											autoplay: this.checked
											});
										});

							});		 
						 }

					 })
	     	}
    	})
    }
  });
 
   
 });
 
})
