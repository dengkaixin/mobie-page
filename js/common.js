$(function(){	
	var h=$(window).height();

	//算高度
	$(".loading").height(h);
    $(".H_top").height(h-44);
    $(".H_bot").height(h-49);
	$(".H_top_bot").height(h-44-49);
    $(".H_top_tab").height(h-44-37);
	$(".H_top_bot_tab").height(h-44-49-37);
    $(".H_top_panel").height(h-44-90);
    $(".H_top_bot_panel").height(h-44-49-90);

    //复选调用
    $(".check_blo").chkAll();
        
    //单选调用
    $(".radio_blo").radioAll();

    
	// 显示密码
	$(".clear-input").click(function(){
		if($(this).hasClass("open")){
			$(this).removeClass("open");
		}else{
			$(this).addClass("open");
		}
	})

	// 展示3s关闭进入首页
	setTimeout(function() {  
		$(".loading").fadeOut(1000); 
	},3000);

	// 左侧抽屉式导航
	$(".icon-menu").click(function(){
	    $(".st-menu-panel").css("visibility","visible");
	    $(".st-menu").addClass("st-menu-open");
	    $("nav").not(".st-menu").click(function(){
	      $(".st-menu").removeClass("st-menu-open");
	      $(".st-menu-panel").css("visibility","hidden");
	    })
	})

	// 轮播图
	$(".leftScroll").leftScroll();

    // 文章页头部透明变白色
    $(".H_bot").scroll(function(){
        var scrollTop=$(".essay").offset().top;
        if(scrollTop <= 44){
            $(".header").attr("class","header white");
        }else{
            $(".header").attr("class","header content");
        }
    })
     
    // 点赞
    $(".thumb").on("click", function() {
        $(this).toggleClass("active");
    });
    $(".star").on("click", function() {
        $(this).toggleClass("active");
    });
    // 树
    $(".tree-list").children("li").find('h5').on("click", function() {
        if($(this).next().length > 0) {
            $(this).parent().toggleClass("active");
            if($(this).next("ul").is(":hidden")){
                $(this).next("ul").show();
                myScroll.refresh();
            }else{
                $(this).next("ul").hide();
                myScroll.refresh();
            }      
        }
    });


    // 基层页滚动头部显示搜索
    $(".H_top_bot_panel").scroll(function(){
        var scrollTop1=$(".list").offset().top;
        if(scrollTop1 <= 140){
            $(".header").find("label").hide();
            $(".header").find(".input-search").show();
        }else{
            $(".header").find("label").show();
            $(".header").find(".input-search").hide();
        }
    })

	//禁止页面文字被选取
	// $("body").attr("onselectStart","return false");
});

// 轮播图
$.fn.leftScroll = function (option) {
	$(".leftScroll_picBox_img").width($(window).width()*0.9);
	$(".leftScroll_txt").width($(window).width()*0.9-10);
    var data = {
        isOneScreen: true,
        isScroll: true
    };
    var options = $.extend(data,option);
    this.each(function () {
        var that = this;
        var len = $(this).find(".leftScroll_picBox").length;
        var clone = $(this).find(".leftScroll_picBox").clone(true);
        var clone2 = $(this).find(".leftScroll_picBox").clone(true);
        $(this).children().append(clone);
        $(this).children().append(clone2);
        var width = $(this).find(".leftScroll_picBox").eq(0).innerWidth();
        var left = len;
        var container = $(this).children();
        container.css("left",(-left*width)+"px");
        var touch1,touch2,pageX1=0,pageX2=0,pageY1=0,pageY2=0;
        var startHandle = function (that) {
            container.addClass("transition");
            touch1 = that.originalEvent.touches[0];
            pageX1 = touch1.pageX;
            pageY1 = touch1.pageY;
        };
        var moveHandle = function (that) {
            touch2 = that.originalEvent.touches[0];
            pageX2 = touch2.pageX;
            pageY2 = touch2.pageY;
            if(Math.abs(pageY2-pageY1)>Math.abs(pageX2-pageX1)){
                return
            }else {
                that.preventDefault();
                container.css("left",((-left*width)+(pageX2 - pageX1))+"px");
            }


        };
        var endHandle = function (that) {
            var deltaX = pageX2 - pageX1;
            var deltaY = pageY2 - pageY1;
            if(Math.abs(deltaY)>Math.abs(deltaX)){
                container.css("left",(-left*width)+"px");
                return
            }else {
                if(deltaX<0){
                    if(left<((len*2)+1)){
                        left=left+1;
                        container.css("left",(-left*width)+"px");
                        if(left===((len*2)+1)){
                            setTimeout(function () {
                                container.removeClass("transition");
                                container.css("left",-len*width);
                                left = len;
                            },200)
                        }
                        $(that).on("touchstart",startHandle)
                    }
                }else {
                    if(left>0){
                        left=left-  1;
                        container.css("left",(-left*width)+"px");
                        if(left===0){
                            setTimeout(function () {
                                container.removeClass("transition");
                                container.css("left",-len*width);
                                left = len;
                            },200);
                            $(that).on("touchstart",startHandle)
                        }
                    }
                }
            }

        };
        if(options.isScroll===true){
            $(that).on("touchstart",startHandle);
            $(that).on("touchmove",moveHandle);
            $(that).on("touchend",endHandle);
        }
    });
}

//tab
function nTabs(thisObj,Num){
	if(thisObj.className == "active")return;
	var tabObj = thisObj.parentNode.id;
	var tabList = document.getElementById(tabObj).getElementsByTagName("li");
	for(i=0; i <tabList.length; i++){
  		if (i == Num){
   			thisObj.className = "active";
      		document.getElementById(tabObj+"_Content"+i).style.display = "block";
			myScroll.refresh(); 
  		}else{
   			tabList[i].className = "";
   			document.getElementById(tabObj+"_Content"+i).style.display = "none";
			myScroll.refresh(); 
  		}
	}
}
/*单选*/
$.fn.radioAll=function(){
    var radioChild = $(this).find('span')
    $(radioChild).click(function(){
         if($(this).hasClass("radio_no")){
             
             $(this).parent().find("span").attr("class","radio_no")
             $(this).attr("class","radio_yes") 
             }  
    })
}
/*复选以及全选*/
$.fn.chkAll=function(){
    var findmain = $(this).find('span')
    $(findmain).click(function(){
         if($(this).is(".check_no")){
                $(this).addClass('check_yes')
                $(this).removeClass('check_no')
             }else{
                 $(this).addClass('check_no')
                 $(this).removeClass('check_yes')
             }
    })
    $(".chk_all").toggle(
            function(){$(this).parent().find("span").attr("class","check_yes")},
            function(){$(this).parent().find("span").attr("class","check_no")}
    );
}
//弹出框
function showDiv(id,e){
    $.openPopupLayer({
      name: id,
      target: id
    }); 
}

function closeDiv(id){
$.closePopupLayer(id);
}
 
//超出滚动 
var myScroll;
function loaded() {
	myScroll = new iScroll('wrapper',{ hScrollbar: false, vScrollbar: false});
}
window.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);
