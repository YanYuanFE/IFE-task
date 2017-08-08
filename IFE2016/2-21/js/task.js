function $(id){
  return document.getElementById(id);
}


function Quene(){
  this.dataStore=[];
  this.enquene=enquene;
  // this.hover=hover;
  this.deleft=deleft;
  this.deright=deright;
  this.length=length;
  this.declick=declick;
  this.pos=0;
  this.show=show;
  this.find=find;
  this.concat=concat;
  this.declick=this.declick;
}
function concat(arr){
  this.dataStore=this.dataStore.concat(arr);
}


function enquene(element){
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
function declick(element){
  var foundEl=this.find(element);
  if(foundEl>-1){
    this.dataStore.splice(foundEl,1);
    alert(element);
    this.show();
  }
}
function show(dom){
  var html="";
  if(this.dataStore.length==0){
    html="";
  }else{
      for(var i=0;i<this.dataStore.length;i++){
      html+="<div class='quene-item'>"+this.dataStore[i]+"</div>";
    }
  }
  dom.innerHTML=html;
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
    // alert(element);
    // this.show();
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


var tagquene=new Quene();

addEvent($("tagInput"),"keyup",function(event){
  var teststr=/[，|,|\n|\s]/;
  if(teststr.test($("tagInput").value) || event.keyCode===13){
    
    var inputVal=$("tagInput").value.replace(/[，|,|\n|\s]/,'').trim();
    if(tagquene.find(inputVal)==-1){
      tagquene.enquene(inputVal);
    }
    console.log(inputVal) 

    tagquene.show($("tagShow"));
    if(tagquene.length()>10){
      tagquene.deleft();
    }
    // $("tagInput").value='';
  }
});

addEvent($("tagShow"),"mouseover",function(event){
  var element=event.target || event.srcElement;
  if(event.target.className.toLowerCase()=="quene-item"){
    element.innerHTML="删除"+element.innerHTML;
  }  
});
addEvent($("tagShow"),"mouseout",function(event){
  var element=event.target || event.srcElement;
  if(event.target.className.toLowerCase()=="quene-item"){
    element.innerHTML=element.innerHTML.replace(/删除/,"");
  }  
});
addEvent($("tagShow"),"click",function(event){
  var element=event.target || event.srcElement;
  if(event.target.className.toLowerCase()=="quene-item"){
    
    var elementVal=element.innerHTML.replace(/删除/,"");
    
    tagquene.declick(elementVal);
    console.log(tagquene);
    tagquene.show($("tagShow"));
  }  
});

var hobbyquene=new Quene();

addEvent($("hobbyBtn"),"click",function(event){
  var hobbyVal=$("hobbyInput").value.trim();
  //split(/,|，|、|\s|\n|\r|\t/)
  var arr=hobbyVal.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/);
  var newarr=[];
  arr.forEach(function(item,index,input){
    if(newarr.indexOf(item)==-1){
      newarr.push(item);
    }
  });
  hobbyquene.concat(newarr);
  while(hobbyquene.length()>10){
      hobbyquene.deleft();
  }
  hobbyquene.show($("hobbyShow"));
});

