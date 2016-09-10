function $(id){
  return document.getElementById(id);
}

// 实例化队列
function Quene(){
  this.dataStore=[];
  this.enleft=enleft;
  this.enright=enright;
  this.deleft=deleft;
  this.deright=deright;
  this.length=length;
  this.declick=declick;
  this.pos=0;
  this.show=show;
  this.find=find;
  this.bubbleSort=bubbleSort;
  this.swap=swap;
}

function enleft(element){
  this.dataStore.unshift(element);
  
}

function enright(element){
  this.dataStore.push(element);
}

function deleft(){
  this.dataStore.shift();
}

function deright(){
  --this.dataStore.length;
}
function length(){
  return this.dataStore.length;
}

function swap(arr,index1,index2){
  var temp=arr[index1];
  arr[index1]=arr[index2];
  arr[index2]=temp;
}
// 冒泡排序动画
function bubbleSort(){
  var num=this.dataStore.length;
  // var timer=setInterval(function(){
  var that=this;
  var index=0;
  function bubble(){
    for(var j=0;j<num-1;j++){
      if(that.dataStore[j]>that.dataStore[j+1]){
        swap(that.dataStore,j,j+1);
        that.show(); 
      }      
    }    
    index++;
    if(index<num){
      setTimeout(bubble,200);
    }
  }
  setTimeout(bubble,200);  
}
// 显示数组
function show(){
  var html="";
  for(var i=0;i<this.dataStore.length;i++){
    html+="<div class='quene-item' style='height:"+this.dataStore[i]+"px;'>"+this.dataStore[i]+"</div>";
  }
  $("wrapper").innerHTML=html;
}
// 查找元素
function find(element){
  for(var i=0;i<this.dataStore.length;i++){
    if(this.dataStore[i]==element){
      return i;
    }
  }
  return -1;
}
// 点击删除元素
function declick(element){
  var foundEl=this.find(element);
  if(foundEl>-1){
    this.dataStore.splice(foundEl,1);
    alert(element);
    this.show();
  }
}
// 绑定事件
function addEvent(dom,type,fn){
  if(dom.addEventListener){
    dom.addEventListener(type,fn,false);
  }else if(dom.attachEvent){
    dom.attachEvent('on'+type,fn);
  }else{
    dom['on'+type]=fn;
  }
}

//初始化一组随机数10-100
var quene=new Quene();
for(var i=0;i<30;i++){
  quene.dataStore[i]=Math.ceil(Math.random()*300+10);
}
quene.show();

addEvent($("lenquene"),"click",function(){
  var inputVal=$("input").value;
  inputVal=isNaN(inputVal) ? parseInt(inputVal):inputVal.replace(/\b(0+)/gi,"");
  quene.enleft(inputVal);
  quene.show();
});

addEvent($("renquene"),"click",function(){
  var inputVal=$("input").value;
  inputVal=isNaN(inputVal) ? parseInt(inputVal):inputVal.replace(/\b(0+)/gi,"");
  quene.enright(inputVal);
  quene.show();
});

addEvent($("ldequene"),"click",function(){
  quene.deleft();
  quene.show();
});

addEvent($("rdequene"),"click",function(){
  quene.deright();
  quene.show();
});
var item=document.getElementsByTagName("quene-item");

addEvent($("rdequene"),"click",function(){
  quene.deright();
  quene.show();
});

addEvent($("wrapper"),"click",function(event){
  if(event.target.className=="quene-item"){
    var element=event.target.innerHTML;
    quene.declick(element);
  }
});

addEvent($("busort"),"click",function(){
  quene.bubbleSort();
});