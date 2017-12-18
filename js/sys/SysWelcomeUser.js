//用户管理界面
//$(function() {
var opts={
    editUrl:project_path+'/SysUser/findById?isCopy=0&'+qm.getUrlSerialize(),
    saveUrl:project_path+'/SysUser/save'
};
//保存表单
function saveForm(){
    if (editform.valid()) {
        var data=editform.getData();
        qm.saveData(opts.saveUrl,data,function(ret){
            window.location.reload();
        });
    }
}
function cancelSave(){
    $(':input','#passwordId')
        .not(':button, :submit, :reset, :hidden')
        .val('')
        .removeAttr('checked')
        .removeAttr('selected');
    $("#warnTS").html("");
    var dialog = frameElement.dialog;
    dialog.close();
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
                {display:"用户账号",name:"userName",type:"text",newline:true,validate:{required:true, minlength: 5}},
                {display:"用户昵称",name:"userNick",type:"text",newline:true,validate:{required:true, minlength: 2}},
                {display:"联系电话",name:"telephone",type:"text",newline:true,validate:{digits:true,required:true, minlength: 11}},
                {display:"邮箱地址",name:"emailAddress",type:"text",newline:true,validate:{email:true, minlength: 11}},
                {display:"用户类型",name:"userType",type:"select",newline:true,validate:{required:true},
                    options:{data:[{ id:'1',text:'普通用户'},{ id:'2' ,text:'管理员'},{ id:'3',text:'超级管理员'}]}
                },
                {display:"其他信息",name:"otherInfo",type:"textarea",newline:true}
            ],
            buttons: [
                { text: "保  存", width: 40,icon:saveIcon,click:saveForm },
                { text: "取  消", width: 40,icon:cancelIcon,click:cancelSave }
            ]
        });

    }
}
createForm();
qm.loadFormData(editform,opts.editUrl);
$("input[name='userName']").attr("disabled","disabled");
$("input[name='userType']").attr("disabled","disabled");