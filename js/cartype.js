    var userid=localStorage.getItem('user_id');
	var carstatus=localStorage.getItem('car_status');
    var ajaxData={};
    var urL=location.href;
    var type=getUrl(urL).type;
   
	ajaxData.p=1;
	var p=2;
	var totalPage;
	ajaxData.type=type;
		
    $('.carsitem').each(function(){
		$(this).click(function(){
//          $('.main_ul').show();
//          $('.cars').hide();
//          $('.cars').empty();
			$(this).children('.carplace').addClass('addbgcolor').parent('.carsitem').siblings().find('.carplace').removeClass('addbgcolor');
			$(this).children('.carplace_img').children('img').attr('src','../img/jiantouxia.png').parents('.carsitem').siblings().find('.carplace_img').children('img').attr('src','../img/jiantoushang.png');
		})
	})

//	城市三级选择
    var $place;
    var $place1;
    var cityPicker = new mui.PopPicker({
			layer: 3
	});
		cityPicker.setData(cityData3);

		var sel_city=document.getElementById('sel_city');
        var sel_cityone=document.getElementById('sel_cityone');
        var locationstart=document.getElementById('locationstart');
        var locationend=document.getElementById('locationend');
		sel_city.addEventListener('click', function(event) {
			cityPicker.show(function(items) {
				var startaddress=(items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {}).text;
				
				$place=startaddress.replace(/\s+/g,"");
				
				ajaxData.address=$place;
			
				ajaxData.yuyueaddress='';
				ajaxData.cat=''; 
        		ajaxData.spec_id=''; 
        		ajaxData.cat=''; 
    
    			ajaxData.load_time='';
                getalltheline()
              
//				$('.chufadi').val((items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {}).text);
		
			});
		}, false);
		sel_cityone.addEventListener('click', function(event) {
			cityPicker.show(function(items) {
				var endaddress=(items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {}).text;
				$place1=endaddress.replace(/\s+/g,"");
//              $('.mudidi').val((items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {}).text);
			    ajaxData.address='';
			    ajaxData.cat=''; 
        	    ajaxData.spec_id=''; 
        	    ajaxData.load_time='';
			    ajaxData.yuyueaddress=$place1;
                 getalltheline()
			});
		}, false);
		locationstart.addEventListener('click', function(event) {
			cityPicker.show(function(items) {
                $('#stlocation').val((items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {}).text);
			});
		}, false);
		locationend.addEventListener('click', function(event) {
			cityPicker.show(function(items) {
                $('#enlocation').val((items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {}).text);
			});
		}, false);
		
	//日期选择
		var result = $('#result')[0];
		var loading = document.getElementById('loading');
		var dataselect = document.getElementById('dataselect');/*司机端日期选择*/
			loading.addEventListener('click', function() {

				var id = this.getAttribute('id');

				var picker = new mui.DtPicker();
				picker.show(function(rs) {

                    $('.time_start').val(rs.text);
//					$('.Data_year').html(rs.y.text+"年");
//					$('.Data_month').html(rs.m.text+"月");
//					$('.Data_date').html(rs.d.text+"日");
//					$('.Data_hours').html(rs.h.text+"时");
//					$('.Data_mintue').html(rs.i.text+"分");
                    var time_start=rs.text;
					var date = new Date(time_start);
					var load_time = date.getTime()/1000;
					 ajaxData.address='';
					 ajaxData.yuyueaddress='';
					 ajaxData.cat=''; 
        	         ajaxData.spec_id=''; 
					 ajaxData.load_time=load_time;
                     getalltheline()
					 picker.dispose();
				});
			}, false);
			
			dataselect.addEventListener('click', function() {

				var id = this.getAttribute('id');

				var picker = new mui.DtPicker();
				picker.show(function(rs) {

                    $('.demo_datetime').val(rs.text);
//					$('.Data_year').html(rs.y.text+"年");
//					$('.Data_month').html(rs.m.text+"月");
//					$('.Data_date').html(rs.d.text+"日");
//					$('.Data_hours').html(rs.h.text+"时");
//					$('.Data_mintue').html(rs.i.text+"分");

					picker.dispose();
				});
			}, false);
			
			
	/*车长类型*/
