var ObjectList = document.getElementsByTagName('object');
var SNMSCloudOcx;

/*------------------------------------------------------------------------------
【功能】OCX初始化，当启动程序时调用，如果本方法没有调用，那么其他方法调用都会失败
【参数】无
【返回值】无
------------------------------------------------------------------------------*/
function SnCloud_CreateInstance()
{
	for(var i in ObjectList){
		if(ObjectList[i].classid == 'clsid:DEEE91FD-B7EE-451A-BF54-F7A289BC422D'){
			SNMSCloudOcx = ObjectList[i]
			SNMSCloudOcx.SnCloud_CreateInstance();
			return;
		}
	}
}

/*------------------------------------------------------------------------------
【功能】OCX销毁
【参数】无
【返回值】无
------------------------------------------------------------------------------*/
function SnCloud_DestroyInstance()
{
	SNMSCloudOcx.SnCloud_DestroyInstance();
}

 /*------------------------------------------------------------------------------
【功能】设置截图和录像保存路径
【参数】PIcPath: 截图保存路径
	RecordPath: 录像保存路径
【返回值】无
------------------------------------------------------------------------------*/
function SnCloud_SetPath(picturePath,reocrdPath)
{
	SNMSCloudOcx.SnCloud_SetPath(picturePath,reocrdPath);
}

 /*------------------------------------------------------------------------------
【功能】获取当前注册控件的版本号
【参数】无
【返回值】版本号（例如：1.0.0.0）
------------------------------------------------------------------------------*/
function SnCloud_GetVersion()
{
	return SNMSCloudOcx.SnCloud_GetVersion();
}

 /*------------------------------------------------------------------------------
【功能】开启广播设备查询接口
【参数】无
【返回值】无
------------------------------------------------------------------------------*/
function SnCloud_StartUPnP()
{
	SNMSCloudOcx.SnCloud_StartUPnP();
}

/*------------------------------------------------------------------------------
【功能】设置OCX的参数
【参数】DbsIP：数据服务IP
        DbsPort：数据服务端口
        PlatformUserName：管理平台用户
        PlatfromUserPwd: 管理平台密码
【返回值】无
------------------------------------------------------------------------------*/
function SnCloud_Logon(DbsIP,DbsPort,PlatformUserName,PlatfromUserPwd)
{ 
	SNMSCloudOcx.SnCloud_Logon2(DbsIP, DbsPort,PlatformUserName,PlatfromUserPwd);
}

 /*------------------------------------------------------------------------------
【功能】开启通道预览
【参数】
	DbsIP,DbsPort,PlatformUserName,PlatfromUserPwd: 基础参数参照SnCloud_Logon
	ChannelId: 通道ID
	StreamType: 码流类型，0主码流，1子码流
【返回值】无
-----------------------------------------------------------------------------*/
function SnCloud_StartVideo(DbsIP,DbsPort,PlatformUserName,PlatfromUserPwd,ChannelId,StreamType)
{
	SnCloud_Logon(DbsIP,DbsPort,PlatformUserName,PlatfromUserPwd);
	SNMSCloudOcx.SnCloud_StartVideo(ChannelId,StreamType);	
}
 /*------------------------------------------------------------------------------
【功能】开启通道回放
【参数】
	DbsIP,DbsPort,PlatformUserName,PlatfromUserPwd: 基础参数参照SnCloud_Logon
	ChannelId: 通道ID
	Starttime, Endtime: 开始结束时间 ，格式为"YYYY-MM-DD HH:NN:SS"
【返回值】无
------------------------------------------------------------------------------*/
function SnCloud_StartPlayback(DbsIP,DbsPort,PlatformUserName,PlatfromUserPwd,ChannelId,Starttime,Endtime)
{
	SnCloud_Logon(DbsIP,DbsPort,PlatformUserName,PlatfromUserPwd);
	SNMSCloudOcx.SnCloud_StartPlayback(ChannelId,Starttime,Endtime);
}

