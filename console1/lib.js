window.lib = {
	$:function(id){
       return document.getElementById(id);
	}/*,
   message:function(msg){
      console.log(msg);
   }*/
};
lib.EventUtil = {
	addHandler:function(element,type,handler){
         if(element.addEventListener){
         	element.addEventListener(type,handler,false);
         }else if(element.attachEvent){
         	element.attachEvent("on"+type,handler);
         }else{
         	element["on"+type] = handler;
         }
	},
	removeHandler:function(element,type,handler){
               if(element.removeEventListener){
               	element.removeEventListener(type,handler,false);
               }else if(element.detachEventListener){
               	element.detachEventListener("on"+type,handler,false);
               }else{
               	element["on"+type] = null;
               }
	},
	getEvent:function(event){
      if(!event) {    // 兼容IE浏览器
        event = window.event;
        event.target = event.srcElement;
        event.layerX = event.offsetX;
        event.layerY = event.offsetY;
    }
    event.pageX = event.pageX ===undefined? event.clientX + (document.body.scrollLeft||document.documentElement.scrollLeft):event.pageX; // 计算鼠标指针X轴距离
    event.pageY = event.pageY ===undefined ? event.clientY + (document.body.scrollTop||document.documentElement.scrollTop):event.pageY;  // 计算鼠标指针Y轴距离
    return event;  
		// return event ? event : window.event;
	}
};