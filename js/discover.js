//var user_id=localStorage.setItem('user_id',1);
var user_id=localStorage.getItem('user_id');



$.ajax({
	type:"post",
	url:globalUrl+'index.php/Mobile/JkShare/adList',
	data:{pid:3},
	dataType:"json",
	success:function(res){
		if(res.code==0){
			 var str='';
			var data=res.list;
			for(i=0;i<data.length;i++){
					str+='<li class="swiper-slide"><a href=""><img src="'+picUrl+data[i].ad_code+'"/></a></li>'		
			}
			$('.swiper-wrapper').html(str);
		}
	}
});

var ajaxData={};
ajaxData.p=1;
ajaxData.user_id=user_id;
var totalPage;
var p=2
loaddata()
function loaddata(){

	$.ajax({
		type:"post",
		url:globalUrl+'index.php/Mobile/JkShare/shareList',
		data:ajaxData,
		dataType:"json",
		success:function(res){	
	//		alert(JSON.stringify(res))
			
				var data=res.list;
				totalPage=res.totalPage;
				
				var str='';
				
				for(i=0;i<data.length;i++){
						var imgpic=data[i].image;
					    var str1=imgpic.split(',');
						str+='<div class="dynamic_content clearfix">';
						str+='<div class="headpic"><img src="'+picUrl+data[i].user_info.head_pic+'"/ alt="无图片"></div>';
						str+='<div class="content">';
						str+='<div class="content_owner">';
						str+='<div class="name">'+data[i].user_info.nick_name+'</div>';
						if(data[i].user_info.car_status==1){
							str+='<div class="ownertype">司机</div>';
						}else{
							str+='<div class="ownertype">货主</div>';
						}
						str+='</div>';
						str+='<div class="content_world">'+data[i].content+'</div>';
						str+='<div class="content_pic clearfix">';
						for(var l=0;l<str1.length;l++){
	//	
							
							str+='<div class="pic"><img src="'+globalUrl+str1[l]+'"/></div>';
					
							
						}
	                    str+='</div>';
						
						str+='<div class="content_time">';
						str+='<div class="time share_time">'+data[i].share_time+'</div>';
				        str+='<div class="dianzan" style="display: none;">';
						str+='<div class="zanone">点赞</div>';
						str+='<div class="zantwo" onclick="pinlun()">评论</div>';
						str+='</div>';
						str+='<div class="comment_pic" onclick="addd_commect(this)"><img src="../img/faxian_pinglun.png"/></div>';
						str+='</div>';
						str+='<div class="content_commnet clearfix">'
						if(data[i].like_info.length>0){
						str+='<div class="dianzanperson clearfix">'
						
							
							for(var l=0;i<data[i].like_info[l].length;l++){
								str+='<div class="commnet_name">'+data[i].like_info[l].nick_name+'</div>'
								$('.zanone').attr('data-type',data[i].like_info[l].id);
							}
						str+='</div>'
						}else{
							str+=''
						}
						
						if(data[i].comment_info.length>0){	
							str+='<div class="content_commnet clearfix">';
							for(var j=0;j<data[i].comment_info.length;j++){
								
								str+='<span class="commnet_name">'+data[i].comment_info[j].nick_name+':</span>'+data[i].comment_info[j].datail;
//								str+='<div class="comment_item">'+data[i].comment_info[j].datail+'</div>'		
							
						    }
							str+='</div>';
						}else{
							str+=''
						}
						
						str+='</div>';
						str+='</div>';		
						str+='</div>';	
					
//						
//						
//						<div class="dynamic_content  clearfix">
//							<div class="headpic"><img src="../img/b901b07bb9bbbae99e5c8fb9c27ddfae_t0130a0377e4a7ab989.jpg"/ alt="无图片"></div>
//							<div class="content">
//								<div class="content_owner">
//									<div class="name">黄鲜生</div>
//									<div class="ownertype">货主</div>
//								</div>
//								<div class="content_world">开车了开车了开车了开车了开车了开车了开车了开车了开车了开车了开车了开车了开车了开车了开车了开车了开车了开车了开车了开车了</div>
//								<div class="content_pic clearfix">
//									<div class="pic">
//										<img src="../img/c8e9eef9f1c58ac516b51eaa584e7233_t01a6852a946b324a87.jpg"/>
//									</div>
//									
//									
//								</div>
//								<div class="content_time">
//									<div class="time">10分钟前</div>
//									<div class="dianzan" >
//										<div class="zanone">
//											点赞
//										</div>
//										<div class="zantwo">
//											<!--<label for="male">评论</label>-->
//		                                    <!--<input type="text" name="sex" id="male" value="品论"><br>-->
//											<!--<label for=""></label>
//											<input type="text" placeholder="评论"/>-->
//											<!--<input type="hidden" name="" id="" value="" />-->
//										</div>
//									</div>
//									<div class="comment_pic"><img src="../img/faxian_pinglun.png"/></div>
//								</div>
//								<div class="content_commnet clearfix">
//									<div class="dianzanperson clearfix">
//										<div class="commnet_name">李先生</div>
//										<div class="commnet_name">李先生</div>
//										<div class="commnet_name">李先生</div>
//									</div>
//									
//									<div class="commnet clearfix">
//										<span class="commnet_name">李先生：</span><span class="pinglun">一路顺风！一路顺风！一路顺风！一路顺风！一路顺风！一路顺风！一路顺风！一路顺风！一路顺风！一路顺风</span>
//										<!--<div class="comment_item">一路顺风！一路顺风！一路顺风！一路顺风！一路顺风！一路顺风！一路顺风！一路顺风！一路顺风！一路顺风！一路顺风！</div>-->
//										
//									</div>
//								</div>
//						    </div>
//					    </div>
						
						
						
						
						
						
				}
				$('.adddis').before(str);
			    for(var i=0;i<$('.share_time').length;i++){
					var share_time=$('.share_time').eq(i).html();
					var c=firendTime(share_time);
					$('.share_time').eq(i).html(c);
				}
			
		}
	})
	
}
$(window).scroll(function() {
	if ($(document).scrollTop() >= $(document).height() - $(window).height()){
		if(p>totalPage){
			mui.toast('没有更多结果');
		}else{
			ajaxData.p = p;
//			alert(JSON.stringify(ajaxdata));
			loaddata();
			p++
		}
	}

});

$('#discover').click(function(){
	mui.openWindow({
		url:'publish.html',
		id:'publish.html'
	})
})
function addd_commect(obj){
	$(obj).prev('.dianzan').toggle();
	$(obj).parents('.dynamic_content').siblings().find('.dianzan').hide()

			
}
$('.comment_pic').click(function(){
	
})
function pinlun(){
	$('.chat').show()
	$('.content_chat').focus()
}
function send_message(){
	$('.chat').hide();
	$('.dianzan').hide()
}
