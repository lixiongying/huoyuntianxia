
var type;
$('.cars').click(function(){
    $(this).addClass('Cars').siblings().removeClass('Cars');
    if($(this).hasClass('Cars')){
    	if($(this).attr('data-type')==2){
    		type=2;
    	}else if($(this).attr('data-type')==3){
    		type=3;
    	}
    }
   
})

//$('.shortcar').click(function(){
//	$(this).addClass('addcar');
//	$('.longcar').addClass('addcarone');
//})
//$('.longcar').click(function(){
//	
//	$('.shortcar').removeClass('addcar');
//})6

//		<!--车长类型弹窗-->
		$('.cartypeandlen').click(function(){
			$('.mask').show()
			$('.tc_typeofcars').show();
		})
		$('.cancel').click(function(){
			$('.mask').hide()
			$('.tc_typeofcars').hide();
		})
		$('.mask').click(function(){
			$('.mask').hide()
			$('.tc_typeofcars').hide();
		})

/*货物类型*/
		var userPicker = new mui.PopPicker();
		var cargoodsid;
		var user_id=localStorage.getItem('user_id');
		$.ajax({
			type:"post",
			url:globalUrl+"index.php/Mobile/JkOrder/getcat",
			dataType:'json',
			success:function(res){
				var data =res.info;
				var str='';
				var datas = [];
				if(Array.isArray(data)){
					data.forEach(function(obj,index){
						datas.push(obj.name);
//						datas.push(obj.id);
					});
					userPicker.setData(datas);
					var showUserPickerButton = document.getElementById('showUserPicker');
			        var goodsResult=document.getElementById('goodsResult')
			        showUserPickerButton.addEventListener('tap', function(event) {
						userPicker.show(function(items) {
							var str1=JSON.stringify(items[0]);
//							var Id=JSON.stringify(items[1])
							var reg = /^[\'\"]+|[\'\"]+$/g;
							var  str = str1;
							str2=str.replace(reg,"");
//						   goodsResult.attr('data-type',Id);
						   
							goodsResult.innerText = str2;
							data.forEach(function(obj,index){
								if(obj.name==str2){
									cargoodsid=obj.id;
								}
							});
							//返回 false 可以阻止选择框的关闭
							//return false;
						});
					}, false);
				}
					
			}
		});


//车长及类型
		$.ajax({
			type:"post",
			url:globalUrl+'/index.php/Mobile/JkOrder/getcarcat',
			
			dataType:'json',
			success:function(res){
				var data=res.info;
				var str='';
				if(res.code==0){
						for(var i=0;i<data.length;i++){	
						str+='<div class="" data-type='+data[i].id+' onclick="cars(this)">'+data[i].c_name+'</div>';
					}
				}
		
				$('#Cartype').html(str);
				
			}
		})
	

    function cars(obj){
    	var cat_id=$(obj).attr('data-type');
    	$(obj).parent().find('div').eq(0).addClass('addbgcolor');
    	$(obj).addClass('addbgcolor').siblings().removeClass('addbgcolor');
    	if($(obj).hasClass('addbgcolor')){
    		$('.car_cat').html($(obj).html());
    		var carid=$(obj).attr('data-type');
    		$('.car_cat').attr('data-type',carid);
    		
    	}
    	$.ajax({
			type:"post",
			url:globalUrl+'index.php/Mobile/JkOrder/getspec',
			data:{cat_id},
			dataType:'json',
			success:function(res){
				var data=res.info;
				var str='';
				if(res.code==0){
					for(var i=0;i<data.length;i++){
						if(data.length==0||data==undefined||data==null){
							str+=''
						}else{
							str+='<div class="box" onclick="changecar(this)">';
							str+='<div class="car_cat" data-type='+data[i].id+'>'+data[i].car_spec+'</div>';
							str+='</div>';
						}

					}
				}

				
				$('#carlen').html(str);
				
			}
		})
    }

	
    function changecar(obj){
    	var car_cat=$(obj).find('.car_cat')
    	car_cat.addClass('addcarcolor').parent('.box').siblings().find('.car_cat').removeClass('addcarcolor');
    	
    	var specid=car_cat.attr('data-type');
    	if(car_cat.hasClass('addcarcolor')){
    		$('.carspec').html(car_cat.html());
    		
    		$('.carspec').attr('data-type',specid);
    	}
    }
	function carsure(obj){
        var carname; 
		var caritem=$(obj).parents('.tc_typeofcars').find('.type_two div');
		
//		caritem.each(function(){
//			
//			if($(this).hasClass('addcolor')){
//				
//				
//			}
//		})
        $('.tc_typeofcars').hide();
        $('.mask').hide()
	}

var indexs = 0;

		//		alert(show)
		mui.plusReady(function() {
			var self = plus.webview.currentWebview();

			indexs = self.indexs;
		})
		

var img_num = 6;//
var big_img_num = 3;//最大上传图片数


		
		var procinstid = 0;
		//初始化页面执行操作  

		//加载页面初始化需要加载的图片信息  
		//或者相册IMG_20160704_112620.jpg  
		//imgId:图片名称：1467602809090或者IMG_20160704_112620  
		//imgkey:字段例如：F_ZDDZZ  
		//ID：站点编号ID,例如429  
		//src：src="file:///storage/emulated/0/Android/data/io.dcloud.HBuilder/.HBuilder/apps/HBuilder/doc/upload/F_ZDDZZ-1467602809090.jpg"  
		function showImgDetail(imgId, imgkey, id, src) {
			var html = "";
			html += '<div class="imgs" id="Img' + imgId + imgkey + '">';
			html += '<img class="picBig" data-preview-src="" data-preview-group="1" ' + src + '/>';
			html += '<span class="del_icon" onclick="delImg(\'' + imgId + '\',\'' + imgkey + '\',' + id + ');"><img src="../img/shangpinxiangqing_quxiao.png" alt="" /></span>';
			html += '</div>';
			
			$("#F_CKJLB").append(html);
			
		}
		//删除图片  
		//imgId:图片名称：IMG_20160704_112614  
		//imgkey:字段，例如F_ZDDZZ  
		//ID：站点编号ID，例如429  
		function delImg(imgId, imgkey, id) {
			var bts = ["是", "否"];
			plus.nativeUI.confirm("是否删除图片？", function(e) {
				
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
		//选取图片的来源，拍照和相册  
		function showActionSheet(conf) {
			var divid = conf.id;
			var imgNum = $('.addpicitem .imgs').length;
			if(imgNum>=big_img_num){
				plus.nativeUI.alert('最多只能选择'+big_img_num+'张！');
				img_num = 0;
				return;
			}else {
				img_num = big_img_num - imgNum;
			}
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
				var zm = 0;
				setTimeout(file, 100);
				
				function file() {
					plus.io.resolveLocalFileSystemURL(e.files[zm], function(entry) {
						compressImage(entry.toLocalURL(), entry.name, divid);
					}, function(e) {
						plus.nativeUI.toast("读取拍照文件错误：" + e.message);
					});
					zm++;
					if(zm<e.files.length){
						setTimeout(file, 30);
					}
				}
				lfs = e.files;

			}, function(e) {
				console.log("取消选择图片");
			}, {
				filename: "_doc/camera/",
				filter: "image",
				multiple: true,
				maximum:img_num,
				system:false,
				onmaxed:function(){
                	plus.nativeUI.alert('最多只能选择'+big_img_num+'张！');
            	},
			});
		}
		// 拍照  
		function getImage(divid) {
			if(img_num <= 0) {
				return;
			}
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
			var itemname = id + "img-"+ divid; //429img-
			var itemvalue = plus.storage.getItem(itemname);
			if(itemvalue == null) {
				itemvalue = "{" + name + "," + path + "," + url + "}"; //{IMG_20160704_112614,_doc/upload/F_ZDDZZ-IMG_20160704_112614.jpg,file:///storage/emulated/0/Android/data/io.dcloud...../doc/upload/F_ZDDZZ-1467602809090.jpg}  
			} else {
				itemvalue = itemvalue + "{" + name + "," + path + "," + url + "}";
			}
			plus.storage.setItem(itemname, itemvalue);
//				mui.alert(itemname)

			
			var src = 'src="' + url + '"';
			//alert("itemvalue="+itemvalue);  
			showImgDetail(name, divid, id, src);
			wt.close();
		}

	//上传图片
	function uploadImg(){
//	mui.openWindow({
//								url:'./hz_orderpublish.html',
//								id:'./hz_orderpublish.html'
//							})
		var wa = plus.nativeUI.showWaiting();
			var DkeyNames = [];
		var id = document.getElementById("ckjl.id").value;
		var length = id.toString().length;
		var idnmae = id.toString();
		var numKeys = plus.storage.getLength();
		var parms = {};
		
		if(numKeys == 0){
				wa.close();
//				return;
		}
		var task = plus.uploader.createUpload(globalUrl+'index.php/Mobile/JkUser/testUploadPic',{
			method: "POST"
		},function(t, status){
			wa.close();
			plus.storage.clear(); 
			var data = JSON.parse(t.responseText);
//			alert(JSON.stringify(data))

				
			if(status==200){
			
				if(data.error==0){
					var parmsImg = data.paths; 
				
				}else{
//					mui.toast('上传图片失败');
					var parmsImg = '';
				}
						
//			alert(parmsImg);
//            var type;
//              $('.car').each(function(){
//              	if($(this).hasClass('Cars')){
//              		
//					    	if($(this).attr('data-type')==2){
//					    		type=2;
//					    	}else if($(this).attr('data-type')==3){
//					    		type=3;
//					    	}
//				    	
//              	}
//              	
//              })
//              alert(type)
				var stdeaddress=$('#stdeaddress').val();
				var endeaddress=$('#endeaddress').val();
				
				var addressone=$('.chufadi').html();
				var addresstwo=$('.mudidi').html();
				
				var start_address=addressone+stdeaddress;
			    var end_address=addresstwo+endeaddress;
//			    var type=2;

			    var cat_id1=cargoodsid/*货物分类ID*/
			    var ton=$('#fang').val();
			    var cube=$('#fang').val();
			    var car_cat=$('.car_cat').attr('data-type');
			   
			    var result=$('#result').html();/*装车时间*/
			    var date = new Date(result);
	            var time = date.getTime()/1000;
			    
			    var goods_remark=$('#textarea').val();
				var spec_id=$('.carspec').attr('data-type');
			
				parms.user_id = user_id;
				parms.start_address = start_address;
				parms.end_address = end_address;
				parms.ton = ton;
				parms.cube = cube;
				parms.cat_id1 =cat_id1 ;
				parms.car_cat=car_cat;
				parms.spec_id=spec_id;
				parms.goods_remark = goods_remark;
				parms.load_time=time;
				parms.type_id=type;
				parms.original_img=parmsImg;
				if(stdeaddress==''||endeaddress==''||addressone==''||addresstwo==''){
					mui.toast('请完整填写地址');
					
					return false;
				}else if(cat_id1==''||ton==''||cube==''||car_cat==''||spec_id==''||time==''){
					mui.toast('请再认真检查一遍信息是否完整');
					
					return false;
				}else{
					$.ajax({
						url:globalUrl+'index.php/Mobile/JkOrder/addUserLine',
						data:parms,
						type:'post',
						success:function(res){
							var data=res.root;
							if(data.status==1){
								mui.toast('提交订单成功');
								var goods_id=data.goods_id;
								alert(goods_id)
								var shop_price=data.shop_price
							}else{
								mui.toast('res.msg');
							}
							mui.openWindow({
								url:'./hz_orderpublish.html?goods_id='+goods_id+'&shop_price='+shop_price+'',
								id:'./hz_orderpublish.html'
							})
						},
						error:function(res){
							alert('操作失败')
						}
					})
				}
			
				
				
			}else{
				wa.close();
				plus.storage.clear(); 
				mui.toast('上传失败');
				return;
			}
		})
			task.addData( "dir_name", "z_goods_line" );
			var imgArray = [];//上传图片的id（多少添加图片按钮 ）
			$('.picwh').each(function(){
				imgArray.push($(this).attr('id'));
//				alert($(this).attr('id'))
			});
			for(var i = 0; i < imgArray.length; i++) {
				var itemkey = id + 'img-' + imgArray[i];//存储图片的下标
//				alert(itemkey)
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