//点击登录

  function checkPhone(){
			
		    var phone = document.getElementById('phone').value;
		    var password=$('.loginPass').val();
//		    else if(!(/^1[34578]\d{9}$/.test(phone))){ 
//		        mui.toast("手机号码有误，请重填");  
//		        return false; 
//		    }
		    if($('#phone').val()==''){
		    	mui.toast('手机号不能为空，请填写')
		    	return false;
		    }else if($('.loginPass').val()==''){
		    	mui.toast('请填写密码')	;
		    	return false;
		    }else if($('#phone').val()!='' && $('.loginPass').val()!=''){
		    	$.ajax({
		    		type:"post",
		    		url:globalUrl+'index.php/Mobile/JkLg/pwdLogin',
		    		data:{mobile:phone,password:password},
		    		dataType:'json',
		    		success:function(res){
		    			var data = res; 
		    			if(data.code==0){
			           	  mui.toast('登录成功');
			           	  
			           	  localStorage.setItem('user_id',data.root.user_id);
			           	  localStorage.setItem('car_status',data.root.car_status);
			           	  plus.webview.getWebviewById('person/person.html').evalJS("shuaxin()");
			           	  plus.webview.getWebviewById('homepage/hz_homepage.html').evalJS("shuaxin()");
			              mui.back()
			           }else{
			           	 mui.toast(data.msg);
			           }
		    		}
		    	});

		   
		    }
}




//	var auths=null;
//// 监听plusready事件  
//	document.addEventListener( "plusready", function(){
//		// 扩展API加载完毕，现在可以正常调用扩展API
//		plus.oauth.getServices( function(services){
//			auths = services;
//		}, function(e){
//			alert( "获取分享服务列表失败："+e.message+" - "+e.code );
//		} );
//	}, false );
//	// 登录操作
//	function authLogin(){
//		var s = auths[0];
//		if ( !s.authResult ) {
//			s.login( function(e){
//	//			mui.toast( "登录认证成功！" );
//				authUserInfo();	
//			}, function(e){
//				mui.toast( "登录认证失败！");
//			} );
//		}else{
//			authUserInfo()
//	//		mui.toast( "已经登录认证！" );
//		}
//	}
//		
//		var user_info='';
//	// 获取登录用户信息操作
//	function authUserInfo(){
//		var s = auths[0];
//		if ( !s.authResult ) {
//			alert("未登录授权！");
//		} else {
//			s.getUserInfo( function(e){
//				user_info = s.userInfo;
////				alert( "获取用户信息成功："+JSON.stringify(s.userInfo) );
//				WeCheat_login();
//			}, function(e){
//				mui.toast( "获取用户信息失败："+e.message+" - "+e.code );
//			} );
//		}
//	}	
//	
//function WeCheat_login(){
//		
//		var parms = {}
//		parms.open_id = user_info.openid;
//		parms.wx_name = user_info.nickname;
//	
//		$.ajax({
//			url:globalUrl+'Mobile/ApiUser/wxlogin',
//			type:'post',
//			data:parms,
//			success:function(res){
//				
//				if(res.status==1){
//	             setTimeout(function(){
//					plus.webview.currentWebview().close();
//					
//					},500);
////					mui.openWindow({
////						url:'person/person.html',
////						id:'person/person.html'
////					})
//                  mui.toast('登录成功')
////	                localStorage.setItem('wx_id',res.id);
//	                 localStorage.setItem('user_id',res.id);
//	                 plus.webview.getWebviewById('person/person.html').evalJS("shuaxin()");
//	                 plus.webview.getWebviewById('shopcar/shopcar.html').evalJS("shuaxin()");
//	                 plus.webview.getWebviewById('homepage/chooseshop.html').evalJS("shuaxin()");
////	                 mui.openWindow({
////						url:'homepage/chooseshop.html',
////						id:'homepage/chooseshop.html'
////					})
//mui.back()
//				}else{
//					mui.toast(res.msg)
//				}
//			}
//		})
//	}