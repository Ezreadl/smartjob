$(function(){  		
	$.ajaxSetup({
		cache: false
	});
	var option1 = {
	  elem: '#teachListBrowse' 
	  ,even: true
	  ,limits: [20,30,50]
  	  ,limit: 20 //默认采用20
	  ,height:"full-165" //容器高度
	  ,url:path_way.basicInfo1
	  ,page:true
	  ,cols: [[
	  			{field:'subjectName',width:200,title:'学科'},
	  			{field:'parentTitle',width:200,sort: true,title:'一级主题'},
	  			{field:'title',width:200,title:'二级主题'},
	  			{field:'grade',width:140,title:'年级'},
	  			{field:'gradeYear',width:140,title:'学期',},
	  			{field:'content',width:300,title:'内容标准'},
	  			{field:'demonstration',width:100,title:'教师演示',templet:'#demonstration'},
	  			{field:'inClass',width:100,title:'课内分组',templet:'#inClass'},
	  			{field:'outClass',width:100,title:'课外分组',templet:'#outClass'},
	  			{fiele:'starCourse',width:100,title:"必做实验",templet:'#starCourse'},
	  			{fixed: 'right', width:100,align:'center', toolbar: '#barDemo',title:'详细'}
	  ]]//设置表头  
	};
	
	var option2 = {
		elem: '#courseInfo' 
	  ,even: true
	  ,limits: [20,30,50]
  	  ,limit: 20 //默认采用20
	  ,height:"full-165" //容器高度
	  ,url:path_way.basicInfo2
	  ,page:true
	  ,cols: [[
	  			{field:'teacherName',title:'教师'},
	  			{field:'class1',sort: true,title:'班级'},
	  			{field:'course',title:'学科'},
	  			{fixed: 'right', align:'center', toolbar: '#optionDemo',title:'操作'}
	  ]]//设置表头  
	};
	
	var option3={
	  elem: '#laboryInfoList' 
	  ,even: true
	  ,limits: [20,30,50]
  	  ,limit: 20 //默认采用20
	  ,height:"full-165" //容器高度
	  ,url:path_way.basicInfo3
	  ,page:true
	  ,cols: [[
	  			{field:'labName',title:'实验室名称'},
	  			{field:'labType',title:'实验室类型'},
	  			{field:'currentSchoolType',title:'适用学校类型'},
	  			{fixed: 'right', align:'center', toolbar: '#optionDemo',title:'操作'}
	  ]]//设置表头  
	};
	
	var option4={
	  elem: '#userInfo' 
	  ,even: true
	  ,limits: [20,30,50]
  	  ,limit: 20 //默认采用20
	  ,height:"full-165" //容器高度
	  ,url:path_way.basicInfo4
	  ,page:true
	  ,cols: [[
	  			{field:'userName',title:'用户名'},
	  			{field:'userPassword',title:'密码',templet:"#PSW"},
	  			{field:'userNick',title:'姓名'},
	  			{field:'telephone',title:'手机号'},
	  			{field:'position',title:'职务'},
	  			{fixed: 'right', align:'center', toolbar: '#optionDemo',title:'操作'}
	  ]]//设置表头  
	};
	
	
layui.use(['laypage', 'layer', 'table','form','element'], function(){
	
   var laypage = layui.laypage //分页
  ,layer = layui.layer //弹层
  ,table = layui.table //表格
  ,form = layui.form
  ,element = layui.element; //元素操作
  
  table.render(option1);
  element.on('tab(docDemoTabBrief)', function(data){
	if(this.getAttribute('lay-id')=='num1'){
		table.render(option1);
		
		
	}else if(this.getAttribute('lay-id')=='num2'){
		table.render(option2);		
			//监听工具条
  table.on('tool(demo)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
    var data = obj.data //获得当前行数据
    ,layEvent = obj.event; //获得 lay-event 对应的值
    if(layEvent === 'del'){
      layer.confirm('真的删除行么', function(index){
        obj.del(); //删除对应行（tr）的DOM结构       
        layer.close(index);
        //向服务端发送删除指令
      });
    } else if(layEvent === 'edit'){
     		var teacherName = obj.data.teacherName;
     		var class1= obj.data.class1;
     		var course = obj.data.course;
     		
      		parent.layer.open({
    		type: 2,
    		title: ["修改任课信息","font-size:16px"], //不显示标题栏   title : false/标题
	      	area: ['400px','320px'],
	      	shade: 0.8,
	      	anim:2,
	      	skin: 'layui-layer-lan',
	      	maxmin:true,
	     	id: 'courseEdit', //设定一个id，防止重复弹出
	      	resize: false,
	     	moveType: 1, //拖拽模式，0或者1
	     	content:'./alertInfo/schoolAdmin/courseInfo.html',
	     	success:function(layero,index){
	     		var iframeWin = parent.parent.window[layero.find('iframe')[0]['name']];
				iframeWin.$("#teacherName").attr("value",teacherName);
				iframeWin.$("#class1").attr("value",class1);
				iframeWin.$("#course").attr("value",course);
				
				iframeWin.$("#courseInfoSubmit").click(function(){
					if(iframeWin.$("#teacherName").val()==""){

					}else if(iframeWin.$("#class").val()==""){

					}else if(iframeWin.$("#course").val()==""){

					}else{
						$.ajax({
						type:"get",
						url:path_way.basicInfo5,
						dataType:"json",
						data:iframeWin.$("#courseInfoAlert").serialize(),
						success:function(data){							
							
							table.reload("courseInfo",{});
							
							parent.layer.closeAll('iframe');
						}
					});
				}
					
			})
	     	}
	     	
    	})
    };    
  });
	    
//添加任课信息
$("#addCourse").click(function(){
   	
      		parent.layer.open({
    		type: 2,
    		title: ["添加任课信息","font-size:16px"], //不显示标题栏   title : false/标题
	      	area: ['400px','320px'],
	      	shade: 0.8,
	      	anim:2,
	      	skin: 'layui-layer-lan',
	      	maxmin:true,
	     	id: 'courseAdd', //设定一个id，防止重复弹出
	      	resize: false,
	     	moveType: 1, //拖拽模式，0或者1
	     	content:'./alertInfo/schoolAdmin/courseInfo.html',
	     	success:function(layero,index){
	     		var iframeWin = parent.parent.window[layero.find('iframe')[0]['name']];
				
				iframeWin.$("#courseInfoSubmit").click(function(){
					if(iframeWin.$("#teacherName").val()==""){

					}else if(iframeWin.$("#class").val()==""){

					}else if(iframeWin.$("#course").val()==""){

					}else{
						$.ajax({
						type:"get",
						url:"../../datas/schoolAdmin/courseInfo.json",
						dataType:"json",
						data:iframeWin.$("#courseInfoAlert").serialize(),
						success:function(data){							
							
							table.reload("courseInfo",{});
							
							parent.layer.closeAll('iframe');
						}
					});
				}
					
			})
	     	}
	     	
    	})
    
    })	
		
//	实验室信息	
}else if(this.getAttribute('lay-id')=='num3'){
	
	table.render(option3);		
	table.on('tool(demo)', function(obj){ 
    var data = obj.data 
    ,layEvent = obj.event; 
    if(layEvent === 'del'){
      layer.confirm('真的删除行么', function(index){
        obj.del(); 
        layer.close(index);
       
      });
    } else if(layEvent === 'edit'){
     		var labName = obj.data.labName;
     		var labType= obj.data.labType;
     		var currentSchoolType = obj.data.currentSchoolType;
     		
      		parent.layer.open({
    		type: 2,
    		title: ["修改实验室信息","font-size:16px"], //不显示标题栏   title : false/标题
	      	area: ['400px','320px'],
	      	shade: 0.8,
	      	anim:2,
	      	skin: 'layui-layer-lan',
	      	maxmin:true,
	     	id: 'labEdit', //设定一个id，防止重复弹出
	      	resize: false,
	     	moveType: 1, //拖拽模式，0或者1
	     	content:'./alertInfo/schoolAdmin/labInfo.html',
	     	success:function(layero,index){
	     		var iframeWin = parent.parent.window[layero.find('iframe')[0]['name']];
				iframeWin.$("#labName").attr("value",labName);
				iframeWin.$("#labType").attr("value",labType);
				iframeWin.$("#currentSchoolType").attr("value",currentSchoolType);
				
				iframeWin.$("#labInfoSubmit").click(function(){
					if(iframeWin.$("#labName").val()==""){

					}else if(iframeWin.$("#labType").val()==""){

					}else if(iframeWin.$("#currentSchoolType").val()==""){

					}else{
						$.ajax({
						type:"get",
						url:"../../datas/schoolAdmin/laboryInfo.json",
						dataType:"json",
						data:iframeWin.$("#labInfoAlert").serialize(),
						success:function(data){							
							
							table.reload("laboryInfoList",{});
							
							parent.layer.closeAll('iframe');
						}
					});
				}
					
			})
	     	}
	     	
    	})
    };    
  });
	    
//添加任课信息
$("#addLab").click(function(){
   	
      		parent.layer.open({
    		type: 2,
    		title: ["添加实验室信息","font-size:16px"], //不显示标题栏   title : false/标题
	      	area: ['400px','320px'],
	      	shade: 0.8,
	      	anim:2,
	      	skin: 'layui-layer-lan',
	      	maxmin:true,
	     	id: 'labAdd', //设定一个id，防止重复弹出
	      	resize: false,
	     	moveType: 1, //拖拽模式，0或者1
	     	content:'./alertInfo/schoolAdmin/labInfo.html',
	     	success:function(layero,index){
	     		var iframeWin = parent.parent.window[layero.find('iframe')[0]['name']];
				
				iframeWin.$("#labInfoSubmit").click(function(){
					if(iframeWin.$("#labName").val()==""){

					}else if(iframeWin.$("#labType").val()==""){

					}else if(iframeWin.$("#currentSchoolType").val()==""){

					}else{
						$.ajax({
						type:"get",
						url:"../../datas/schoolAdmin/laboryInfo.json",
						dataType:"json",
						data:iframeWin.$("#labInfoAlert").serialize(),
						success:function(data){							
							
							table.reload("laboryInfoList",{});
							
							parent.layer.closeAll('iframe');
						}
					});
				}
					
			})
	     	}
	     	
    	})
    
    })	

//修改教师实验员信息
}else{
		table.render(option4);	
	
	table.on('tool(demo)', function(obj){ 
    var data = obj.data 
    ,layEvent = obj.event; 
    if(layEvent === 'del'){
      layer.confirm('真的删除行么', function(index){
        obj.del(); 
        layer.close(index);
       
      });
    } else if(layEvent === 'edit'){
     		var userName = obj.data.userName;
     		var userPassword= obj.data.userPassword;
     		var userNick = obj.data.userNick;
     		var telephone = obj.data.telephone;
     		
      		parent.layer.open({
    		type: 2,
    		title: ["修改用户信息","font-size:16px"], //不显示标题栏   title : false/标题
	      	area: ['420px','450px'],
	      	shade: 0.8,
	      	anim:2,
	      	skin: 'layui-layer-lan',
	      	maxmin:true,
	     	id: 'userEdit', //设定一个id，防止重复弹出
	      	resize: false,
	     	moveType: 1, //拖拽模式，0或者1
	     	content:'./alertInfo/schoolAdmin/createpeopleInfo.html',
	     	success:function(layero,index){
	     		var iframeWin = parent.parent.window[layero.find('iframe')[0]['name']];
				iframeWin.$("#userName").attr("value",userName);
				iframeWin.$("#userPassword").attr("value",userPassword);
				iframeWin.$("#userNick").attr("value",userNick);
				iframeWin.$("#telephone").attr("value",telephone);
				
				iframeWin.$("#userInfoSubmit").click(function(){
					if(iframeWin.$("#userName").val()==""){

					}else if(iframeWin.$("#userPassword").val()==""){

					}else if(iframeWin.$("#userNick").val()==""){

					}else if(iframeWin.$("#telephone").val()==""){

					}else if(iframeWin.$("#position").val()==""){

					}else{
						$.ajax({
						type:"get",
						url:"../../datas/schoolAdmin/userInfo.json",
						dataType:"json",
						data:iframeWin.$("#userInfoAlert").serialize(),
						success:function(data){							
							
							table.reload("userInfo",{});
							
							parent.layer.closeAll('iframe');
						}
					});
				}
					
			})
	     	}
	     	
    	})
    };    
  });
	    
//添加用户信息
$("#userAdd").click(function(){
   	
      		parent.layer.open({
    		type: 2,
    		title: ["添加用户信息","font-size:16px"], //不显示标题栏   title : false/标题
	      	area: ['420px','450px'],
	      	shade: 0.8,
	      	anim:2,
	      	skin: 'layui-layer-lan',
	      	maxmin:true,
	     	id: 'userAdd', //设定一个id，防止重复弹出
	      	resize: false,
	     	moveType: 1, //拖拽模式，0或者1
	     	content:'./alertInfo/schoolAdmin/createPeopleInfo.html',
	     	success:function(layero,index){
	     		var iframeWin = parent.parent.window[layero.find('iframe')[0]['name']];
				
				iframeWin.$("#userInfoSubmit").click(function(){
					if(iframeWin.$("#userName").val()==""){

					}else if(iframeWin.$("#userPassword").val()==""){

					}else if(iframeWin.$("#userNick").val()==""){

					}else if(iframeWin.$("#telephone").val()==""){

					}else{
						$.ajax({
						type:"get",
						url:"../../datas/schoolAdmin/userInfo.json",
						dataType:"json",
						data:iframeWin.$("#userInfoAlert").serialize(),
						success:function(data){							
							
							table.reload("userInfo",{});
							
							parent.layer.closeAll('iframe');
						}
					});
				}
					
			})
	     	}
	     	
    	})
    
    })	
					
}
		
});
	
		
	
 });
})
