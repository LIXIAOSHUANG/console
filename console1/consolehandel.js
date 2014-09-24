var flag = false;
(function(){
    var t_console = lib.$("console");
	var t_close = lib.$("close");
	var t_content= lib.$("content");
	/*var pageX =0;
	var pageY =0;*/
	var loadHandle = {
		/*初始化*/
		init:function(){
			// t_console = this.generateConsole();this.generateConsole();			
			this.bindEvent();
		},
		/*事件绑定*/
		bindEvent:function(){
			var me =this;
           lib.EventUtil.addHandler(document,"keyup",function(){
               me.CallConsole();// debugger
            });
			 lib.EventUtil.addHandler(t_console,"mousedown",function(){
                var eve = lib.EventUtil.getEvent(event);
                var x = eve.pageX, y=eve.pageY;
                lib.EventUtil.addHandler(document,"mousemove",function(){
                me.MouseMove(x,y);
                });
                lib.EventUtil.addHandler(t_console,"mouseup",function(){
                	lib.EventUtil.removeEventListener(document,"mousemove",function(){
                		me.MouseMove(x,y);
                	});
                });
			});
			lib.EventUtil.addHandler(t_close,"click",function(){
                me.Close();
			});
		},
		/*生成控制台*/
		/*generateConsole:function(){
			var console_div = document.createElement("div");
			console_div.setAttribute("id","console");
			console_div.setAttribute("class","console");
			var inner_html = '<div class="head"><p class="close" id="close">X</p>'+
			'<p class="title">控制台</p></div><div class="content" id="content"></div>';
			console_div.innerHTML = inner_html;
			document.getElementsByTagName("body")[0].appendChild(console_div);
			t_close = lib.$("close");
	        t_content = lib.$("content");
			return lib.$("console");
		},*/
		/*调出控制台*/
		CallConsole:function(){
            var e = lib.EventUtil.getEvent(event);
           if(e.ctrlKey && e.keyCode==123){
           	t_console.style.display="block";
           	flag = true;
           }
		},
		/*关闭控制台*/
		Close:function(){
			t_console.style.display="none";
			flag = false;
		},
		/*输出内容*/
		Message:function(message){
           var dispalyCon = lib.$("content");
           if(flag){
           	var para = document.createElement("p");
           	para.innerHTML = message;
           	dispalyCon.appendChild(para);
           	// dispalyCon.scrollTop = dispalyCon.scrollHeight;
           }
		},
	MouseMove:function(x,y){
       var winWidth = document.documentElement.clientWidth;
       var winHeight = document.documentElement.clientHeight;
	   var Ox =t_console.offsetLeft,
	       Oy = t_console.offsetTop,
	       Mx = event.pageX,
	       My = event.pageY;
	      if ((Ox + Mx - x) > 0 && (Ox + Mx - x + t_console.offsetWidth) < winWidth) {
						t_console.style.left = Ox + Mx - x + "px";

					}
					if ((Oy + My - y) > 0 && (Oy + My - y + t_console.offsetHeight) < winHeight) {
						t_console.style.top = Oy + My - y + "px";
					}
					x = Mx;
					y = My; 
	}
	};
	loadHandle.init();
})();
/*var div_height = parseInt(t_console.style.height); // +document.body.scrollLeft
                if((Ox + event.pageX - Mx )> 0&&(Ox + event.pageX - Mx+divWidth)<winWidth){
                 t_console.style.left = Ox + event.pageX - Mx+"px";
                }
                if((Oy + event.pageY - My)>0&&(Oy + event.pageY - My+divHeight)<winHeight){
                 t_console.style.top = Oy + event.pageY - My+"px";*/