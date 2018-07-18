
var user_id=localStorage.getItem('user_id');

//加载好友
$(function shuaixin(){
		res=setInterval(function(){
			lodding()
		},1000)
		res1=setInterval(function(){
			meiren()
		},1000)
})
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
	function lodding(){
	mui.ajax({
	type:"post",
	url:globalUrl+'index.php/Mobile/JkShare/afirendsList',
	data:{user_id:user_id,type:1},
	dataType:'json',
	success:function(res){
//		alert(JSON.stringify(res))
		var data=res.list;
		var str='';
		if(data==''||data==null||data==undefined){
			str +='<div class="friend">暂无好友</div>'	
		}else{
			for(i=0;i<data.length;i++){
				
				if(data[i].type==1){
					str += '<div class="friend joinLt" data-id="'+data[i].friend_id+'" data-nick="+data[i].user_info.nick_name+" data-url="im-chat.html" style="position: relative;">'                	
					str += '<div class="friend_head">'
					if(data[i].user_info.head_pic==null){
						
						str += '<img src="../img/zhuanxianxiangqing_xiehuowangdian_up.png"/>'
					}else{
						
						str += '<img src="'+picUrl+data[i].user_info.head_pic+'"/>'
					}
					if(data[i].count_weidu>0){
					str+='<div class="po_friends">未读'+data[i].count_weidu+'</div>'
						
					}

					str += '</div>'
					str += '<div class="friend_name">'+data[i].user_info.nick_name+''
					str += '<div class="name">'
					str += '</div>'
					str += '<div class="descrie">'		
					str += '</div>'	
					str += '</div>'	
					str += '</div>'	
				}
			}

		}
		$('#myfriend').html(str);
	}
})
	}

function meiren(){
	//加载陌生人
	mui.ajax({
	type:"post",
	url:globalUrl+'index.php/Mobile/JkShare/afirendsList',
	data:{user_id:user_id,type:0},
	dataType:'json',
	success:function(res){
		var data=res.list;
//		alert(JSON.stringify(data));
		var str='';
		if(data==''||data==null||data==undefined){
//			str +='<div class="friend">/**/暂无好友</div>'	
		}else{
			for(i=0;i<data.length;i++){
			if(data[i].type==0){
					str += '<div class="stranger" onclick="addfriends(this,'+data[i].friend_id+')" style="position: relative;">'
					str += '<div class="friend_head">'
					if(data[i].user_info.head_pic==null){
					str += '<img src="../img/z_jt.png"/>'
						
					}else{
					str += '<img src="'+picUrl+data[i].user_info.head_pic+'"/>'
						
					}

					str += '</div>'
					str += '<div style="position: absolute;" onclick="add_user(this,'+data[i].id+')" class="po_add">'
					str += '<img src="../img/chat_add.png"/>'
					str += '</div>'
					str += '<div class="friend_name">'+data[i].user_info.nick_name+''
					str += '<div class="name">'
					str += '</div>'
					str += '<div class="descrie">'
					str += '</div>'
					str += '</div>'
					str += '</div>'
			}
			}

		}
		$('#mystranger').html(str);
	}
})
}
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
$(function(){
	$('#myfriend').on('tap','.joinLt',function(){
		var ids = $(this).attr('data-id');
		var url = $(this).attr('data-url');
		var nick_name = $(this).attr('data-nick');
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
					nick_name:nick_name
//					name: 'shabi'
				}
			})
		}
	})
});
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
