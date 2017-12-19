$(function(){  
	var option1 = {
	  elem: '#teachList' 
	  ,even: true
	  ,limits: [20,30,50]
  	  ,limit: 20 //默认采用20
	  ,height:"full-150" //容器高度
	  ,url:path_way.teachList1
	  ,page:true
	  ,cols: [[
	  			{field:'name',sort: true, fixed: true,title:'教学目录名称'},
	  			{field:'version',title:'版本'},
	  			{field:'schoolTypeName', sort: true,title:'适用学校类型'},
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
    }
  });

   
 });
})
