$(function(){  
	var option1 = {
	  elem: '#course' 
	  ,even: true
	  ,limits: [20,30,50]
  	  ,limit: 20 //默认采用20
	  ,height:"full-140" //容器高度
	  ,url:'../../datas/course.json'
	  ,page:true
	  ,cols: [[
	  			{field:'schoolName',sort: true, fixed: true,title:'学校'},
	  			{field:'class',title:'班级'},
	  			{field:'teacher', sort: true,title:'开课教师'},
	  			{field:'courseTime',title:'开课时间'},
	  			{field:'lab',title:'实验室'},
	  			{field:'labContent', sort: true,title:'实验内容'},
	  			{field:'course',title:'科目'},
	  			{field:'classState',width:200,title:'开课状态',fixed:'right',templet:'#state'}
	  			
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
      	parent.layer.open({
    		type: 2,
    		title: ["视频回看","font-size:18px"], //不显示标题栏   title : false/标题
	      	area: ['900px','520px'],
	      	shade: 0.8,
	      	anim:2,
	      	skin: 'layui-layer-lan',
	      	maxmin:true,
	     	id: '111', //设定一个id，防止重复弹出
	      	resize: false,
	     	moveType: 1, //拖拽模式，0或者1
	     	content:'./alertInfo/seeVideo.html'   	
    	})
    }
  });
 
   
 });
 
})
