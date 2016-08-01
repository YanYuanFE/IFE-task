/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/
//绑定事件
var bindEvent=function(dom,type,fn){
	if(dom.addEventListener){
		dom.addEventListener(type,fn,false);
	}else if(dom.attachEvent){
		dom.attachEvent('on'+type,fn);
	}else{
		dom['on'+type]=fn;
	}
};
var citySelect=document.getElementById("city-select");
var chartWrap=document.getElementById("aqi-chart-wrap");
// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};
console.log(aqiSourceData);


// for (var key in aqiSourceData) {
//         var tempCity = aqiSourceData[key];
//         var keyArr = Object.getOwnPropertyNames(tempCity);
//         console.log(keyArr[0].slice(5, 7));
//     }

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: "北京",
  nowGraTime: "day"
};

//标题内容获取
function getTitle(){
	switch(pageState.nowGraTime){
		case "day":
			return "日平均";
		case "week":
			return "周平均";
		case "month":
			return "月平均";

	}
}
/**
 * 渲染图表
 */
function renderChart() {
	var html="";
	var chartWidth=chartWrap.clientWidth;	
	var renderData=chartData[pageState.nowGraTime][pageState.nowSelectCity];
	console.log(renderData);
	var len=renderData.length;
	var boxW=Math.floor(chartWidth/(len*2));
	html+="<div class='title'>"+pageState.nowSelectCity+"市01-03"+getTitle()+"空气质量报告</div>";
	for(var n=0;n<renderData.length;n++){
		html+="<div class='data-box' style='height:"+renderData[n]+"px;width:"+boxW+"px;margin:0 "+boxW/2+"px;' title="+dataTitle(n)+':'+renderData[n]+"></div>";
	}
	chartWrap.innerHTML=html;
}

//获取Title
function dataTitle(n){
	switch(pageState.nowGraTime){
		case "day":
			return getDay(n);
		case "week":
			return getWeek(n);
		case "month":
			return getMonth(n);
			

	}
}
//获取天数
function getDay(n){
	for(var key in aqiSourceData){
		if(key==pageState.nowSelectCity){
			var dayArr=Object.getOwnPropertyNames(aqiSourceData[key]);

			for(var i=0;i<dayArr.length;i++){
				if(i==n){
					return dayArr[i];
				}
			}
		}
	}
}