//		
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
		
				$('#Cartype').html(str)
				
			}
		})
	var urL=location.href;
	var type=getUrl(urL).type;
	
	if(carstatus==1){
		$('.main').hide();
		$('.mainone').show();
	}else{
		$('.main').show();
		$('.mainone').hide();
	}
	if(type==2){
		$('h1').html('长途车')
	}else{
		$('h1').html('短途车')
	}
    var car_cat;/*车型*/
    var cat_id;/*车型id*/
    function cars(obj){
    	$('.carslength').show();
    	cat_id=$(obj).attr('data-type');
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

	var carspec;/*车长*/
	var specid;/*车长id*/
    function changecar(obj){
    	var car_cat=$(obj).find('.car_cat')
    	car_cat.addClass('addcarcolor').parent('.box').siblings().find('.car_cat').removeClass('addcarcolor');
    	
    	specid=car_cat.attr('data-type');
    	if(car_cat.hasClass('addcarcolor')){
    		carspec=car_cat.html();
    	
    	}
    }
	function carsure(obj){
//      alert(cat_id);
//      alert(specid)
		if(cat_id==''&&cat_id==undefined&&cat_id==null&&spec_id==''&&spec_id==null&&spec_id==undefined){
//			var cartypeof=car_cat+' '+carspec;
            mui.toast('请选择车规格')
		}else{
//			var cartypeof=car_cat;
			ajaxData.cat=cat_id; 
        	ajaxData.spec_id=specid; 
        	ajaxData.address='';
        	ajaxData.yuyueaddress='';
//      	ajaxData.
            getalltheline();
            $('.tc_typeofcars').hide();
            $('.mask').hide()
		}
		
		
//      $('.carsitem').val(cartypeof);
//      $('.tc_typeofcars').hide();
//      $('.mask').hide()
	}
     


	
	var company_status;
	var del_coin;
	var vitval_coin;
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
	    		vitval_coin=data.vitval_coin;
	    		del_coin=data.del_coin;
	    		$('.xunibi').html(del_coin)
	    	}
	    });
	}
	
	
    /*不用管*/
    function getline(){
		var address=$('.chufadi').val();
		var yuyueaddress=$('.mudidi').val();
		 
		var $place=address.replace(/\s+/g,"");
		var $place1=yuyueaddress.replace(/\s+/g,"");
	//	alert($place)
		var time=$('.time_start').val();
		var date = new Date(time);
		var load_time = date.getTime()/1000;
//		var cat=car_cat;
//		var carspec=carspec;
//      alert(cat_id)
//		alert(specid)
		
		ajaxData.address=$place;
		ajaxData.yuyueaddress=$place1;
		ajaxData.load_time=load_time;
		
		ajaxData.cat=car_cat;
//		ajaxData.carspec=carspec;
	
		if(address!=''||yuyueaddress!=''||load_time!=""||cat!=''||address!=undefined||yuyueaddress!=undefined||load_time!=undefined||cat!=undefined){
			getalltheline()
			
		}else{
			mui.toast('请输入完整信息');
			return;
		}
		
		$('.main_ul').hide();
		$('.cars').show();


	}

    getalltheline()
    function getalltheline(){
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
						str+='<div class="car_pic"><img src="'+picUrl+data[i].car.image2+'"/></div>';
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
						str+='<div class="time_start"><span>'+data[i].car.spec_name.cat_name+'<span>/<span>'+data[i].car.spec_name.car_spec+'<span><span>'+data[i].car.bulk+'<span>方<span>'+data[i].car.ton+'<span>吨</div>';
						str+='</div>';
						str+='</div>';
						str+='</div>';
		
						
					}
					if(ajaxData.p==1){
						$('.cars').html(str);
							for(var i=0;i<10;i++){
								var time=$('.timestatr').eq(i).html();
								var timeout=timeToDate(time);
								$('.timestatr').eq(i).html(timeout);
							}
					}else{
						$('.cars').append(str);
						for(var i=10;i<100;i++){
							var time=$('.timestatr').eq(i).html();
							var timeout=timeToDate(time);
							$('.timestatr').eq(i).html(timeout);
						}
					}
