# IFE-task
## 2016百度IFE前端技术学院实战任务

#### 任务十七：零基础JavaScript编码（五）

**难度：中等**

**任务目的**

- 在上一任务基础上继续JavaScript的体验
- 接触更加复杂的表单对象
- 实现页面上的一个完整交互功能
- 用DOM实现一个柱状图图表

**任务描述**

- 参考以下示例代码，原始数据包含几个城市的空气质量指数数据
- 用户可以选择查看不同的时间粒度，以选择要查看的空气质量指数是以天为粒度还是以周或月为粒度
- 天：显示每天的空气质量指数
- 周：以自然周（周一到周日）为粒度，统计一周7天的平均数为这一周的空气质量数值，如果数据中缺少一个自然周的几天，则按剩余天进行计算
- 月：以自然月为粒度，统一一个月所有天的平均数为这一个月的空气质量数值
- 用户可以通过select切换城市
- 通过在"aqi-chart-wrap"里添加DOM，来模拟一个柱状图图表，横轴是时间，纵轴是空气质量指数，参考图（点击打开）。天、周、月的数据只根据用户的选择显示一种。
- 天：每天的数据是一个很细的矩形
- 周：每周的数据是一个矩形
- 月：每周的数据是一个很粗的矩形
- 鼠标移动到柱状图的某个柱子时，用title属性提示这个柱子的具体日期和数据

**task.html**

``` html
<!DOCTYPE>
<html>
  <head>
    <meta charset="utf-8">
    <title>IFE JavaScript Task 01</title>
    <script src="task.js"></script>
  </head>
<body>
  <fieldset id="form-gra-time">
    <legend>请选择日期粒度：</legend>
    <label>日<input name="gra-time" value="day" type="radio" checked="checked"></label>
    <label>周<input name="gra-time" value="week" type="radio"></label>
    <label>月<input name="gra-time" value="month" type="radio"></label>
  </fieldset>

  <fieldset>
    <legend>请选择查看的城市：</legend>
    <select id="city-select">
      <option>北京</option>
    </select>
  </fieldset>

  <div class="aqi-chart-wrap">
  </div>
</body>
</html>
```

**task.js**

``` js
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

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {

}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 

  // 设置对应数据

  // 调用图表渲染函数
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 

  // 设置对应数据

  // 调用图表渲染函数
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {

}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项

  // 给select设置事件，当选项发生变化时调用函数citySelectChange

}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

init();
```

**任务注意事项**

- 实现简单功能的同时，请仔细学习JavaScript基本语法、事件、DOM相关的知识
- 请注意代码风格的整齐、优雅
- 代码中含有必要的注释
- 示例图仅为参考，不需要完全一致
- 点击select或者radio选项时，如果没有发生变化，则图表不需要重新渲染
- 建议不使用任何第三方库、框架
- 示例代码仅为示例，可以直接使用，也可以完全自己重写

#### 任务二十一：基础JavaScript练习（四）

**面向人群：JavaScript初学者**

**难度：中等**

**任务目的**

- 学习与实践JavaScript的基本语法、语言特性
- 练习使用JavaScript实现拖拽功能


**任务描述**

- 基于任务20，将任务20的代码进行抽象、封装，然后在此基础上实现如图中的两个需求：Tag输入和兴趣爱好输入
- 如示例图上方，实现一个tag输入框
- 要求遇到用户输入空格，逗号，回车时，都自动把当前输入的内容作为一个tag放在输入框下面。
- Tag不能有重复的，遇到重复输入的Tag，自动忽视。
- 每个Tag请做trim处理
- 最多允许10个Tag，多于10个时，按照录入的先后顺序，把最前面的删掉
- 当鼠标悬停在tag上时，tag前增加删除二字，点击tag可删除
- 如示例图下方，实现一个兴趣爱好输入的功能
- 通过一个Textarea进行兴趣爱好的输入，可以通过用回车，逗号（全角半角均可），顿号，空格（全角半角、Tab等均可）等符号作为间隔。
- 当点击“确认兴趣爱好”的按钮时，将textarea中的输入按照你设定的间隔符，拆解成一个个的爱好，显示在textarea下方
- 爱好不能重复，所以在下方呈现前，需要做一个去重
- 每个爱好内容需要做trim处理
- 最多允许10个兴趣爱好，多于10个时，按照录入的先后顺序，把最前面的删掉

**任务注意事项**
实现简单功能的同时，请仔细学习JavaScript基本语法、事件、DOM相关的知识
示例图仅为参考，不需要完全一致
请注意代码风格的整齐、优雅
代码中含有必要的注释
建议不使用任何第三方库、框架

**在线学习参考资料**
[JavaScript入门篇](http://www.imooc.com/learn/36)
[MDN JavaScript](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)

http://v.youku.com/v_show/id_XNTM1NTQxMDMy.html http://v.youku.com/v_show/id_XNjIwNTEzMTA0.html?from=y1.2-1-176.3.3-2.1-1-1-2-0
