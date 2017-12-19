$(function(){ 
	 rankingTop = [];
	 rankingLast = [];
	 schoolName1 = [];
	 schoolName2 = [];
	$.ajax({
		url:path_way.labInfo1,
		dataType:"json",
		type:"get",
		asyn:false,
		success:function(data){
			var dataList = data.data;			
			var str = "";
			for(var i=0;i<10;i++){
				rankingTop.push(dataList[i].useRatio);
				schoolName1.push(dataList[i].organName);
			};
			for(var x=10;x<20;x++){
				rankingLast.push(dataList[x].useRatio);
				schoolName2.push(dataList[x].organName);
			};
			// alert(schoolName2);
			for(var j in dataList){
				str += "<div class='contentBox'>"+				
						"<div class='border-left'></div>"+
						"<div class='border-bottom'></div>"+
						"<div class='border-top'></div>"+
						"<div class='border-right'></div>"+
						"<ul class='infoList'>"+
							"<li>"+dataList[j].rank+"</li>"+
							"<li style='color:#009688;'>"+dataList[j].organName+"</li>"+
							"<li>"+dataList[j].organType+"</li>"+
							"<li>"+dataList[j].labNumber+"</li>"+
							"<li>"+dataList[j].useRatio+"%</li>"+
							"<li class='alertMore'><button class='layui-btn layui-btn-radius'>查看更多</button></li>"+
						"</ul>"+
					"</div>";
			}
			$("#useList").html(str);
				var lanren_width = $('#useList').find('.contentBox').width();
			// alert(lanren_width);
			var lanren_height =$('#useList').find('.contentBox').height();
			$('#useList').find('.contentBox').hover(function(){
					$(this).find('.layui-btn').css("color","#009688");
					$(this).find(".infoList li").css("fontWeight","bold");
					$(this).find('.border-left,.border-right').stop().animate({height:lanren_height+'px'},600);
					$(this).find('.border-top,.border-bottom').stop().animate({width:lanren_width+'px'},600);
				},function(){
					$(this).find('.border-left,.border-right').stop().animate({height:'0'},600);
					$(this).find('.border-top,.border-bottom').stop().animate({width:'0'},600);
					$(this).find('.layui-btn').css("color","#666666");
					$(this).find(".infoList li").css("fontWeight","normal");
				});
				
			var myChart = echarts.init(document.getElementById('ranking10'));
		var option1 = {
			tooltip: {
				trigger: 'axis',
				axisPointer: { // 坐标轴指示器，坐标轴触发有效
					type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
				},
			},
			legend: {
				data: ['实验室利用率']
			},
			toolbox: {
				show: true,
				feature: {
					dataView: {
						show: true,
						readOnly: false
					},
					magicType: {
						show: true,
						type: ['line', 'bar']
					},
					restore: {
						show: true
					},
					saveAsImage: {
						show: true
					}
				}
			},
			calculable: true,
			grid: {
				borderWidth: 0,
				x: 50,
				y: 40,
				y2: 30,
				x2: 10,
				backgroundColor: 'rgba(252,252,252,0.8)'
			},
			xAxis: [{
				splitLine: {
					show: true,
					lineStyle: {
						color: ['#f1f1f1']
					}
				},
				type: 'category',
				data: schoolName1
			}],
			yAxis: [{
				splitLine: {
					show: true,
					lineStyle: {
						color: ['#f1f1f1']
					}
				},
				 axisLabel : {
                	formatter: '{value} %'
           		 },
				type: 'value'
			}],
			series: [{
					name: '实验室利用率',
					type: 'bar',
					barMaxWidth:35,
					data: rankingTop,
					itemStyle: {
						normal: {
							color: '#009688',
						}
					}
				}
			]
		}
	myChart.setOption(option1);


var myChart2 = echarts.init(document.getElementById('ranking10Last'));
		var option2 = {
			tooltip: {
				trigger: 'axis',
				axisPointer: { // 坐标轴指示器，坐标轴触发有效
					type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
				},
			},
			legend: {
				data: ['实验室利用率']
			},
			toolbox: {
				show: true,
				feature: {
					dataView: {
						show: true,
						readOnly: false
					},
					magicType: {
						show: true,
						type: ['line', 'bar']
					},
					restore: {
						show: true
					},
					saveAsImage: {
						show: true
					}
				}
			},
			calculable: true,
			grid: {
				borderWidth: 0,
				x: 50,
				y: 40,
				y2: 30,
				x2: 10,
				backgroundColor: 'rgba(252,252,252,0.8)'
			},
			xAxis: [{
				splitLine: {
					show: true,
					lineStyle: {
						color: ['#f1f1f1']
					}
				},
				type: 'category',
				data: schoolName2
			}],
			yAxis: [{
				splitLine: {
					show: true,
					lineStyle: {
						color: ['#f1f1f1']
					}
				},
				 axisLabel : {
                	formatter: '{value} %'
           		 },
				type: 'value'
			}],
			series: [{
					name: '实验室利用率',
					type: 'bar',
					barMaxWidth:35,
					data: rankingLast,
					itemStyle: {
						normal: {
							color: '#99cccc',
						}
					}
				}
			]
		}
	myChart2.setOption(option2);	
	
		
layui.use(['laypage', 'layer', 'table','form','element'], function(){
	
   var laypage = layui.laypage //分页
  ,layer = layui.layer //弹层
  ,table = layui.table //表格
  ,form = layui.form
  ,element = layui.element; //元素操作
  
  $(".alertMore").on("click",function(){
	  	parent.layer.open({
    		type: 2,
    		title: ["视频回看","font-size:18px"], //不显示标题栏   title : false/标题
	      	area: ['650px','600px'],
	      	shade: 0.8,
	      	anim:2,
	      	skin: 'layui-layer-lan',
	      	maxmin:true,
	     	id: '222', //设定一个id，防止重复弹出
	      	resize: false,
	     	moveType: 1, //拖拽模式，0或者1
	     	content:'./alertInfo/disEduBur/labInfo.html',
			success:function(layero,index){
				var iframeWin = parent.parent.window[layero.find('iframe')[0]['name']];
					$.ajax({
						 url:path_way.labInfo2,
						 type:"get",
						 dataType:"json",
						 success:function(data){
							 var appUrl = data.playParam.appUrl;
							 var devKey = data.playParam.devKey;
							 var password = data.playParam.password;
							 var serverIp = data.playParam.serverIp;
							 var serverPort = data.playParam.serverPort;
							 var userName = data.playParam.userName;
							 iframeWin.DbsIP = serverIp;
							 iframeWin.DbsPort = serverPort;
							 iframeWin.PlatformUserName = userName; 
							 iframeWin.PlatfromUserPwd = password; 
							 iframeWin.ChannelID = devKey;
							 iframeWin.StartVideo();	

						 }

					 })
			}
		  })
  })

	
 });
	
		}
	})
})