//					$('.cars').append(str);
					
				}else if(data.length==''||data==null||data==undefined){
					str+='<div class="nulldata">暂无结果</div>'
						
					$('.cars').html(str);
					
				}
				
			}
		})
	}
     $('#bg_fx').click(function(){
		   	mui.back()
	})
    $('.chongzhi').click(function(event){
    	ajaxData.cat=''; 
    	ajaxData.spec_id=''; 
    	ajaxData.address='';
    	ajaxData.yuyueaddress='';
    	ajaxData.load_time='';
    	getalltheline()
    	
    });
   

//  function chongzhi(){
//  	getalltheline()
//  }
	if(carstatus==0){
		$(window).scroll(function() {
			if ($(document).scrollTop() >= $(document).height() - $(window).height()){
				if(p>totalPage){
	//				alert(totalPage)
					mui.toast('没有更多结果');
				}else{
					
					ajaxData.p = p;
		//			alert(JSON.stringify(ajaxdata));
					getalltheline();
					p++
				}
			}
		
		});			
	}
	

	var goodsid;
	function carsdetail(obj){
		goodsid=$(obj).attr('data-type');
		
		if(company_status==0||company_status==3){
			reminder('实名认证后才能查看详情');
		    $('.mask').show();
		    
		}else{
			mui.openWindow({
				url:'hz_carsdetail.html?goodsid='+goodsid+'&type='+type+'',
				id:'hz_carsdetail.html'
			})
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
		
		$('.cancel').click(function(){
			$('.tc_typeofcars').fadeOut();
			$('.mask').fadeOut()
		})
		
    
/*司机端*/

    if(carstatus==1){
        $('.chongzhi').hide()	 
      
		var carid;
		var carnumber;
		getuserinfo();
		function getuserinfo(){
			$.ajax({
				type:"post",
				url:globalUrl+"index.php/Mobile/JkUser/myLists",
				data:{user_id:userid},
				dataType:'json',
				success:function(res){
					var data=res.user.car_info;
					carid=data.id;
					carnumber=data.car_number;
					$('#carnumber').html(carnumber);
				}
			});
		}
		
		
		
		$('.surepublish').click(function(){
	       var $time=$('.demo_datetime').val();
	       var date = new Date($time);
	       var time = date.getTime()/1000;

			var $carnumber=$('#carnumber').html();
			var $location=$('#stlocation').val();
			var $location1=$('#enlocation').val();
			var $remakes=$('.input_message').val();
            var parms={};
             
            var $place=$location.split(' ');
            var $place1=$location1.split(' ');
            var $place2=$place.join(',');
            var $place3=$place1.join(',')
         
            parms.user_id=userid;
            parms.type=type;
            parms.address=$place2;
            parms.yuyueaddress=$place3;
            parms.remark=$remakes;
            parms.load_time=time;
            parms.car_id=carid;
//          alert(JSON.stringify(parms));
//          return
            if(time==''||$location==''||$location1==''){
            	mui.toast('信息不完整');
            	return;
            }else{
            	$.ajax({
            		type:"post",
            		url:globalUrl+"index.php/Mobile/JkLine/addLine",
            		data:parms,
            		success:function(res){
            			var data=res;
            			if(data.code==0){
            				mui.toast('发布成功');
            				mui.back();
            			}
            		}
            	});
            }
            
            
		})
	}