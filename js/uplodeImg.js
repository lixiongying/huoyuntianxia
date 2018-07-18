//选取图片的来源，拍照和相册  
mui.plusReady(function(){
	plus.storage.clear();
});
function showActionSheet(conf) {
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
			getImage(divid,conf);
		} else if(e.index == 2) {
			galleryImg(divid,conf);
		}
	});
}
var lfs = null; //保留图片
function galleryImg(divid,obj) {
	plus.gallery.pick(function(e) {
		//alert(e.files.length);
		plus.io.resolveLocalFileSystemURL(e, function(entry) {
			compressImage(entry.toLocalURL(), entry.name, divid,obj);
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
function getImage(divid,obj) {
	var cmr = plus.camera.getCamera();
	cmr.captureImage(function(p) {
		//alert(p);//_doc/camera/1467602809090.jpg  
		plus.io.resolveLocalFileSystemURL(p, function(entry) {
			compressImage(entry.toLocalURL(), entry.name, divid,obj);
		}, function(e) {
			plus.nativeUI.toast("读取拍照文件错误：" + e.message);
		});
	}, function(e) {}, {
		filename: "_doc/camera/",
		index: 1
	});
}
//压缩图片  
function compressImage(url, filename, divid,obj) {
	var name = "_doc/upload/" + divid + "-" + filename; //_doc/upload/F_ZDDZZ-1467602809090.jpg  
	plus.zip.compressImage({
			src: url, //src: (String 类型 )压缩转换原始图片的路径  
			dst: name, //压缩转换目标图片的路径  
			quality: 20, //quality: (Number 类型 )压缩图片的质量.取值范围为1-100  
			overwrite: true, //overwrite: (Boolean 类型 )覆盖生成新文件  
			format: "jpg"
		},
		function(event) {
			//uploadf(event.target,divid);  
			var path = name; //压缩转换目标图片的路径  
			saveimage(event.target, divid, filename, path,obj);
		},
		function(error) {
			plus.nativeUI.toast("压缩图片失败，请稍候再试");
		});
}
function showImgDetail(imgId, imgkey, id, src,obj) {
	var html = "";
	if(obj.getAttribute('data-check') == 1) {
		html += '<div class="imgs" id="Img' + imgId + imgkey + '">';
		html += '<img class="picBig" data-preview-src="" data-preview-group="1" ' + src + '/>';
		html += '<span class="del_icon" onclick="delImg(\'' + imgId + '\',\'' + imgkey + '\',' + id + ');"></span>';
		html += '</div>';
	}else {
		html += '<div class="imgs" onclick="delImg(\'' + imgId + '\',\'' + imgkey + '\',' + id + ');" id="Img' + imgId + imgkey + '">';
		html += '<img class="picBig" data-preview-src="" data-preview-group="1" ' + src + '/>';
		html += '</div>';
	}
		
	$(obj).parent().append(html);
}
//保存信息到本地  
/**  
 *   
 * @param {Object} url  图片的地址  
 * @param {Object} divid  字段的名称  
 * @param {Object} name   图片的名称  
 */
function saveimage(url, divid, name, path,obj) {
	var state = 0;
	var wt = plus.nativeUI.showWaiting();
	//  plus.storage.clear();   
	name = name.substring(0, name.indexOf(".")); //图片名称：1467602809090  
	var id = document.getElementById("chat_image.id").value;
	var itemname = id + "img-" + divid; //429img-
	var itemvalue = plus.storage.getItem(itemname);
	if(itemvalue == null) {
		itemvalue = "{" + name + "," + path + "," + url + "}"; //{IMG_20160704_112614,_doc/upload/F_ZDDZZ-IMG_20160704_112614.jpg,file:///storage/emulated/0/Android/data/io.dcloud...../doc/upload/F_ZDDZZ-1467602809090.jpg}  
	} else {
		itemvalue = itemvalue + "{" + name + "," + path + "," + url + "}";
	}
	plus.storage.setItem(itemname, itemvalue);

	var src = 'src="' + url + '"';
//	obj.src = url;
	showImgDetail(name, divid, id, src,obj);
	wt.close();
}
function delImg(imgId, imgkey, id) {
	var bts = ["是", "否"];
	plus.nativeUI.confirm("是否更换图片？", function(e) {
		var i = e.index;
		if(i == 0) {
			var itemname = id + "img-" + imgkey; //429img-F_ZDDZZ  
			var itemvalue = plus.storage.getItem(itemname);
			//{IMG_20160704_112614,_doc/upload/F_ZDDZZ-IMG_20160704_112614.jpg,file:///storage/emulated/0/Android/data/io.dcloud...../doc/upload/F_ZDDZZ-1467602809090.jpg}  
			if(itemvalue != null) {
				var index = itemvalue.indexOf(imgId + ",");
				if(index == -1) { //没有找到  
					delImgfromint(imgId, imgkey, id, index);
				} else {
					delImgFromLocal(itemname, itemvalue, imgId, imgkey, index); //修改，加了一个index参数  
				}

			} else {
				delImgfromint(imgId, imgkey, id);
			}
		}
	}, "图片管理", bts);
	/*var isdel = confirm("是否删除图片？");  
	if(isdel == false){  
	    return;  
	}*/

}

function delImgFromLocal(itemname, itemvalue, imgId, imgkey, index) {
	var wa = plus.nativeUI.showWaiting();
	var left = itemvalue.substr(0, index - 1);
	var right = itemvalue.substring(index, itemvalue.length);
	var end = right.indexOf("}");
	right = right.substring(end + 1, right.length);
	var newitem = left + right;
	plus.storage.setItem(itemname, newitem);
	//myAlert("删除成功");  
	$("#Img" + imgId + imgkey).remove();
	wa.close();
}

//上传图片，实例中没有添加上传按钮  
function uploadimge(call,urls,list) {
	var wa = plus.nativeUI.showWaiting();
	var DkeyNames = [];
	var id = document.getElementById(".chat_image.id").value;
	var length = id.toString().length;
	var idnmae = id.toString();
	var numKeys = plus.storage.getLength();
	if(numKeys == 0) {
		wa.close();
		return;
	}
	var task = plus.uploader.createUpload(urls, {
		method: "POST"
	}, function(t, status) {
		if(status == 200) {
			wa.close();
//			plus.storage.clear();
			var data = JSON.parse(t.responseText); //json解析方法JSON.parse 或者 eval('('+xhr.responseText+')')
			if(call){
				call(data);
			}
		} else {
			mui.alert('图片上传失败');
			wa.close();
//			plus.storage.clear();
		}
	});
	task.addData("id", user_id);
	task.addData("dir_name", list);
	var imgArray = []; //上传图片的id（多少添加图片按钮 ）
	$('.image-item').each(function() {
		imgArray.push($(this).attr('id'));
	});
	for(var i = 0; i < imgArray.length; i++) {
		var itemkey = id + 'img-' + imgArray[i]; //存储图片的下标
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