$(function(){  
	var option1 = {
	  elem: '#myCourseList' 
	  ,even: true
	  ,limits: [20,30,50]
  	  ,limit: 20 //默认采用20
	  ,height:"full-155" //容器高度
	  ,url:path_way.myCourse1
	  ,page:true
	  ,cols: [[
	  			{field:'lessonTime',width:200,sort: true,title:'预约时间'},
	  			{field:'organ',width:150, sort: true,title:'实验室'},
	  			{field:'Grade',width:130,sort: true,title:'班级'},
	  			{field:'course',width:130,title:'学科'},  			
	  			{field:'lessonInfo', width:200,sort: true,title:'实验内容'},
	  			{field:'lessonType',width:120,title:'实验类型',templet:'#lessonTypeState'},
	   			{field:'demonstration',width:150,title:'必做实验',templet:'#demonstration'},
	  			{field:'yuState', width:130,fixed:'right',title:'预约状态',templet:'#yuState'}
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
    if(layEvent === 'editOrder'){
    	var teacherName = obj.data.teacherName;
    	
    	parent.layer.open({
    		type: 2,
    		title: ["调课申请","font-size:18px"], //不显示标题栏   title : false/标题
	      	area: ['500px','620px'],
	      	shade: 0.8,
	      	anim:2,
	      	skin: 'layui-layer-lan',
	      	maxmin:true,
	     	id: 'changeAppt', //设定一个id，防止重复弹出
	      	resize: false,
	     	moveType: 1, //拖拽模式，0或者1
	     	content:'./alertInfo/teacher/changeCourse.html',
	     	success:function(layero,index){
	     		var iframeWin = parent.parent.window[layero.find('iframe')[0]['name']];
		     		iframeWin.$("#teacherName").attr("value",teacherName);
		     		
		     		iframeWin.$("#labInfoSubmit").click(function(){		     									
							$.ajax({
							type:"get",
	  						url:path_way.myCourse2,
							dataType:"json",
							data:iframeWin.$("#orderInfoAlert").serialize(),
							success:function(data){															
								table.reload("myCourseList",{});								
								parent.layer.closeAll('iframe');	
							}
						});
													
					
		     		})
		     	
	     	}
	     	
    	})
      
    }
  });
  
  $("#appt").click(function(){
		 	parent.layer.open({
    		type: 2,
    		title: ["实验预约单","font-size:18px"], //不显示标题栏   title : false/标题
	      	area: ['500px','620px'],
	      	shade: 0.8,
	      	anim:2,
	      	skin: 'layui-layer-lan',
	      	maxmin:true,
	     	id: 'orderState', //设定一个id，防止重复弹出
	      	resize: false,
	     	moveType: 1, //拖拽模式，0或者1
	     	content:'./alertInfo/teacher/order.html',
	     	success:function(layero,index){
	     		var iframeWin = parent.parent.window[layero.find('iframe')[0]['name']];
		     		iframeWin.$("#teacherName").attr("value",teacherName);
		     		
		     		iframeWin.$("#labInfoSubmit").click(function(){		     									
							$.ajax({
							type:"get",
	  						url:'../../datas/teacher/myCourse.json',
							dataType:"json",
							data:iframeWin.$("#orderInfoAlert").serialize(),
							success:function(data){															
								table.reload("myCourseList",{});								
								parent.layer.closeAll('iframe');	
							}
						});
													
					
		     		})
		     	
	     	}
	     	
    	})
  })

  $("#myCourseCharts").click(function(){
		  parent.layer.open({
			type: 2,
    		title: ["我的实验完成率","font-size:18px"], //不显示标题栏   title : false/标题
	      	area: ['870px','500px'],
	      	shade: 0.8,
	      	anim:2,
	      	skin: 'layui-layer-lan',
	      	maxmin:true,
	     	id: 'chartsState', //设定一个id，防止重复弹出
	      	resize: false,
	     	moveType: 1, //拖拽模式，0或者1
	     	content:'./alertInfo/teacher/myLabCourse.html',
			success:function(layero,index){
				// var iframeWin = parent.parent.window[layero.find('iframe')[0]['name']];
				// element.on('tab( iframeWin.courseCharts)', function(data){
				// 	alert("1111");
				//  })
			 }
		  })
  })
   
 });
})
