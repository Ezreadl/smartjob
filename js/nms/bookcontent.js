var bookcontent = {
	url:{
		content:function(names){
			return '/shiyan/Test/'+names+'/details';
		}
	},
	detail:{
		
	}
}
$(function () {
	var book = '';
	var name = 'name11';
	$.get(bookcontent.url.content(name),{},function(result){
		if(result['data']){
			alert(result.data.name);
		}
	});
//	  $.ajax({
//	        url:project_path+'/Test/details',
//	        // url:'menu2.json',
//	        type:'get',
//	        dataType:'json',
//	        data:{
//	        },
//	        success: function (result){
//	                var welcomeUser=result.data;
//	                book="<tr>"+
//	                "<td>"+welcomeUser.name+"</td>"+
//	                "<td>"+welcomeUser.answer+"</td>"+	 
//	                "<td>"+welcomeUser.optUserName+"</td>"+
//	                "<td>"+welcomeUser.optDateTime+"</td>"+
//	                "<td>"+welcomeUser.delFlg+"</td>"+
//	                "</tr>";
//	                alert(book);
//	                $("#table-test").append(book);
//	        },
//	        error:function () {
//	            alert("获取数据失败！");
//	        }
//	  });
});