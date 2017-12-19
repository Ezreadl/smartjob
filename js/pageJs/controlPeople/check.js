$(function(){  
	var option1 = {
	  elem: '#checkInfo' 
	  ,even: true
	  ,limits: [20,30,50]
  	  ,limit: 20 //默认采用20
	  ,height:"full-150" //容器高度
	  ,url:path_way.check
	  ,page:true
	  ,cols: [[
	  			{field:'schoolName',title:'学校名称'},  
	  			{field:'start',sort: true,title:'上课时间'},			
	  			{field:'className',sort: true,title:'班级'},
	  			{field:'teacherName',sort: true,title:'开课教师'},
	  			{field:'lessonTitle',title:'实验内容'},
	  			{field:'subjectName',sort: true,title:'学科类型'},
						
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
