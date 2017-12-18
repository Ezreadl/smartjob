//加载菜单
$(function () {
    var href=project_path+'/Login/invalidate';
    $("#logOut").attr('href',href);
    var i,m,n,o;
    var subMenu01;
    $.ajax({
        url:project_path+'/Manage/findUserNick',
        // url:'menu2.json',
        type:'post',
        dataType:'json',
        data:{},
        success: function (result){
                var welcomeUser=result.name;
                oid=result.oid;
                $("#uesrname").html(welcomeUser);
        },
        error:function () {
            alert("获取数据失败！");
        }
    })
//    $.ajax({
//        url:project_path+'/Manage/findUserMenu',
//        // url:'menu.json',
//        type:'post',
//        dataType:'json',
//        data:{},
//        success: function (result) {
//            if (result) {
//                        //添加页面一级导航菜单
//                        subMenu01=result.rows;
//                        var subMenu02="";
//                        for(var x=0;x<subMenu01.length;x++){
//                            subMenu02+='<li class="navLi"><a  target="_top">'+subMenu01[x].menuName+'</a><span class="delimiter"></span></li>';
//                        }
//                        $("#nav").html(subMenu02);
//                        $(".navLi").eq(0).css("background","#6095c2").siblings(".navLi").css("background","");
//                        $("#iframeMain").attr('src',timeStamp(subMenu01[0].actionClass));
//
//                        var mArray=[];
//                        $("#nav").on("click",".navLi",function () {
//                            m=$(this).index();
//                            $(".navLi").eq(m).css("background","#6095c2").siblings(".navLi").css("background","");
//                            if(mArray.indexOf(m)==-1){
//                                mArray.push(m);
//                                if(subMenu01[m].actionType==1){
//                                    leftMenuHidden();
//                                    $("#iframeMain").attr("src",timeStamp(subMenu01[m].actionClass));
//                                }else{
//                                    leftMenuShow();
//                                    backFun();
//                                    //添加页面二级菜单
//                                    var subMenu11=subMenu01[m].subMenu;
//                                    var subMenu12="";
//                                    for(var y=0;y<subMenu11.length;y++){
//                                        subMenu12+='<li class="treeview sameMenu'+m+'">'+
//                                            '<a href="#">'+
//                                            '<i class="fa fa-bar-chart"></i><span>'+subMenu11[y].menuName+'</span><i class="fa fa-angle-left pull-right"></i>'+
//                                            '</a>'+
//                                            '<ul class="treeview-menu"  id="lastMenu'+y+'"></ul>'+
//                                            '</li>';
//                                    }
//                                    $(".header").after(subMenu12);
//
//                                    //添加页面二级菜单下的子菜单
//                                    for(var a=0;a<subMenu11.length;a++){
//                                        var MenuId="lastMenu";
//                                        MenuId+=a;
//                                        var subMenu21=subMenu11[a].subMenu;
//                                        var subMenu22="";
//
//                                        for(var b=0;b<subMenu21.length;b++){
//                                            subMenu22+='<li class="menuLi'+m+'"><i class="fa fa-caret-right"></i>'+subMenu21[b].menuName+'</li>';
//                                        }
//                                        $("#"+MenuId).html(subMenu22);
//                                    }
//                                    $("#iframeMain").attr("src",timeStamp(subMenu01[m].subMenu[0].subMenu[0].actionClass));
//                                    $(".treeview-menu li").eq(0).css("color","#ffffff").siblings(".treeview-menu li").css("color","#4B9FFD");
//                                }
//                            }else{
//                                if(subMenu01[m].actionType==1){
//                                    leftMenuHidden();
//                                    $("#iframeMain").attr("src",subMenu01[m].actionClass);
//                                }else{
//                                    leftMenuShow();
//                                    backFun();
//                                    $("#iframeMain").attr("src",timeStamp(subMenu01[m].subMenu[0].subMenu[0].actionClass));
//                                    $(".treeview-menu li").css("color","#4B9FFD");
//                                    var MenuLiClass="menuLi";
//                                    MenuLiClass+=m;
//                                    var firstChild=$("."+MenuLiClass)[0];
//                                    firstChild.setAttribute("style","color:#ffffff !important");
//                                }
//                            }
//                            var menu="sameMenu";
//                            menu+=m;
//                            $(".treeview").css("display","none");
//                            $("."+menu).css("display","block");
//                        })
//        			}
//        },
//        error:function () {
//            alert("获取数据失败！");
//        }
//	})
//    

    $("#setMenu").on("click",".treeview-menu li",function () {
        var yList=$(this).parent().attr("id");
        var p= yList.substr(yList.length-1,1);
        n=$(this).index();
        var MenuLiClass="menuLi";
        MenuLiClass+=m;
        $("."+MenuLiClass).css("color","#4B9FFD");
        $(this).css("color","#ffffff");
        $("#iframeMain").attr("src",timeStamp(subMenu01[m].subMenu[p].subMenu[n].actionClass));
    });

    $(".groupLi").eq(0).css("borderTop","2px solid #FD5A00").siblings(".groupLi").css("borderTop","");
    $(".groupLi").eq(0).css("borderBottom","none").siblings(".groupLi").css("borderBottom","");
    $(".groupLi").eq(0).css("background","white").siblings(".groupLi").css("background","");
    $(".groupDiv").eq(0).css("display","block").siblings(".groupDiv").css("display","none");

    $(".groupLi").click(function () {
        i=$(this).index();
        $(".groupDiv").eq(i).css("display","block").siblings(".groupDiv").css("display","none");
        $(".groupLi").eq(i).css("borderTop","2px solid #FD5A00").siblings(".groupLi").css("borderTop","");
        $(".groupLi").eq(i).css("borderBottom","none").siblings(".groupLi").css("borderBottom","");
        $(".groupLi").eq(i).css("background","white").siblings(".groupLi").css("background","");
    });

    //菜单收缩
    $("#toBack ,#toBack1,#toBack2").click(function(){
        $("#sidebar").animate({left:"-250px"});
        $("#back_btn").delay(500).animate({left:'0'});
        $(".right_container").animate({marginLeft:'0px'});
    });

    //显示左边菜单
     function leftMenuShow() {
        $(".sidebar").css("display","block");
        $("#back_btn").css("display","block");
        $(".sidebar-menu").css("display","block");
        $(".right_container").css("marginLeft","220px");
     }
    //隐藏左边菜单
     function leftMenuHidden() {
        $(".sidebar").css("display","none");
        $("#back_btn").css("display","none");
         $(".sidebar-menu").css("display","none");
        $(".right_container").css("marginLeft","0");
     }




})
//  $("#back_btn ").click()
function backFun(){
    $("#sidebar").animate({left:'0'});
    $("#back_btn").delay(500).animate({left:'-30px'});
    $(".right_container").animate({marginLeft:'220px'});
};
//点击欢迎您，显示用户管理界面
function userMGR() {
    var url=project_path+"/view/sys/SysWelcomeUser.html?oid="+oid;
    // var url="../view/sys/SysWelcomeUser.html";
    // qm.openWindow(url,"用户信息","35%","55%");
    $.ligerDialog.open({
        height:400,
        width: 500,
        title : '用户信息',
        url:url
    });
}
//修改密码界面
function showChangePWD(){
    var url=project_path+"/view/password.html?t="+(new Date()).getTime();
    // var url="../view/password.html?t="+(new Date()).getTime();
    // qm.openWindow(url,"修改密码","35%","42%");
    $.ligerDialog.open({
        height:400,
        width: 500,
        title : '修改密码',
        url:url
    });
}
//侧边菜单
$.sidebarMenu=function(menu){
    var animationSpeed = 300;
    $(menu).on('click', 'li a', function(e) {
        var $this = $(this);

        var checkElement = $this.next();

        if (checkElement.is('.treeview-menu') && checkElement.is(':visible')) {
            checkElement.slideUp(animationSpeed, function() {
                checkElement.removeClass('menu-open');
            });
            checkElement.parent("li").removeClass("active");
        }
        else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
            var parent = $this.parents('ul').first();
            var ul = parent.find('ul:visible').slideUp(animationSpeed);
            ul.removeClass('menu-open');
            var parent_li = $this.parent("li");
            checkElement.slideDown(animationSpeed, function() {
                checkElement.addClass('menu-open');
                parent.find('li.active').removeClass('active');
                parent_li.addClass('active');
            });
        }
        if (checkElement.is('.treeview-menu')) {
            e.preventDefault();
        }
    });
};
function _ajaxGetNumber() {
    $.ajax({
        url:project_path+'/Login/loginUserCount',
        // url:"login.json",
        type:'post',
        dataType:'json',
        data:{},
        success: function (result){
           if(result.data == 0) {
                alert("session已超时,请重新登录系统!");
                qm.loginAgin();//重新登录
                // qm.messageError("session过期,请重新登录系统!", '登录超时', function () {
                //     qm.loginAgin();//重新登录
                // });
            }else{
                $("#loginNumber").html(result.data);
            }
        },
        error:function () {
            alert("获取数据失败！");
        }
    })
}
_ajaxGetNumber();
window.setInterval(_ajaxGetNumber,1000*60);
