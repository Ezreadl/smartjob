
//$(function() {
	var opts={
        // listUrl:"tsconfig2.json"
        listUrl:project_path+"/AlertSendLog/gridList"
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
           	{ display: "电话号码", name: "phone", newline: false, type: "text"},
            { display: "状态 ", name: "logType", newline: false, type: "select",labelWidth: 30,
                options:{data:[{ id: 0,text:' 告警 ' },{ id: 1,text:' 恢复 '}]}
            },
            { display: "发送时间", name: "timeStart",newline: false, type: "date",space:5,options:{showTime: true}, validate:{required:true},width:120},
            { display: "~ ", name: "timeEnd", newline: false,type: "date" ,labelWidth: 8,options:{showTime: true}, validate:{required:true},width:120}
        ],
        serachbuttons: [{ text: "查  询", width: 40,icon:searchIcon,click:search }]
    });
    //将url地址中的参数赋值到表单中，同时设置表单默认值
    var args=qm.applayUrl2Form(searchform , qm.getDayDiff(0));
    opts.listUrl=qm.serialize(args,false,opts.listUrl);
    opts.exportUrl=qm.serialize(args,false,opts.exportUrl);
 	//绑定查询
	qm.bindEnter($("#searchformId"),search);

	//创建列表
    var gridlist=$("#gridlistId").ligerGrid({
    	columnWidth : 200,
		columns : [ 
           {display: 'ID',name : 'oid',width:40 },
           {display: '电话号码',name : 'phone' },
           {display: '发送内容',name : 'content',width:400 },
           {display: '状态',name: 'logType',render:renderLogType,width:120 },
           {display: '发送时间',name : 'logTime' }
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