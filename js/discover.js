//var user_id=localStorage.setItem('user_id',1);
var user_id=localStorage.getItem('user_id');
var nick_name;

$.ajax({
	type:"post",
	url:globalUrl+"index.php/Mobile/JkUser/myLists",
	data:{user_id:user_id},
	dataType:'json',
	success:function(res){
		var data=res.user;
		nick_name=data.nick_name;
	}
});


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
			
			
				var data=res.list;
				totalPage=res.totalPage;
				
				var str='';
			        if(data.length<0){
			        	str+='<div class="nullData">无发布消息</div>';
			        	
			        }else{
			        	for(i=0;i<data.length;i++){
							var imgpic=data[i].image;
						    var str1=imgpic.split(',');
							str+='<div class="dynamic_content clearfix" data-type='+data[i].id+' data-id='+data[i].user_id+'>';
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
							
							if(imgpic==''){
								str+='';
							}else{
								str+='<div class="content_pic clearfix">';
								for(var l=0;l<str1.length;l++){
		//	
								
									str+='<div class="pic"><img src="'+globalUrl+str1[l]+'"/></div>';
							
									
								}
			                    str+='</div>';
							}
							
							
							str+='<div class="content_time">';
							str+='<div class="time share_time">'+data[i].share_time+'</div>';
							
							if(data[i].share_statys==1){
								str+='<div class="delete" onclick="deletef(this)">删除</div>';
							}else{
								str+='';
							}
							
							
					        str+='<div class="dianzan" style="display: none;">';
//					        for(var k=0;k<data[i].like_info.length;k++){
//					        	str+='<div class="zanone" onclick="dianzan(this)" data-type='+data[i].like_info[k].id+'><div class="zanimg"><img src="../img/zan.png"/></div><div class="zanworld">点赞</div></div>';
//					        }
							str+='<div class="zanone" onclick="dianzan(this)"><div class="zanimg"><img src="../img/zan.png"/></div><div class="zanworld">点赞</div></div>';
							str+='<div class="zantwo" onclick="pinlun(this)"><div class="zanimg"><img src="../img/pinlun.png"/></div><div class="zanworld">评论</div></div>';
							str+='</div>';
							str+='<div class="comment_pic" onclick="addd_commect(this)"><img src="../img/faxian_pinglun.png"/></div>';
							str+='</div>';
							str+='<div class="content_commnet clearfix">';
							if(data[i].like_info.length>0){
								str+='<div class="dianzanperson clearfix">'
								str+='<div class="zanperson"><img src="../img/zanone.png"/></div>';
								for(var k=0;k<data[i].like_info.length;k++){									
									str+='<span class="commnet_name">'+data[i].like_info[k].nick_name+'</span>';
//									$('.zanone').attr('data-type',data[i].like_info[k].id)
								}
								 str+='</div>';
							}
							
	//						
							str+='<div class="commentitem">';
							if(data[i].comment_info.length>0){	
								for(var j=0;j<data[i].comment_info.length;j++){
								str+='<div class="commnet clearfix">'										
							    str+='<span class="commnet_name">'+data[i].comment_info[j].nick_name+':</span>'+data[i].comment_info[j].datail;
	//								str+='<div class="comment_item">'+data[i].comment_info[j].datail+'</div>'		
								str+='</div>';
								}
							}
							str+='</div>';
							str+='</div>';
							str+='</div>';		
							str+='</div>';	
						
	
						}
			       }
			        if(ajaxData.p==1){
			        	$('.adddis').html(str);
			        	 for(var i=0;i<10;i++){
							var share_time=$('.share_time').eq(i).html();
							var c=firendTime(share_time);
							$('.share_time').eq(i).html(c);
						}
			        }else{
			        	$('.adddis').append(str);
			        	for(var i=10;i<20;i++){
							var share_time=$('.share_time').eq(i).html();
							var c=firendTime(share_time);
							$('.share_time').eq(i).html(c);
						}
			        	
			        }
					