/*------------------------------------------------------------------------------
【功能】结束所有通道的预览或回放
【参数】无
【返回值】无
------------------------------------------------------------------------------*/
function SnCloud_StopVideo()
{
	SNMSCloudOcx.SnCloud_StopVideo();
}

/*------------------------------------------------------------------------------
【功能】获取设备资源信息
【参数】
DbsIP,DbsPort,PlatformUserName,PlatfromUserPwd: 基础参数参照SnCloud_Logon
SourceTypes: 资源类型
资源类型列表，其以逗号隔开，值分别如下 （如：0,5）
0	位置节点
1	编码设备
2	报警主机
3	解码设备
4	灯控设备
5	通道类型	
【返回值】资源列表 
节点ID,,节点父ID,,节点资源类型,,节点名称,,节点其它信息
如下
4028ead4334367950133437657450126,,0,,0,,根节点,,其它信息;;
8a92c86e5692133c01569244abb60002,,4028ead4334367950133437657450126,,0,,研发3部门,,其它信息;;
8a92c86e5745f2ad015746734d23011c,,8a92c86e5692133c01569244abb60002,,5,,实验室监管1(10.18.73.72),,其它信息;;
------------------------------------------------------------------------------*/
function SnCloud_GetSourceInfo(DbsIP,DbsPort,PlatformUserName,PlatfromUserPwd,sourceTypes)
{
	SnCloud_Logon(DbsIP,DbsPort,PlatformUserName,PlatfromUserPwd);
	alert("DbsIP,DbsPort,"+DbsIP);
	alert("PlatformUserName,PlatfromUserPwd"+PlatformUserName+PlatfromUserPwd);
	return SNMSCloudOcx.SnCloud_GetSourceInfo(sourceTypes);
}

