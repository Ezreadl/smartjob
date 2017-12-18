
	var opts={
        saveUrl:project_path+"/Login/changePassword"
	};
	var editform=$("#passwordId").ligerForm({
			inputWidth: 250, labelWidth: 75,space: 10,
			validate: true,
			fields: [
				{display:"旧密码",name:"oldPassword",type:"password",newline:true,validate:{required:true, minlength: 2}},
				{display:"新密码",name:"newPassword",type:"password",newline:true,validate:{required:true, minlength: 2}},
				{display:"重复新密码",name:"newPasswordAgain",type:"password",newline:true,validate:{required:true, minlength: 2}},

			 ],
			buttons: [
			   { text: "保  存", width: 40,icon:saveIcon,click:saveForm},
			   { text: "取  消", width: 40,icon:cancelIcon,click:cancelSave }
			 ]
	});
    //保存
    function saveForm(){
        if (editform.valid()) {
            var data=editform.getData();
            var pwd1=data.newPassword;
            var pwd2=data.newPasswordAgain;
            if(pwd1==pwd2){
                qm.saveData(opts.saveUrl,data,function(ret){
                    if(ret.state==1){
                        var href=project_path+'/Manage/invalidate';
                        // $("#pwdChange").attr('href',href);
                        top.location.href=href;
                    }
                });
			}else{
				$("#warnTS").html("重复密码不一致，请重新输入！");
			}

        }
    }
    //取消保存
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
