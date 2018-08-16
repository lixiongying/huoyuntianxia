var user_id=localStorage.getItem('user_id');
var car_status=localStorage.getItem('car_status');

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
function pulldownRefresh(){
	setTimeout(function() {
			getuserinfo()
			mui('#pullrefresh').pullRefresh().endPulldown();
	 }, 1500);
	

}

$('.logout').click(function(){
	reminder('你确定要退出登录');
	$('.mask').show();

})
function makesure(){
	
//	
	
    localStorage.setItem('user_id','');
	localStorage.setItem('car_status','');
	mui.alert('退出登录成功');
	$('.main_logout').hide();
	shuaxin();
	plus.webview.getWebviewById('homepage/hz_homepage.html').evalJS("shuaxin()");
    plus.webview.getWebviewById('message/message.html').evalJS("shuaxin()");
    plus.webview.getWebviewById('discover/pullrefresh.html').evalJS("shuaxin()");
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
	$('.becomeadriver').show();
	
}else{
	$('.publishway').show();
	$('.order').html('我的订单');
	$('.becomeadriver').hide();
	
}
getuserinfo()
function getuserinfo(){
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
				var company_status=data.company_status;
				
				if(data.car_status==1){
					$('.becomeadriver').hide()
				}
				$('.money').html(data.distribut_money);
				if(car_status==0){
					$('.number').html(data.huozhu_count);
					if(company_status==1||company_status==2){
						$('.becomeadriver').hide();
					}else{
						$('.becomeadriver').show();
					}
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

}
