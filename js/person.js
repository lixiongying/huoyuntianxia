var user_id=localStorage.getItem('user_id');
var car_status=localStorage.getItem('car_status');

$('.logout').click(function(){
	reminder('你确定要退出登录');
	$('.mask').show();
	
	
//	 plus.webview.getWebviewById('person/person.html').evalJS("shuaxin()");
})
function makesure(){
	localStorage.setItem('user_id','');
	localStorage.setItem('car_status','');
	shuaxin();
	mui.alert('退出登录成功');
	$('.main_logout').hide();
}



if(user_id==''||user_id==null||user_id==undefined){
	$('.nologin').attr('data-url','../login.html');
	$('.phone').html('点击登录')
	$('.main_logout').hide();
}else{
	$('.main_logout').show();
}
if(car_status==0){
	$('.order').html('我的发货单');
	$('.publishway').hide();
}else{
	$('.publishway').show();
	$('.order').html('我的订单');
}
if(user_id!=''&&user_id!=null&&user_id!=undefined){
	$.ajax({
		type:"post",
		url:globalUrl+'index.php/Mobile/JkUser/myLists',
		data:{user_id:user_id},
		dataType:'json',
		success:function(res){
			var data=res.user;
			
			var nick_name=data.nick_name;
			var head_pic=data.head_pic; 
			
			$('.money').html(data.distribut_money);
			if(car_status==0){
				$('.number').html(data.huozhu_count);
			}else{
				$('.number').html(data.siji_count);
			}
			
			$('.tel').html(nick_name);
			if(head_pic==null||head_pic==''||head_pic==undefined){
				$('.head_pic').attr('src','../img/pic.png')
			}else{
				$('.head_pic').attr('src',picUrl+data.head_pic)
			}
		}
	})
}else{
	$('.money').html('0');
	$('.number').html('0')
}



