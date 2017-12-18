
//$(function() {
	var opts={
        // listUrl:"package.json"
		listUrl:project_path+"/EquipGatherLog/gridList"
		// exportUrl :project_path+'/BaseCheckRecord!exporList'
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
            { display: "项目类型 ", name: "itemType", newline: false, type: "select",
                options:{data:[{ id: '6001',text:'重要巡检' },{ id: '6002',text:'次要巡检' },
                    { id: '6003',text:'syslog巡检' },
                    { id: '6005',text:' 接口作业 '},{ id: '6006',text:' 链路作业 '}]}
            },
            { display: "采集时间", name: "timeStart",newline: false, type: "date",space:5,options:{showTime: true}, validate:{required:true},width:125},
            { display: "~ ", name: "timeEnd", newline: false,type: "date" ,labelWidth: 8,options:{showTime: true}, validate:{required:true},width:125}
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
           {display: '日志ID',name : 'oid' ,width:60,frozen:true},
           {display: '设备名称',name : 'chineseName' },
           {display: '项目名称',name : 'itemName'},
           {display: '项目类型',name: 'itemType',render:renderItemTypeLog,width:140},
           {display: '日志文件名',name : 'fileName' ,width:200},
            {display: '日志保存路径',name: 'savePath',width:200},
            {display: '保存时间',name : 'logTime',width:140}
       ],
       url :opts.listUrl,
       height:"99%",
       root:"rows",
       record:"total",
       width:"99.9%",
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