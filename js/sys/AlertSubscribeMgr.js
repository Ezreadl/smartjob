//用户管理界面
//$(function() {
	var opts={
        // treeList:"menuTree.json",
        treeList:project_path+"/Equipment/findAllEquipment",
		listUrl:project_path+"/AlertSubscribe/gridList",
        editUrl:project_path+'/AlertSubscribe/findById',
        deleteUrl:project_path+'/AlertSubscribe/changeDelFlg',
        saveUrl:project_path+'/AlertSubscribe/save',
        exportUrl :project_path+'/AlertSubscribe/exportDataList'

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
				inputWidth: 320, labelWidth:95,space:15,
				validate: true,
				fields: [
			        // {name:"oid",type:"hidden"},
			        {display:"预约名称",name:"subscribeName",type:"text",newline:true,validate:{required:true, minlength:3},group:"基础信息",groupicon:groupicon},
                    {display: "预约的设备ID", name: "equipIds",newline: true,type: "combobox",
                        options: {valueField: "oid",textField:'text',treeLeafOnly:false,
                            tree: { url:opts.treeList, checkbox: true}
                        }
                    },
                    { display: "开始时间段 ", name: "startTime", newline: true,type: "date",options:{showTime: true}},
                    { display: "结束时间段 ", name: "endTime", newline: true,type: "date",options:{showTime: true}},
                    {display:"备注信息",name:"commentInfo",type:"textarea",newline:true}

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
		// var url=optType<=1 ? opts.editUrl+'?isCopy=0&oid=0': qm.getGridSingleUrl(gridlist,opts.editUrl+'?isCopy=1');
		// if(url.length<=0){
		// 	return ;
		// }
		// if(optType==3){
		// 	url=url+'&copy=1';
		// }
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
           {display: 'ID',name : 'oid', frozen: true ,width:'40'},
           {display: '预约名称', name: 'subscribeName', frozen: true },
           {display: '预约的设备id',name: 'equipIds'},
           {display: '开始时间',name: 'startTime'},
           {display: '结束时间',name: 'endTime'},
           {display: '备注信息',name: 'commentInfo'},
           {display: '添加人员',name: 'addUserName'},
           {display: '操作人员',name: 'optUserName'},
            {display: '添加时间',name : 'addDateTime'},
            {display: '操作时间',name : 'optDateTime'},
            {display: '状态', name: 'delFlg',render:renderDelFlg}
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