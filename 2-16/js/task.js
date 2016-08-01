/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
var inputCity=document.getElementById("aqi-city-input");
var inputValue=document.getElementById("aqi-value-input");
var addBtn=document.getElementById("add-btn");
var showTable=document.getElementById("aqi-table");
var inputText=document.getElementById("text");
//前后去空格及空字符处理（trim）
function trim(str){
	return str.replace(/(^\s*)|(\s*$)/g,"");
}

inputCity.onblur=cleanStr;

inputValue.onblur=cleanStr;

function cleanStr(){
	// 判断是否是中英文字符
	var pattern1=/^([_a-zA-Z]|[\u4E00-\u9FA5])*$/;
	// 判断是否是正整数
	var pattern2=/^[1-9]+[0-9]*]*$/;
	if(pattern1.test(inputCity.value)){
		inputText.innerHTML="";
		return true;
	}else{
		inputText.innerHTML="城市名必须为中英文字符";
		return false;
	}
	if(inputValue.value.match(pattern2)){
		inputText.innerHTML="";
		return true;
	}else{
		inputText.innerHTML="空气质量指数必须为正整数";
		return false;
	}
}
// 添加数据
function addAqiData() {
	var cityVal=trim(inputCity.value);
	var numVal=trim(inputValue.value);

	aqiData[cityVal]=numVal;


}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var list="<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
	for(var city in aqiData){
		list+="<tr><td>"+city+"</td><td>"+aqiData[city]+"</td><td><button>删除</button></td></tr>";

	}
	showTable.innerHTML=list;

}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    if(cleanStr()){
    	addAqiData();
    	renderAqiList();
    }else{
    	alert("字符串非法");
    }
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
    // do sth.
    //获取父节点的父节点
    var parent=this.parentNode.parentNode;
    //获取城市名
    var cityName=parent.firstChild.innerHTML;
    
    delete aqiData[cityName]; //删除对象
    renderAqiList();
}

function init() {
	addBtn.addEventListener("click",addBtnHandle);
    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    showTable.addEventListener("click",function(event){
    	if(event.target.nodeName.toLowerCase()==="button"){
    		//改变this指向当前触发点
    		delBtnHandle.call(event.target,arguments);
    	}
    })
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

}

init();




var a;

a=2;

console.log(a);

foo();
function foo(){
	console.log(a);//undefined
	var a=2;
}