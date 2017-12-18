
//清除提示信息
setInterval(function() {
	if ($(".userName").val() != "") {
		$(".userNameP").html("");
	}
	if ($(".passWord").val() != "") {
		$(".passWordP").html("");
	}
	if ($(".verificationCode").val() != "") {
		$(".verificationP").html("");
	}

}, 100);

$(function() {
	$('.userName').bind('input propertychange', function() {
		$(".errorTS").html(" ");
	});
	$('.passWord').bind('input propertychange', function() {
		$(".errorTS").html(" ");
	});
	$('.verificationCode').bind('input propertychange', function() {
		$(".errorTS").html(" ");
	});
})

//回车时执行
function KeyDown() {
	if (event.keyCode == 13) {
		rsalogin();
	}
}
//判断输入框是否为空，并显示提示信息
function rsalogin() {
	var userName = $(".userName").val();
	var passWord = $(".passWord").val();
	var verificationCode = $(".verificationCode").val();
	if (userName == "") {
		$(".userNameP").html("用户名不能为空!");
		$(".userName").focus();
	}
	if (passWord == "") {
		$(".passWordP").html("密码不能为空!");
		$(".passWord").focus();
	}
	if (verificationCode == "") {
		$(".verificationP").html("请输入验证码!");
		$(".verificationCode").focus();
	}
	if (userName != "" && passWord != "" && verificationCode != "") {
		submit();
	}
}


function loadimage() {
	document.getElementById("randImage").src = "./jsp/image.jsp?" + Math.random();
}

function submit() {
	$.ajax({
		url : project_path+'/Login/loginValidate',
		type : 'POST',
		dataType : 'JSON',
		data : {
			userName : $(".userName").val(),
			userPassword : $(".passWord").val(),
			code : $(".verificationCode").val()
		},
		success : function(result) {
			if (result) {
				var resData = result.success;
				if (resData == "true") {
					window.location.href = './view/index.html?' + Math.random();
				} else if (resData == "false") {
					$('.errorTS').html('账号、密码或验证码输入不正确!请联系管理员。');
				}
			} else {
				alert("获取数据失败!");
			}
		},
		error : function() {
			alert("获取数据失败!");
		}
	})
}