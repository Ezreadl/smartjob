//定义全局变量
var project_path='/shiyan';
var _icon_ok = project_path +"/images/icon/accept.png";
var _icon_cancel = project_path + "/images/icon/cancel.png";
var groupicon = project_path+"/images/icon/communication.gif";
var saveIcon=project_path + "/images/icon/accept.png";
var cancelIcon=project_path + "/images/icon/cancel.png";
var searchIcon=project_path+"/images/icon/zoom.png";
var upSwf=project_path+'/uploadify/uploadify.swf';
Date.prototype.format = function(fmt) { 
    var o = { 
       "M+" : this.getMonth()+1,                 //月份 
       "d+" : this.getDate(),                    //日 
       "h+" : this.getHours(),                   //小时 
       "m+" : this.getMinutes(),                 //分 
       "s+" : this.getSeconds(),                 //秒 
       "q+" : Math.floor((this.getMonth()+3)/3), //季度 
       "S"  : this.getMilliseconds()             //毫秒
   }; 
   if(/(y+)/.test(fmt)) {
           fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
   }
    for(var k in o) {
       if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
   return fmt; 
}
//在父窗体上打开div window窗口
function _openWindow(url,title,width,height,level){
	if(!title){
		title="窗口";
	}
	if(!width){
		width=800;
	}
	if(width.indexOf('%')>=0){
		var screenW=top.document.documentElement.clientWidth | top.document.body.clientWidth;
		var percent=parseFloat(width.substring(0,width.indexOf('%')));
		width=screenW * percent/100;
	}
	if(!height){
		height=500;
	}
	if(height.indexOf('%')>=0){
		var screenH=top.document.documentElement.clientHeight | top.document.body.clientHeight;
		var percent=parseFloat(height.substring(0,height.indexOf('%')));
		height=screenH * percent/100;
	}
	if(!level){
		level=0;
	}
	$.ligerWindow.show({ url:url,title:title, width:width, height: height});
}
//暂未实现，关闭 有问题
function _closeWindow(level){

}
//定义通用方法
var qm={
	//打开div窗口，除url，其他字段非必须,level表示层级，对于需要同时打开多个window的情况需要设置不通的level，响应的关闭窗口也需要对于的level
	openWindow : function(url,title,width,height,level){
		return top._openWindow(url,title,width,height,level);
	},
	//关闭div窗口 
	closeWindow : function (level){
		top._closeWindow(level);
	},
	//消息提示
	messageInfo : function(content,title,func){
		if(!title){
			title = "提示";
		}
		top.$.ligerDialog.alert(content,title,'success',func);
	},
	//消息警告
	messageAlert : function(content,title,func){
		if(!title){
			title = "警告";
		}
		top.$.ligerDialog.alert(content,title,'warn',func);
	},
	//消息错误
	messageError : function(content,title,func){
		if(!title){
			title = "错误";
		}
		top.$.ligerDialog.alert(content,title,'error',func);
	},
	//确认提示
	messageConfirm : function (content,func){
		top.$.ligerDialog.confirm(content, func);
	},
	//获取当前页面百分比宽度
	getPercentWidth : function (percent,defualt){
		var width=document.documentElement.clientWidth | document.body.clientWidth;
		if(!width){
			if(defualt){
				return defualt;
			}else{
				return 800;
			}
		}
		return width*percent/100;
	},
	//获取当前页面百分比高度
	getPercentHeight : function (percent,defualt){
		var height=top.document.documentElement.clientHeight | top.document.body.clientHeight;
		if(!height){
			if(defualt){
				return defualt;
			}else{
				return 500;
			}
		}
		return height*percent/100;
	},
	//获取屏幕页面百分比宽度
	getScreenPercentWidth : function (percent,defualt){
		var width=top.document.documentElement.clientWidth | top.document.body.clientWidth;
		if(!width){
			if(defualt){
				return defualt;
			}else{
				return 800;
			}
		}
		return width*percent/100;
	},
	//获取屏幕页面百分比高度
	getScreenPercentHeight : function (percent,defualt){
		var height=top.document.documentElement.clientHeight | top.document.body.clientHeight;
		if(!height){
			if(defualt){
				return defualt;
			}else{
				return 800;
			}
		}
		return height*percent/100;
	},
	//获取距离当天dif天时间段，返回{startTime:'',endTime:''},origin是否从当前开始倒推24小时
	getDayDiff : function (dif,origin){
		var d = new Date();
		if(origin){
			if(!isNaN(dif)){
				d.setDate(d.getDate()+dif-1);
			}

			var t={
				timeStart:d.format('yyyy-MM-dd hh:mm'),
				timeEnd:new Date().format('yyyy-MM-dd hh:mm')
			};
			return t;
		}else{
			if(!isNaN(dif)){
				d.setDate(d.getDate()+dif);
			}
			var t={
				timeStart:new Date(d.getFullYear(),d.getMonth(),d.getDate(),0,0,0).format('yyyy-MM-dd hh:mm'),
				timeEnd:new Date(d.getFullYear(),d.getMonth(),d.getDate(),23,59,59).format('yyyy-MM-dd hh:mm')
			};
			return t;
		}
	},
	//获取距离当天dif月时间段，返回{startTime:'',endTime:''}
	getMonthDiff : function (dif){
		var d = new Date();
		if(dif && !isNaN(dif)){
			d.setDate(d.getMonth()+dif);
		}
		var d1 = new Date(d.getFullYear(),d.getMonth(),d.getDate());
		d1.setDate(1);
		var d2 = new Date();
		var nextMonth=d.getMonth()+1;
		d2 = new Date(d.getFullYear(),nextMonth,1);
		d2 = new Date(d2.getTime()-(1000*60*60*24));
		var t={
			timeStart:new Date(d.getFullYear(),d.getMonth(),d.getDate(),0,0,0).format('yyyy-MM-dd hh:mm'),
			timeEnd:new Date(d.getFullYear(),d.getMonth(),d.getDate(),23,59,59).format('yyyy-MM-dd hh:mm')
		};
		return t;
	},
	//获取列表对象选中oids
	getGridSelections : function(grid){
		var ids = [];
		var rows = grid.getSelectedRows();
		for(var i=0;i<rows.length;i++){
			ids.push(rows[i].oid);
		}
		return ids;
	},
	//获取单独url地址(带oid主键，将oid拼接到url地址中oid=)，如果没有选择或选择多条，返回空
	getGridSingleUrl : function (grid,url){
		var flg=url.indexOf("?")==-1?"?":"&";
		url+=flg+"timestamp="+(new Date()).getTime();
		var ids=qm.getGridSelections(grid);
		if(ids.length<=0){
			qm.messageAlert('请选择一条记录!');
			return "";
		}else if(ids.length>1){
			qm.messageAlert('请不要选择多条记录!');
			return "";
		}else{
			url+="&oid="+ids.join(",");
		}
		return url;
	},
	//获取多条 url地址(带ids主键组,将oid拼接到url地址中oids=)，如果没有选择，返回空
	getGridMutiUrl : function (grid,url){
		var flg=url.indexOf("?")==-1?"?":"&";
		url+=flg+"timestamp="+(new Date()).getTime();
		var ids=qm.getGridSelections(grid);
		if(ids.length<=0){
			qm.messageAlert('请至少选择一条记录!');
			return "";
		}else{
			url+="&oids="+ids.join(",");
		}
		return url;
	},
	//加载查看窗口
	loadViewWin : function (grid,url,title,width,height){
		url=qm.getGridSingleUrl(grid,url);
		if(url.length<1) return;
		return qm.openWindow(url,title,width,height);
	},
	//加载编辑窗口
	loadEditWin : function (grid,url,title,width,height){
		url=qm.getGridSingleUrl(grid,url);
		if(url.length<1) return;
		return qm.openWindow(url,title,width,height);
	},
	//加载新增窗口
	loadAddWin : function (grid,url,title,width,height){
		var flg=url.indexOf("?")==-1?"?":"&";
		url+=flg+"id=-1&timestamp="+(new Date()).getTime();
		return qm.openWindow(url,title,width,height);
	},
	//转换列表记录状态，并刷新列表
	toggleGridItemState : function (grid,url,title){
		var ids=qm.getGridSelections(grid);
		if(ids.length<=0){
			qm.messageAlert('请至少选择一条记录!');
			return ;
		}else{
			qm.messageConfirm('您确定要将这 '+ids.length+' 项记录'+title+'吗?',function(b){
				if(b){
					$.post(url,{oids:ids.join(',')},function(data){
						qm.dealResult(data);
						grid.reload();
					});
				}
			});
		}
	},
	//加载表单数据
	loadFormData : function(editform,url){
		$.ajax({
			cache: false,
			type: "POST",
			url:url,
			async: false,
			success: function(ret) {
				if(ret.state!=1){//后台返回异常数据
					qm.dealResult(ret);
				}else{
					editform.setData(ret.data);//正常情况设置表单数据
				}
			}
		});
	},
	//处理返回结果state表示返回状态,1成功,2未登录,3操作异常
	dealResult : function (ret,func){
		try{
			if(typeof(ret)=='string'){
				ret=eval('('+ret+')');
			}
			if(ret.state==1){
				var msage ="操作成功！";
				if(ret.msg){
					msage = ret.msg;
				}
				qm.messageInfo(msage,'提示',function(){
					if(func){
						func.call(this,ret);
					}
				});
			}else if(ret.state==3){
				qm.messageError('操作失败!<br/>'+ret.msg,'错误',function(){
					if(func){
						func.call(this,ret);
					}
				});
			}else if(ret.state==2){
				qm.messageError("session过期,请重新登录系统!",'登录超时',function(){
					if(func){
						func.call(this,ret);
					}
					qm.loginAgin();//重新登录
				});
			}else{
				qm.messageAlert('<br/>'+ret.msg,'提示',function(){
					if(func){
						func.call(this,ret);
					}
				});
			}
		}catch(e){
			alert("处理异常！");
		}
	},

	//重新登录
	loginAgin : function (){
		top.location.href=project_path;
	},
	//提交保存表单数据
	lastSave:null,
	saveData : function (url,data,callBack){
		var nows=(new Date()).getTime();
		//间隔1秒才能再次提交数据
		if(qm.lastSave==null || qm.lastSave<(nows-1000)){
			qm.lastSave=nows;
			$.ajax({
				cache: false,
				type: "POST",
				url:url,
				data:data,
				async: true,
				success: function(ret) {
					qm.dealResult(ret,callBack);
				},
				error:function(ret){
					qm.dealResult(ret.responseText,callBack);
				}
			});
		}
	},
    //提交导出表单数据url
    exportData:function (url,data) {
        $.ajax({
            cache: false,
            type: "POST",
            url:url,
            data:data,
            async: true,
            success: function(ret) {
                qm.dealResult(ret);
            },
            error:function(ret){
                qm.dealResult(ret.responseText);
            }
        });
    },
	//获取表单无编码json数据，fm可以为formId字符串或原始form对象
	getFormPureJson : function (fm){
		if(typeof(fm)=='string'){
			fm=document.getElementById(fm);
		}
		var obj={};
		var c={};
		for(var i=0;i<fm.length;i++){
			if(fm[i].name && fm[i].name!="undefined"){
				var name=fm[i].name;
				if(fm[i].type=='checkbox'){
					if(fm[i].checked=='checked' || fm[i].checked==true){
						fm[i].value=1;
					}else{
                        fm[i].value=0;
					}
				}
				if(fm[i].value=='' || fm[i].value=='undefined'){
					continue;
				}
				if(obj[name]!=undefined){//多相同字段情况
					if(c[name]==undefined){
						obj[name]=[obj[name]];//改为数组，并存入第一个值
						c[name]=true;
					}
					obj[name].push(fm[i].value);
				}else{//单相同字段情况
					obj[name]=fm[i].value;
				}
			}
		}
		return obj;
	},
	//绑定回车键
	bindEnter : function (obj,func){
		if(typeof(obj)=='string'){
			obj=$("#"+id);
		}
		try{
			obj.bind('keydown',function(e){
		    	var e=e||event;
				var key=e.keyCode||e.which||e.charCode;
				if(key==13){
					func();
					e.preventDefault();
				}
		    });
		}catch(e1){};
	},
	getUrlSerialize:function(href){//获取url地址后的参数,&拼接格式返回
		if(!href){
			href=location.href;
		}
		var idx=href.indexOf("?");
		if(idx<0){
			return '';
		}
		return href.substring(idx+1);
	},
	getUrlParams:function(href,decode){//获取url地址后的参数，以对象形式返回,decode是否解码(默认不解码)
		var obj={};
		if(!href){
			href=decodeURIComponent(location.href);
		}
        // if(decode){
        //     href=decodeURIComponent(href);//解码
        // }
		var idx=href.indexOf("?");
		if(idx<0){
			return obj;
		}
		var p=href.substring(idx+1);
		var arr=p.split("&");
		var c={};
		for(var i=0;i<arr.length;i++){
			var d=arr[i].split("=");
			var name=d[0];
			var value=d.length>=2?d[1]:'';
			if(value=='' || value=='undefined'){
				continue;
			}
			if(obj[name]!=undefined){//多相同字段情况
				if(c[name]==undefined){
					obj[name]=[obj[name]];//改为数组，并存入第一个值
					c[name]=true;
				}
				obj[name].push(value);
			}else{//单相同字段情况
				obj[name]=value;
			}
		}
		return obj;
	},
	// serialize:function(obj){//将obj对象序列化为url连接格式,如a=1&b=3，如果href不为空，则序列号到href后
	serialize:function(obj,encode,href){//将对象序列化为url连接格式,如a=1&b=3
		var s='';
		if(!obj){
			s='';
		}else if(typeof(obj)=='string'){
			s=obj;
		}else if(typeof(obj)=='object'){
			for(var o in obj){
				if(obj[o]=='' || obj[o]=='undefined' || obj[o]==null){
					continue;//没有值丢弃
				}
				var value=obj[o];
				if(encode){
					value=encodeURIComponent(value);
				}
				if(s==''){
					s=o+'='+value;
				}else{
					s=s+'&'+o+'='+value;
				}
			}
		}
		if(href){
			if(s!=''){
				var flg=href.indexOf('?')<0 ? '?' : '&';
				return href+flg+s;
			}else{
				return href;
			}
		}else{
			return s;
		}
	},
	//将href地址后参数赋值到ligerUi表单中，若href中没有的参数，默认使用def中的参数，返回去掉已经复制的参数对象
	applayUrl2Form : function(fm,def,serialize){
		var param=qm.getUrlParams();
		if(def){
			for(var o in def){
				if(param[o]==undefined){
					param[o]=def[o];
				}
			}
		}
		fm.setData(param);
		var fields=fm.getData(); 
		//删除已经赋值的参数
		for(var o in fields){
			delete param[o];
		}
		return param;
	},
	//在数组arr1第idx位置插入arr2,没有idx则插入到最后
	pushAll : function(arr1,arr2,idx){
		if(idx==undefined || idx>arr1.length){
			idx=arr1.length;
		}else if(idx<0){
			idx=0;
		}
		if(arr2){
			var len=arr1.length;
			for(var i=len-1;i>=idx;i--){
				arr1[i+arr2.length]=arr1[i];
			}
			for(var i=0;i<arr2.length;i++){
				arr1[idx+i]=arr2[i];
			}
		}
	}
};

//采集明细内容
function showGatherContent(gatherLogId){
	var url=project_path+'/view/sys/EquipGatherLogContent.html?oid='+gatherLogId+'&t='+(new Date()).getTime();
	qm.openWindow(url,"采集明细查看","78%","82%");
}
//采集明细
function renderGatherDetail(rowdata, index, value){
  return '<a href="javascript:;" onclick="showGatherContent('+rowdata["gatherLogId"]+')">查看</a>';
}
//渲染状态
//接口类型
function renderTrunkFlag(rowdata, index, value){
    if(value == 0){
        return '<span style="color:green">物理接口</span>';
    }else if(value == 1){
        return '<span style="color:green">Trunk接口</span>';
    }
}
//告警类型
function renderAlert(rowdata, index, value){
    if(value == 0){
        return '<span style="color:green">正常</span>';
    }else if(value == 1){
        return '<span style="color:#e839d1">1级告警</span>';
    }else if(value==2){
        return '<span style="color:#3e4fcf">2级告警</span>';
    }else if(value == 3){
        return '<span style="color:#138219">3级告警</span>';
    }else if(value == 4){
        return '<span style="color:#248219">4级告警</span>';
    }
    return '-';
}
//显示告警处置结果
function showDealState(alertDealId){
	var url=project_path+"/view/nms/AlertDealRecordView.html?oid="+alertDealId+"&t="+(new Date()).getTime();
	qm.openWindow(url, title, width, height, level);
}
//告警处置结果状态
function renderDealState(rowdata, index, value){
    if(value == 0){
        return '<span style="color:red;">未处置</span>';
    }else if(value == 1){
        return '<a style="color:green;" href="javascript:;" onclick="showDealState('+rowdata.alertDealId+')">结果正常</a>';
    }else if(value == 2){
        return '<span style="color:red; href="javascript:;" onclick="showDealState('+rowdata.alertDealId+')">结果不正常</a>';
    }else if(value == 3){
        return '无需处理';
    }
    return '-';
}
//掉包告警
function renderLostAlertLevel(rowdata, index, value){
    if(value == 0){
        return '<span style="color:green;">正常</span>';
    }else if(value >= 1){
        return '<span style="color:red;">告警</span>';
    }
    return '-';
}
//延时告警
function renderDelay(rowdata, index, value){
    if(value == 0){
        return '<span style="color:green;">正常</span>';
    }else if(value >= 1){
        return '<span style="color:red;">告警</span>';
    }
    return '-';
}
//告警状态改变
function renderAlertSwitch(rowdata, index, value){
    if(value == 1){
        return '<span style="color:green;">状态改变</span>';
    }else if(value == 0){
        return '<span style="color:red;">状态未变</span>';
    }
    return '-';
}
//预约告警
function renderAlertSubscribe(rowdata, index, value){
    if(value == 1){
        return '<span style="color:green;">是</span>';
    }else if(value == 0){
        return '<span style="color:red;">否</span>';
    }
}
//掉包/收包
function renderLostPackFlg(rowdata, index, value){
    if(value == 0){
        return '<span style="color:red;">掉包</span>';
    }else if(value == 1){
        return '<span style="color:green;">收包</span>';
    }
    return '-';
}
//启用/停用
function renderStateFlg(rowdata, index, value){
    if(value == 0){
        return '<span style="color:green;">启用</span>';
    }else if(value == 1){
        return '<span style="color:red;">停用</span>';
    }
    return '-';
}
//发送短信（pingtarget）
function renderSendMsgFlg1(rowdata, index, value){
    if(value == 0){
        return '<span style="color:green;">需要发送</span>';
    }else if(value == 1){
        return '<span style="color:red;">不发送</span>';
    }
    return '-';
}
//发送短信标志(equipinterface)
function renderSendMsgFlg2(rowdata, index, value){
    if(value == 0){
        return '<span style="color:red;">不发送</span>';
    }else if(value == 1){
        return '<span style="color:green;">发送</span>';
    }
    return '-';
}
//是否告警
function renderWarn(rowdata, index, value){
    if(value == 0){
        return '<span style="color:red;">不告警</span>';
    }else if(value == 1){
        return '<span style="color:green;">告警</span>';
    }
    return '-';
}
//进、出口带宽利用率告警  进、出口流量偏差告警
function renderInBwLevel(rowdata, index, value){
    if(value == 0){
        return '<span style="color:green;">正常</span>';
    }else if(value == 1){
        return '<span style="color:red;">告警</span>';
    }
}
//日期属性
function renderCtype(rowdata, index, value){
    if(value == 0){
        return '<span style="color:green;">日常</span>';
    }else if(value == 1){
        return '<span style="color:green;">周末</span>';
    }else if(value == 2){
        return '<span style="color:red;">大假</span>';
    }
    return '-';
}

//前序、当前接口状态
function renderIfState(rowdata, index, value){
    if(value <=1 ){
        return '<span style="color:green;">正常启用</span>';
    }else if(value >=2){
        return '<span style="color:red;">暂停</span>';
    }else if(value >=3){
        return '<span style="color:red;">未准备好</span>';
    }else if(value >=4){
        return '<span style="color:red;">创建并开始</span>';
    }else if(value >=5){
        return '<span style="color:red;">创建并等待</span>';
    }else if(value >=6){
        return '<span style="color:red;">销毁</span>';
    }
    return '-';
}
//执行状态
function renderExeStatus(rowdata, index, value){
    if(value == 0){
        return '<span style="color:blue;">等待执行</span>';
    }else if(value == 1){
        return '<span style="color:red;">执行中</span>';
    }else if(value == 2){
        return '<span style="color:green;">执行完毕</span>';
    }
    return '-';
}
//设备分级
function renderEquipLevel(rowdata, index, value){
    if(value == 1){
        return '<span style="color:green;">1</span>';
    }else if(value == 2){
        return '<span style="color:green;">地市/RT</span>';
    }else if(value == 3){
        return '<span style="color:green;">3级</span>';
    }
    return '-';
}
//连接类型
function renderLoginLinkType(rowdata, index, value){
    if(value == 0){
        return '<span style="color:green;">直接登录</span>';
    }else if(value == 1){
        return '<span style="color:green;">通过中间设备登录</span>';
    }else if(value == 2){
        return '<span style="color:green;">执行完毕</span>';
    }
    return '-';
}
//端口号
function renderTelnetPort(rowdata, index, value){
    if(value == 22){
        return '<span style="color:green;">ssh</span>';
    }else if(value == 23){
        return '<span style="color:green;">telnet</span>';
    }
    return '-';
}
//指令下发特征指示
function renderTelnetWriteFea(rowdata, index, value){
    if(value == 0){
        return '<span style="color:green;">\\n</span>';
    }else if(value == 1){
        return '<span style="color:green;">\\r\\n</span>';
    }
    return '-';
}
//设备跳转需要的账号类型
function renderJumpAccount(rowdata, index, value){
    if(value == 0){
        return '<span style="color:green;">维护账号</span>';
    }else if(value == 1){
        return '<span style="color:green;">管理账号</span>';
    }
    return '-';
}
//指示ftp数据传输模式
function renderFtpMode(rowdata, index, value){
    if(value =="passive"){
        return '<span style="color:green;">被动模式</span>';
    }else if(value == "port"){
        return '<span style="color:green;">主动模式</span>';
    }
    return '-';
}
//指示ftps使用连接
function renderFtpImplicit(rowdata, index, value){
    if(value =="implicit"){
        return '<span style="color:green;">隐式</span>';
    }else if(value == "explicit"){
        return '<span style="color:green;">显示</span>';
    }
    return '-';
}
//snmp的版本号
function renderSnmpVersion(rowdata, index, value){
    if(value ==1){
        return '<span style="color:green;">版本1</span>';
    }else if(value == 2){
        return '<span style="color:green;">版本2c</span>';
    }else if(value == 3){
        return '<span style="color:green;">版本3</span>';
    }
    return '-';
}
//作业批次
function renderPlanId(rowdata, index, value){
    if(value == 0 ){
        return '<span style="color:red;">手动触发</span>';
    }else{
        return '<span style="color:green;">'+value+'</span>';
	}
}
//告警图标
function renderAlertImg(rowdata, index, value){
  if(value == 0){
      return '<span style="color:green">正常</span>';
  }else if(value >=1 && value<=4){
      return '<span style="color:red">告警</span>';
  }
  return '-';
}
//是否展开
function renderExpanded(rowdata, index, value) {
    if(value == 0){
        return '<span style="color:red">否</span>';
    }else if(value ==1 ){
        return '<span style="color:green">是</span>';
    }
    return '-';
}
//状态
function renderLogType(rowdata, index, value) {
    if(value == 0){
        return '<span style="color:red">告警</span>';
    }else if(value ==1 ){
        return '<span style="color:green">恢复</span>';
    }
    return '-';
}
//动作类型
function renderActionClass(rowdata, index, value) {
    if(value == 0){
        return '<span style="color:green">js</span>';
    }else if(value ==1 ){
        return '<span style="color:green">url</span>';
    }
    return '-';
}
//删除标记
function renderDelFlg(rowdata, index, value){
    if(value == 0){
        return '<span style="color:green">正常</span>';
    }else if(value ==1){
        return '<span style="color:red">删除</span>';
    }
    return '-';
}
//告警级别
function renderAlertLevel(rowdata, index, value) {
    if(value == 1){
        return '<span style="color:red">'+value+'</span>';
    }else if(value ==2){
        return '<span style="color:#FF7101">'+value+'</span>';
    }else if(value ==3){
        return '<span style="color:#F7F910">'+value+'</span>';
    }else if(value ==4){
        return '<span style="color:#0000FE">'+value+'</span>';
    }
    return '-';
}
//作业项目类型
function renderItemType(rowdata, index, value) {
    if(value == 6001){
        return '<span style="color:green">日常作业</span>';
    }else if(value ==6005){
        return '<span style="color:green">接口作业</span>';
    }else if(value ==6006){
        return '<span style="color:green">链路作业</span>';
    }else if(value ==6008){
        return '<span style="color:green">配置作业</span>';
    }
    return '-';
}
//项目类型EquipGathLog
function renderItemTypeLog(rowdata, index, value) {
    if(value == 6001){
        return '<span style="color:green">日常巡检</span>';
    }else if(value ==6002){
        return '<span style="color:green">日常巡检</span>';
    }else if(value ==6003){
        return '<span style="color:green">日常巡检</span>';
    }else if(value ==6005){
        return '<span style="color:green">接口作业</span>';
    }else if(value ==6006){
        return '<span style="color:green">链路作业</span>';
    }
    return '-';
}
//重复发送限制
function renderCycSend(rowdata, index, value) {
    if(value == 0){
        return '<span style="color:green">重复到恢复</span>';
    }else if(value ==1){
        return '<span style="color:green">重复到次数</span>';
    }else if(value ==2){
        return '<span style="color:green">不限制</span>';
    }
    return '-';
}
//显示变更明细
function showCfgChangeDetail(hisBakId,curBakId,cfgChangeId,equipId){
    // var url='../../view/nms/ConfigChangeDetail.html?hisBakId='+hisBakId+'&curBakId='+curBakId+'&cfgChangeId='+cfgChangeId+'&equipId='+equipId+'&t='+(new Date()).getTime();
    var url=project_path+'/view/nms/ConfigChangeDetail.html?hisBakId='+hisBakId+'&curBakId='+curBakId+'&cfgChangeId='+cfgChangeId+'&equipId='+equipId+'&t='+(new Date()).getTime();
	qm.openWindow(url,"配置变更对比明细",'94%','94%');
}

//渲染配置变更
function renderCfgChangeDetail(rowdata, index, value){
	// return '<a href="javascript:;" onclick="showCfgChangeDetail('+rowdata["hisBakId"]+','+rowdata["curBakId"]+','+rowdata["oid"]+','+rowdata["netAreaName"]+')">查看</a>';
    return '<a href="javascript:;" onclick="showCfgChangeDetail('+rowdata["hisBakId"]+','+rowdata["curBakId"]+','+rowdata["oid"]+','+rowdata["equipId"]+')">查看</a>';

}
//md5一致性
function renderMd5Equal(rowdata, index, value){
    if(value == 0){
        return '<span style="color:red">不相等</span>';
    }else if(value == 1  ){
        return '<span style="color:green">相等</span>';
    }
    return '-';
}
//解决浏览器缓存
function timeStamp(url){
    var getTimestamp=new Date().getTime();
    if((url.indexOf("?"))==-1){
        url=url+"?t="+getTimestamp;
	}else{
        url=url+"&t="+getTimestamp;
	}
    return url;
}
//显示深度巡检告警处置界面
function showBaseAlertDeal(equipId,itemId){
    var url=project_path+"/view/nmshome/BaseCheckAlertDeal.html?equipId="+equipId+"&itemId="+itemId+"&t="+(new Date()).getTime();
    qm.openWindow(url,"深度巡检告警处置","95%","93%");
}
//显示接口告警处置界面====
function showEquipInterAlertDeal(equipId,equipIfId){
	var url=project_path+"/view/nmshome/EquipInterfaceAlertDeal.html?trunkNo=0&equipId="+equipId+"&equipIfId="+equipIfId+"&t="+(new Date()).getTime();
	qm.openWindow(url,"接口流量告警处置","95%","93%");
}
//显示链路告警处置界面
function showEquipLinkAlertDeal(equipId,linkId){
	var url=project_path+"/view/nmshome/LinkAlertDeal.html?equipId="+equipId+"&linkId="+linkId+"&t="+(new Date()).getTime();
	qm.openWindow(url,"链路告警处置","95%","93%");
}
//显示配置告警处置界面
function showConfigureAlertDeal(equipId,itemId){
	var url=project_path+"/view/nmshome/ConfigureAlertDeal.html?equipId="+equipId+"&itemId="+itemId+"&t="+(new Date()).getTime();
	qm.openWindow(url,"配置变更告警处置","95%","93%");
}
