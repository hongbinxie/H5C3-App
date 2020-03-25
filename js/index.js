// home-iscroll start
new IScroll('.home',{
	scrollbars: true,
	fadeScrollbars:true,
	bounce: false
});	
// home-iscroll end

var Dates = null;
var arr = ['yunqian','yunzhong','chanqian','chanhou','chengzhang','fangzhi'];
var brr = ['孕前准备','孕中知识','产前知识','分娩产后','分娩产后','幼儿成长指标'];

function tabEvent(){
	//ajax
	$.ajax({
		url:"data/data.json",
		type:"get",
		dataType:"json",
		success:function(data){
			Dates=data;
		}
	})

	$(".container").on("touchend",'a',function(e){
		e.preventDefault();

		var that = $(this).attr("href");
		var id = $(this).attr("id");

		$(that).css({
			"transition":"all .5s",
			"transform":"translate3d(0,0,0)"
		}).siblings().css({
			"transform":"translate3d(100%,0,0)"
		})

		if(e.target.parentNode.nodeName=="NAV" || e.target.parentNode.parentNode.nodeName=="NAV"){

			var index = $(this).index();

			$("mark").animate({
				left:index*25+"%"
			})
		}

		into($(this));

		if(that=='#list'){	
			getId(id); 
		}
	})
}
tabEvent();

function getId(id){

	if($.inArray(id,arr) > -1){
		getLoad(id);
	}	

}

function getLoad(id){

	var fenlei = Dates[id]['fenlei'];
	var str = "";

	$.each(fenlei,function(index,val){
		str+='<a href="#article" data-content="'+id+'_'+index+'"><img src="img/tu/'+val.img+'" alt=""><p>'+val.title+'</p></a>';
	})

	$("#listIscroll").html(str);
	new IScroll(".list");
}


function into(that){
	var title = that.attr("title");
	var href = that.attr("href");

	var fav = $(".header-right");
	var back = $("#return");

	if(href=='#list'){
		
		//进入列表页
		$(".header-title").html(title);
		back.show();
		back.attr("href",'#home');
		fav.hide();
		
	}else if(href=='#home'){
		
		//进入首页
		$(".header-title").html("孕育宝典");
		back.hide();

	}else if(href=='#article'){
		
		//进入文章详情页
		fav.show();
		back.attr("href",'#list');
		
		var splits = that.data("content").split("_")[0];
		var idx = $.inArray(splits,arr);
		back.attr("title",brr[idx]);

	}
}
