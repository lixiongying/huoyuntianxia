var userid=localStorage.getItem('user_id');
var carstatus=localStorage.getItem('car_status');
var type=0;
  var mySwiper = new Swiper('.swiper-container', {
		autoHeight: true,
		onSlideChangeStart: function() {
			$(".main_nav .active_nav").removeClass('active_nav');
			$(".main_nav .nav_li").eq(mySwiper.activeIndex).addClass('active_nav');
		}
	});
	$(".main_nav .nav_li").on('tap', function(e) {
		$(".tabs .active_nav").removeClass('active_nav');
		$(this).addClass('active_nav');
		mySwiper.swipeTo($(this).index());
		$(window).scrollTop(0);
    	$('.swiper-slide').scrollTop(0);

	});
	
var ajaxData={};
ajaxData.type=type;
var url;
var p=2;
ajaxData.user_id=userid;
ajaxData.p=1;
if(carstatus==0){
	url=globalUrl+"index.php/Mobile/JkOrderlist/userList";
}else if(carstatus==1){
	url=globalUrl+"index.php/Mobile/JkOrderlist/sijiList";
}
var totalpage;
function getgoods(){
	$.ajax({
		type:'post',
		data:ajaxData,
		dataType:'json',
		url:url,
		success:function(res){
			var str="";
			var data=res.info;
			if(data.length==0){
				
			}else{
				str+='<div class="order_li" onclick="url(this)" data-url="order_detail.html" >';
				str+='<div class="order_top clear">';
				str+='<div class="order_sn">订单号：<span>'+data[i].order_sn+'</span></div>';
				str+='<div class="over_fabu">已发布</div>';
				str+='<div class="order_bottom ">';
				str+='<div class="order_bottom_s clear" >';
				str+='<div class="f-left order_pic">'+data[i].img+'</div>';
				str+='<div class="f-left order_detail">';
				str+='<div class="order_address">'+data[i].goodslist.start_address+'</div>';
				str+='<div class="clear order_type">';
				str+='<div class="f-left type">'+data[i].goodslist.cat_id1+'</div>';
				str+='<div class="f-left chicun"><span>'+data[i].goodslist.ton+'</span>吨/<span>'+data[i].goodslist.cube+'</span>方</div>';
				str+='</div>';
				str+='<div class="order_date">'+data[i].load_time+'</div>';
				str+='</div>';
				if(data[i].goodslist.type_id==2){
					str+='<div class="f-right car_type">长途车</div>';
				}else{
					str+='<div class="f-right car_type">短途车</div>';
				}
				str+='</div>';
				str+='<div class="order_bottom_x clear" >';
				str+='<div class="f-right">';
				str+='<div class="order_money f-right">¥ <span>'+data[i].goodslist.goods_price+'<span></div>';
				str+='<div class="xiaoji f-right">小计：</div>';
				str+='</div>';
				str+='</div>';
				str+='</div>';
				if(type==3){
					str+='<div class="order_com clear">';
					str+='<div class="f-right out_com ">去评价</div>';
					str+='</div>';
										'
				}
				str+='</div>';
//				<div class="order_li" onclick="url(this)" data-url="order_detail.html" >
//										<div class="order_top clear">
//											<div class="order_sn">订单号：20180226171900016297</div>
//											<div class="over_fabu">已发布</div>
//										</div>
//										<div class="order_bottom ">
//											<div class="order_bottom_s clear" >
//												<div class="f-left order_pic">
//													<img src="../../img/75c5ca005a7112cea4abb9c55a544f78_t013afb6f9efc2b4880.jpg"/>
//												</div>
//												<div class="f-left order_detail">
//													<div class="order_address">广州天河-深圳罗湖</div>
//													<div class="clear order_type">
//														<div class="f-left type">化工药品</div>
//														<div class="f-left chicun">2吨/16方</div>
//													</div>
//													<div class="order_date">2018-05-01</div>
//												</div>
//												<div class="f-right car_type">长途车</div>
//											</div>
//											<div class="order_bottom_x clear" >
//												<div class="f-right"> 
//													<div class="order_money f-right">¥ 1200.00</div>
//													<div class="xiaoji f-right">小计：</div>
//													
//												</div>
//											</div>
//										</div>
//									</div>
			}
		}
	})
}
