var myChart = echarts.init(document.getElementById('container'));

var xData = function() {
  var data = [];
  for(var i=1; i < 15; i++) {
    data.push(i+"");
  }
  return data;
}();

var option = {
  backgroundColor: '#344b58',
  title: {
    text: 'ECharts入门',
    subtext: 'By YanYuanFE',
    x: '4%',
    textStyle: {
      color:'#fff',
      fontSize:'22'
    },
    subtextStyle: {
      color:'#90979c',
      fontSize:'16',
    },
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
      textStyle: {
        color: '#fff'
      }
    }
  },
  grid: {
    borderWidth: 0,
    top: 110,
    bottom: 95,
    textStyle: {
      color: '#fff'
    }
  },
  legend: {
    x: '4%',
    top: '11%',
    textStyle: {
      color: '#90979c',
    },
    data: ['空气温度','空气湿度','土壤湿度']
  },
  xAxis: {
      data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
  },
  yAxis: {},
  series: [
    {
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
    },
    {
      name: '销量',
      type: 'line',
      data: [5, 20, 36, 10, 10, 20]
    },
  ]
};

myChart.setOption(option);