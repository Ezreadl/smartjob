var schooltable;
var editData;
$(function(){
    $("#asider-schoolManagement").addClass("active");
    $(".select2").select2({        language:"zh-CN"    });
    schooltable = $('#table').DataTable( {
        ordering:false,
        processing:true,
        searching:false,
        serverSide: true,
        autoWidth:false,
        filter:false,
        scrollX:600,
        ajax: {
            url: absoluteContextPath + "/root/getSchoolList.do",
            type: 'POST'
        },
        columns:[
            {"data":"name"},
            {"data":"schoolType"},
            {"data":"areaName"},
            {"data":"cityName"},
            {"data":"devOperation"},
            {"data":"id"},
            {"data":"schoolTypeId"},
            {"data":"enabled"},
            {"data":"personthreshold"},
            {"data":"timethreshold"},
            {"data":"personthreshold2"},
            {"data":"timethreshold2"},
            {"data":"uploadgap"}

        ],
        "columnDefs": [
            {
                "render": function(data, type, row, meta) {
                    if(data == 1){
                        return '<span style="color: green">已开启</span><a href="javascript:void(0)" onclick="devOperation(0,'+row["id"]+')" style="color: red">[关闭]</a>'
                    }else{
                        return '<span style="color: red">已关闭</span><a href="javascript:void(0)" onclick="devOperation(1,'+row["id"]+')" style="color: green">[开启]</a>'
                    }
                },
                "targets": 4
            },
            {
                "render": function(data, type, row, meta) {
                    return '&nbsp;<button class="btn btn-info btn-xs" onclick="editSchool(\''+row["name"]+'\','+data+','+row["schoolTypeId"]+')" title="编辑修改"><i class="fa fa-edit fa-lg"></i></button>' +
                        '&nbsp;<button class="btn btn-primary btn-xs" onclick="editSchoolSet('+meta.row+')" title="检测阈值配置"><i class="fa fa-list-alt fa-lg"></i></button>' +
                        '&nbsp;<button  class="btn btn-danger btn-xs" onclick="delSchool('+data+')" title="删除学校"><i class="fa fa-trash fa-lg"></i></button>';
                },
                "targets": 5
            },
            {
                "targets": [ 6 ],
                "visible": false
            },
            {
                "targets": [ 7 ],
                "visible": false
            },
            {
                "targets": [ 8 ],
                "visible": false
            },
            {
                "targets": [ 9 ],
                "visible": false
            },
            {
                "targets": [ 10 ],
                "visible": false
            },
            {
                "targets": [ 11 ],
                "visible": false
            },
            {
                "targets": [ 12 ],
                "visible": false
            }
        ],
        language: {
            "sProcessing": "处理中...",
            "sLengthMenu": "显示 _MENU_ 项结果",
            "sZeroRecords": "没有匹配结果",
            "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
            "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
            "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
            "sInfoPostFix": "",
            "sSearch": "搜索:",
            "sUrl": "",
            "sEmptyTable": "表中数据为空",
            "sLoadingRecords": "载入中...",
            "sInfoThousands": ",",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "上页",
                "sNext": "下页",
                "sLast": "末页"
            },
            "oAria": {
                "sSortAscending": ": 以升序排列此列",
                "sSortDescending": ": 以降序排列此列"
            }
        }
    });

});

$("#addSchoolBtn").click(function(){
    if(!checkFormInputValue($("#schoolForm")[0])) return false;

    var params = {
        schoolId:$("#schoolId").html(),
        schoolName:$("#schoolName").val(),
        schoolType:$("#schoolType").val()
    };
    $("#schoolModal").find(".overlay").show();
    $.post(absoluteContextPath + "/root/mergeSchool.do",params,function(res){
        if(res.result == 0){
            $("#schoolModal").find(".overlay").hide();
            $("#schoolModal").modal("hide");
            schooltable.ajax.reload(null,false);
            $(':input','#schoolForm')
                .not(':button, :submit, :reset, :hidden')
                .val('')
                .removeAttr('checked')
                .removeAttr('selected');
        }else{
            alert(res.msg);
            $("#schoolModal").find(".overlay").hide();
        }
    },"json");

});

function delSchool(schoolId){
    var params = {
        schoolId:schoolId
    };
    if (!confirm("删除后将永久丢失数据，确认要删除？")) {
        return;
    }
    $.post(absoluteContextPath + "/root/delSchool.do",params,function(data){
        if(data.result == 0){
            //处理返回的结果
            schooltable.ajax.reload(null,false);
        }else{
            //弹出错误提示框
            alert(data.msg);
        }
    },"json");
}

function editSchool(name,id,schoolType){
    $("#schoolId").html(id);
    $("#schoolName").val(name);
    $("#schoolType").val(schoolType).trigger("change");
    $('#schoolModal').modal('show');
}
$("#schoolOperaBtn").click(function(){
    $("#schoolName").val('');
    $("#schoolId").html('');
    $("#schoolType").val(-1).trigger("change");
    $('#schoolModal').modal('show');
});
$("#schoolImportBtn").click(function(){
    $("#excelFile").val("");
    $("#importModal").modal("show");
});

function editSchoolSet(rowIndex){
    editData = schooltable.row(rowIndex).data();
    $("#personthreshold").val(editData.personthreshold);
    $("#uploadgap").val(editData.uploadgap);
    $("#schoolSetModal").modal("show");
}
$("#schoolSetBtn").click(function(){
    var params = {
        schoolId:editData.id,
        personthreshold:$("#personthreshold").val(),
        uploadgap: $("#uploadgap").val()
    }
    $("#schoolSetModal").find(".overlay").show();
    $.post(absoluteContextPath + "/root/setSchoolDevParam.do",params,function(res){
        if(res.result == 0){
            alert("配置成功");
            $("#schoolSetModal").find(".overlay").hide();
            schooltable.ajax.reload(null,false);
        }else{
            $("#schoolSetModal").find(".overlay").hide();
            alert(res.msg);
        }
    });
});

function uploadResult(){
    var body = $(window.frames['upframe'].document.body);
    var res = body.context.textContent + "";
    var obj = $.parseJSON(res);
    if(obj.result == 0){
        alert("导入成功");
        schooltable.ajax.reload(null,false);
        $('#importModal').find('.overlay').hide();
        $('#importModal').modal("hide");
    }else{
        alert(obj.msg);
        $('#importModal').find('.overlay').hide();

    }
}

function devOperation(devOperation,schoolId){
    var params = {
        schoolId:schoolId,
        devOperation:devOperation
    }
    $.post(absoluteContextPath + "/root/schoolDevOperationSet.do",params,function(res){
        if(res.result == 0){
            schooltable.ajax.reload(null,false);
        }else{
            alert(res.msg);
        }
    });
}