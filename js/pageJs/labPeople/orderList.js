$(function(){  		
layui.use(['laypage', 'layer', 'table','form','element','laydate'], function(){
	
   var laypage = layui.laypage //分页
  ,layer = layui.layer //弹层
  ,table = layui.table //表格
  ,form = layui.form
  laydate=layui.laydate
  ,element = layui.element; //元素操作
  
  laydate.render({
    elem: '#date'
  });
  laydate.render({
    elem: '#date1'
  });
  
  table.render({
	  elem: '#orderList' 
	  ,even: true
	  ,limits: [20,30,50]
  	  ,limit: 20 //默认采用20
	  ,height:"full-155" //容器高度
	  ,url:path_way.shiyanyuan1
	  ,page:true
	  ,cols: [[
	  			{field:'lessonTime',width:200,sort: true, fixed: true,title:'时间'},
	  			{field:'course',width:150,title:'科目'},
	  			{field:'Grade',width:150,sort: true,title:'班级'},
	  			{field:'teacherName',width:120,title:'授课教师'},
	  			{field:'lessonInfo',width:400,title:'实验内容'},
	  			{field:'lessonGroup',width:200,title:'分组情况',},
	  			{field:'organ',width:200,title:'实验室',},
	  			{field:'lessonEquip',width:200,title:'实验器材',},
	  			{field:'apptStat',width:120,align:'center',title:'审批情况',fixed:'right',templet:'#returnInfo'}
//	  			{fixed: 'right', width:120, align:'center', toolbar: '#barDemo',title:'操作'}
	  ]]//设置表头  
	});
	
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
    } else if(layEvent === 'checkState'){
    		var lessonTime = obj.data.lessonTime;
    		var course = obj.data.course;
    		var Grade = obj.data.Grade;
    		var teacherName = obj.data.teacherName;
    		var lessonInfo = obj.data.lessonInfo;
    		var lessonGroup = obj.data.lessonGroup;
    		var organ = obj.data.organ;
    		var lessonEquip = obj.data.lessonEquip;
    		var isChange = obj.data.isChange;
    		  	
      		parent.layer.open({
    		type: 2,
    		title: ["预约审批","font-size:16px"], //不显示标题栏   title : false/标题
	      	area: ['800px','600px'],
	      	shade: 0.8,
	      	anim:2,
	      	skin: 'layui-layer-lan',
	      	maxmin:true,
	     	id: 'checkEdit', //设定一个id，防止重复弹出
	      	resize: false,
	     	moveType: 1, //拖拽模式，0或者1
	     	content:'./alertInfo/labPeople/orderList.html',
	     	success:function(layero,index){
	     		
		     		var iframeWin = parent.parent.window[layero.find('iframe')[0]['name']];
		     		iframeWin.$("#lessonTime").attr("value",lessonTime);
		     		iframeWin.$("#course").attr("value",course);
		     		iframeWin.$("#Grade").attr("value",Grade);
		     		iframeWin.$("#teacherName").attr("value",teacherName);
		     		iframeWin.$("#lessonInfo").attr("value",lessonInfo);
		     		iframeWin.$("#lessonGroup").attr("value",lessonGroup);
		     		iframeWin.$("#organ").attr("value",organ);
		     		iframeWin.$("#lessonEquip").attr("value",lessonEquip);
		     		
		     		if(isChange == 0){
		     			iframeWin.$("#isChange").attr("value","正常上课");
		     		}else{
		     			iframeWin.$("#isChange").attr("value","调课");
		     		}
		     				     		
					iframeWin.$("#checkInfoSubmit").click(function(){						
							$.ajax({
							type:"get",
	  						url:path_way.shiyanyuan2,
							dataType:"json",
							data:iframeWin.$("#checkInfoAlert").serialize(),
							success:function(data){															
								table.reload("orderList",{});								
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
