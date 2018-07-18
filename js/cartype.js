//	$('.sure').click(function(){
//		$('.reminder_world').html('查看详情将产生5个虚拟币的消耗哦');
//		$(this).click(function(){
//			$('.reminder').hide();
//		})
//	})

	
    $('.carplace').each(function(){
		$(this).click(function(){
            $('.main_ul').show();
            $('.cars').hide();
            $('.cars').empty();
			$(this).addClass('addbgcolor').parent('.carsitem').siblings().find('.carplace').removeClass('addbgcolor');
			
		})
	})

//	城市三级选择
    var cityPicker = new mui.PopPicker({
			layer: 3
	});
		cityPicker.setData(cityData3);

		var sel_city=document.getElementById('sel_city');
        var sel_cityone=document.getElementById('sel_cityone');
			sel_city.addEventListener('click', function(event) {
			cityPicker.show(function(items) {
				$('.chufadi').val((items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {}).text);

			});
		}, false);
		    sel_cityone.addEventListener('click', function(event) {
			cityPicker.show(function(items) {
                $('.mudidi').val((items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {}).text);
			});
		}, false);
	//日期选择
		var result = $('#result')[0];
		var loading = document.getElementById('loading');
		
			loading.addEventListener('click', function() {

				var id = this.getAttribute('id');

				var picker = new mui.DtPicker();
				picker.show(function(rs) {

                    $('.time_start').val(rs.text);
					$('.Data_year').html(rs.y.text+"年");
					$('.Data_month').html(rs.m.text+"月");
					$('.Data_date').html(rs.d.text+"日");
					$('.Data_hours').html(rs.h.text+"时");
					$('.Data_mintue').html(rs.i.text+"分");

					picker.dispose();
				});
			}, false);
			
			
	/*车长类型*/
			
		var carlentype=$('#carlentype');
		carlentype.click(function(){
			$('.tc_typeofcars').slideDown();
			$('.mask').show();
		})
	    $('.mask').click(function(){
	       	$(this).hide();
	       	$('.tc_typeofcars').hide()
	    })
	       

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
	var urL=location.href;
	var type=getUrl(urL).type;
	if(type==2){
		$('h1').html('长途车')
	}else{
		$('h1').html('短途车')
	}
    var car_cat;
    function cars(obj){
    	var cat_id=$(obj).attr('data-type');
    	$(obj).parent().find('div').eq(0).addClass('addbgcolor');
    	$(obj).addClass('addbgcolor').siblings().removeClass('addbgcolor');
    	if($(obj).hasClass('addbgcolor')){
    		car_cat=$(obj).html();
    		var carid=$(obj).attr('data-type');
    	
    		
    	}
    	$.ajax({
			type:"post",
			url:globalUrl+'index.php/Mobile/JkOrder/getspec',
			data:{cat_id:cat_id},
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

	var carspec;
    function changecar(obj){
    	var car_cat=$(obj).find('.car_cat')
    	car_cat.addClass('addcarcolor').parent('.box').siblings().find('.car_cat').removeClass('addcarcolor');
    	
    	var specid=car_cat.attr('data-type');
    	if(car_cat.hasClass('addcarcolor')){
    		carspec=car_cat.html();
    	
    	}
    }
	function carsure(obj){
		
		var cartypeof=car_cat+' '+carspec;
		
        $('.carsitem').val(cartypeof);
        $('.tc_typeofcars').hide();
        $('.mask').hide()
	}
     


	var userid=localStorage.getItem('user_id');
	var company_status;
	var del_coin;
	
	getuserinfo()
	function getuserinfo(){
	    $.ajax({
	    	type:"post",
	    	url:globalUrl+"/index.php/Mobile/JkUser/myLists",
	    	data:{user_id:userid},
	    	dataType:'json',
	    	success:function(res){
	    		var data=res.user;
	    		company_status=data.company_status;
	    		del_coin=data.del_coin;
	    		$('.xunibi').html(del_coin)
	    	}
	    });
	}

function getline(){
//	alert('s')
	var totalPage;
	var p=2;
	var address=$('.chufadi').val();
	var yuyueaddress=$('.mudidi').val();
	 
	var $place=address.replace(/\s+/g,"");
	var $place1=yuyueaddress.replace(/\s+/g,"");
//	alert($place)
	var time=$('.time_start').val();
	var date = new Date(time);
	var load_time = date.getTime()/1000;
	var cat=car_cat;
	var carspec=carspec;
	
	var ajaxData={};
	ajaxData.p=1;
	ajaxData.address=$place;
	ajaxData.yuyueaddress=$place1;
	ajaxData.load_time=load_time;
	ajaxData.type=type;
	ajaxData.cat=cat;
	ajaxData.carspec=carspec;

	if(address!=''&&yuyueaddress!=''&&load_time!=""&&cat!=''&&carspec!=''){
		
		$.ajax({
			url: globalUrl+'index.php/Mobile/JkLine/dCList',
			type: 'post',
			data: ajaxData,
			dataType: 'json',
			
			success: function(res){
				var data=res.root;
				totalPage=res.totalPage;
				var str='';
				if(data.length>0){		
					for(var i=0;i<data.length;i++){
						str+='<div class="cardetails" onclick="carsdetail(this)" data-type='+data[i].goods_id+'>';
						str+='<div class="car_pic"><img src="'+picUrl+data[i].original_img+'"/></div>';
						str+='<div class="carsitem">';
					
						str+='<div class="z_place">';
						str+='<div><img src="../img/changtuche_zhuangchedizhi.png"/></div>'
						str+='<div class="">'+data[i].add1+'</div>';
						str+='</div>';
						str+='<div class="x_place">';
						str+='<div><img src="../img/changtuche_xiehuodizhi.png"/></div>';
						str+='<div class="">'+data[i].add2+'</div>';
						str+='</div>';
						str+='<div class="time">';
						str+='<div class="time_pic"><img src="../img/changtuche_shijian.png"/></div>';
						str+='<div class="time_start timestatr">'+data[i].load_time+'</div>';
						str+='</div>';
						str+='<div class="parameter">';
						str+='<div class="time_pic"><img src="../img/changtuche_chexingchechang.png"/></div>';
						str+='<div class="time_start"><span>'+data[i].car.meter+'<span>米<span>'+data[i].car.cat+'<span><span>'+data[i].car.bulk+'<span>方<span>'+data[i].car.ton+'<span>吨</div>';
						str+='</div>';
						str+='</div>';
						str+='</div>';
		
						
					}
					$('.cars').append(str);
					for(var i=0;i<$('.timestatr').length;i++){
						var time=$('.timestatr').eq(i).html();
						var timeout=timeToDate(time);
						$('.timestatr').eq(i).html(timeout);
					}
				}else{
					
				}
				
			}
		})
	}else{
		mui.toast('请输入完整信息');
		return;
	}
	
	$('.main_ul').hide();
	$('.cars').show();

	$(window).scroll(function() {
			if ($(document).scrollTop() >= $(document).height() - $(window).height()){
				if(p>totalPage){
	//				alert(totalPage)
					mui.toast('没有更多结果');
				}else{
					ajaxData.p = p;
		//			alert(JSON.stringify(ajaxdata));
					getline();
					p++
				}
			}
		
		});	
	}

	var goodsid;
	function carsdetail(obj){
		
		if(company_status==0||company_status==3){
			reminder('实名认证后才能查看详情');
		    $('.mask').show();
		    
		}else{
			goodsid=$(obj).attr('data-type');
			$('.reminders').show();
			$('.mask').show();
//			Makesure()
		}

	}
	function makesure(){
  		mui.openWindow({
  			url:'../person/set_up/set_id/set_id.html',
  			id:'../person/set_up/set_id/set_id.html'
  		})
  		$('.mask').hide();
  		$('.reminder').hide();
  	}
	function Makesure(){
//		alert(goodsid)
      		mui.openWindow({
				url:'hz_carsdetail.html?goodsid='+goodsid+'&del_coin='+del_coin+'',
				id:'hz_carsdetail.html'
			})
      		$('.mask').hide();
      		$('.reminders').hide();
      	
	}
//		function cancel(){
//			$('.mask').hide();
//			$('.reminder').hide();
//		}
       function cancell(){
  			$('.mask').hide();
			$('.reminders').hide();
  		}
		$('.mask').click(function(){
			$('.mask').hide();
			$('.reminder').hide()
			$('.reminders').hide()
		})

