$(function(){  
	var option1 = {
	  elem: '#schoolCheck' 
	  ,even: true
	  ,limits: [20,30,50]
  	  ,limit: 20 //默认采用20
	  ,height:"full-140" //容器高度
	  ,url:'../../datas/check.json'
	  ,page:true
	  ,cols: [[
	  			{field:'formerTime',width:150,sort: true,title:'原上课时间'},
	  			{field:'modufyTime',width:150,sort: true,title:'调课时间'},
	  			{field:'class', width:150,sort: true,title:'班级'},
	  			{field:'teacher',width:150, sort: true,title:'开课教师'},
	  			{field:'lab',width:150,sort: true,title:'实验室'},
	  			{field:'labContent',width:200,title:'实验内容'},
	  			{field:'course',width:150, sort: true,title:'科目'},
	  			{field:'testType',width:150, sort: true,title:'实验类型'},
	  			{field:'modifyReason',width:150,title:'调课原因'},
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
	      	area: ['500px','350px'],
	      	shade: 0.8,
	      	anim:2,
	      	skin: 'layui-layer-lan',
	      	maxmin:true,
	     	id: 'checkstate', //设定一个id，防止重复弹出
	      	resize: false,
	     	moveType: 1, //拖拽模式，0或者1
	     	content:'./alertInfo/schoolAdmin/classCheck.html'
	     	
    	})
    }
  });
   
 });
})
