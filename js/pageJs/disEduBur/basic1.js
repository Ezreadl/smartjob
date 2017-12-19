$(function(){  
	var option1 = {
	  elem: '#sInfo' 
	  ,even: true
	  ,limits: [20]
  	  ,limit: 20 //默认采用20
	  ,height:"full-150" //容器高度
	  ,url:path_way.schoolInfo
	  ,page:true
	  ,cols: [[
	  			{field:'organName',sort: true, fixed: true,title:'学校名称'},
	  			{field:'course',title:'课表',templet:'#course',event:'seeCourse'},
	  			{field:'organType', sort: true,title:'学校类型'},
	  			{field:'locationUrl', title:'点位操作权限',templet:'#auth'},
	  			{fixed: 'right', align:'center', toolbar: '#barDemo',title:'操作'}
	  ]]//设置表头  
	};
	
layui.use(['laypage', 'layer', 'table','form','element'], function(){
	
   var laypage = layui.laypage //分页
  ,layer = layui.layer //弹层
  ,table = layui.table //表格
  ,form = layui.form
  ,element = layui.element; //元素操作
  
  table.render(option1);
	
  //监听事件
  table.on('tool(demo)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
    var data = obj.data //获得当前行数据
    ,layEvent = obj.event; //获得 lay-event 对应的值
    if(layEvent === 'courseCharts'){
      		parent.layer.open({
      			type: 2,
	    		title: ["课表","font-size:16px"], //不显示标题栏   title : false/标题
		      	area: ['1000px','500px'],
		      	shade: 0.8,
		      	anim:2,
		      	skin: 'layui-layer-lan',
		      	maxmin:true,
		     	id: 'courseCharts', //设定一个id，防止重复弹出
		      	resize: false,
		     	moveType: 1, //拖拽模式，0或者1
		     	content:'./alertInfo/disEduBur/courseCharts.html'
      		})
    }else if(layEvent === 'edit'){
    	var organName = obj.data.organName;
    	var organType = obj.data.organType;
    	
      		parent.layer.open({
      			type: 2,
	    		title: ["修改信息","font-size:16px"], //不显示标题栏   title : false/标题
		      	area: ['400px','300px'],
		      	shade: 0.8,
		      	anim:2,
		      	skin: 'layui-layer-lan',
		      	maxmin:true,
		     	id: 'edit', //设定一个id，防止重复弹出
		      	resize: false,
		     	moveType: 1, //拖拽模式，0或者1
		     	content:'./alertInfo/disEduBur/nCreate.html',
		     	success:function(layero,index){
		     		var iframeWin = parent.parent.window[layero.find('iframe')[0]['name']];
		     		iframeWin.$("#organName").attr("value",organName);
		     		
					iframeWin.$("#laySubmit").click(function(){
						if(iframeWin.$("#organName").val()==""){
							
						}else if(iframeWin.$("#organType").val()==""){
							
						}else{
							$.ajax({
							type:"get",
							url:path_way.schoolInfo2,
							dataType:"json",
							data:iframeWin.$("#nCreate").serialize(),
							success:function(data){															
								table.reload("sInfo",{});								
								parent.layer.closeAll('iframe');								
							}
						});
						}									
						
					})	
		     	}
      		});
      		    		
    }
    

  });

	 
	$('#newBuild').on('click', function(){
    	parent.layer.open({
    		type: 2,
    		title: ["+新建学校","font-size:16px"], //不显示标题栏   title : false/标题
	      	area: ['400px','300px'],
	      	shade: 0.8,
	      	anim:2,
	      	skin: 'layui-layer-lan',
	      	maxmin:true,
	     	id: 'nBuild', //设定一个id，防止重复弹出
	      	resize: false,
	     	moveType: 1, //拖拽模式，0或者1
	     	content:'./alertInfo/disEduBur/nCreate.html',
	     	success:function(layero,index){
		     		var iframeWin = parent.parent.window[layero.find('iframe')[0]['name']];
		     	
					iframeWin.$("#laySubmit").click(function(){
						if(iframeWin.$("#organName").val()==""){
							
						}else if(iframeWin.$("#organType").val()==""){
							
						}else{
							$.ajax({
							type:"get",
							url:path_way.schoolInfo3,
							dataType:"json",
							data:iframeWin.$("#nCreate").serialize(),
							success:function(data){															
								table.reload("sInfo",{});								
								parent.layer.closeAll('iframe');								
							}
						});
						}									
						
					})	
		     	}
	     	
    	})
    	
    });
    
 
 });
})