//				    for(var i=0;i<$('.share_time').length;i++){
//						var share_time=$('.share_time').eq(i).html();
//						var c=firendTime(share_time);
//						$('.share_time').eq(i).html(c);
//					}
				
				
			
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
	if(user_id==''||user_id==null||user_id==undefined){
		mui.openWindow({
			url:'../login.html',
			id:'../login.html'
		 })
	}else{
		mui.openWindow({
		url:'publish.html',
		id:'publish.html'
	})
	}
	
})
var messageitem;
function addd_commect(obj){
	$(obj).prev('.dianzan').toggle();
	$(obj).parents('.dynamic_content').siblings().find('.dianzan').hide()
    var zanstatus=$(obj).prev('.dianzan').find('.zanone').attr('data-type');
	messageitem=$(obj).parents('.dynamic_content').find('.commentitem');
}
$('.comment_pic').click(function(){
	
})
var id;/*朋友圈的id*/
function pinlun(obj){
	$('.chat').show()
	$('.dianzan').hide()
	$('.content_chat').focus();
	id=$(obj).parents('.dynamic_content').attr('data-type');
}

$('.chat_send').on('click',function(event){
//	event.stopPropagation();
	event.stopPropagation();
	$('.chat').hide();
	$('.dianzan').hide();

	var content=$('.content_chat').val();
	
	$.ajax({
		type:"post",
		url:globalUrl+"index.php/Mobile/JkShare/ShareComment",
		data:{share_id:id,datail:content,comment_user:user_id},
		dataType:'json',
		success:function(res){
			var data=res;
			if(data.code==0){
				mui.toast('评论成功');
				var str='';
				str+='<div class="commnet clearfix" onclick="popthis(this)">';								
			    str+='<span class="commnet_name">'+nick_name+':</span>'+content;
		        str+='</div>'
				
				messageitem.append(str)
				
			}
		}
		
	});
})

//function send_message(){
//	
//	
//}

function dianzan(obj){
	
	var id=$(obj).parents('.dynamic_content').attr('data-type');
	var likeid=$(obj).attr('data-type');

	var parms={};
	if(likeid==''||likeid==undefined||likeid==null){
		parms.user_id=user_id;
		parms.share_id=id;
		
		$.ajax({
			type:"post",
			url:globalUrl+"index.php/Mobile/JkShare/Sharelike",
			data:parms,
			dataType:'json',
			success:function(res){
				var data=res.code;
				
				if(data==0){
					$(obj).find('.zanworld').html('取消');
					setTimeout(function(){
						$('.dianzan').hide()
					},300)
					shuaxin()
				}
			}
		});
	}else{
		parms.user_id=user_id;
		parms.share_id=id;
		parms.like_id=likeid;
		$.ajax({
			type:"post",
			url:globalUrl+"index.php/Mobile/JkShare/Sharelike",
			data:parms,
			dataType:'json',
			success:function(res){
				var data=res.code;
				
				if(data==0){
					$(obj).find('.zanworld').html('点赞');
					setTimeout(function(){
						$('.dianzan').hide()
					},300)
					shuaixin()
				}
			}
		});
	}
	
}

var share_id;
var dynamic_content;
function deletef(obj){
	dynamic_content=$(obj).parents('.dynamic_content');
	share_id=$(obj).parents('.dynamic_content').attr('data-type');
	$('.mask').show()
	reminder('你确定要删除此朋友圈？');
	
}
function makesure(){
	$.ajax({
		type:"post",
		url:globalUrl+"index.php/Mobile/JkShare/Share",
		data:{share_id:share_id,user_id:user_id},
		dataType:'json',
		success:function(res){
			var data=res.code;
			if(data==0){
				mui.toast('删除成功');
				dynamic_content.remove()
				$('.reminder').hide()
				$('.mask').hide();
			}
		}
	})
}

//document.addEventListener('click',function(event){
//	event.preventDefault();
////	e.preventDefault();
//	 $('.chat').hide()
//}, true);