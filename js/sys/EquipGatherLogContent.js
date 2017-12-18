var opts={
	listUrl:project_path+"/EquipGatherLog/findGtherLog?"+qm.getUrlSerialize()
};
$.ajax({
	cache: false,
	type: "POST",
	url:opts.listUrl,
	async: true,
	success: function(ret) {
		if(ret){
			$("#waitId").hide();
			$("#gatherTimeId").html(ret.logTime);
			$("#gatherContentId").html('<pre>'+ret.content+'</pre>');
			$("body").css({overflow: "auto"});
			$("#listpage").show();
		}
	},
	error:function(ret){
		qm.dealResult(ret.responseText);
		$("#waitId").hide();
	}
});