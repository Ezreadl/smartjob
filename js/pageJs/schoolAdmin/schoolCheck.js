$(function(){  
	var option1 = {
	  elem: '#schoolCheck' 
	  ,even: true
	  ,limits: [20,30,50]
  	  ,limit: 20 //默认采用20
	  ,height:"full-155" //容器高度
	  ,url:path_way.schoolCheck1
	  ,page:true
	  ,cols: [[
	  			{field:'lessonTime',width:250,sort: true,title:'原上课时间'},
	  			{field:'start',width:250,sort: true,title:'调课时间'},			
	  			{field:'className', width:140,sort: true,title:'班级'},
	  			{field:'teacherName',width:150, sort: true,title:'开课教师'},
	  			{field:'lessonTitle',width:200,title:'实验内容'},
	  			{field:'subjectName',width:140, sort: true,title:'学科类型'},
	  			{field:'changeRes',width:250,title:'调课原因'},
	  			{field:'checkState', width:100,fixed:'right',sort: true,title:'审核状态',templet:'#checkState'}
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
    if(layEvent === 'checkState'){
      	parent.layer.open({
    		type: 2,
    		title: ["调课审批","font-size:18px"], //不显示标题栏   title : false/标题
	      	area: ['500px','320px'],
	      	shade: 0.8,
	      	anim:2,
	      	skin: 'layui-layer-lan',
	      	maxmin:true,
	     	id: 'checkstate', //设定一个id，防止重复弹出
	      	resize: false,
	     	moveType: 1, //拖拽模式，0或者1
	     	content:'./alertInfo/schoolAdmin/classCheck.html',
	     	success:function(layero,index){
	     		
		     		var iframeWin = parent.parent.window[layero.find('iframe')[0]['name']];
		     		
					iframeWin.$("#checkSubmit").click(function(){
						$.ajax({
							type:"get",
							url:path_way.schoolCheck2,
							dataType:"json",
							data:iframeWin.$("#checkSubmitAlert").serialize(),
							success:function(data){															
								table.reload("schoolCheck",{});								
								parent.layer.closeAll('iframe');								
							}
						});								
						
					})	
		     	
	     	}
	     	
    	})
    }
  });
   
 });
})
