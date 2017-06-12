var myChart = echarts.init(document.getElementById('container'));

var xData = function() {
  var data = [];
  for(var i=1; i < 15; i++) {
    data.push(i+"");
  }
  return data;
}();

var option = {
  // backgroundColor: '#344b58',
  title: {
    text: 'ECharts入门',
    subtext: 'By YanYuanFE',
    // x: '4%',
    textStyle: {
      color:'#344b58',
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
    // x: '4%',
    top: '11%',
    textStyle: {
      color: '#90979c',
    },
    data: ['空气温度','空气湿度','土壤湿度']
  },
  xAxis: {
      type: 'category',
      data: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"]
  },
  yAxis: {
    type: 'value',
    name: '温度',
    min: 0,
    max: 25,
    interval: 5,
    axisLabel: {
      formatter: '{value} °C'
    }
  },
  series: [
    {
      name: '空气温度',
      type: 'bar',
      data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
    },
    {
      name: '空气湿度',
      type: 'line',
      data: [20, 10, 10, 20, 12, 22, 13,20, 24, 20, 16, 12]
    },
    {
      name: '土壤湿度',
      type: 'line',
      data: [5, 20, 16, 10, 10, 20, 20, 10, 10, 20, 12, 22,]
    }
  ]
};

myChart.setOption(option);