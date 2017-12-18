$(function(){  
	var option1 = {
	  elem: '#xueqiInfo' 
	  ,even: true
	  ,limits: [20,30,50]
  	  ,limit: 20 //默认采用20
	  ,height:"full-150" //容器高度
	  ,url:'../../datas/xueqi.json'
	  ,page:true
	  ,cols: [[
	  			{field:'schoolType',sort: true, fixed: true,title:'学校类型'},
	  			{field:'xueqiName',title:'学期名称'},
	  			{field:'startTime', sort: true,title:'开始时间'},
	  			{field:'endTime', title:'结束时间',templet:'#auth'},
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
      		parent.layer.open({
    		type: 2,
    		title: ["+修改学期信息","font-size:16px"], //不显示标题栏   title : false/标题
	      	area: ['500px','380px'],
	      	shade: 0.8,
	      	anim:2,
	      	skin: 'layui-layer-lan',
	      	maxmin:true,
	     	id: 'nTime1', //设定一个id，防止重复弹出
	      	resize: false,
	     	moveType: 1, //拖拽模式，0或者1
	     	content:'./alertInfo/xueqi.html'
	     	
    	})
    }
  });

	 
	$('#newBuild').on('click', function(){
    	parent.layer.open({
    		type: 2,
    		title: ["+新建学期","font-size:16px"], //不显示标题栏   title : false/标题
	      	area: ['500px','380px'],
	      	shade: 0.8,
	      	anim:2,
	      	skin: 'layui-layer-lan',
	      	maxmin:true,
	     	id: 'nBuild', //设定一个id，防止重复弹出
	      	resize: false,
	     	moveType: 1, //拖拽模式，0或者1
	     	content:'./alertInfo/xueqi.html'
	     	
    	})
    	
    });
   
 });
})
