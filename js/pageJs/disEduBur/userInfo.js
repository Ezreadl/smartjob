$(function(){  		
	$.ajaxSetup({
		cache: false
	});
	var option1 = {
	  elem: '#userInfo1' 
	  ,even: true
	  ,limits: [20,30,50]
  	  ,limit: 20 //默认采用20
	  ,height:"full-120" //容器高度
	  ,url:'../../datas/sUser.json'
	  ,page:true
	  ,cols: [[
	  			{field:'schoolName',title:'学校名称'},
	  			{field:'schoolAccount',sort: true,title:'巡查员账户'},
	  			{field:'schoolpsw',title:'密码'},
	  			{field:'userName',title:'姓名'},
	  			{field:'position',title:'职务',},
	  			{field:'contactWay',title:'联系方式'},
	  			{fixed: 'right', align:'center', toolbar: '#barDemo',title:'操作'}
	  ]]//设置表头  
	};
	
	var option2 = {
		elem: '#userInfo2' 
	  ,even: true
	  ,limits: [20,30,50]
  	  ,limit: 20 //默认采用20
	  ,height:"full-120" //容器高度
	  ,url:'../../datas/sUser1.json'
	  ,page:true
	  ,cols: [[
	  			{field:'schoolName',title:'学校名称'},
	  			{field:'schoolAccount',sort: true,title:'学校管理员账户'},
	  			{field:'schoolpsw',title:'密码'},
	  			{field:'userName',title:'姓名'},
	  			{field:'position',title:'职务',},
	  			{field:'contactWay',title:'联系方式'},
	  			{fixed: 'right', align:'center', toolbar: '#barDemo',title:'操作'}
	  ]]//设置表头  
	};
	
	var option3={
	  elem: '#userInfo3' 
	  ,even: true
	  ,limits: [20,30,50]
  	  ,limit: 20 //默认采用20
	  ,height:"full-120" //容器高度
	  ,url:'../../datas/sUser.json'
	  ,page:true
	  ,cols: [[
	  			{field:'schoolName',title:'学校名称'},
	  			{field:'schoolAccount',sort: true,title:'实验员账户'},
	  			{field:'schoolpsw',title:'密码'},
	  			{field:'userName',title:'姓名'},
	  			{field:'position',title:'职务',},
	  			{field:'contactWay',title:'联系方式'}
//	  			{fixed: 'right', align:'center', toolbar: '#barDemo',title:'操作'}
	  ]]//设置表头  
	};
	
	var option4={
	  elem: '#userInfo4' 
	  ,even: true
	  ,limits: [20,30,50]
  	  ,limit: 20 //默认采用20
	  ,height:"full-120" //容器高度
	  ,url:'../../datas/sUser.json'
	  ,page:true
	  ,cols: [[
	  			{field:'schoolName',title:'学校名称'},
	  			{field:'schoolAccount',sort: true,title:'实验监督员账户'},
	  			{field:'schoolpsw',title:'密码'},
	  			{field:'userName',title:'姓名'},
	  			{field:'position',title:'监督学校类型',},
	  			{field:'contactWay',title:'联系方式'}
//	  			{fixed: 'right', align:'center', toolbar: '#barDemo',title:'操作'}
	  ]]//设置表头  
	};
	
	var option5={
	  elem: '#userInfo5' 
	  ,even: true
	  ,limits: [20,30,50]
  	  ,limit: 20 //默认采用20
	  ,height:"full-120" //容器高度
	  ,url:'../../datas/sUser.json'
	  ,page:true
	  ,cols: [[
	  			{field:'schoolName',title:'学校名称'},
	  			{field:'schoolAccount',sort: true,title:'教师账户'},
	  			{field:'schoolpsw',title:'密码'},
	  			{field:'userName',title:'姓名'},
	  			{field:'position',title:'所教学科',},
	  			{field:'contactWay',title:'联系方式'}
//	  			{fixed: 'right', align:'center', toolbar: '#barDemo',title:'操作'}
	  ]]//设置表头  
	}
	
layui.use(['laypage', 'layer', 'table','form','element'], function(){
	
   var laypage = layui.laypage //分页
  ,layer = layui.layer //弹层
  ,table = layui.table //表格
  ,form = layui.form
  ,element = layui.element; //元素操作
  
  table.render(option1);
  element.on('tab(docDemoTabBrief)', function(data){
	if(this.getAttribute('lay-id')=='num1'){
		table.render(option1);
	}else if(this.getAttribute('lay-id')=='num2'){
		table.render(option2);		
	}else if(this.getAttribute('lay-id')=='num3'){
		table.render(option3);		
	}else if(this.getAttribute('lay-id')=='num4'){
		table.render(option4);		
	}else{
		table.render(option5);	
	}
		
});
	
	//监听工具条
  table.on('tool(test)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
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
	
	
 });
})
