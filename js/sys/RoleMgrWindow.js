
$(function () {
    var url=decodeURI(window.location.href);
    // var url=window.location.href;
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");

        if(strs[2].indexOf("oid")>-1){
            var oidArray = strs[2].split("=");
            oid=oidArray[1];
        }
        if(strs.length==4){
            if(strs[3].indexOf("roleName")>-1){
                var name = strs[3].split("=");
                $("#rolname").val(name[1]);
            }
        }else if(strs.length==5){
            if(strs[4].indexOf("roleName")>-1){
                var name = strs[4].split("=");
                $("#rolname").val(name[1]);
            }
        }
    }
})
var tree;
var opts= {
       // treeList:"menuTree.json",
    treeList:project_path+"/Manage/findRoleAllMenuId?"+qm.getUrlSerialize(),
    saveUrl:project_path+'/Manage/saveRoleMenu'
};
tree = $("#tree1").ligerTree({
    url:opts.treeList,
    slide: true,
    checkbox :true,
    isExpand:true,
    nodeWidth: 300

});
treeManager = $("#tree1").ligerGetTreeManager();
treeManager.collapseAll();

function submitEvent() {
    var notes = tree.getChecked();
    var data = "";
    for (var i = 0; i < notes.length; i++)
    {
    	data += notes[i].data.oid;
    	if(i != notes.length-1){
    		data += ",";
    	}
    }
    var name=$("#rolname").val();
    $.ajax({
        cache: false,
        type: "POST",
        url:opts.saveUrl,
        data:{
            oid:oid,
            roleName:name,
            menuIds:data
        },
        async: true,
        success: function(ret) {
            qm.dealResult(ret,function () {
                // parent.location.reload();
                var frame=window.parent.document.getElementById("iframeMain");
                frame.src = project_path+"/view/sys/SysRoleMgr.html?t="+(new Date()).getTime();
                var window1= window.parent.document.getElementsByClassName("l-window");
                for(var i=0;i<window1.length;i++){
                    window1[i].style='display:none';
                }
            });
        },
        error:function(ret){
            qm.dealResult(ret.responseText);
        }
    });

}