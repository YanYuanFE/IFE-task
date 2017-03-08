// 判断给定数字是否为手机号码
function isTel(num) {
    var reg = /1[3|4|5|8]\d{9}$/;

    return reg.test(num);
}

// 18812011232  // 测试结果应该为 true
// 18812312     // false
// 12345678909  // false

// 判断输入的字符串是否有相邻重复单词
function isRepeat(str) {
    var reg = /\b(\w+)\b\s+\1\b/;

    return reg.test(str);
}


// foo foo bar       // true
// foo bar foo       // false  有重复单词但是不相邻
// foo  barbar bar   // false

var telInput =document.getElementById('telInput');
var telResult =document.getElementById('telResult');

var strInput =document.getElementById('strInput');
var strResult =document.getElementById('strResult');



function addEvent(dom,type,fn){
    if(dom.addEventListener){
        dom.addEventListener(type,fn,false);
    }else if(dom.attachEvent){
        dom.attachEvent('on'+type,fn);
    }else{
        dom['on'+type]=fn;
    }
}

addEvent(telInput,'change',function () {
    var telVal = telInput.value;

   telResult.innerHTML = isTel(telVal) ? 'True':'False';
})

addEvent(strInput,'change',function () {
    var strVal = strInput.value;
    console.log(strVal)
    strResult.innerHTML = isRepeat(strVal) ? 'True':'False';
})