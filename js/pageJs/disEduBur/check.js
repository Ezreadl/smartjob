$(function(){  
	var option1 = {
	  elem: '#checkInfo' 
	  ,even: true
	  ,limits: [20,30,50]
  	  ,limit: 20 //默认采用20
	  ,height:"full-140" //容器高度
	  ,url:'../../datas/check.json'
	  ,page:true
	  ,cols: [[
	  			{field:'formerTime',width:150,sort: true,title:'原上课时间'},
	  			{field:'modufyTime',width:150,sort: true,title:'调课时间'},
	  			{field:'schoolName',width:150,title:'学校名称'},
	  			{field:'class', width:150,sort: true,title:'班级'},
	  			{field:'teacher',width:150, sort: true,title:'开课教师'},
	  			{field:'lab',width:150,sort: true,title:'实验室'},
	  			{field:'labContent',width:200,title:'实验内容'},
	  			{field:'course',width:150, sort: true,title:'科目'},
	  			{field:'testType',width:150, sort: true,title:'实验类型'},
	  			{field:'modifyReason',width:150,title:'调课原因'},
	  			{field:'approvalPeople',width:150, sort: true,title:'审批人'},
	  			{field:'approvalResult', width:100,fixed:'right',sort: true,title:'审批结果'}
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
   
 });
})
