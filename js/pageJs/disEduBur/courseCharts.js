$(function(){  
    // alert("!11");
	var option1 = {
	  elem: '#courseCharts' 
	  ,even: false
	  ,limits: [20]
  	,limit: 20 //默认采用20
	  ,height:"full-60" //容器高度
	  ,url:path_way.courseCharts
	  ,page:false
	  ,cols: [[
	  			{field:'dayNo',fixed: true,title:''},
	  			{field:'week1',title:'周一',templet:"#labContent1"},
          {field:'week2',title:'周二',templet:"#labContent2"},
          {field:'week3',title:'周三',templet:"#labContent3"},
          {field:'week4',title:'周四',templet:"#labContent4"},
          {field:'week5',title:'周五',templet:"#labContent5"}
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
    if(layEvent === 'returnWatch'){
          	parent.layer.open({
            type: 2,
            title: ["+课堂详情","font-size:16px"], //不显示标题栏   title : false/标题
            area: ['1000px','600px'],
            shade: 0.8,
            anim:2,
            skin: 'layui-layer-lan',
            maxmin:true,
            id: 'nBuild', //设定一个id，防止重复弹出
            resize: false,
            moveType: 1, //拖拽模式，0或者1
            content:'./alertInfo/disEduBur/seeVideo.html',
            success:function(layero,index){	  
            }
        })
    }
  });

   
 });

    var $this = $(".scrollNews");
		var scrollTimer;
    $this.find("li a").removeClass("scrollStyle").eq(4).addClass("scrollStyle");
		$this.hover(function(){
			  clearInterval(scrollTimer);
		 },function(){
		   scrollTimer = setInterval(function(){
						 scrollNews( $this );
					}, 3000 );
		}).trigger("mouseleave");
})

function scrollNews(obj){
   var $self = obj.find("ul:first"); 
   var lineHeight = $self.find("li:first").height(); //获取行高
   $self.find("li a").removeClass("scrollStyle").eq(5).addClass("scrollStyle");
   $self.animate({ "marginTop" : -lineHeight +"px" }, 1000 , function(){
         $self.css({marginTop:0}).find("li:first").appendTo($self); //appendTo能直接移动元素
   })
}

