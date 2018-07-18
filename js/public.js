//设置窗口rem适配
var html = document.getElementsByTagName('html')[0];
	var W = html.clientWidth;
	html.style.fontSize = W / 20 + "px";
	//窗口改变监听
	window.onresize = function(){
		var html = document.getElementsByTagName('html')[0];
		var W = html.clientWidth;
		html.style.fontSize = W / 20 + "px";
	}

	function back(){
		
		window.history.back(-1);
		
	}

	function url(obj){
		var url = $(obj).attr('data-url');

		mui.openWindow({
			url:url,
			id:url
		})
	}
//	function url(obj){
//		var url = $(obj).attr("data-url");
//		location.href=url;
//	}

    function isPoneAvailable(str) {  
          var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;  
          if (!myreg.test(str)) {  
              return false;  
          } else {  
              return true;  
          }  
      }  
     	
    function isPassword(str){
    	 var myreg=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
    	  if (!myreg.test(str)) {  
              return false;  
          } else {  
              return true;  
          }  
    }

     var globalUrl = 'http://hytx.sxnet.cc/'
     var picUrl = 'http://hytx.sxnet.cc'
     
    function open(urls,data) {
		var datas = {};
		if(data == undefined || data == '' || data == null) {
			datas = {};
		}else {
			datas = data;
		}
		mui.openWindow({
			url: urls,
			id: urls,
			extras: datas,
			waiting: {
				autoShow: false,
			}
		});
	}

     
//手机号码正则
function checkMobile(str) {
	return(/^[1][3|4|5|8]{1}[0-9]{9}$/.test(str));
}
//验证码正则
function maMobile(str) {
	return(/^[0-9]{6}$/.test(str));
}
//用户名正则
function maMobile(str) {
	return(/^[A-Za-z0-9\u4e00-\u9fa5]{0,16}$/.test(str));
}
//密码正则
function passCheck(str) {
	return(/^[A-Za-z0-9]{6,16}$/.test(str));
}
//去除输入框前后空格字符
function trim(str) {
	return str.replace(/(^\s*)|(\s*$)/g, "");
}
//真实名字正则
function nameCheck(str) {
	return(/^[\u4E00-\u9FA5A-Za-z]{2,15}$/.test(str));
}

//时间戳转化
function add0(m) {
	return m < 10 ? '0' + m : m
};
function getUrl(url) {
		var urlObj = {};
		var urlArr = null;
		var url2 = url.split('?');
		url2 = url2[1].split('&');
		url2.forEach(function(obj, index) {
			urlArr = obj.split('=');
			urlObj[urlArr[0]] = urlArr[1];
		});
		return urlObj;
	}

function timeToDate(time) {
	var sTime = time * 1000;
	var time = new Date(sTime);
	var y = time.getFullYear();
	var m = time.getMonth() + 1;
	var d = time.getDate();
	var h = time.getHours();
	var mm = time.getMinutes();
	var s = time.getSeconds();
	return y + '-' + add0(m) + '-' + add0(d);
}

