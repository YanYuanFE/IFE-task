define(function(){
	function Window(){}

	Window.prototype={
		login:function(content){
			var loginBox=document.createElement("div");
			loginBox.className="loginBox";
			var loginHead=document.createElement("div");
			loginHead.className="loginHead";
			loginHead.innerHTML=content;
			var loginForm=document.createElement("form");
			var nameLabel=document.createElement("label");
			var pswLabel=document.createElement("label");
			var nameInput=document.createElement("input");
			var pswInput=document.createElement("input");
			var loginBtn=document.createElement("input");
			loginForm.className="loginForm";
			nameInput.className="Input";
			nameInput.type="text";
			pswInput.type="password";
			pswInput.className="Input";
			loginBtn.type="button";
			loginBtn.className="loginBtn";
			nameLabel.innerHTML="用户：";
			pswLabel.innerHTML="密码：";

			document.body.appendChild(loginBox);
			loginBox.appendChild(loginHead);
			loginBox.appendChild(loginForm);
			loginForm.appendChild(nameLabel);
			loginForm.appendChild(pswLabel);
			loginForm.appendChild(loginBtn);
			nameLabel.appendChild(nameInput);
			pswLabel.appendChild(pswInput);

			loginBtn.value="登陆";
		}
	};

	return {
		Window:Window
	};
});