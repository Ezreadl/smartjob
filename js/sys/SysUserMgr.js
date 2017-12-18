//用户管理界面
//$(function() {
	var opts={
		// listUrl:"tsconfig3.json",
		listUrl:project_path+"/SysUser/gridList",
		editUrl:project_path+'/SysUser/findById',
		deleteUrl:project_path+'/SysUser/changeDelFlg',
		saveUrl:project_path+'/SysUser/save',
		passResetUrl :project_path+'/SysUser/resetPassword',
		exportUrl :project_path+'/SysUser/exportDataList'
	};
	//查询
	function search(){
		gridlist.options.parms=qm.getFormPureJson("searchformId");
		gridlist.options.newPage=1;
		gridlist.reload();
	}
	//列表，编辑页转换
	function togglePage(state){
		if(state==1){
			$("#listpage").show();
			$("#editpage").hide();
			$("body").css({overflow: "hidden"});
		}else if(state==2){
			$("#listpage").hide();
			$("#editpage").show();
			$("body").css({overflow: "auto"});
		}
	}
	togglePage(1);//转到列表页面
	//保存表单
	function saveForm(){
		if (editform.valid()) {
			var data=editform.getData();
			qm.saveData(opts.saveUrl,data,function(ret){
				if(ret.state==1){
					togglePage(1);
					gridlist.reload();
				}
			});
		}
	}
	//取消保存
	function cancelSave(){
		togglePage(1);
	}
	//创建表单并加载数据
	var editform=null;
	function createForm(){
		//创建表单
		if(!editform){
			editform=$("#editformId").ligerForm({
				inputWidth: 250, labelWidth: 60,space: 10,
				validate: true,
				fields: [
			        {name:"oid",type:"hidden"},
			        {display:"用户账号",name:"userName",type:"text",newline:true,validate:{required:true, minlength: 5},group:"基础信息",groupicon:groupicon},
					{display:"用户昵称",name:"userNick",type:"text",newline:true,validate:{required:true, minlength: 2}},
					{display:"联系电话",name:"telephone",type:"text",newline:true,validate:{digits:true,required:true, minlength: 11}},
					{display:"邮箱地址",name:"emailAddress",type:"text",newline:true,validate:{email:true, minlength: 11}},
					{display:"用户类型",name:"userType",type:"select",newline:true,validate:{required:true},
						options:{data:[{ id: 1,text:' 普通用户 ',checked:'checked' },{ id: 2,text:' 管理员 ' },
						               { id: 3,text:' 超级管理员 ' }]}
					},
					{display:"其他信息",name:"otherInfo",type:"textarea",newline:true}
		         ],
				buttons: [
                   { text: "保  存", width: 40,icon:saveIcon,click:saveForm },
                   { text: "取  消", width: 40,icon:cancelIcon,click:cancelSave }
                 ]
			});

		}
		togglePage(2);//转到编辑页面
	}
	//操作表单(新增、修改、复制)
	function optionForm(optType){
        var url;
        if(optType==1){
            url=opts.editUrl+'?'+(new Date()).getTime()+'&isCopy=0&oid=0';
            if(url.length<=0){
                return;
            }
            $("#edittitle").html("新增");
            createForm();
            qm.loadFormData(editform,url);
        }else if(optType==2){
            url=qm.getGridSingleUrl(gridlist,opts.editUrl+'?isCopy=0');
            if(url.length<=0){
                return;
            }
            $("#edittitle").html("修改");
            createForm();
            qm.loadFormData(editform,url);
            $("input[name='userName']").attr("disabled","disabled");
        }else if(optType==3){
            url=qm.getGridSingleUrl(gridlist,opts.editUrl+'?isCopy=1');
            if(url.length<=0){
                return;
            }
            $("#edittitle").html("复制");
            createForm();
            qm.loadFormData(editform,url);
            $("input[name='userName']").attr("disabled","disabled");
        }
        $(".l-text-wrapper input[name='undefined']").css("display","none");
	}
	//改变状态
	function toggleState(delFlg){
		var url=qm.getGridMutiUrl(gridlist,opts.deleteUrl);
		if(url.length<=0){
			return "";
		}
		var title=delFlg==1?'删除':'恢复';
		url=url+'&delFlg='+delFlg;
		qm.toggleGridItemState(gridlist, url, title);
	}
	//密码重置
	function passReset(){
		var url=qm.getGridMutiUrl(gridlist,opts.passResetUrl);
		if(url.length<=0){
			return "";
		}
		qm.messageConfirm('您确定要重置选择的用户密码吗?',function(b){
			if(b){
				$.post(url,function(ret){
					qm.dealResult(ret);
					grid.reload();
				});
			}
		});
	}
	//导出
	function exportData(){
		var oids="";
		var ids=qm.getGridSelections(gridlist);
		if(ids.length<=0){
			qm.messageAlert('请至少选择一条记录!');
			return "";
		}else{
			for (var i = 0; i < ids.length; i++)
			{
				oids += ids[i];
				if(i != ids.length-1){
					oids += ",";
				}
			}
		}
		window.location.href=opts.exportUrl+"?oids="+oids;
	}
	//查询条件表单
	var searchform=$("#searchformId").ligerForm({
        inputWidth: 110, labelWidth:28,space:20,rightToken:'',
        fields: [
           	{ display: "账户", name: "userName", newline: false, type: "text"},
            { display: "昵称 ", name: "userNick", newline: false, type: "text"},
            { display: "电话", name: "telephone", newline: false, type: "text"},
            { display: "邮箱", name: "emailAddress", newline: false,  type: "text"},
            {display:"类型",name:"userType",type:"select",newline:true,validate:{required:true},
				options:{data:[{ id: 1,text:' 普通用户 ',checked:'checked' },{ id: 2,text:' 管理员 ' },
				               { id: 3,text:' 超级管理员 ' }]}
			},
			{display:"状态",name:"delFlg",value:0,type:"select",newline:false,validate:{required:true},
				options:{data:[{ id: 0,text:'全部'},{ id: 1,text:'正常'},{ id: 2,text:'删除' }]}
			},
            { display: "添加时间", name: "addStartTime",newline: false,options:{showTime: true},labelWidth:53,space:5,type: "date", format:"yyyy-mm-dd",width:120},
            { display: "~", name: "addEndTime", newline: false,options:{showTime: true},labelWidth:8,type: "date" , format:"yyyy-mm-dd",width:120}
        ],
        serachbuttons: [{ text: "查  询", width: 40,icon:searchIcon,click:search }]
    });
 	//绑定查询
	qm.bindEnter($("#searchformId"),search);
    //渲染状态
    function renderDelFlg(rowdata, index, value){
		if(value == 0){
			return '<span style="color:green">正常</span>';
		}else{
			return '<span style="color:red">删除</span>';
		}
	};
	function renderUserType(rowdata, index, value){
		if(value == 1){
			return '<span style="color:#e839d1">普通用户</span>';
		}else if(value==2){
			return '<span style="color:#3e4fcf">管理员</span>';
		}else if(value == 3){
			return '<span style="color:#138219">超级管理员</span>';
		}
		return '-';
	}

	//创建列表
    var gridlist=$("#gridlistId").ligerGrid({
        columnWidth : 140,
		columns : [
           {display: 'ID',name : 'oid',width:40},
           {display: '用户账号',name : 'userName'},
           {display: '用户昵称', name: 'userNick'},
           {display: '联系电话',name: 'telephone'},
           {display: '邮箱地址',name: 'emailAddress'},
           {display: '用户类型',name: 'userType',width:80,render:renderUserType},
           {display: '添加时间',name: 'addDateTime'},
           {display: '最近访问时间',name: 'curLoginTime'},
           {display: '状态',name: 'delFlg',width:80,render:renderDelFlg}
       ],
       url :opts.listUrl,
       height : "99%",
       root:"rows",
       record:"total",
       width : "99.9%",
       pageSize:15,
       rowHeight:23,
       pageSizeOptions:[10,15,20,30,40,50],
       pagesizeParmName:"limit",
       pageParmName:"page",
       sortnameParmName:"sort",
       sortorderParmName:"dir",
       rownumbers : false,
       frozenRownumbers:false,
       checkbox : true,
       frozenCheckbox:false
	});
    
//});