/*------------------------------------------------------------------------------
【功能】获取报警信息列表
【参数】
	DbsIP,DbsPort,PlatformUserName,PlatfromUserPwd: 基础参数参照SnCloud_Logon
	AlarmTypeId: 报警类型 (检索条件 -1=全部，其它)
	DevName: 报警设备名称(检索条件，支持模糊搜索)
	AlarmPosi: 报警地点(检索条件，支持模糊搜索)
	AlarmTiemB: 报警时间起(检索条件)
	AlarmTiemE: 报警时间止(检索条件)
	StartLine: 开始行(必填)
	LineCnt：行数(必填)
【返回值】报警信息列表，按照报警时间倒序排列
报警ID,,报警设备ID,,报警设备名称,,报警地点,,报警时间,,报警类型,,报警内容,,报警图片索引;;
报警ID2,,报警设备ID2,,报警设备名称2,,报警地点2,,报警时间2,,报警类型2,,报警内容2,,报警图片索引2;;
如下:
8a92c86e5692133c01569244abb60002,,8a92c86e5692133c01569244abb60003,,园区门口摄像头,,园区门口,,2016-11-29 16:50:00,,拌线报警,,拌线报警详情,,AlarmPic//199.jpg;;
8a92c86e5692133c01569244abb60003,,8a92c86e5692133c01569244abb60004,,园区门外摄像头,,园区门外,,2016-11-29 16:50:00,,拌线报警,,拌线报警详情,,AlarmPic//200.jpg;;	
------------------------------------------------------------------------------*/
function SnCloud_GetAlarmInfos(
  DbsIP,DbsPort,PlatformUserName,PlatfromUserPwd,
  AlarmTypeId, DevName, AlarmPosi, AlarmTiemB, AlarmTimeE, 
  StartLine, LineCnt)
{
	SnCloud_Logon(DbsIP,DbsPort,PlatformUserName,PlatfromUserPwd);
	return SNMSCloudOcx.SnCloud_GetAlarmInfos(AlarmTypeId, DevName, AlarmPosi, AlarmTiemB, AlarmTimeE, 
			StartLine, LineCnt);	
}


 /*------------------------------------------------------------------------------
【功能】获取报警类型
【参数】
	DbsIP,DbsPort,PlatformUserName,PlatfromUserPwd: 基础参数参照SnCloud_Logon
【返回值】报警类型ID,,报警名称;;
  报警类型ID2,,报警名称2;;
如下：
 1,,编码设备报警;;
 2,,报警主机报警;;
-----------------------------------------------------------------------------*/
function SnCloud_GetAlarmTypes(DbsIP,DbsPort,PlatformUserName,PlatfromUserPwd)
{
	SnCloud_Logon(DbsIP,DbsPort,PlatformUserName,PlatfromUserPwd);
	return SNMSCloudOcx.SnCloud_GetAlarmTypes();
}

 /*------------------------------------------------------------------------------
【功能】获取报警图片
【参数】
DbsIP,DbsPort,PlatformUserName,PlatfromUserPwd: 基础参数参照SnCloud_Logon
PicIndex: 报警图片索引
【返回值】报警图片存储的绝对路径
------------------------------------------------------------------------------*/
function SnCloud_GetAlarmPic(DbsIP,DbsPort,PlatformUserName,PlatfromUserPwd,PicIndex)
{	
	SnCloud_Logon(DbsIP,DbsPort,PlatformUserName,PlatfromUserPwd);
	return SNMSCloudOcx.SnCloud_GetAlarmPic(PicIndex);	
}
 /*------------------------------------------------------------------------------
【功能】开启通道对讲或广播
【参数】
DbsIP,DbsPort,PlatformUserName,PlatfromUserPwd: 基础参数参照SnCloud_Logon
sChannelIds: 通道ID列表，以','分割，大于1使用广播
	IsShow: 是否显示对讲面板，0不显示，1显示
【返回值】0=成功 非0=错误代码
------------------------------------------------------------------------------*/
function SnCloud_StartTalk(DbsIP,DbsPort,PlatformUserName,PlatfromUserPwd,sChannelIds,IsShow)
{
	SnCloud_Logon(DbsIP,DbsPort,PlatformUserName,PlatfromUserPwd);
	return SNMSCloudOcx.SnCloud_StartTalk(sChannelIds,IsShow);
}

 /*------------------------------------------------------------------------------
【功能】关闭所有通道对讲或广播
【参数】
【返回值】无
------------------------------------------------------------------------------*/
function SnCloud_StopTalk()
{
	return SNMSCloudOcx.SnCloud_StopTalk();
}

//事件--------------------------------------------------------------------------

 /*------------------------------------------------------------------------------
【功能】添加报警推送事件
【参数】OnEvent
【返回值】无
【回调函数类型】function(AInfo)
【回调函数参数】AInfo: 报警内容
	格式：报警ID,,报警设备ID,,报警设备名称,,报警地点,,报警时间,,报警类型,,报警内容,,报警图片索引
	例子：8a92c86e5692133c01569244abb60002,,8a92c86e5692133c01569244abb60003,,园区门口摄像头,,园区门口,,2016-11-29 16:50:00,,拌线报警,,拌线报警详情,,AlarmPic//199.jpg;;
------------------------------------------------------------------------------*/
function SnCloud_AddAlarmInfoNotify(AOnEvent)
{
	/*
		【回调函数类型】function(AInfo)
		【回调函数参数】AInfo: 报警内容
			格式：报警ID,,报警设备ID,,报警设备名称,,报警地点,,报警时间,,报警类型,,报警内容,,报警图片索引
			例子：8a92c86e5692133c01569244abb60002,,8a92c86e5692133c01569244abb60003,,园区门口摄像头,,园区门口,,2016-11-29 16:50:00,,拌线报警,,拌线报警详情,,AlarmPic//199.jpg;;
	*/
	return SNMSCloudOcx.addEventListener("OnAlarmInfoNotify", AOnEvent)
}