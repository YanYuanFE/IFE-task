function $(id){
  return document.getElementById(id);
}


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
  this.concat=concat;
}
function concat(arr){
  this.dataStore=this.dataStore.concat(arr);
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

function show(){
  var html="";
  for(var i=0;i<this.dataStore.length;i++){
    html+="<div class='quene-item'>"+this.dataStore[i]+"</div>";
  }
  $("wrapper").innerHTML=html;
}

function find(element){
  for(var i=0;i<this.dataStore.length;i++){
    if(this.dataStore[i]==element){
      return i;
    }
  }
  return -1;
}
function declick(element){
  var foundEl=this.find(element);
  if(foundEl>-1){
    this.dataStore.splice(foundEl,1);
    alert(element);
    this.show();
  }
}

function addEvent(dom,type,fn){
  if(dom.addEventListener){
    dom.addEventListener(type,fn,false);
  }else if(dom.attachEvent){
    dom.attachEvent('on'+type,fn);
  }else{
    dom['on'+type]=fn;
  }
}


var quene=new Quene();

addEvent($("lenquene"),"click",function(){
  var inputVal=$("input-box").value.trim();
  var arr;
  arr=inputVal.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/).filter(function(item){
    return item.length>0;
  });
  // console.log(arr);
  //inputVal=isNaN(inputVal) ? parseInt(inputVal):inputVal.replace(/\b(0+)/gi,"");
  quene.concat(arr);
  // quene.enleft(inputVal);
  quene.show();
  console.log(quene.length());
});

addEvent($("renquene"),"click",function(){
  var inputVal=$("input-box").value.trim();
  var arr=[];
  arr=inputVal.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/).filter(function(item){
    return item.length>0;
  });
  //inputVal=isNaN(inputVal) ? parseInt(inputVal):inputVal.replace(/\b(0+)/gi,"");
  quene.concat(arr);
  //quene.enright(inputVal);
  quene.show();
});

addEvent($("ldequene"),"click",function(){
  quene.deleft();
  quene.show();
  console.log(quene.length());
});

addEvent($("rdequene"),"click",function(){
  quene.deright();
  quene.show();
});
var item=document.getElementsByTagName("quene-item");



addEvent($("wrapper"),"click",function(event){
  if(event.target.className=="quene-item"){
    var element=event.target.innerHTML;
    quene.declick(element);
  }
});
//Array.prototype.slice.call(arguments)能将具有length属性的对象转成数组，除了IE下的节点集合（因为ie下的dom对象是以com对象的形式实现的，js对象与com对象不能进行转换）
addEvent($("search-btn"),"click",function(){
  var searchText=$("search-box").value.trim();

  var searchTarget=document.querySelectorAll(".quene-item");
  // Array.prototype.slice.call(searchTarget);
  console.log(searchTarget);
  searchTarget.forEach(function(index){
    console.log(index);
    if(index.innerHTML==searchText){
      index.className="active";
    }
  });
});
