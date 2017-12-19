$(function(){  
	
	var option1 = {
	  elem: '#teachPlan' 
	  ,even: true
	  ,limits: [20,30,50]
  	  ,limit: 20 //默认采用20
	  ,height:"full-150" //容器高度
	  ,url:path_way.teachPlan1
	  ,page:true
	  ,cols: [[
	  			// {field:'termName', sort: true,title:'学期'},
	  			{field:'schoolType',sort: true,title:'学校类型'},
	  			{field:'targetUsedRate',title:'实验室利用率(%)'},
	  			{field:'courseRate', sort: true,title:'分组实验开出率(%)'},
	  			{field:'demoCourseRate', sort: true,title:'演示实验开出率(%)'},
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
    		var targetUsedRate = obj.data.targetUsedRate;
    		var courseRate = obj.data.courseRate;
    		var demoCourseRate = obj.data.demoCourseRate;
    		  	
      		parent.layer.open({
    		type: 2,
    		title: ["+教学目标修改","font-size:16px"], //不显示标题栏   title : false/标题
	      	area: ['450px','410px'],
	      	shade: 0.8,
	      	anim:2,
	      	skin: 'layui-layer-lan',
	      	maxmin:true,
	     	id: 'editTeachPlan', //设定一个id，防止重复弹出
	      	resize: false,
	     	moveType: 1, //拖拽模式，0或者1
	     	content:'./alertInfo/disEduBur/teachPlan.html',
	     	success:function(layero,index){
	     		
		     		var iframeWin = parent.parent.window[layero.find('iframe')[0]['name']];
		     		iframeWin.$("#targetUsedRate").attr("value",targetUsedRate);
		     		iframeWin.$("#courseRate").attr("value",courseRate);
		     		iframeWin.$("#demoCourseRate").attr("value",demoCourseRate);
		     		
					iframeWin.$("#teachPlanSubmit").click(function(){
						if(iframeWin.$("#targetUsedRate").val()==""){
							
						}else if(iframeWin.$("#courseRate").val()==""){
							
						}else if(iframeWin.$("#demoCourseRate").val()==""){
							
						}else{
							$.ajax({
								type:"get",
								url:path_way.teachPlan2,
								dataType:"json",
								data:iframeWin.$("#teachPlanAlert").serialize(),
								success:function(data){															
									table.reload("teachPlan",{});								
									parent.layer.closeAll('iframe');								
								}
						});
						}									
						
					})	
		     	
	     	}
	     	
    	})
    }
  });

	 
	$('#newBuild').on('click', function(){
    	parent.layer.open({
    		type: 2,
    		title: ["+教学目标配置","font-size:16px"], //不显示标题栏   title : false/标题
	      	area: ['450px','410px'],
	      	shade: 0.8,
	      	anim:2,
	      	skin: 'layui-layer-lan',
	      	maxmin:true,
	     	id: 'nBuild', //设定一个id，防止重复弹出
	      	resize: false,
	     	moveType: 1, //拖拽模式，0或者1
	     	content:'./alertInfo/disEduBur/teachPlan.html',
	     	success:function(layero,index){
	     		
		     		var iframeWin = parent.parent.window[layero.find('iframe')[0]['name']];
		     		
					iframeWin.$("#teachPlanSubmit").click(function(){
						if(iframeWin.$("#termName").val()==""){
							
						}else if(iframeWin.$("#schoolType").val()==""){
							
						}else if(iframeWin.$("#openRate").val()==""){
							
						}else if(iframeWin.$("#groupRate").val()==""){
							
						}else if(iframeWin.$("#demoRate").val()==""){
							
						}else{
							$.ajax({
							type:"get",
							url:"../../datas/teachPlan.json",
							dataType:"json",
							data:iframeWin.$("#teachPlanAlert").serialize(),
							success:function(data){															
								table.reload("teachPlan",{});								
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
