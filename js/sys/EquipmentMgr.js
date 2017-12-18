//用户管理界面
//$(function() {
	var opts={
       // listUrl:"Equipment.json",
		 listUrl:project_path+"/Equipment/gridList",
        editUrl:project_path+'/Equipment/findById',
        deleteUrl:project_path+'/Equipment/changeDelFlg',
        saveUrl:project_path+'/Equipment/save',
        exportUrl :project_path+'/Equipment/exportDataList'

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
	// togglePage(1);//转到列表页面
	//保存表单
	function saveForm(){
		if (editform.valid()) {
			var data=editform.getData();
			qm.saveData(opts.saveUrl,data,function(ret){
				if(ret.state==1){
					togglePage(1);
					// gridlist.reload();
                    window.location.reload();
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
				inputWidth: 190, labelWidth:100,space:40,
				validate: true,
				fields: [
			        {name:"oid",type:"hidden"},
			        {display:"设备名称",labelWidth:65,space:65,name:"equipName",labelAlign:"left",type:"text",newline:true,validate:{required:true, minlength:2},group:"基础信息",groupicon:groupicon},
					{display:"中文名称",labelWidth:70,space:75,name:"chineseName",labelAlign:"left",type:"text",newline:false},
                    {display:"中间设备接口ID",name:"loginNeId",labelAlign:"left",type:"text",newline:false},
                    {display:"别名",labelWidth:65,space:65,name:"otherName",labelAlign:"left",type:"text",newline:true},
                    {display:"设备分级",labelWidth:70,space:75,name:"equipLevel",labelAlign:"left",type:"select",newline:false,
                        options:{data:[{ id: 1,text:' 1级 ',checked:'checked' },{ id: 2,text:' 2级 ' },
                            { id: 3,text:' 3级 ' }]}
                    },
                    {display:"设备登录IP地址",name:"ipAddress",labelAlign:"left",type:"text",newline:false},
                    {display:"品牌名称",labelWidth:65,space:65,name:"brandName",labelAlign:"left",type:"text",newline:true},
                    {display:"型号名称",labelWidth:70,space:75,name:"typeName",labelAlign:"left",type:"text",newline:false},
                    {display:"软件版本",name:"softVersion",labelAlign:"left",type:"text",newline:false},
                    {display:"类型名称",labelWidth:65,space:65,name:"styleName",labelAlign:"left",type:"text",newline:true},
                    {display:"所属地市",labelWidth:70,space:75,name:"areaName",labelAlign:"left",type:"text",newline:false},
                    {display:"所属安全域",name:"netAreaName",labelAlign:"left",type:"text",newline:false},
                    {display:"所在机房",labelWidth:65,space:65,name:"machineHome",labelAlign:"left",type:"text",newline:true},
                    {display:"备注信息1",labelWidth:70,space:75,name:"commentInfo1",labelAlign:"left",type:"textarea",newline:false,width: 190,height:50},
                    {display:"备注信息2",name:"commentInfo2",labelAlign:"left",type:"textarea",newline:false,width: 190,height:50},
					{display:"设备登录类型",labelWidth:90,name:"loginLinkType",labelAlign:"left",type:"select",newline:false,group:"登录信息",groupicon:groupicon,
                        options:{data:[{ id: 0,text:'直接登录',checked:'checked' },{ id: 1,text:'通过中间设备登录' },
                            { id: 2,text:'不能登录的虚拟设备'}]}
					},
                    {display:"telnet端口号",labelWidth:105,name:"telnetPort",labelAlign:"left",type:"select",newline:false,
                        options:{data:[{id:'22',text:'22'},{id:'23',text:'23'}]}
                    },
                    {display:"终端返回编码格式",labelWidth:118,name:"telnetEncoding",labelAlign:"left",type:"text",newline:false},
                    {display:"账号切换命令",labelWidth:90,name:"enableCmd",labelAlign:"left",type:"select",newline:true,
                        options:{data:[{id:'en', text:'en'},{id:'su',text:'su'}]}
					},
                    {display:"telnet维护账号",labelWidth:105,name:"maintainUser",labelAlign:"left",type:"text",newline:false},
                    {display:"telnet跳转指令格式",labelWidth:118,name:"telnetJumpCmd",type:"select",newline:false,labelAlign:"left",
                        options:{data:[{id:'telnet (ip) (port)',text:'telnet (ip) (port)'},{id:'ssh -l (username) (ip) -p (port)',text:'ssh -l (username) (ip) -p (port)'}]}
                    },
                    {display:"设备终端类型",labelWidth:90,name:"termType",labelAlign:"left",type:"select",newline:true,
                        options:{data:[{id:'VT100',text:'VT100'},{id:'VT200',text:'VT200'},{id:'ASNI',text:'ASNI'}]}
					},
                    {display:"telnet维护密码",labelWidth:105,name:"maintainPwd",labelAlign:"left",type:"text",newline:false},
                    {display:"telnet跳转账号类型",labelWidth:118,name:"jumpAccount",labelAlign:"left",type:"select",newline:false,
                        options:{data:[{ id: 0,text:'维护账号',checked:'checked'},{ id:1,text:'管理账号'}]}
                    },
                    {display:"指令下发特征",labelWidth:90,name:"telnetWriteFea",labelAlign:"left",type:"select",newline:true,
                        options:{data:[{ id: 0,text:'\\n'},{ id: 1,text:'\\r\\n'}]}
                    },
                    {display:"telnet管理员账号",labelWidth:105,name:"managerUser",labelAlign:"left",type:"text",newline:false},
                    {display:"telnet跳转设备别名",labelWidth:118,name:"jumpEquipName",labelAlign:"left",type:"text",newline:false},
                    {display:"退出more指令",labelWidth:90,name:"exitMoreCmd",labelAlign:"left",type:"text",newline:true},
                    {display:"telnet管理员密码",labelWidth:105,name:"managerPwd",labelAlign:"left",type:"text",newline:false},
                    {display:"telnet跳转设备ID",labelWidth:118,name:"jumpEquipId",labelAlign:"left",type:"text",newline:false},
                    {display:"退出命令",labelWidth:90,name:"logoutCmd",labelAlign:"left",type:"text",newline:true},
                    {display:"telnet最大连接数",labelWidth:105,name:"maxLink",labelAlign:"left",type:"text",newline:false},
                    {display:"telnet登录方案ID",labelWidth:118,name:"loginSolutionId",labelAlign:"left",type:"text",newline:false},
                    {display:"暂停标志",labelWidth:90,name:"stateFlg",labelAlign:"left",type:"select",newline:true,
                        options:{data:[{ id: 0,text:' 正常 ',checked:'checked'},{ id: 1,text:' 暂停 '}]}
                    },
                    {display:"telnet协议类型",labelWidth:105,name:"telnetProtocol",labelAlign:"left",type:"select",newline:false,
                        options:{data:[{id:'telnet',text:'telnet'},{id:'ssh1',text:'ssh1'},{id:'ssh2',text:'ssh2'}]}
					},
                    {display:"telnet登录方案名",labelWidth:118,name:"loginSolutionName",labelAlign:"left",type:"text",newline:false},
                    {display:"ftp账号",labelWidth:90,name:"ftpUserName",labelAlign:"left",type:"text",newline:true},
                    {display:"ftp协议端口号",labelWidth:105,name:"ftpPort",labelAlign:"left",type:"text",newline:false},
                    {display:"返回报文特征库ID",labelWidth:118,name:"cmdFeaStoreId",labelAlign:"left",type:"text",newline:false},
                    {display:"ftp密码",labelWidth:90,name:"ftpPassword",labelAlign:"left",type:"text",newline:true},
                    {display:"ftp协议类型",labelWidth:105,name:"ftpProtocol",labelAlign:"left",type:"select",newline:false,
                        options:{data:[{id:'ftp',text:'ftp'},{id:'ftps',text:'ftps'}, {id:'sftp',text:'sftp'}]}
                    },
                    {display:"返回报文特征库名",labelWidth:118,name:"cmdFeaStoreName",labelAlign:"left",type:"text",newline:false},
                    {display:"ftps连接类型",labelWidth:90,name:"ftpImplicit",labelAlign:"left",type:"select",newline:true,
                        options:{data:[{id:'passive',text:'passive'},{id:'port',text:'port'}]}
                    },
                    {display:"ftp数据传输模式",labelWidth:105,name:"ftpMode",labelAlign:"left",type:"select",newline:false,
                        options:{data:[{id:'implicit',text:'implicit'},{id:'explicit',text:'explicit'}]}
					},
                    {display:"snmp协议共同体名",labelWidth:118,name:"community",labelAlign:"left",type:"text",newline:false},
                    {display:"snmp版本号",labelWidth:90,name:"snmpVersion",labelAlign:"left",type:"select",newline:true,
                        options:{data:[{ id: 1,text:' 版本1 '},{ id: 2,text:' 版本2c ',checked:'checked'},
                            { id: 3,text:' 版本3 '}]}
                    },
					{display:"snmp端口号",labelWidth:110,name:"snmpPort",labelAlign:"left",type:"text",newline:false}
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
           	{ display: "设备IP", name: "ipAddress", newline: false, type: "text",labelWidth: 40},
            { display: "设备信息(名字)", name: "keyWord", newline: false, type: "text",labelWidth: 85},
			{display:"删除标志",name:"delFlg",value:0,type:"select",newline:false,validate:{required:true},
				options:{data:[{ id: 0,text:'正常'},{ id: 1,text:'删除'}]}
			},
            {display:"停用标志",name:"stateFlg",value:0,type:"select",newline:false,validate:{required:true},
                options:{data:[{ id: 0,text:'启用'},{ id: 1,text:'暂停'}]}
            }
        ],
        serachbuttons: [{ text: "查  询", width: 40,icon:searchIcon,click:search }]
    });
 	//绑定查询
	qm.bindEnter($("#searchformId"),search);
	//创建列表
    var gridlist=$("#gridlistId").ligerGrid({
        columnWidth : 140,
		columns : [
           {display: '设备名称',name : 'equipName', width:210,frozen: true },
           {display: '设备中文名称', name: 'chineseName', width:220,frozen: true },
           {display: '设备别名',name: 'otherName'},
           {display: '中间设备接口ID',name: 'loginNeId'},
           {display: '设备地址',name: 'ipAddress'},
           {display: '设备分级',name: 'equipLevel',render:renderEquipLevel},
           {display: '所属安全域名称',name: 'netAreaName'},
           {display: '品牌名称',name: 'brandName'},
            {display: '设备类型',name : 'styleName'},
            {display: '设备型号',name : 'typeName'},
            {display: '软件版本', name: 'softVersion'},
            {display: '所属地市',name: 'areaName'},
            {display: '所在机房',name: 'machineHome'},
            {display: '备注信息',name: 'commentInfo1'},
            {display: '备注信息',name: 'commentInfo2'},
            {display: '连接类型',name: 'loginLinkType',render:renderLoginLinkType},
            {display: '账号切换命令',name: 'enableCmd'},
            {display: '端口号',name : 'telnetPort',render:renderTelnetPort},
            {display: '设备终端类型',name : 'termType'},
            {display: 'telnet协议类型', name: 'telnetProtocol'},
            {display: 'telnet指令编码格式',name: 'telnetEncoding'},
            {display: '指令下发特征指示',name: 'telnetWriteFea',render:renderTelnetWriteFea},
            {display: '设备跳转shell指令',name: 'telnetJumpCmd'},
            {display: 'telnet维护账号',name: 'maintainUser'},
            {display: 'telnet维护密码',name: 'maintainPwd'},
            {display: 'telnet管理员账号',name: 'managerUser'},
            {display: 'telnet管理员密码',name: 'managerPwd'},
            {display: '退出命令',name : 'logoutCmd'},
            {display: '退出more指令',name : 'exitMoreCmd'},
            {display: '连接数', name: 'linkNumber'},
            {display: 'telnet最大连接数',name: 'maxLink'},
            {display: 'telnet跳转设备ID号',name: 'jumpEqupId'},
            {display: 'telnet跳转设备别名',name: 'jumpEquipName'},
            {display: '设备跳转账号类型',name: 'jumpAccount',render:renderJumpAccount},
            {display: 'telnet登录方案ID',name: 'loginSolutionId'},
            {display: 'telnet登录方案名',name: 'loginSolutionName',width:180},
            {display: '返回报文特征库ID',name : 'cmdFeaStoreId'},
            {display: '返回报文特征库名称',name : 'cmdFeaStoreName'},
            {display: 'ftp协议类型', name: 'ftpProtocol'},
            {display: 'ftp协议端口号',name: 'ftpPort'},
            {display: 'ftp数据传输模式',name: 'ftpMode',render:renderFtpMode},
            {display: 'ftps使用连接',name: 'ftpImplicit',render:renderFtpImplicit},
            {display: 'ftp账号',name: 'ftpUserName'},
            {display: 'ftp密码',name: 'ftpPassword'},
            {display: 'snmp协议共同体名',name : 'community'},
            {display: 'snmp版本号',name : 'snmpVersion',render:renderSnmpVersion},
            {display: 'snmp端口号', name: 'snmpPort'},
            {display: '暂停标志',name: 'stateFlg',render:renderStateFlg},
            {display: '添加的用户名',name: 'addUserName'},
            {display: '操作的用户名',name: 'optUserName'},
            {display: '操作时间',name: 'optDateTime'},
            {display: '添加时间',name: 'addDateTime'},
            {display: '删除标志',name: 'delFlg',render:renderDelFlg}
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