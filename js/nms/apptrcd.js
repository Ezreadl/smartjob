var aptrcd = {
	url:{
		apptrcd:function(){
			return '/shiyan/appt/findName';
		},
		content:function(){
			return '/shiyan/book/findName';
		},
		course:function(){
			return '/shiyan/course/findName';
		},
		lesson:function(){
			return '/shiyan/lesson/find';
		}
		
	},
	detail:{
		
	}
}
$(function () {
	var name = 'cdd';
	var book = '';
//	$.get(aptrcd.url.apptrcd(),{region:'cdd'},function(result){
//	    alert(1);		
//		if(result['data']){
//          var welcomeUser=result.data;
//          for (var ent in welcomeUser) {
//        	  book +="<tr>"+
//        	  "<td>"+welcomeUser[ent].region+"</td>"+
//              "<td>"+welcomeUser[ent].school+"</td>"+	 
//              "<td>"+welcomeUser[ent].grade+"</td>"+
//              "<td>"+welcomeUser[ent].className+"</td>"+
//              "<td>"+welcomeUser[ent].teacherName+"</td>"+
//              "</tr>"; 
//          }
//          $("#table-test").append(book);
//		}
//	});
//	$.get(aptrcd.url.content(),{contentName:'cdd'},function(result){
//	    alert(2);
//		if(result['rows']){
//          var welcomeUser=result.rows;
//          for (var ent in welcomeUser) {
//              book +="<tr>"+
//              "<td>"+welcomeUser[ent].bookName+"</td>"+
//              "<td>"+welcomeUser[ent].grade+"</td>"+
//              "<td>"+welcomeUser[ent].classType+"</td>"+
//              "</tr>"; 
//          }
//          $("#table-test").append(book);
//		}
//	});	
	$.get(aptrcd.url.lesson(),{course:'语文'},function(result){
	    alert(3);
		if(result['rows']){
          var welcomeUser=result.rows;
          for (var ent in welcomeUser) {
              book +="<tr>"+
              "<td>"+welcomeUser[ent].course+"</td>"+
              "<td>"+welcomeUser[ent].lesson+"</td>"+
              "<td>"+welcomeUser[ent].lessonInfo+"</td>"+
              "</tr>"; 
          }
          $("#table-test").append(book);
		}
	});
});