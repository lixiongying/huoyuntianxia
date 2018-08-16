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
//		    			alert(JSON.stringify(data));
//		    			return;
		    			if(data.code==0){
			           	  mui.toast('登录成功');
			           	  
			           	  localStorage.setItem('user_id',data.root.user_id);
			           	  localStorage.setItem('car_status',data.root.car_status);
			           	  plus.webview.getWebviewById('person/person.html').evalJS("shuaxin()");
			           	  plus.webview.getWebviewById('homepage/hz_homepage.html').evalJS("shuaxin()");
			           	  plus.webview.getWebviewById('message/message.html').evalJS("shuaxin()");
			           	  plus.webview.getWebviewById('discover/pullrefresh.html').evalJS("shuaxin()");
			              mui.back()
			           }else{
			           	 mui.toast(data.msg);
			           }
		    		}
		    	});

		   
		    }
}




	var auths=null;
// 监听plusready事件  
	document.addEventListener( "plusready", function(){
		// 扩展API加载完毕，现在可以正常调用扩展API
		plus.oauth.getServices( function(services){
			auths = services;
		}, function(e){
			alert( "获取分享服务列表失败："+e.message+" - "+e.code );
		} );
	}, false );
	// 登录操作
	function authLogin(){
		var s = auths[0];
		if ( !s.authResult ) {
			s.login( function(e){
	//			mui.toast( "登录认证成功！" );
				authUserInfo();	
			}, function(e){
				mui.toast( "登录认证失败！");
			} );
		}else{
			authUserInfo()
	//		mui.toast( "已经登录认证！" );
		}
	}
		
		var user_info='';
	// 获取登录用户信息操作
	function authUserInfo(){
		var s = auths[0];
		if ( !s.authResult ) {
			alert("未登录授权！");
		} else {
			s.getUserInfo( function(e){
				user_info = s.userInfo;
//				alert(JSON.stringify(user_info))
//				alert( "获取用户信息成功："+JSON.stringify(s.userInfo) );
				WeCheat_login();
			}, function(e){
				mui.toast( "获取用户信息失败："+e.message+" - "+e.code );
			} );
		}
	}	
	
function WeCheat_login(){
		
		var parms = {}
		parms.wxid = user_info.openid;
//		parms.wx_name = user_info.nickname;
	
		$.ajax({
			url:globalUrl+'index.php/Mobile/JkLg/weixinLogin',
			type:'post',
			data:parms,
			success:function(res){
				
				if(res.code==0){
//	        setTimeout(function(){
//									plus.webview.currentWebview().close();
//					
//					},500);
	         	if(res.msg=='注册成功'){
	         		  $('.reminders').show()
//	         		  mui.toast('请绑定号码!');
//								$('.mainone').show();
//								$('.main').hide();
								$('.userId').val(res.root.user_id);
							   
	         	}
				   if(res.msg=='登录成功'){
							if(res.root.mobile_validated==0||res.root.mobile_validated==null){
								mui.toast('登录成功,请绑定手机号!');
								$('.mainone').show();
								$('.main').hide();
								
								$('.userId').val(res.root.user_id);
							}else{
								 mui.toast('登录成功！');
								 localStorage.setItem('user_id',res.root.user_id);
				         plus.webview.getWebviewById('person/person.html').evalJS("shuaxin()");
				         plus.webview.getWebviewById('hz_homepage/hz_homepage.html').evalJS("shuaxin()");
				         plus.webview.getWebviewById('message/message.html').evalJS("shuaxin()");
				
				         location.href='person/person.html';
							}
						
					}

//       mui.toast('登录成功')
//
//       localStorage.setItem('user_id',res.root.user_id);
//       plus.webview.getWebviewById('person/person.html').evalJS("shuaxin()");
//       plus.webview.getWebviewById('hz_homepage/hz_homepage.html').evalJS("shuaxin()");
//       plus.webview.getWebviewById('message/message.html').evalJS("shuaxin()");
//
//       mui.back()
				}else{
					mui.toast(res.msg)
				}
			}
		})
	}
	

function checkphones(){
		var parms = {}
		parms.user_id = $('.userId').val();
		parms.mobile = $('#phones').val();
		parms.code = $('#li_code').val();
		parms.newPwd=$('#password').val();
		parms.promo_code=$('#invitecode').val();
//		parms.psd=$('#password').val();
    
		var $code=$('#li_code').val();
		var newPwdagain=$('#passwordagain').val();
		if(parms.mobile.length!=11){
			mui.toast('号码格式不正确');return;
		}
		if($code==''){
			mui.toast('请输入验证码');return;
		}
		if(newPwdagain!=$('#password').val()){
				mui.toast('两次的密码输入不一致');return;
		}
	
		$.ajax({
			url:globalUrl+'index.php/Mobile/JkLg/wx_retrieve',
			data:parms,
			success:function(res){
			
				if(res.code==0){
					mui.toast(res.msg);
					localStorage.setItem('user_id',res.root.user_id);
					location.href='person/person.html';
				}else{
					mui.toast(res.msg);
					return;
				}
				
			}
		})
	}
	
	$('.send_code').click(function(){
		var phone = $('#phones').val();
		if(phone.length!=11){
			mui.toast('号码格式不正确');return;
		}
		mui.ajax({
				url:globalUrl+'index.php/Mobile/JkLg/sendSms',
				type:'post',
				data:{mobile:phone},
				dataType:'json',
				success:function(res){
					mui.toast('发送成功');
						var time = 120;
		                var countdown = setInterval(daojishi,1000);
		                function daojishi(){
		           		$('.send_code').html(time+'秒后失效');
		              	
		                if(time==0){
		                    $('.send_code').html('发送验证码');
		                     clearInterval(countdown);
		                }
		                time--;
		             }
				}
			})
	})
	
 		var cityPicker = new mui.PopPicker({
			layer: 3
		});
		cityPicker.setData(cityData3);
		var showCityPickerButton = document.getElementById('showCityPicker');
//			var showCityPickerone = document.getElementById('showCityPickerone');
		showCityPickerButton.addEventListener('tap', function(event) {
			cityPicker.show(function(items) {
//					cityPicker.html((items[0] || {}).text));
//					$('#showCityPicker').html((items[0] || {}).text + "," + (items[1] || {}).text + "," + (items[2] || {}).text);
				$('.province').html((items[0] || {}).text);

				$('.city').html((items[1] || {}).text);
				$('.district').html((items[2] || {}).text);
				//返回 false 可以阻止选择框的关闭
				//return false;
			});
		}, false);
    function Makesure(){
      var province=$('.province').html();
		  var city=$('.city').html();
		  var district=$('.district').html();
		  var userid=$('.userId').val();
         $.ajax({
         	type:"post",
         	url:globalUrl+"index.php/Mobile/JkUser/useraddress",
         	dataType:'json',
         	data:{user_id:userid,province:province,city:city,district:district},
         	success:function(res){
         		var data=res;
         		if(data.code==0){
//       			mui.toast('注册成功');
         			$('.mask').hide();
					    $('.reminders').hide();
					    $('.mainone').show();
							$('.main').hide();
//       			mui.back()
         		}
         	}
         	
         });
    }