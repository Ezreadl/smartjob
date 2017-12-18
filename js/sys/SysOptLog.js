
//$(function() {
	var opts={
		listUrl:project_path+"/SysOptLog/findSysOptLogs",
		exportUrl :project_path+'/BaseCheckRecord!exporList'
	};
	//查询
	function search(){
		gridlist.options.parms=qm.getFormPureJson("searchformId");
		gridlist.options.newPage=1;
		gridlist.reload();
	}
	//查询条件表单
	var searchform=$("#searchformId").ligerForm({
        inputWidth: 110, labelWidth: 53,space:20,rightToken:'',
        fields: [
           	{ display: "用户昵称", name: "userNick", newline: false, type: "text"},
            { display: "IP地址 ", name: "ipAdress", newline: false, type: "text",labelWidth:38},
            { display: "操作描述", name: "optDesc", newline: false, type: "text"},
            { display: "操作时间", name: "timeStart",newline: false, type: "date",space:5, validate:{required:true},options:{showTime: true},width:120},
            { display: "~ ", name: "timeEnd", newline: false,type: "date" ,labelWidth: 8, validate:{required:true},options:{showTime: true},width:120}

        ],
        serachbuttons: [{ text: "查  询", width: 40,icon:searchIcon,click:search }]
    });
    //将url地址中的参数赋值到表单中，同时设置表单默认值
    var args=qm.applayUrl2Form(searchform , qm.getDayDiff(0));
    opts.listUrl=qm.serialize(args,false,opts.listUrl);
    opts.exportUrl=qm.serialize(args,false,opts.exportUrl);
 	//绑定查询
	qm.bindEnter($("#searchformId"),search);
	function exportData(){
		window.open(exportUrl);
	}
	//创建列表
    var gridlist=$("#gridlistId").ligerGrid({
    	columnWidth : 180,
		columns : [ 
           {display: 'ID',name : 'oid' ,width:40},
           {display: '用户昵称',name : 'optUserNick' },
           {display: 'IP地址',name : 'ipAddress'},
           {display: '操作描述',name: 'optDesc',width:400},
           {display: '操作时间',name : 'optTime' }
       ],
       url :opts.listUrl,
       height : "99%",
       root:"rows",
       record:"total",
       width : "99.9%",
       pageSize:20,
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
    $("#listpage").show();
	$("body").css({overflow: "hidden"});
//});