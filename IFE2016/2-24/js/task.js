var btn=document.getElementsByTagName("input"),
    preOrder=btn[0],
    inOrder=btn[1],
    searchEle=btn[2],
    addEle = btn[6],
    box=document.querySelector(".box"),
    domList=[],
    selectBox,
    timer,
    foundIndex = 0,
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

function reset() {
  var len = domList.length;
  for(var i =0; i < len; i++) {
    domList[i].style.backgroundColor = "#FFFFFF";
  }
  if(timer) {
    clearInterval(timer);
  }
  foundIndex = 0;
}

function checkSearch(searchVal) {
  if(!searchVal) {
    alert('请输入搜索内容');
    return false;
  }
}

// 遍历节点数组并查找
function traverse(foundText){
  var i=0;
  var len = domList.length;
  
  if(foundText && domList[i].firstChild.nodeValue.replace(/(^\s*)|(\s*$)/g, "") === foundText) {
    domList[i].style.backgroundColor = "#fe4365";
    foundIndex++;
    i++;
    console.log(foundIndex)
  } else {
    domList[i++].style.backgroundColor = "#30A9DE";
  }
  timer=setInterval(function(){
    if(i<domList.length){
      domList[i-1].style.backgroundColor="#fff";
      if(foundText && domList[i].firstChild.nodeValue.replace(/(^\s*)|(\s*$)/g, "") === foundText) {
        domList[i].style.backgroundColor = "#fe4365";
        foundIndex++;
        i++;
        console.log(foundIndex)
      } else {
        domList[i++].style.backgroundColor = "#30A9DE";
      }
    }else{
      clearInterval(timer);
      domList[i-1].style.backgroundColor="#fff";
      if(foundText && !foundIndex){
        alert('没有查找到你输入的内容');
      }
    }
  },1000);
  
}

function deleteChild(selectBox) {
  if(!selectBox) {
    alert('请选中节点');
  } else {
    var parentNode = selectBox.parentNode;
    parentNode.removeChild(selectBox);
  }
}

function addChild(selectBox, content) {
  if(!selectBox) {
    alert('请选中节点');
  } else if(!content){
    alert('请输入新增节点内容');
  } else {
    var newBox = document.createElement('div');
    newBox.innerHTML = content;
    selectBox.appendChild(newBox);
  }
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
  var searchVal, content;

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
      if(!checkSearch(searchVal)) return;
      break;
    case "广度优先搜索":
      bfs(root);
      searchVal = searchEle.value;
      if(!checkSearch(searchVal)) return;
      break;
    case "删除选中节点及其所有子节点":
      deleteChild(selectBox);
      return;
      break;
    case "在选中节点下增加子节点":
      content = addEle.value;
      addChild(selectBox, content);
      return;
      break;
    default:
      return;
  }
  reset();  
  setTimeout(traverse(searchVal),500);
  
});

EventUtil.addHander(root,"click",function(event){
  event=EventUtil.getEvent(event);
  var target=EventUtil.getTarget(event);
  selectBox = target;
  target.style.backgroundColor = '#EFDC05';
});