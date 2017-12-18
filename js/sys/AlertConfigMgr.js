//用户管理界面
//$(function() {
	var opts={
		listUrl:project_path+"/AlertConfig/gridList",
        editUrl:project_path+'/AlertConfig/findById',
        deleteUrl:project_path+'/AlertConfig/changeDelFlg',
        saveUrl:project_path+'/AlertConfig/save',
        exportUrl :project_path+'/AlertConfig/exportDataList'

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
				inputWidth: 190, labelWidth:120,space:15,
				validate: true,
				fields: [
			        {name:"oid",type:"hidden"},
			        {display:"告警配置名称",name:"alertName",labelAlign:"right",type:"text",newline:true,validate:{required:true},group:"基础信息",groupicon:groupicon},
					{display:"告警级别",name:"alertLevel",labelAlign:"right",type:"text",newline:true,
                        options:{data:[{ id: 1,text:'1 '},{ id: 2,text:' 2 ' },{ id:3,text:' 3 ' },{ id:4,text:' 4 ' }]}
					},
					{display:"作业项目类型",name:"itemType",labelAlign:"right",type:"select",newline:true,
                        options:{data:[{ id: '6001',text:'日常作业 '},{ id: '6005',text:' 接口作业 ' },{ id:'6006',text:' 链路作业 ' },{ id:'6008',text:' 配置作业 ' }]}
					},
                    {display:"重复发送限制",name:"cycSend",labelAlign:"right",type:"select",newline:true,
                        options:{data:[{ id: 0,text:'重复到恢复 '},{ id: 1,text:' 重复到次数 ' },{ id:2,text:' 不限制 ' }]}
                    },
                    {display:"重复发送次数",name:"sendCount",labelAlign:"right",type:"text",newline:true},
                    {display:"短信告警",name:"sendShortMsg",labelAlign:"right",type:"select",newline:true,
                        options:{data:[{ id: 0,text:' 不告警 '},{ id: 1,text:' 告警 ' }]}
                    },
                    {display:"email告警",name:"sendEmail",labelAlign:"right",type:"select",newline:true,
                        options:{data:[{ id: 0,text:' 不告警 '},{ id: 1,text:' 告警 ' }]}
                    },
                    {display:"设备组",name:"equipIds",labelAlign:"right",type:"text",newline:true},
                    {display:"用户组",name:"userIds",labelAlign:"right",type:"text",newline:true},
                    {display:"包含关键字",name:"keyWords",labelAlign:"right",type:"text",newline:true}
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
        }else if(optType==2){
            url=qm.getGridSingleUrl(gridlist,opts.editUrl+'?isCopy=0');
            if(url.length<=0){
                return;
            }
            $("#edittitle").html("修改");
        }else if(optType==3){
            url=qm.getGridSingleUrl(gridlist,opts.editUrl+'?isCopy=1');
            if(url.length<=0){
                return;
            }
            $("#edittitle").html("复制");
        }
		createForm();
		qm.loadFormData(editform,url);
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
        inputWidth: 110, labelWidth: 53,space:20,rightToken:'',
        fields: [
           	{ display: "告警配置名称", name: "alertName", newline: false, type: "text",labelWidth: 75}
        ],
        serachbuttons: [{ text: "查  询", width: 40,icon:searchIcon,click:search }]
    });
 	//绑定查询
	qm.bindEnter($("#searchformId"),search);
	//创建列表
    var gridlist=$("#gridlistId").ligerGrid({
        columnWidth : 140,
		columns : [
           {display: 'ID',name : 'oid', frozen: true ,width:40},
           {display: '告警配置名称', name: 'alertName',width:180, frozen: true },
           {display: '告警级别',name: 'alertLevel',render:renderAlertLevel},
           {display: '作业项目类型',name: 'itemType',render:renderItemType},
           {display: '重复发送限制',name: 'cycSend',render:renderCycSend},
           {display: '重复发送次数',name: 'sendCount'},
           {display: '短信告警',name: 'sendShortMsg',render:renderWarn},
           {display: 'email告警',name: 'sendEmail',render:renderWarn},
            {display: '设备组',name : 'equipIds'},
            {display: '用户组',name : 'userIds'},
            {display: '包含关键字', name: 'keyWords'},
            {display: '添加人员',name: 'addUserName'},
            {display: '操作人员',name: 'optUserName'},
            {display: '添加时间',name: 'addDateTime'},
            {display: '操作时间',name: 'optDateTime'},
            {display: '状态',name: 'delFlg',render:renderDelFlg}
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
       frozenCheckbox:true
	});
    
//});