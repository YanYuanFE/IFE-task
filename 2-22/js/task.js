var btn=document.getElementsByTagName("input"),
    preOrder=btn[0],
    inOrder=btn[1],
    postOrder=btn[2],
    box=document.querySelector(".box"),
    domList=[],
    root=document.querySelector(".root");

// 前序遍历
var preOrderTraverseNode=function(node,callback){
  if(node!==null){
    callback(node);
    preOrderTraverseNode(node.firstElementChild,callback);
    preOrderTraverseNode(node.lastElementChild,callback);
  }
};
// 中序遍历
var inOrderTraverseNode=function(node,callback){
  if(node!==null){
    inOrderTraverseNode(node.firstElementChild,callback);
    callback(node);
    inOrderTraverseNode(node.lastElementChild,callback);
  }
};
// 后序遍历
var postOrderTraverseNode=function(node,callback){
  if(node!==null){
    postOrderTraverseNode(node.firstElementChild,callback);
    postOrderTraverseNode(node.lastElementChild,callback);
    callback(node);
  }
};

function pushNode(node){
  domList.push(node);
}

function reset(){
  domList.length=0;
}

function changeColor(){
  var timer;
  var i=0;
  domList[i].style.backgroundColor="#fe4365";
  timer=setInterval(function(){
    i++;
    if(i<domList.length){
      console.log(domList[i])
      domList[i].style.backgroundColor="#fe4365";
      domList[i-1].style.backgroundColor="#fff";
      // domList[i+1].style.backgroundColor="#fff";
    }else{
      clearInterval(timer);
      domList[domList.length-1].style.backgroundColor="#fff";
    }
  },1000);
  
}
// 通用事件对象
var EventUtil={
  addHander:function(dom,type,fn){
    if(dom.addEventListener){
      dom.addEventListener(type,fn,false);
    }else if(dom.attachEvent){
      dom.attachEvent("on"+type,fn);
    }else{
      dom["on"+type]=fn;
    }
  },
  getEvent:function(event){
    return event ? event:window.event;
  },
  getTarget:function(event){
    return event.target || event.srcElement;
  }
};


EventUtil.addHander(box,"click",function(event){
  event=EventUtil.getEvent(event);
  var target=EventUtil.getTarget(event);
  var value=target.value;

  switch(value){
    case "前序":
      reset();
      preOrderTraverseNode(root,pushNode);
      changeColor();
      break;
    case "中序":
      reset();
      inOrderTraverseNode(root,pushNode);
      changeColor();
      break;
    case "后序":
      reset();
      postOrderTraverseNode(root,pushNode);
      changeColor();
      break;
  }
  
});