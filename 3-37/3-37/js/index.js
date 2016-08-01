//获取元素id
function $(id){
	return document.getElementById(id);
}
//点击登陆弹出遮罩层和浮出层
$("login").onclick=function(){
	$("loginBox").style.display="block";
	$("loginMask").style.display="block";
	autoCenter($("loginBox"));
	startDrag($("loginHead"),$("loginBox"));
};
//点击关闭按钮或者遮罩层关闭浮出层
$("login-close").onclick=$("loginMask").onclick=function(){
	$("loginBox").style.display="none";
	$("loginMask").style.display="none";
};

//获取CSS属性
function getCss(obj,key){
	return obj.currentStyle ? obj.currentStyle[key]:document.defaultView.getComputedStyle(obj,false)[key];
}

//console.log(getCss($("loginBox"),"left"));
function autoCenter(obj){
	var bodyW=document.documentElement.clientWidth;
	var bodyH=document.documentElement.clientHeight;

	var objW=obj.offsetWidth;
	var objH=obj.offsetHeight;

	obj.style.left=(bodyW-objW)/2+"px";
	obj.style.top=(bodyH-objH)/2+"px";
	console.log(objW);
}


var params={
	left:0,
	top:0,
	currentX:0,
	currentY:0,
	flag:false
};

//拖拽浮层
var startDrag=function(bar,target,callback){
	if(getCss(target,"left")!=="auto"){
		params.left=getCss(target,"left");
		console.log(getCss(target,"left"));
	}
	if(getCss(target,"top")!=="auto"){
		params.top=getCss(target,"top");
	}
	bar.onmousedown=function(event){
		bar.style.cursor="move";
		params.flag=true;
		if(!event){
			event=window.event;
			//防止IE文字选中
			bar.onselectstart=function(){
				return false;
			};
		}
		var e=event;
		params.currentX=e.clientX;
		params.currentY=e.clientY;
		console.log(params);
	};

	document.onmousemove=function(event){
		var e=event ? event:window.event;
		if(params.flag){
			var nowX=e.clientX,
				nowY=e.clientY;
			var disX=nowX-params.currentX,
				disY=nowY-params.currentY;
				
			target.style.left=parseInt(params.left)+disX+"px";
			target.style.top=parseInt(params.top)+disY+"px";
		}
		if(typeof callback=="function"){
			callback(parseInt(params.left)+disX,parseInt(params.top)+disY);
		}
	};

	document.onmouseup=function(){
		params.flag=false;
		console.log("0");
		if(getCss(target,"left")!=="auto"){
			params.left=getCss(target,"left");
		}
		if(getCss(target,"top")!=="auto"){
			params.top=getCss(target,"top");
		}
	};
};

