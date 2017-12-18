$(function(){  		
layui.use(['laypage', 'layer', 'table','form','element'], function(){
	
   var laypage = layui.laypage //分页
  ,layer = layui.layer //弹层
  ,table = layui.table //表格
  ,form = layui.form
  ,element = layui.element; //元素操作
  
  table.render({
	  elem: '#labInfo' 
	  ,even: true
	  ,limits: [20,30,50]
  	  ,limit: 20 //默认采用20
	  ,height:"full-140" //容器高度
	  ,url:'../../datas/labInfo.json'
	  ,page:true
	  ,cols: [[
	  			{field:'rank',sort: true, fixed: true,title:'排名'},
	  			{field:'schoolName',title:'学校名称'},
	  			{field:'schoolType',sort: true,title:'学校类型'},
	  			{field:'labName',title:'实验室名称'},
	  			{field:'labType',title:'实验室类型'},
	  			{field:'place',title:'实验室地址',},
	  			{field:'useRatio',title:'实验室利用率',templet:'#stateTpl',fixed:'right'}
//	  			{fixed: 'right', width:120, align:'center', toolbar: '#barDemo',title:'操作'}
	  ]]//设置表头  
	});
	
 });
})
