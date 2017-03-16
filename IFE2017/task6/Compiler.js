vm.compileElement = function(fragment,root) {
  var node, childNodes = fragment.childNodes;

  for(var i =0; i < childNodes.length; i++){
    node = childNodes[i];

    if(this.hasDirective(node)) {
      this.$unCompileNodes.push(node);
    }
    if(node.childNodes.length){
      this.compileElement(node, false);
    }
  }
  if(root) {
    this.compileAllNodes();
  }
}