function timeToDate1(time) {
	var sTime = time * 1000;
	var time = new Date(sTime);
	var y = time.getFullYear();
	var m = time.getMonth() + 1;
	var d = time.getDate();
	var h = time.getHours();
	var mm = time.getMinutes();
	var s = time.getSeconds();
	return add0(h) + ':' + add0(mm);
}
function timeToDate2(time) {
	var sTime = time * 1000;
	var time = new Date(sTime);
	var y = time.getFullYear();
	var m = time.getMonth() + 1;
	var d = time.getDate();
	var h = time.getHours();
	var mm = time.getMinutes();
	var s = time.getSeconds();
	return y + '.' + add0(m) + '.' + add0(d) + ' ' + add0(h) + ':' + add0(mm);
}
//富文本处理
function htmlDecodeByRegExp(str) {
	var s = "";
	if(str.length == 0) return "";
	s = str.replace(/&amp;/g, "&");
	s = s.replace(/&lt;/g, "<");
	s = s.replace(/&gt;/g, ">");
	s = s.replace(/&nbsp;/g, " ");
	s = s.replace(/&#39;/g, "\'");
	s = s.replace(/&quot;/g, "\"");
	return s;
}

//友好時間
function firendTime(time) {
	// 获取当前时间戳
	var currentTime = parseInt(new Date().getTime() / 1000);
	var diffTime = currentTime - time;
	var second = 0;
	var minute = 0;
	var hour = 0;
	if(null != diffTime && "" != diffTime) {
		if(diffTime > 0 && diffTime <= 60 * 60) {
			var numTime = parseInt(diffTime / 60.0);
			
			if(numTime == 0){
				diffTime ="刚刚";
			}else {
				diffTime = numTime + "分钟前";
			}
		} else if(diffTime > 60 * 60 && diffTime <= 60 * 60 * 24) {
			diffTime = parseInt(diffTime / 3600.0) + "小时前";
		} else if(diffTime > 60 * 60 * 24 && diffTime <= 60 * 60 * 24 * 2) {
			//超过1天
			diffTime = "昨天";
		} else if(diffTime > 60 * 60 * 24 * 2 && diffTime <= 60 * 60 * 24 * 3) {
			diffTime = "前天";
		} else if(diffTime > 60 * 60 * 24 * 3 && diffTime <= 60 * 60 * 24 * 7) {
			diffTime = parseInt(diffTime / 86400.0) + "天前";
		} else if(diffTime > 60 * 60 * 24 * 7 && diffTime <= 60 * 60 * 24 * 7 * 2) {
			diffTime = "上周";
		} else {
			//				diffTime=time.getFullYear()+'-'+(time.getMonth()+1)+'-'+time.getDate();
			var newtime = new Date();
			var newyear = newtime.getFullYear();
			//				diffTime=newtime.setTime(time);
			var aa = new Date(parseInt(time) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
			var reg = /[\u4E00-\u9FA5]/g;
			diffTime = aa.substring(0, 11).replace(reg, '');
		}
	}
	return diffTime;
}
function firendTime1(time) {
	// 获取当前时间戳
	var currentTime = parseInt(new Date().getTime() / 1000);
	var diffTime = currentTime - time;
	var second = 0;
	var minute = 0;
	var hour = 0;
	if(null != diffTime && "" != diffTime) {
		if(diffTime > 0) {
			var sTime = time * 1000;
			var time = new Date(sTime);
			var y = time.getFullYear();
			var m = time.getMonth() + 1;
			var d = time.getDate();
			var h = time.getHours();
			var mm = time.getMinutes();
			var s = time.getSeconds();
			diffTime = h + ':' + mm + ':' + s;
		} else if(diffTime > 60 * 60 * 24 && diffTime <= 60 * 60 * 24 * 2) {
			//超过1天
			diffTime = "昨天";
		} else if(diffTime > 60 * 60 * 24 * 2 && diffTime <= 60 * 60 * 24 * 3) {
			diffTime = "前天";
		} else if(diffTime > 60 * 60 * 24 * 3 && diffTime <= 60 * 60 * 24 * 7) {
			diffTime = parseInt(diffTime / 86400.0) + "天前";
		} else if(diffTime > 60 * 60 * 24 * 7 && diffTime <= 60 * 60 * 24 * 7 * 2) {
			diffTime = "上周";
		} else {
			//				diffTime=time.getFullYear()+'-'+(time.getMonth()+1)+'-'+time.getDate();
			var newtime = new Date();
			var newyear = newtime.getFullYear();
			//				diffTime=newtime.setTime(time);
			var aa = new Date(parseInt(time) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
			var reg = /[\u4E00-\u9FA5]/g;
			diffTime = aa.substring(0, 11).replace(reg, '');
		}
	}
	return diffTime;
}



function reminder(text){
	var str='';
	str+='<div class="reminder">';
	str+='<div class="reminder_title">提示</div>';
	str+='<div class="reminder_world">'+text+'</div>';
	str+='<div class="reminder_sc">';
	str+='<div onclick="cancel()">取消</div>';
	str+='<div class="sure" onclick="makesure()">确定</div>';
	str+='</div>';
	str+='</div>';
	
	$('body').append(str);
}
function cancel(){
	$('.reminder').hide();
	$('.mask').hide()
}
 function shuaxin(){
		location.reload();
	} 
//function zhao(text){
//	var str='';
//	str+='<div class="toast">'
//	str+='<div class="toast_back"></div>'
//	str+='<div class="toast_main">'
//	str+='<div class="toast_header">'+text+'</div>'
//	str+='<div class="toast_two">'
//	str+='<div class="setpass1">'
//	str+='<div class="toastTwo">'
//	str+='<div class="toastTwo_left" onclick="two()">取消</div>'
//	str+='<div class="toastTwo_right" onclick="two()">确定</div>'
//	str+='</div>'
//	str+='</div>'
//	str+='</div>'
//	str+='</div>'
//	str+='</div>'
//	$('body').append(str);
//}
//function two(){$('.toast').hide();}



		
