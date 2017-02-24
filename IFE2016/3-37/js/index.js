require(['window'],function(w){
	var loginBtn=document.getElementsByClassName("login")[0];
	loginBtn.onclick=function(){
		new w.Window().login("登陆");
		console.log("11");
		return false;
	};
});