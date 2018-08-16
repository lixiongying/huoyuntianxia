
var user_id=localStorage.getItem('user_id');
  mui.init({
		pullRefresh: {
			container: '#pullrefresh',
			down: {
				auto:true,
				contentrefresh: '正在加载...',
				style:'circle',
				callback: pulldownRefresh
			},

		}
	});
	
	
	function pulldownRefresh() {
		setTimeout(function() {
			lodding();
			mui('#pullrefresh').pullRefresh().endPulldown();
//			mui.toast("为你推荐了5篇文章");
		}, 1500);
	}
//加载好友
//$(function shuaixin(){
//		res=setInterval(function(){
//			lodding()
//		},1000)
//
//})
//function shuaixin(){
//	var shuaixin_type=$('.myfriend').attr('data-type');
//	var shuaixin_type1=$('.mystranger').attr('data-type');
////	alert(shuaixin_type);
//	setInterval(function(){
//			lodding()
//		},1000)
//
//			ref1=setInterval(function(){
//			meiren()
//		},1000)
//} 
//	function lodding(){
//			mui.ajax({
//			type:"post",
//			url:globalUrl+'index.php/Mobile/JkShare/afirendsList',
//			data:{user_id:user_id,type:1},
//			dataType:'json',
//			success:function(res){
//		//		alert(JSON.stringify(res))
//				var data=res.list;
//				var str='';
//				if(data==''||data==null||data==undefined){
//					str +='<div class="friend">暂无好友</div>'	
//				}else{
//					for(i=0;i<data.length;i++){
//						
//						if(data[i].type==1){
//							str += '<div class="friend joinLt" data-id="'+data[i].friend_id+'" data-nick="+data[i].user_info.nick_name+" data-url="im-chat.html" style="position: relative;">'                	
//							str += '<div class="friend_head">'
//							if(data[i].user_info.head_pic==null){
//								
//								str += '<img src="../img/zhuanxianxiangqing_xiehuowangdian_up.png"/>'
//							}else{
//								
//								str += '<img src="'+picUrl+data[i].user_info.head_pic+'"/>'
//							}
//							if(data[i].count_weidu>0){
//							str+='<div class="po_friends">未读'+data[i].count_weidu+'</div>'
//								
//							}
//		
//							str += '</div>'
//							str += '<div class="friend_name">'+data[i].user_info.nick_name+''
//							str += '<div class="name">'
//							str += '</div>'
//							str += '<div class="descrie">'		
//							str += '</div>'	
//							str += '</div>'	
//							str += '</div>'	
//						}
//					}
//		
//				}
//				$('#myfriend').html(str);
//			}
//		})
//	}
//lodding()
//alert(user_id)
    function lodding(){
			mui.ajax({
			type:"post",
			url:globalUrl+'index.php/Mobile/JkShare/afirendsList',
			data:{user_id:user_id},
			dataType:'json',
			success:function(res){
//				alert(JSON.stringify(res))
				var data=res.list;
				
				var str='';
				if(data==''||data==null||data==undefined||data.length==0){
					str +='<div class="nulldata">暂无好友</div>';
					
				}else{
					for(i=0;i<data.length;i++){
						
						
							str += '<div class="friend joinLt" data-id="'+data[i].friend_id+'" data-type="'+data[i].id+'" data-nick="'+data[i].user_info.nick_name+'" data-attendid='+data[i].atten_id+' data-url="im-chat.html" style="position: relative;">';
							str += '<ul id="OA_task_2" class="mui-table-view">';             	
							str += '<li class="mui-table-view-cell">';
							str+='<div class="mui-slider-right mui-disabled deletefriend">';
							str+='<a class="mui-btn mui-btn-yellow mui-icon">删除</a>';
							str+='</div>';
							str+='<div class="mui-slider-handle friend">';
							str+='<div class="friend_head" >';
							if(data[i].user_info.head_pic==null){
								
								str += '<img src="../img/zhuanxianxiangqing_xiehuowangdian_up.png"/>'
							}else{
								
								str += '<img src="'+picUrl+data[i].user_info.head_pic+'"/>'
							}
							str+='</div>';
							str+='<div class="friend_name">';
				
							str+='<div class="name">'+data[i].user_info.nick_name+'</div>';
							if(data[i].newmessage!=''&&data[i].newmessage!=undefined&&data[i].newmessage!='null'&&data[i].newmessage!=null){
								if(data[i].newmessage.content_type=='text'){
							 	   str+='<div class="descrie">'+data[i].newmessage.content+'</div>';
								}else if(data[i].newmessage.content_type=='video'){
									   str+='<div class="descrie">(视频)</div>';
								}else if(data[i].newmessage.content_type=='image'){
									   str+='<div class="descrie">(图片)</div>';
								}
							}else{
								str+='<div class="descrie">暂无新消息</div>';
							}
						  
							str+='</div>';
							str+='</div>';
							str+='</li>';
							str+='</ul>';
						  str+='</div>';
						}
					
		           
				}
				$('#myfriend').html(str);
			
			}
		})
	}




