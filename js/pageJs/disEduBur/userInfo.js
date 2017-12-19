$(function(){  		
	$.ajaxSetup({
		cache: false
	});
	var option1 = {
	  elem: '#userInfo' 
	  ,even: true
	  ,limits: [20,30,50]
  	  ,limit: 20 //默认采用20
	  ,height:"full-150" //容器高度
	  ,url:path_way.allUserInfo1
	  ,page:true
	  ,cols: [[
	  			{field:'schoolName',title:'组织机构'},
	  			{field:'userName',sort: true,title:'账户'},
	  			{field:'userPwd',title:'密码',templet:"#PSW"},
	  			{field:'trueName',title:'姓名'},
	  			{field:'resign',title:'角色',},
	  			{field:'contactWay',title:'联系方式'},
	  			{fixed: 'right',width:200,align:'center', toolbar: '#barDemo',title:'操作'}
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
 
    		var schoolName=obj.data.schoolName;
      		var userName = obj.data.userName;
      		var userPwd = obj.data.userPwd;
      		var trueName = obj.data.trueName;
      		var resign = obj.data.resign;
      		var contactWay = obj.data.contactWay;
      		
      		parent.layer.open({
    		type: 2,
    		title: ["+新建信息","font-size:16px"], //不显示标题栏   title : false/标题
	      	area: ['400px','460px'],
	      	shade: 0.8,
	      	anim:2,
	      	skin: 'layui-layer-lan',
	      	maxmin:true,
	     	id: 'PeopleInfo', //设定一个id，防止重复弹出
	      	resize: false,
	     	moveType: 1, //拖拽模式，0或者1
	     	content:'./alertInfo/disEduBur/createPeopleInfo.html',
	     	success:function(layero, index){
	     		var iframeWin = parent.parent.window[layero.find('iframe')[0]['name']];
				iframeWin.$("#Organization").attr("value",schoolName);
				iframeWin.$("#Account").attr("value",userName);
				iframeWin.$("#password").attr("value","******");
				iframeWin.$("#peopleName").attr("value",trueName);
				iframeWin.$("#contactWay").attr("value",contactWay);
				
				var index = parent.layer.getFrameIndex(window.name);
				iframeWin.$("#laySubmit").click(function(){
					if(iframeWin.$("#Organization").val()==""){

					}else if(iframeWin.$("#Account").val()==""){

					}else if(iframeWin.$("#password").val()==""){

					}else if(iframeWin.$("#peopleName").val()==""){
		
					}else if(iframeWin.$("#position").val()==""){
				
					}else if(iframeWin.$("#contactWay").val()==""){
						
					}else{
						$.ajax({
						type:"get",
						url:path_way.allUserInfo2,
						dataType:"json",
						data:iframeWin.$("#peopleCreate").serialize(),
						success:function(data){							
							
							table.reload("userInfo",{});
							
							parent.layer.closeAll('iframe');
						}
					});
				}
					
			})
				
	     	}
    	});
   	
    }
    
//  添加
	$("#newBuild").click(function(){	     		
      		parent.layer.open({
    		type: 2,
    		title: ["+新建信息","font-size:16px"], //不显示标题栏   title : false/标题
	      	area: ['400px','460px'],
	      	shade: 0.8,
	      	anim:2,
	      	skin: 'layui-layer-lan',
	      	maxmin:true,
	     	id: 'addInfo', //设定一个id，防止重复弹出
	      	resize: false,
	     	moveType: 1, //拖拽模式，0或者1
	     	content:'./alertInfo/disEduBur/createPeopleInfo.html',
	     	success:function(layero, index){
	     		var iframeWin = parent.parent.window[layero.find('iframe')[0]['name']];
				
				iframeWin.$("#laySubmit").click(function(){
					if(iframeWin.$("#Organization").val()==""){

					}else if(iframeWin.$("#Account").val()==""){

					}else if(iframeWin.$("#password").val()==""){

					}else if(iframeWin.$("#peopleName").val()==""){
		
					}else if(iframeWin.$("#position").val()==""){
				
					}else if(iframeWin.$("#contactWay").val()==""){
						
					}else{
						$.ajax({
						type:"get",
						url:"../../datas/sUser.json",
						dataType:"json",
						data:iframeWin.$("#peopleCreate").serialize(),
						success:function(data){							
							
							table.reload("userInfo",{});
							
							parent.layer.closeAll('iframe');
						}
					});
				}
					
			})
				
	     	}
    	});
   	
    
	})

    
    
    
  });
	
	
 });
})
