//$(function() {
var opts={
   // listUrl:"menu.json",
   // menuList:"menuTree.json",
   //  editUrl:"menuMgr.json",
    menuList:project_path+"/Manage/findAllMenuTree",
    listUrl:project_path+"/Manage/findMenu",
    editUrl:project_path+'/Manage/findMenuById',
    deleteUrl:project_path+'/Manage/changeMenuDelFlg',
    saveUrl:project_path+'/Manage/saveMenu',
    exportUrl :project_path+'/Manage/exportMenuDataList'
};
$(function (){
    $.ajaxSetup({cache:false});
    $("#layout1").ligerLayout({ leftWidth: 200});
    //设置菜单树的滚条
    var treeParentHeight=$(".l-layout-left").height();
    var menuHeight=(treeParentHeight-25)+'px';
    $("#leftMenu").css("height",menuHeight);

});

//树菜单
var tree = $("#tree1").ligerTree({
    url:opts.menuList,
    slide: true,
    checkbox :false,
    isExpand:true,
    nodeWidth: 300
});
treeManager = $("#tree1").ligerGetTreeManager();
treeManager.collapseAll();
$("#tree1").ligerTree({
    onClick: function (node, e){
        var expanded=node.data.expanded;
        if(expanded==0){
            var OidParm={oid:node.data.oid};
            gridlist.options.parms=OidParm;
            gridlist.options.newPage=1;
            gridlist.reload();
        }
    }
});
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
        $("body").css({overflow: "hidden"});
    }
}
togglePage(1);//转到列表页面
//保存表单
function saveForm(){
    if (editform.valid()) {
        var data=editform.getData();
        console.log(data);
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
            inputWidth: 250, labelWidth:115,space: 10,
            validate: true,
            fields: [
                {name:"oid",type:"hidden"},
                {display:"菜单名称",name:"menuName",type:"text",newline:true,validate:{required:true, minlength: 2},group:"基础信息",groupicon:groupicon},
                {display: "父菜单", name: "pMenuId",newline: true,type: "combobox", comboboxName: "pMenuIdName",
                    options: {valueField: "oid",textField:'text',treeLeafOnly:false,
                        tree: { url:opts.menuList, checkbox: false, idFieldName: 'oid'}
                    }
                },
                {display:"组件ID号",name:"tabId",type:"text",newline:true},
                {display:"动作类型",name:"actionType",type:"select",newline:true,
                    options:{data:[{ id: 0,text:' JS动作 '},{ id: 1,text:' URL链接 ' }]}
                },
                {display:"JS动作或URL链接",name:"actionClass",type:"text",newline:true},
                {display:"菜单图标样式",name:"iconCls",type:"text",newline:true},
                {display:"菜单顺序",name:"orderNumber",type:"text",newline:true},
                {display:"是否展开",name:"expanded",type:"select",newline:true,
                    options:{data:[{ id: 0,text:' 否 ' },{ id: 1,text:' 是 ' }]}
                }
            ],
            buttons: [
                { text: "保  存", width: 40,icon:saveIcon,click:saveForm },
                { text: "取  消", width: 40,icon:cancelIcon,click:cancelSave}
            ]
        });

    }
    togglePage(2);//转到编辑页面
}
//操作表单(新增、修改、复制)
function optionForm(optType){
    // var url=optType<=1 ? opts.editUrl+'?isCopy=0&oid=0' : qm.getGridSingleUrl(gridlist,opts.editUrl+'?isCopy=1');
    // if(url.length<=0){
    //     return ;
    // }
    // if(optType==3){
    //     url=url+'&copy=1';
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
        { display: "菜单名称", name: "menuName", newline: false, type: "text"}
    ],
    serachbuttons: [{ text: "查  询", width: 40,icon:searchIcon,click:search }]
});
//绑定查询
qm.bindEnter($("#searchformId"),search);

//创建列表
var gridlist=$("#gridlistId").ligerGrid({
    columnWidth : 140,
    columns : [
        {display: '菜单名称',name : 'menuName',width :'180', frozen: true},
        {display: '组件ID',name: 'tabId',width :'70'},
        {display: '动作类型',name: 'actionType',render:renderActionClass},
        {display: 'js动作/URL链接',name: 'actionClass'},
        {display: '图标icon',name: 'iconCls'},
        {display: '排列顺序',name: 'orderNumber'},
        {display: '父菜单',name: 'pMenuId'},
        {display: '是否展开',name: 'expanded',render:renderExpanded},
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