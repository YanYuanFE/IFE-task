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
