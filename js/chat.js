var user_id=localStorage.getItem('user_id')
var p=1;
//alert(to_user_id);
$(function(){
		var parms={};
		parms.form_user_id=user_id;
		parms.to_user_id=to_user_id;
		parms.p=p;
		mui.ajax({
			type:"post",
			url:globalUrl+'index.php/Mobile/JkShare/user_chat_list',
			data:parms,
			dataType:'json',
			success:function(res){
				if(res.code==0){
					$('#c_user_nick').text(res.to_user_id.nick_name);
					data=res.list;
					var str='';
//					alert(JSON.stringify(data))
					for(i=0;i<data.length;i++){
//						alert(JSON.stringify(data[i].to_user_id+','+parms.to_user_id))
//						alert(data[i].form_user_id+','+parms.form_user_id)
						if(data[i].to_user_id!=parms.to_user_id){
						str +='<div class="con_a">'
						str +='<div class="cona_img">'
						str +='<img src="'+picUrl+res.to_user_id.head_pic+'" alt="" />'
						str +='</div>'
						str +='<div class="cona_text">'+data[i].content+''
						str +='</div>'
						str +='</div>'
						}else{
						str +='	<div class="con_b">'
						str +='	<div class="cona_img">'
						str +='	<img src="'+picUrl+res.form_user_id.head_pic+'" alt="" />'
						str +='</div>'
						str +='	<div class="cona_text">'+data[i].content+''
						str +='</div>'
						str +='	</div> '
						}										
					}
					$('.content').append(str);
				}	
			}			
		})		
})
function send_message(){
	var chat_data={};
	var content_type=1;
	if(content_type==1){		
		var content=$('.content_chat').val();
	}
	chat_data.type=content_type;
	chat_data.content=content;
	chat_data.form_user_id=user_id;
	chat_data.to_user_id=to_user_id;
	if(chat_data.content== ''){
		mui.toast('不能发送空消息')
		    	return false;
	}
	mui.ajax({
		type:"post",
		url:globalUrl+'index.php/Mobile/JkShare/add_chat',
		data:chat_data,
		dataType:'json',
		success:function(res){
			if(res.code==0){
				mui.toast('发送成功');
				mui.back();
			}else{
				mui.toast('发送失败');
			}

		}
		
		
		
	})
}