//function meiren(){
//	//加载陌生人
//	mui.ajax({
//	type:"post",
//	url:globalUrl+'index.php/Mobile/JkShare/addmoshegn',
//	data:{user_id:user_id,type:0},
//	dataType:'json',
//	success:function(res){
//		var data=res.list;
////		alert(JSON.stringify(data));
//		var str='';
//		if(data==''||data==null||data==undefined){
////			str +='<div class="friend">/**/暂无好友</div>'	
//		}else{
//			for(i=0;i<data.length;i++){
//			if(data[i].type==0){
//					str += '<div class="stranger" onclick="addfriends(this,'+data[i].friend_id+')" style="position: relative;">'
//					str += '<div class="friend_head">'
//					if(data[i].user_info.head_pic==null){
//					str += '<img src="../img/z_jt.png"/>'
//						
//					}else{
//					str += '<img src="'+picUrl+data[i].user_info.head_pic+'"/>'
//						
//					}
//
//					str += '</div>'
//					str += '<div style="position: absolute;" onclick="add_user(this,'+data[i].id+')" class="po_add">'
//					str += '<img src="../img/chat_add.png"/>'
//					str += '</div>'
//					str += '<div class="friend_name">'+data[i].user_info.nick_name+''
//					str += '<div class="name">'
//					str += '</div>'
//					str += '<div class="descrie">'
//					str += '</div>'
//					str += '</div>'
//					str += '</div>'
//			}
//			}
//
//		}
//		$('#mystranger').html(str);
//	}
//})
//}
//添加好友
function addfriends(){
//	alert(1);
}
//显示与隐藏showfriendid
function showfriendid(show,hide){
	var type = $('.'+show).attr('data-type');
	
	if(type==0){
		$('.'+hide).show();
		$('.'+show).attr('data-type',1);
		
	}else{
		$('.'+show).attr('data-type',0)
		$('.'+hide).hide();
		window.clearTimeout(res);
		window.clearTimeout(res1);
	}
	
	
}
//var user_pic;
//$.ajax({
//	type:"post",
//	url:globalUrl+"index.php/Mobile/JkUser/myLists",
//	data:{user_id:user_id},
//	dataType:'json',
//	success:function(res){
//		var data=res.user;
//		user_pic=picUrl+data.head_pic;
////		alert(picUrl+data.head_pic)
//	}
//});
	

$(function(){
	$('#myfriend').on('tap','.joinLt',function(){
		
		var ids = $(this).attr('data-id');
		var url = $(this).attr('data-url');
		var nick_name = $(this).attr('data-nick');
	  var friendpic=$(this).attr('data-pic');
	  
		if(url){
			mui.openWindow({
				url: url,
				id: url,
				styles: {  
        			top: '0px',
        			bottom: 0,
				},
				extras: {
					ids: ids,
					nick_name:nick_name,
//					friendpic:friendpic,
//					user_pic:user_pic
//					name: 'shabi'
				}
			})
		}
	})

});

 var idfs;
	$('#myfriend').on('tap','.deletefriend',function(event){
		  
		  event.stopPropagation();
		  idfs = $(this).parents('.joinLt').attr('data-attendid');
		  
		  $('.mask').show()
		  reminder('确定要删除该好友');
		 
	})
	
	 function makesure(){
	 
				  $.ajax({
				  	type:"post",
				  	url:globalUrl+"index.php/Mobile/JkShare/attention",
				  	data:{attent_id:idfs},
				  	dataType:'json',
				  	success:function(res){
					  	  var data=res;
					  		alert(JSON.stringify(data))
					  		if(data.code==0){
					  			mui.toast('删除成功');
					  			$('.mask').hide()
					  			$('.reminder').hide()
					  			
					  			shuaxin();
					  		}else{
					  				mui.toast(res.msg);
					  		}
					  }
				  })
			}

function add_user(obj,id){
		$.ajax({
			type:"post",
			url:globalUrl+'index.php/Mobile/JkShare/addmoshegn',
			data:{user_id:user_id,id:id},
			dataType:'json',
			success:function(res){
			}
			
		});
	}
