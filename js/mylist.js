var user_id=localStorage.getItem('user_id');
var nick_name;
var urL=location.href;
var $userid=getUrl(urL).$userid;

//
//if(user_id!=undefined||user_id!=null||user_id!=''){
//	$.ajax({
//		type:"post",
//		url:globalUrl+"index.php/Mobile/JkUser/myLists",
//		data:{user_id:user_id},
//		dataType:'json',
//		success:function(res){
//			var data=res.user;
//			nick_name=data.nick_name;
//		}
//	});
//}



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
ajaxData.user_id=$userid;
var totalPage;
var p=2;

var bodyHeight = window.screen.height;
var bodyWidth = window.screen.width;
//var imgheight=$('.pictwo').height();
//var imgwidth=$('.pictwo').width();
//var count;
loaddata();

function loaddata(){

	$.ajax({
		type:"post",
		url:globalUrl+'index.php/Mobile/JkShare/myshareList',
		data:ajaxData,
		dataType:"json",
		success:function(res){	
			
			
				var data=res.list;
			    $('#head_pic').attr('src',picUrl+res.image);
			    $('#nickname').html(res.nick_name);
			    $('.username').html(res.nick_name);
//			    var html='';
//			    html+='<h1 class="mui-title">黎雄鹰的动态</h1>'
//			    $('.header_info')
				totalPage=res.totalPage;
				
				var str='';
			        if(res.list==''||res.list==undefined||res.list==null){
			        	str+='<div class="nullData">无发布消息</div>';
			        	
			        }else{
			        	for(i=0;i<data.length;i++){
							var imgpic=data[i].image;
						    var str1=imgpic.split(',');
						    var video=data[i].video;
							str+='<div class="dynamic_content clearfix" data-type='+data[i].id+' data-id='+data[i].user_id+' data-likeid='+data[i].del_like_id+'>';
//							str+='<div class="headpic"><img src="'+picUrl+data[i].user_info.head_pic+'" alt="无图片" /></div>';
							if(data[i].user_info==null||data[i].user_info==undefined||data[i].user_info==''){
								
								str+='<div class="headpic"><img src=""/ alt="无图片"></div>';
							}else{
								str+='<div class="headpic"><img src="'+picUrl+data[i].user_info.head_pic+'"/ alt="无图片"></div>';
							}
							
							str+='<div class="content">';
							str+='<div class="content_owner">';
							if(data[i].user_info==null||data[i].user_info==undefined||data[i].user_info==''){
								str+='<div class="name"></div>';
							}else{
								str+='<div class="name">'+data[i].user_info.nick_name+'</div>';
							}
//							str+='<div class="name">'+data[i].user_info.nick_name+'</div>';
							if(data[i].user_info!=null||data[i].user_info!=undefined||data[i].user_info!=''){
								if(data[i].user_info.car_status==1){
									str+='<div class="ownertype">司机</div>';
								}else{
									str+='<div class="ownertype">货主</div>';
								}
							}else{
								str+='<div class="ownertype"></div>';
							}
							
							str+='<div class="zancount" style="opacity: 0;">'+data[i].like_info.length+'</div>'
							str+='</div>';
							str+='<div class="content_world">'+data[i].content+'</div>';
							
							if(imgpic==''){
								str+='';
							}else{
								str+='<div class="content_pic clearfix">';
								for(var l=0;l<str1.length;l++){
		//	
								
									str+='<div class="pic"><img src="'+globalUrl+str1[l]+'" data-preview-src="" data-preview-group="1"/></div>';
							
									
								}
			                    str+='</div>';
							}
							if(video==''){
								str+='';
							}else{
								str+='<div class="content_pic clearfix">';
								
		//	
								
								str+='<div class="pic"><video class="videoitem" src="'+picUrl+data[i].video+'" muted="true" loop="loop" autoplay="autoplay" data-type="1"></video></div>';
							
									
								
			                    str+='</div>';
							}
							
							str+='<div class="content_time">';
							str+='<div class="time share_time">'+data[i].share_time+'</div>';
							
							if($userid==user_id){
								str+='<div class="delete" onclick="deletef(this)">删除</div>';
							}else{
								str+='';
							}
							
							str+='<div class="deletecoments" style="display: none;" onclick="pop()">删除</div>';
					        str+='<div class="dianzan" style="display: none;">';
//					       
							str+='<div class="zanone" onclick="dianzan(this)"><div class="zanimg"><img src="../img/zan.png"/></div><div class="zanworld Snap">点赞</div></div>';
							str+='<div class="zantwo" onclick="pinlun(this)"><div class="zanimg"><img src="../img/pinlun.png"/></div><div class="zanworld">评论</div></div>';
							str+='</div>';
							str+='<div class="comment_pic" onclick="addd_commect(this)"><img src="../img/faxian_pinglun.png"/></div>';
							str+='</div>';
							str+='<div class="content_commnet clearfix">';
							if(data[i].like_info.length>0){
//								count=data[i].like_info.length;
								str+='<div class="dianzanperson clearfix">'
								str+='<div class="zanperson"><img src="../img/zanone.png"/></div>';
								for(var k=0;k<data[i].like_info.length;k++){									
									str+='<span class="commnet_name zanpersonone" data-type='+data[i].like_info[k].id+' data-user='+data[i].like_info[k].user_id+'>'+data[i].like_info[k].nick_name+'</span>';
//									
								}
								 str+='</div>';
							}
							
	//						
							str+='<div class="commentitem">';
							if(data[i].comment_info.length>0){	
								for(var j=0;j<data[i].comment_info.length;j++){
								str+='<div class="commnet clearfix" onclick="deletecoments(this)" data-type="'+data[i].comment_info[j].id+'" data-user="'+data[i].comment_info[j].comment_user+'">'										
							    str+='<span class="commnet_name">'+data[i].comment_info[j].nick_name+':</span>'+data[i].comment_info[j].datail;
	//								
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
			        	for(var i=10;i<2000;i++){
							var share_time=$('.share_time').eq(i).html();
							var c=firendTime(share_time);
							$('.share_time').eq(i).html(c);
						}
			        	
			        }
			        var type=1;
			        $('.videoitem').on('tap',function(){
			        	
						
						
						if(type==1){
							$('.mask').show()
//							$('.publish_btn').hide()
							
						    $(this).width(bodyWidth+'px');
						    $(this).height(bodyHeight+'px');
						    $(this).css('z-index',1000);
						    $(this).css('position','fixed');
						    $(this).css('top',0);
						    $(this).css('left',-6);
						    $(this).css('bottom',0);
						    $(this).css('right',0);
//						    $('#slider').hide();
//							$('.mui-bar').hide();
							type=2;
//						    $(this).attr('data-type',2)
						}else if(type==2){
						    $('.mask').hide()
//							$('.publish_btn').show()
							var imgwidth=$('.pic').width();
							var imgheight=$('.pic').height();
							
						    $(this).width(imgwidth+'px');
						    $(this).height(imgheight+'px');
						    $(this).css('z-index',100);
						    $(this).css('position','static');
//						  $('#slider').show();
//							$('.mui-bar').show();
							type=1;
//						    $(this).attr('data-type',1)
						}
				    });
					
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
			p++;
//			i+=10;
		}
	}

});
var comentid;
var commnet;
function deletecoments(obj){
	
	if(user_id==$(obj).attr('data-user')){
		comentid=$(obj).attr('data-type');
	//	alert(comentid)
		$(obj).parents('.dynamic_content').find('.deletecoments').show()
	//	$('.deletecoments').show();
	    commnet=$(obj);
	}
	
    
}
/*删除评论*/
function pop(){
	
	$.ajax({
		type:"post",
		url:globalUrl+"index.php/Mobile/JkShare/ShareComment",
		data:{comment_id:comentid},
		dataType:'json',
		success:function(res){
			if(res.code==0){
				commnet.remove()
			}
		}
	});
	
}

var messageitem;

//var zancount;

function addd_commect(obj){
	$(obj).prev('.dianzan').toggle();
	$(obj).parents('.dynamic_content').siblings().find('.dianzan').hide()
    var zanstatus=$(obj).prev('.dianzan').find('.zanone').attr('data-type');
	messageitem=$(obj).parents('.dynamic_content').find('.commentitem');
	var len=$(obj).parents('.dynamic_content').find('.zanpersonone').length;
	
//	var likeid=$(obj).parents('.dynamic_content').find('.zanpersonone').attr('data-type');
	var likeid=$(obj).parents('.dynamic_content').attr('data-likeid');
	
 
	var zanlen=$(obj).parents('.dynamic_content').find('.zanpersonone');

	var data=[];
	for(var i=0;i<zanlen.length;i++){
		var index=i;
		var zanid=$(obj).parents('.dynamic_content').find('.zanpersonone').eq(index).attr('data-user');
		data.push(zanid)
	}

//	var zanid=$(obj).parents('.dynamic_content').find('.zanpersonone').eq(len-1).attr('data-user');


	if(likeid==null||likeid==undefined||likeid==''||likeid=='null'){
		
		
		$(obj).parents('.dynamic_content').find('.Snap').html('点赞');
		
	}else{
		$(obj).parents('.dynamic_content').find('.Snap').html('取消')
		

	}

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

	event.stopPropagation();
	$('.chat').hide();
	$('.dianzan').hide();

	var content=$('.content_chat').val();
//	alert(typeof(content));return
	$.ajax({
		type:"post",
		url:globalUrl+"index.php/Mobile/JkShare/ShareComment",
		data:{share_id:id,datail:content,comment_user:user_id},
		dataType:'json',
		success:function(res){
			var data=res;
//			alert(JSON.stringify(data))
//			return
			if(data.code==0){
				loaddata()
				
			}
		}
		
	});
	$('.content_chat').val('')
})

function dianzan(obj){
	
	var id=$(obj).parents('.dynamic_content').attr('data-type');
	var len=$(obj).parents('.dynamic_content').find('.zanpersonone').length;
	var likeid=$(obj).parents('.dynamic_content').attr('data-likeid');
//	alert(likeid);return/*199*/
	var zanlen=$(obj).parents('.dynamic_content').find('.zanpersonone');
//	alert(zanlen.length)
	var data=[];
	for(var i=0;i<zanlen.length;i++){
		var index=i;
		var zanid=$(obj).parents('.dynamic_content').find('.zanpersonone').eq(index).attr('data-user');
		data.push(zanid)
	}

	var parms={};
	if(likeid==''||likeid==undefined||likeid==null||likeid=='null'){
        
		parms.user_id=user_id;
		parms.share_id=id;
		
		$.ajax({
			type:"post",
			url:globalUrl+"index.php/Mobile/JkShare/Sharelike",
			data:parms,
			dataType:'json',
			success:function(res){
				var data=res.code;
				var str='';
				if(data==0){
                    loaddata()
	
					setTimeout(function(){
						$('.dianzan').hide()
					},300)
//					shuaxin()
           
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
				
				if(data==1){
//						if(zancount==0||zancount<1){
//							$(obj).parents('.dynamic_content').find('.dianzanperson').remove();					
//						}else{
//							$(obj).parents('.dynamic_content').find('.zanpersonone').remove();
//						}
                    loaddata()
					setTimeout(function(){
						$('.dianzan').hide()
					},300)
					
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
//function popthis(obj){
//	$(obj).remove()
//}
document.addEventListener('click',function(event){
	event.preventDefault();

	 $('.chat').hide();
	 $('.deletecoments').hide();
	 $('.dianzan').hide();
}, true);

