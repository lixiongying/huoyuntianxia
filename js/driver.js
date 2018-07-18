var userid=localStorage.getItem('user_id');
var car_number=$('.license').html();/*车牌号*/
var cat;/*车型id*/
var particularly;
var spec_id;/*车规格*/


//		修改车型

$.ajax({
	type:"post",
	url:globalUrl+'/index.php/Mobile/JkOrder/getcarcat',
	
	dataType:'json',
	success:function(res){
		var data=res.info;
//			alert(JSON.stringify(data))
		var str='';
		if(res.code==0){
			for(var i=0;i<data.length;i++){	
				str+='<div class="type_list_li" onclick="xuanze(this)" data-type='+data[i].id+'>';
				str+='<div class="li_i">';
				str+='<div class="li_name">'+data[i].c_name+'</div>';
				str+='</div>';
				str+='</div>';
			}
			
			$('.carstype').html(str);
		}
    }
	
})




	function edittype(obj){
		$('.edittype').removeClass("hide");
		$('.sures').addClass("hide");
	}
	$('.chacha img').on('click',function(e){
		$(this).parent().parent().parent().addClass("hide");
		$('.sures').removeClass("hide");

	})
	/*车型*/
	function xuanze(obj){
		
		$('.type_list_li_active').removeClass("type_list_li_active");
		$(obj).addClass("type_list_li_active");
//		alert($(obj).attr('data-type'))
		if($(obj).hasClass("type_list_li_active")){
			cat=$(obj).attr('data-type');
			
		}
		
	}
	
	
	
	$('.type_sure').on('click',function(e){
		var value = $('.type_list_li_active').find('.li_name').html();
		$('.type_value').html(value);
		$(this).parent().parent().addClass("hide");
		$('.sures').removeClass("hide");
		/*修改车长*/
       getcarlong();
	    
	    
	})
	
//			修改车长
		function editcarlength(obj){
			$('.editcarlength').removeClass("hide");
			$('.sures').addClass("hide");
		}
		function xuanzelength(obj){
			$('.length_list_li_active').removeClass("length_list_li_active");
			$(obj).addClass("length_list_li_active");
			spec_id=$(obj).attr('data-type');
			
		}
		$('.length_sure').on('click',function(e){
			var value = $('.length_list_li_active').find('.li_name').html();
			$('.length_value').html(value);
			$(this).parent().parent().addClass("hide");
			$('.sures').removeClass("hide");
		})
	
   function getcarlong(){
		$.ajax({
			type:"post",
			url:globalUrl+"index.php/Mobile/JkOrder/getspec",
			data:{cat_id:cat},
			dataType:'json',
			success:function(res){
				var data=res.info;
//				alert(JSON.stringify(data))
				var str='';
				if(data.length!=0){
					for(var i=0;i<data.length;i++){
						str+='<div class="type_list_li" onclick="xuanzelength(this)" data-type='+data[i].id+'>';
						str+='<div class="li_i">';
						str+='<div class="li_name"><span>'+data[i].car_spec+'</span><span>('+data[i].cat_name+')</span></div>';
						str+='</div>';
						str+='</div>';
		//				<div class="type_list_li" onclick="xuanzelength(this)">
		//						<div class="li_i">
		//							<div class="li_name">1.7米面包车（0.8吨）</div>
		//						</div>
		//					</div>
					}
					
					$('.carlong').html(str);
				}
				
			}
		});
}

//		修改特种
		function editspecial(obj){
			$('.editspecial').removeClass("hide");
			$('.sures').addClass("hide");
		}
		function xuanzespecial(obj){
			
			if($(obj).attr('data-type')==1){
				particularly==1;
			}else if($(obj).attr('data-type')==0){
				particularly==0;
			}
			$('.special_list_li_active').removeClass("special_list_li_active");
			$(obj).addClass("special_list_li_active");

		}
		$('.special_sure').on('click',function(e){
			var value = $('.special_list_li_active').find('.li_name').html();
			$('.special_value').html(value);
			$(this).parent().parent().addClass("hide");
			$('.sures').removeClass("hide");
		})
	function surechange(){
		if(car_number=''||car_number==undefined||car_number==null){
			mui.toast('请填写车牌');
			return false;
		}
		if(particularly=''||particularly==undefined||particularly==null){
			mui.toast('请选择是否为特种装载');
			return false;
		}
		if(cat=''||cat==undefined||cat==null){
			mui.toast('请填写车型');
			return false;
		}
		if(spec_id=''||spec_id==undefined||spec_id==null){
			mui.toast('请填写车长规格');
			return false;
		}else{
			var parms={};
			parms.user_id=userid;
			parms.car_number=car_number;
			parms.particularly=particularly;
			parms.cat=cat;
			parms.spec_id=spec_id;
		
		
			$.ajax({
				type:"post",
				url:globalUrl+"index.php/Mobile/JkUser/bangche",
				data:parms,
				success:function(res){
		//			var data=res.status;
					if(res.status==-1){
						mui.toast('修改成功');
						mui.back()
					}else{
						mui.toast(res.msg);
					}
				}
			});
		
		}
		
		
		
	//	parms.cat=
	}
