$(function(){  
	var option1 = {
	  elem: '#teachPlan' 
	  ,even: true
	  ,limits: [20,30,50]
  	  ,limit: 20 //默认采用20
	  ,height:"full-150" //容器高度
	  ,url:'../../datas/teachPlan.json'
	  ,page:true
	  ,cols: [[
	  			{field:'xueqi', sort: true,title:'学期'},
	  			{field:'schoolType',sort: true,title:'学校类型'},
	  			{field:'useRadio',title:'实验室利用率'},
	  			{field:'groupLab', sort: true,title:'分组实验开出率'},
	  			{field:'demoLab', sort: true,title:'演出实验开出率'},
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
    		title: ["+新建学校","font-size:16px"], //不显示标题栏   title : false/标题
	      	area: ['500px','340px'],
	      	shade: 0.8,
	      	anim:2,
	      	skin: 'layui-layer-lan',
	      	maxmin:true,
	     	id: 'LAY_layuipro', //设定一个id，防止重复弹出
	      	resize: false,
	     	moveType: 1, //拖拽模式，0或者1
	     	content:'./alertInfo/nCreate.html'
	     	
    	})
    }
  });

	 
	$('#newBuild').on('click', function(){
    	parent.layer.open({
    		type: 2,
    		title: ["+新建学校","font-size:16px"], //不显示标题栏   title : false/标题
	      	area: ['500px','340px'],
	      	shade: 0.8,
	      	anim:2,
	      	skin: 'layui-layer-lan',
	      	maxmin:true,
	     	id: 'nBuild', //设定一个id，防止重复弹出
	      	resize: false,
	     	moveType: 1, //拖拽模式，0或者1
	     	content:'./alertInfo/nCreate.html'
	     	
    	})
    	
    });
   
 });
})
