$(function(){
    var option1 = {
	  elem: '#classReport' 
	  ,even: true
	  ,limits: [20]
  	  ,limit: 20 //默认采用20
	  ,height:"full-20" //容器高度
	  ,url:path_way.classReport1
	  ,page:false
	  ,cols: [[
	  			{field:'className',sort: true,title:'班级'},
	  			{field:'totalRequiredClassHour',sort: true,title:'应开必修实验课时'},
	  			{field:'realRequiredClassHour',sort: true,title:'已开必修实验课时'},
				{field:'requiredRate',sort: true,title:'必修实验完成率'},
				{field:'totalDemoClassHour',sort: true,title:'应开演示实验课时'},
	  			{field:'realDemoClassHour',sort: true,title:'已开演示实验课时'},
				{field:'demoRate',sort: true,title:'演示实验完成率'},
	  ]]//设置表头  
	};

     var option2 = {
	  elem: '#courseReport' 
	  ,even: true
	  ,limits: [20]
  	  ,limit: 20 //默认采用20
	  ,height:"full-20" //容器高度
	  ,url:path_way.classReport2
	  ,page:false
	  ,cols: [[
	  			{field:'course',sort: true,title:'学科'},
	  			{field:'totalRequiredClassHour',sort: true,title:'应开必修实验课时'},
	  			{field:'realRequiredClassHour',sort: true,title:'已开必修实验课时'},
				{field:'requiredRate',sort: true,title:'必修实验完成率'},
				{field:'totalDemoClassHour',sort: true,title:'应开演示实验课时'},
	  			{field:'realDemoClassHour',sort: true,title:'已开演示实验课时'},
				{field:'demoRate',sort: true,title:'演示实验完成率'},
	  ]]//设置表头  
	};

 layui.use(['laypage', 'layer', 'table','form','element'], function(){
	
   var laypage = layui.laypage //分页
  ,layer = layui.layer //弹层
  ,table = layui.table //表格
  ,form = layui.form
  ,element = layui.element; //元素操作
  
  table.render(option1);
  element.on('tab(courseCharts)', function(data){
	if(this.getAttribute('lay-id')=='num1'){
		table.render(option1);
    }else if(this.getAttribute('lay-id')=='num2'){
        table.render(option2);
    }
  })
  })
})