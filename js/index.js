// home-iscroll start
new IScroll('.home',{
	scrollbars: true,
	fadeScrollbars:true,
	bounce: false
});	
// home-iscroll end

// tabbar start
var Dates = null;
var arr = ['yunqian','yunzhong','chanqian','chanhou','chengzhang','fangzhi'];

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
		str+='<a href=""><img src="img/tu/'+val.img+'" alt=""><p>'+val.title+'</p></a>';
	})

	$("#listIscroll").html(str);
	new IScroll(".list");
}

// tabbar end

//return icon start
function into(that){
	var title = that.attr("title");
	var href = that.attr("href");

	if(href=='#list'){
		$(".header-title").html(title);
		$("#return").show();
		$("#return").attr("href",'#home');
	}else if(href=='#home'){
		$(".header-title").html("孕育宝典");
		$("#return").hide();
	}
}
//return icon end
