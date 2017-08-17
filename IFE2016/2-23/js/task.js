var btn=document.getElementsByTagName("input"),
    preOrder=btn[0],
    inOrder=btn[1],
    searchEle=btn[2],
    box=document.querySelector(".box"),
    domList=[],
    isTraverse = false,
    bfsIndex = 0,
    root=document.querySelector(".root");

// 深度优先搜索
function dfs(node) {
  if(node) {
    domList.push(node);
    for(var i = 0, len = node.children.length; i < len; i++) {
        dfs(node.children[i]);
    }
  } 
}

// 广度优先搜索
function bfs(node) {
  if(node) {
    domList.push(node);
    var nextEle = node.nextElementSibling;
    if(nextEle) {
      bfs(nextEle);
    }
    var newNode = domList[bfsIndex++];
    bfs(newNode.firstElementChild);
  }
}

// 遍历节点数组并查找
function traverse(foundText){
  var timer;
  var i=0;
  var len = domList.length;
  
  if(foundText && domList[i].firstChild.nodeValue.replace(/(^\s*)|(\s*$)/g, "") === foundText) {
    domList[i].style.backgroundColor = "#fe4365";
    isTraverse = false;
    clearInterval(timer);
  } else {
    domList[i++].style.backgroundColor = "#30A9DE";
  }
  isTraverse = true;
  timer=setInterval(function(){
    if(i<domList.length){
      domList[i-1].style.backgroundColor="#fff";
      if(foundText && domList[i].firstChild.nodeValue.replace(/(^\s*)|(\s*$)/g, "") === foundText) {
        domList[i].style.backgroundColor = "#fe4365";
        isTraverse = false;
        clearInterval(timer);
      } else {
        domList[i++].style.backgroundColor = "#30A9DE";
      }
    }else{
      clearInterval(timer);
      domList[i-1].style.backgroundColor="#fff";
      isTraverse = false;
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
  var searchVal;

  switch(value){
    case "深度优先遍历":
      dfs(root);
      break;
    case "广度优先遍历":
      bfs(root);
      break;
    case "深度优先搜索":
      dfs(root);
      searchVal = searchEle.value;
      break;
    case "广度优先搜索":
      bfs(root);
      searchVal = searchEle.value;
      break;
    default:
      return;
  }
  setTimeout(traverse(searchVal),500);

  
});