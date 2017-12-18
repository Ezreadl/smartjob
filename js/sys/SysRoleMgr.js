	var opts={
         // listUrl:"flowSt.json",
        // editUrl:"../view/sys/RoleMgrWindow.html",
        listUrl:project_path+"/Manage/findAllRole",
        editUrl:project_path+"/view/sys/RoleMgrWindow.html",
        deleteUrl:project_path+'/Manage/changeRoleDelFlg',
        exportUrl :project_path+'/Manage/exportRoleDataList'

	};
	//查询
	function search(){
		gridlist.options.parms=qm.getFormPureJson("searchformId");
		gridlist.options.newPage=1;
		gridlist.reload();
	}

	//保存表单
	function saveForm(){
		if (editform.valid()) {
			var data=editform.getData();
			qm.saveData(opts.saveUrl,data,function(ret){});
		}
	}

	//操作表单(新增、修改、复制)
	function optionForm(optType){
        var url;
		// var url=optType<=1 ? opts.editUrl+'?'+(new Date()).getTime()+'&isCopy=0&oid=0' : qm.getGridSingleUrl(gridlist,opts.editUrl+'?isCopy=0');
		// if(url.length<=0){
		// 	return ;
		// }
		// if(optType==3){
		// 	url=url+'&copy=1';
		// }
		if(optType==1){
            url=opts.editUrl+'?'+(new Date()).getTime()+'&isCopy=0&oid=0';
            if(url.length<=0){
                return;
            }
            qm.openWindow(url,"角色编辑窗口",'40%','80%');
		}else if(optType==2){
            url=qm.getGridSingleUrl(gridlist,opts.editUrl+'?isCopy=0');
            if(url.length<=0){
                return;
            }
            var rows = gridlist.getSelectedRows();
            var roleName=rows[0].roleName;
			url=url+'&roleName='+roleName;
            qm.openWindow(encodeURI(url),"角色编辑窗口",'40%','80%');
            // qm.openWindow(url,"角色编辑窗口",'40%','80%');

        }else if(optType==3){
            url=qm.getGridSingleUrl(gridlist,opts.editUrl+'?isCopy=1');
            if(url.length<=0){
                return;
            }
            var rows = gridlist.getSelectedRows();
            var roleName=rows[0].roleName;
            url=url+'&roleName='+roleName;
            qm.openWindow(encodeURI(url),"角色编辑窗口",'40%','80%');
		}
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
           	{ display: "角色名称", name: "roleName", newline: false, type: "text"}
        ],
        serachbuttons: [{ text: "查  询", width: 40,icon:searchIcon,click:search }]
    });
 	//绑定查询
	qm.bindEnter($("#searchformId"),search);
	//创建列表
    var gridlist=$("#gridlistId").ligerGrid({
        columnWidth : 200,
		columns : [
            {display: 'ID',name : 'oid',width :'80'},
            {display: '角色名称',name: 'roleName'},
            {display: '操作人员',name: 'optUserName'},
            {display: '添加人员', name: 'addUserName'},
            {display: '操作时间',name: 'optDateTime'},
            {display: '添加时间',name: 'addDateTime'},
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