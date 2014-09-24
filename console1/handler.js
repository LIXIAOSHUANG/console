var flag = false;
(function(){
    var t_console = lib.$("console");
	var t_close = lib.$("close");
	var t_content= lib.$("content");
	var Ox =0, Oy =0,Mx=0,My=0;
	var loadHandle = {
		/*初始化*/
		init:function(){
			debugger;// t_console = this.generateConsole();this.generateConsole(); 		
			this.bindEvent();
		},
		/*事件绑定*/
		bindEvent:function(){
			debugger;
			var me =this;
           lib.EventUtil.addHandler(document,"keyup",function(){
               me.CallConsole();// debugger
            });
			 lib.EventUtil.addHandler(t_console,"mousedown",function(event){
                // var eve = lib.EventUtil.getEvent(event);
                /*按下鼠标的对象的XY的坐标必须放在外面否则造成移动错乱*/
                Mx = event.pageX;
                My = event.pageY;
                /*移动对象的XY的坐标*/
                Ox = parseInt(t_console.offsetLeft);
                Oy = parseInt(t_console.offsetTop);
                var mousemoveHandler = function(event){
                // var event = lib.EventUtil.getEvent(event);
                var left = Ox + event.pageX - Mx;
                var top = Oy + event.pageY - My;
                var divWidth=parseInt(getComputedStyle(t_console,false)["width"]);
                var winWidth = document.documentElement.scrollWidth||document.body.scrollWidth;
                var divHeight=parseInt(getComputedStyle(t_console,false)["height"]);
                var winHeight = document.documentElement.scrollHeight||document.body.scrollHeight;                
               /*获取不到属性
                var divWidth=t_console.getAttribute("width");
                } */
                if(left<0){
                  left =0;
                }else if(left > (winWidth-divWidth)){
                   left = winWidth-divWidth;
                };
                if(top<0){
                  top =0;
                }else if(top > (winHeight-divHeight)){
                   top = winHeight-divHeight;
                } ;
                t_console.style.left =left+"px";       
                t_console.style.top = top +"px";
	          };
            //debugger
            lib.EventUtil.addHandler(t_console,"mousemove",mousemoveHandler);
            lib.EventUtil.addHandler(t_console,"mouseup",function(){
                	lib.EventUtil.removeHandler(t_console,"mousemove",mousemoveHandler);              
                });
            lib.EventUtil.addHandler(t_console,"mouseleave",function(){
            	lib.EventUtil.removeHandler(t_console,"mousemove",mousemoveHandler);    
            })
			     });
			 lib.EventUtil.addHandler(t_close,"click",me.Close);
		},
		/*调出控制台*/
		CallConsole:function(){
      debugger
            var e = lib.EventUtil.getEvent(event);
           if(e.ctrlKey && e.keyCode==123){
           	 t_console.style.display="block";
            // t_console.setAttribute("display","block");
           	flag = true;
           }
		},
		/*关闭控制台*/
		Close:function(){
		  t_console.style.display="none";
     //设置该属性对展示没有效果不起作用
      // t_console.setAttribute("display","none")
			flag = false;
      debugger
    },
    /*输出内容*/
		Message:function(message){
           var dispalyCon = lib.$("content");
           if(flag){
           	var para = document.createElement("p");
           	console.log(message);
           	para.innerHTML = message;
           	dispalyCon.appendChild(para); // dispalyCon.scrollTop = dispalyCon.scrollHeight;         
           }
           /*当超过设置高度滚动条滚到下边*/
           t_content.scrollTop = t_content.scrollHeight - t_content.clientHeight; 
		}
	};
// lib.message=loadHandle.Message;
 lib.message=loadHandle.Message;
	loadHandle.init();
})();