function getWeek(n){
	return "2016年第"+(n+1)+"周";
}
function getMonth(n){
	return "2016年"+(n+1)+"月";
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化
  var radio=document.getElementsByName("gra-time");
  // console.log(radio)
  // for(var i=0;i<radio.length;i++){
  // 	radio[i].setAttribute("checked",false); 
  	
  // }
  // this.setAttribute("checked",true); 
  pageState.nowGraTime=this.value;
   
  // 设置对应数据
  renderChart();
  // 调用图表渲染函数
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化
  var selectIndex=citySelect.selectedIndex;
  var getCity=citySelect.options[selectIndex].text;
  if(getCity!=pageState.nowSelectCity){
  	// 设置对应数据
  	pageState.nowSelectCity=getCity;
  	// 调用图表渲染函数
  	renderChart();
  } 
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
	var radioTime=document.getElementsByName("gra-time");
	for(var i=0;i<radioTime.length;i++){
		bindEvent(radioTime[i],"click",function(event){
			graTimeChange.call(event.target);
		});
	}

}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  for(var key in aqiSourceData){
  	//获取select选择框城市数组
  	var citySelectarr=[];
	for(var i=0;i<citySelect.options.length;i++){
	  var cityOption=citySelect.options[i].text;
	  citySelectarr.push(cityOption);
	}
	//判断增加的option是否存在数组citySelectarr中
  	if(citySelectarr.indexOf(key)==-1){
		
		citySelect.options.add(new Option(key));
  	}

  }
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  bindEvent(citySelect,"change",citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  
  //获取所有天数空气质量指数的数组
  // 创建平均月和周的对象
  var dataWeek={};
  var dataMonth={};
  var dataVal={};
  for(var city in aqiSourceData){

  	dataWeek[city]=[];
  	dataMonth[city]=[];
  	dataVal[city]=[];
  	//获取所有数据对象
  	var dataObject=aqiSourceData[city];
  	//获取所有日期
  	var dataTime=Object.getOwnPropertyNames(dataObject);
  	
  	//console.log(dataTime);

  	var monthFlag;
  	//月份数组
  	var monthNum=[];
  	//月份天数数组
  	var monthDay=[];
  	
  	
  	
  	//获取月份数
  	for(var i=0;i<dataTime.length;i++){
  		monthFlag=dataTime[i].slice(5,7);

  		if(monthNum.indexOf(monthFlag)==-1){
  			monthNum.push(monthFlag);  			
  		}
  		//求日平均值
  		dataVal[city].push(dataObject[dataTime[i]]);

  	}
  	//console.log(dataVal);
  	//获取月份所有天数数组
  	for(var i=0;i<monthNum.length;i++){
  		monthDay[i]=[];
  		for(var j=0;j<dataTime.length;j++){
  			if(monthNum[i]==dataTime[j].slice(5,7)){
  				monthDay[i].push(dataTime[j]);
  			}
  		}
  	}  	
  	//console.log(monthDay);
  	
  	
  	
  	//计算每周天数 
  	for(var i=0;i<monthDay.length;i++){
  		//获取每个月第一天
  		var oneDay=new Date(monthDay[i][0]);
  		//获取第一天是周几（0-6）
  		var weekOne=oneDay.getDay();
  		//第一周多少天
  		var firstWeek=7-weekOne;
  		//最后一周多少天
  		var lastWeek=(monthDay[i].length-firstWeek)%7;
  		var weekNum=[];
	  	var weekVal=[];
	  	//获取周数
	  	var weekCount;
  		
  		var midCount=parseInt(monthDay[i].length-firstWeek-lastWeek)/7;
  		if(firstWeek!==0 && lastWeek!==0){
  			weekCount=midCount+2;
  		}else if(firstWeek==0 || lastWeek==0){
  			weekCount=midCount+1;
  		}
  		//控制每周天数的数组长度
  		weekNum.length=weekCount;
  		weekNum[0]=firstWeek;
  		for(var j=1;j<=midCount;j++){
  			weekNum[j]=7;
  		}
  		weekNum[weekCount-1]=lastWeek;
  		//记录每周天数标志
  		var weekFlag=0;
  		//记录总天数
  		var dayCount=0;
  		// console.log(weekNum);
  		// 分周存储数据
  		for(var k=0;k<weekNum.length;k++){

  			weekVal.length=weekNum.length;
  			weekVal[k]=[];

  			dayCount+=weekNum[k];	
  			for(;weekFlag<dayCount;weekFlag++){
  				weekVal[k].push(monthDay[i][weekFlag]);	
  			}
  			weekVal[k].length=weekNum[k]; 
  			
  			var weekSum=0;
  			//求周平均值
  			for(var l=0;l<weekVal[k].length;l++){
  				weekSum+=dataObject[weekVal[k][l]];

  			}
  			dataWeek[city].push((weekSum/weekVal[k].length).toFixed(2)); 
  			
  		}

  		var monthSum=0;
  		//求月平均值
  		for(var m=0;m<monthDay[i].length;m++){
  			monthSum+=dataObject[monthDay[i][m]]; 
  		}
  		dataMonth[city].push((monthSum/monthDay[i].length).toFixed(2));
  	}
  	
  	// 输出平均每周指数
  	
  	// weekData[city]=dataWeek;
  	// console.log(weekData);
  	// //输出平均每月指数
  	// monthData[city]=dataMonth;
  }
  chartData.month=dataMonth;	
  chartData.week=dataWeek;
  chartData.day=dataVal;
  
  //console.log(chartData);
  

}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm();
  initCitySelector();
  initAqiChartData();
  renderChart();
}

init();