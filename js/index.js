// home-iscroll start
new IScroll('.home',{
	scrollbars: true,
	fadeScrollbars:true,
	bounce: false
});	
// home-iscroll end

// tabbar start
function tabEvent(){

	$(".container").on("touchend",'a',function(e){
		e.preventDefault();

		var that = $(this).attr("href");

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
	})
}
tabEvent();
// tabbar end

//return icon start
function into(that){
	var href = that.attr("href");

	if(href=='#list'){
		$("#return").show();
		$("#return").attr("href",'#home');
	}else if(href=='#home'){
		$("#return").hide();
	}
}
//return icon end
