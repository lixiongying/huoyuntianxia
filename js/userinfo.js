 var procinstid = 0;
		//加载页面初始化需要加载的图片信息  
		//或者相册IMG_20160704_112620.jpg  
		//imgId:图片名称：1467602809090或者IMG_20160704_112620  
		//imgkey:字段例如：F_ZDDZZ  
		//ID：站点编号ID,例如429  

		//选取图片的来源，拍照和相册  
		
var files;
       function changehead(conf) {
			var divid = conf.id;
			var actionbuttons = [{
				title: "拍照"
			}, {
				title: "相册选取"
			}];
			var actionstyle = {
				title: "选择照片",
				cancel: "取消",
				buttons: actionbuttons
			};
			plus.nativeUI.actionSheet(actionstyle, function(e) {
				if(e.index == 1) {
					getImage(divid);
				} else if(e.index == 2) {
					galleryImg(divid);
				}
			});
		}
		
		var lfs = null;//保留图片
		function galleryImg(divid) {
			plus.gallery.pick(function(e) {
				//alert(e.files.length);
				plus.io.resolveLocalFileSystemURL(e, function(entry) {
					compressImage(entry.toLocalURL(), entry.name, divid);
				});

			}, function(e) {
				console.log("取消选择图片");
			}, {
				filename: "_doc/camera/",
				filter: "image",
				multiple: false,
			});
		}
		// 拍照  
		function getImage(divid) {
			var cmr = plus.camera.getCamera();
			cmr.captureImage(function(p) {
				//alert(p);//_doc/camera/1467602809090.jpg  
				plus.io.resolveLocalFileSystemURL(p, function(entry) {
					//alert(entry.toLocalURL());//file:///storage/emulated/0/Android/data/io.dcloud...../doc/camera/1467602809090.jpg  
					//alert(entry.name);//1467602809090.jpg  
					compressImage(entry.toLocalURL(), entry.name, divid);
				}, function(e) {
					plus.nativeUI.toast("读取拍照文件错误：" + e.message);
				});
			}, function(e) {}, {
				filename: "_doc/camera/",
				index: 1
			});
		}
   		
		//压缩图片  
		function compressImage(url, filename, divid) {
			var name = "_doc/upload/" + divid + "-" + filename; //_doc/upload/F_ZDDZZ-1467602809090.jpg  
			plus.zip.compressImage({
					src: url, //src: (String 类型 )压缩转换原始图片的路径  
					dst: name, //压缩转换目标图片的路径  
					quality: 20, //quality: (Number 类型 )压缩图片的质量.取值范围为1-100  
					overwrite: true //overwrite: (Boolean 类型 )覆盖生成新文件  
				},
				function(event) {
					//uploadf(event.target,divid);  
					var path = name; //压缩转换目标图片的路径  
					//event.target获取压缩转换后的图片url路  
					//filename图片名称  
					saveimage(event.target, divid, filename, path);
				},
				function(error) {
					plus.nativeUI.toast("压缩图片失败，请稍候再试");
				});
		}
		//保存信息到本地  
		/**  
		 *   
		 * @param {Object} url  图片的地址  
		 * @param {Object} divid  字段的名称  
		 * @param {Object} name   图片的名称  
		 */
		function saveimage(url, divid, name, path) {
			//alert(url);//file:///storage/emulated/0/Android/data/io.dcloud...../doc/upload/F_ZDDZZ-1467602809090.jpg  
			//alert(path);//_doc/upload/F_ZDDZZ-1467602809090.jpg  
			var state = 0;
			var wt = plus.nativeUI.showWaiting();
			//  plus.storage.clear();   
			name = name.substring(0, name.indexOf(".")); //图片名称：1467602809090  
			var id = document.getElementById("ckjl.id").value;
			var itemname = id + "img-" + divid; //429img-
			var itemvalue = plus.storage.getItem(itemname);
			if(itemvalue == null) {
				itemvalue = "{" + name + "," + path + "," + url + "}"; //{IMG_20160704_112614,_doc/upload/F_ZDDZZ-IMG_20160704_112614.jpg,file:///storage/emulated/0/Android/data/io.dcloud...../doc/upload/F_ZDDZZ-1467602809090.jpg}  
			} else {
				itemvalue = itemvalue + "{" + name + "," + path + "," + url + "}";
			}
			plus.storage.setItem(itemname, itemvalue);

			var src = 'src="' + url + '"';
			//alert("itemvalue="+itemvalue);  
			uploadimge();
			wt.close();
		}
		//上传图片，实例中没有添加上传按钮  
		function uploadimge() {
//			var wa = plus.nativeUI.showWaiting();
			var DkeyNames = [];
			var id = document.getElementById("ckjl.id").value;
			var length = id.toString().length;
			var idnmae = id.toString();
			var numKeys = plus.storage.getLength();
			if(numKeys == 0 ) {
//				wa.close();
				return;
			}
			var task = plus.uploader.createUpload(globalUrl+'index.php/Mobile/JkUser/testUploadPic', {
					method: "POST"
			},function(t, status) {
				if(status == 200) {
					plus.storage.clear();  
										
					var data=JSON.parse(t.responseText); //json解析方法JSON.parse 或者 eval('('+xhr.responseText+')')
//					alert(JSON.stringify(data))
					if(data==' '||data==undefined||data==null){
	                     mui.toast('上传失败');
	                     
	                    
                    }else{
                    	files=data.paths;
                    	$('#userPhoto').attr('src',picUrl+files);
                    	 $('.sure').removeClass('cancel');
//                  	 mui.toast('上传成功');
//                      alert(files)
                      
                    }
					
				} else {
//					wa.close();
					plus.storage.clear();  
					console.log("上传失败");
				}
			});
			task.addData("dir_name", "z_header_pic");
			var imgArray = [];//上传图片的id（多少添加图片按钮 ）
			
			$('.header_img').each(function(){
				imgArray.push($(this).attr('id'));
			});
			for(var i = 0; i < imgArray.length; i++) {
				var itemkey = id + 'img-' + imgArray[i];//存储图片的下标
				
				if(plus.storage.getItem(itemkey) != null) {
					var itemvalue = plus.storage.getItem(itemkey).split("{");
					for(var img = 1; img < itemvalue.length; img++) {
						var imgname = itemvalue[img].substr(0, itemvalue[img].indexOf(","));
						var imgurl = itemvalue[img].substring(itemvalue[img].indexOf(",") + 1, itemvalue[img].lastIndexOf(","));
						
						task.addFile(imgurl, {
							key: imgurl
						});
					}
				}
			}
			task.start();
		}
		var userid=localStorage.getItem('user_id');	
		var type;
		
		function changeImg(obj){
	
		$(obj).addClass('sex_activexuan').parent('.select_li').siblings().find('.sex_xuan').removeClass('sex_activexuan');
		$('.sure').removeClass('cancel');	
		
			if($(obj).attr('data-type')==1){
				
				type=1;
			}else if($(obj).attr('data-type')==2){
				
				type=2;
			}
			
		}


	var type=2;
	//保存
	$('.sure').click(function(){
		
		if($(this).hasClass('cancel')){
			return false;
			
		}

		$('.sex_xuan').each(function(){
				
			if($(this).hasClass('sex_activexuan')){
		    	 var type=$(this).attr('data-type');
		    	 if(type==1){
		    	 	type==1;
		    	 }else{
		    	 	type==2;
		    	 }
		    	  
		    }
			
		})

	var $sex=$('.sex_name').html();
    
	var $uername=$('.user_name').html();
	
//	var $files;
	var $birthday=$('.demo_date').html();
	
	var date = new Date($birthday);
	var time = date.getTime()/1000;
	
	
	var parms={};
	parms.sex=type;
	parms.user_id=userid;
	parms.head_pic=files;
	parms.birthday=time;
	parms.nick_name=$uername;
alert(JSON.stringify(parms));

	$.ajax({
		url: 'http://hytx.sxnet.cc/index.php/Mobile/JkUser/SaveInfomation',
		type: 'post',
		data: parms,
		dataType: 'json',
		
		success: function(res){
			if(res.code==0){
				mui.toast('保存成功');
				plus.webview.getWebviewById('person/person.html').evalJS("shuaxin()");
				mui.back();
			}
			
		}
	})
})


$.ajax({
	type:"post",
	url:globalUrl+"index.php/Mobile/JkUser/myLists",
	data: {
		
			user_id: userid,
		
		},
		dataType: 'json',
		
		success: function(res){
			var data=res.user;

			var sex=data.sex;

			$('.sex_xuan').each(function(){
				var $type=$(this).attr('data-type')
				if(sex==$type){
					$(this).addClass('sex_activexuan').parent('.select_li').siblings().find('.sex_xuan').removeClass('sex_activexuan');
				}
				
			})
			$('#userPhoto').attr('src',picUrl+data.head_pic);
			$('.user_name').html(data.nick_name);
			var birthday=data.birthday;

			var c=timeToDate(birthday);
			
            $('.demo_date').html(c);
		}
});




//var c=timeToDate('1531118162');
//alert(c)
       
