var nameEle = document.getElementById("name");
var pswEle = document.getElementById("psw");
var pswreEle = document.getElementById("pswre");
var emailEle = document.getElementById("email");
var telEle = document.getElementById("tel");
var nameCheck = document.getElementById("nameCheck");
var pswCheck = document.getElementById("pswCheck");
var pswreCheck = document.getElementById("pswreCheck");
var emailCheck = document.getElementById("emailCheck");
var telCheck = document.getElementById("telCheck");
var submit = document.getElementById("submit");
//验证名称
var CheckNameObject = function() {

	this.nameFocus = function() {
		nameCheck.innerHTML = "必填，长度为4-16个字符";
		nameCheck.style.color = "#ccc";

	};
	this.nameBlur = function() {
		var nameVal = nameEle.value;

		if (nameVal === "") {
			nameCheck.innerHTML = "名称不能为空";
			nameCheck.style.color = "red";
			nameEle.style.borderColor = "red";
			return false;
		} else if (nameVal.length >= 4 && nameVal.length <= 16) {
			nameCheck.innerHTML = "名称可用";
			nameCheck.style.color = "green";
			nameEle.style.borderColor = "green";
			return true;
		} else {
			nameCheck.innerHTML = "名称不可用";
			nameCheck.style.color = "red";
			nameEle.style.borderColor = "red";
			return false;
		}
	};



};

//验证密码
var CheckPswObject = function() {
	this.pswFocus = function() {
		pswCheck.innerHTML = "必填，长度为6-20个字符";
		pswCheck.style.color = "#ccc";
	};
	this.pswBlur = function() {
		var pswVal = pswEle.value;

		if (pswVal === "") {
			pswCheck.innerHTML = "密码不能为空";
			pswCheck.style.color = "red";
			pswEle.style.borderColor = "red";
			return false;
		} else if (pswVal.length >= 6 && pswVal.length <= 20) {
			pswCheck.innerHTML = "密码可用";
			pswCheck.style.color = "green";
			pswEle.style.borderColor = "green";
			return true;
		} else {
			pswCheck.innerHTML = "密码不可用";
			pswCheck.style.color = "red";
			pswEle.style.borderColor = "red";
			return false;
		}
	};
};
//确认密码
var CheckPswreObject = function() {
	this.pswreFocus = function() {
		pswreCheck.innerHTML = "必填，再次输入相同密码";
		pswreCheck.style.color = "#ccc";
	};
	this.pswreBlur = function() {
		var pswVal = pswEle.value;
		var pswreVal = pswreEle.value;

		if (pswreVal === "") {
			pswreCheck.innerHTML = "密码不能为空";
			pswreCheck.style.color = "red";
			pswreEle.style.borderColor = "red";
			return false;
		} else if (pswreVal === pswVal) {
			pswreCheck.innerHTML = "密码输入一致";
			pswreCheck.style.color = "green";
			pswreEle.style.borderColor = "green";
			return true;
		} else {
			pswreCheck.innerHTML = "两次输入密码不一致";
			pswreCheck.style.color = "red";
			pswreEle.style.borderColor = "red";
			return false;
		}
	};
};
//验证邮箱
var CheckEmailObject = function() {
	this.emailFocus = function() {
		emailCheck.innerHTML = "必填，请填写正确的邮箱格式";
		emailCheck.style.color = "#ccc";
	};
	this.emailBlur = function() {
		var emailVal = emailEle.value;
		console.log(emailVal);
		//正则表达式验证邮箱是否含有@和.
		var emailPat = /^(.+)@(.+)$/;
		var matchEmail = emailVal.match(emailPat);
		if (emailVal === "") {
			emailCheck.innerHTML = "Email不能为空";
			emailCheck.style.color = "red";
			emailEle.style.borderColor = "red";
			return false;
		} else if (matchEmail === null) {
			emailCheck.innerHTML = "邮箱格式错误";
			emailCheck.style.color = "red";
			emailEle.style.borderColor = "red";
			return false;

		} else {
			emailCheck.innerHTML = "邮箱格式正确";
			emailCheck.style.color = "green";
			emailEle.style.borderColor = "green";
			return true;
		}
	};
};
//验证手机
var CheckTelObject = function() {
	this.telFocus = function() {
		telCheck.innerHTML = "必填，请输入11位手机号码";
		telCheck.style.color = "#ccc";
	};
	this.telBlur = function() {
		var telVal = telEle.value;

		if (telVal === "") {
			telCheck.innerHTML = "手机不能为空";
			telCheck.style.color = "red";
			telEle.style.borderColor = "red";
			return false;
		} else if (telVal.length == 11) {
			telCheck.innerHTML = "手机格式正确";
			telCheck.style.color = "green";
			telEle.style.borderColor = "green";
			return true;


		} else {
			telCheck.innerHTML = "手机格式错误";
			telCheck.style.color = "red";
			telEle.style.borderColor = "red";
			return false;
		}
	};
};
//对象实例化
var checkName = new CheckNameObject();
var checkPassword = new CheckPswObject();
var checkPasswordre = new CheckPswreObject();
var checkEmail = new CheckEmailObject();
var checkTel = new CheckTelObject();
//获取焦点和失去焦点事件
nameEle.onfocus = function() {
	checkName.nameFocus();
};
nameEle.onblur = function() {
	checkName.nameBlur();
};
pswEle.onfocus = function() {
	checkPassword.pswFocus();
};
pswEle.onblur = function() {
	checkPassword.pswBlur();
};
pswreEle.onfocus = function() {
	checkPasswordre.pswreFocus();
};
pswreEle.onblur = function() {
	checkPasswordre.pswreBlur();
};
emailEle.onfocus = function() {
	checkEmail.emailFocus();
};
emailEle.onblur = function() {
	checkEmail.emailBlur();
};
telEle.onfocus = function() {
	checkTel.telFocus();
};
telEle.onblur = function() {
	checkTel.telBlur();
};
//监听点击事件
submit.addEventListener("click", function(e) {
	if (checkName.nameBlur() && checkPassword.pswBlur() && checkPasswordre.pswreBlur() && checkEmail.emailBlur() && checkTel.telBlur()) {
		alert("提交成功");
	} else {
		alert("提交失败");
	}

}, false);