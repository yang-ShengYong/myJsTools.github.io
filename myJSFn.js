// 文档说明：我的js解决兼容性的方法
//状态：持续更新中……

// 在前面插入元素
function myInsertBefore(a,b) {
    var firstElementChild=b.parentElement.firstElementChild,
        fatherOfb=b.parentElement;
    while (fatherOfb.firstElementChild!==b){
        fatherOfb.appendChild(fatherOfb.firstElementChild);
    }
    fatherOfb.appendChild(a);
    while (fatherOfb.firstElementChild!==firstElementChild){
        fatherOfb.appendChild(fatherOfb.firstElementChild);
    }
}
// 在后面插入元素
function myInsertAfter(a,b) {
    var fatherOfb=b.parentElement,
        firstOne=fatherOfb.firstElementChild;
    while(fatherOfb.firstElementChild!==b.nextSibling){
        fatherOfb.appendChild(fatherOfb.firstElementChild);
    }
    fatherOfb.appendChild(a);
    while(fatherOfb.firstElementChild!==firstOne){
        fatherOfb.appendChild(fatherOfb.firstElementChild);
    }
}
//数组按字节排序
function arrByteSort(arr){
    function strByte(str) {
        var num = str.length;
        for(var i=0;i<str.length;i++){
            if(str.charCodeAt(i)>255){
                num++;
            }
        }
        return num;
    }
    arr.sort(function (a,b) {
        return strByte(a)-strByte(b);
    });
    return arr;
}
//深度克隆
function deepClone(origin,target){
    var target=target||{},
        toStr=Object.prototype.toString,
        arrStr="[Object Array]";
    for(var prop in origin){
        if(origin.hasOwnProperty(prop)){
            if(origin[prop]!==null&&typeof(origin[prop])=='object'){
                if(toStr.call(origin[prop])==arrStr){
                    target[prop]=[];
                }else{
                    target[prop]={};
                }
                deepClone(origin[prop],target[prop]);
            }else{
                target[prop]=origin[prop];
            }
        }
    }
    return target;
}
//数组去重(原型链上编程，得用.的方式调用)
Array.prototype.unique=function () {
  var temp={},
      arr=[],
      len=this.length;
  for(var i=0;i<len;i++){
      if(!temp[this[i]]){
          temp[this[i]]='abc';
          arr.push(this[i]);
      }
  }
  return arr;
};
//查看滚动条位置
function getScrollOffset(){
    if(window.pageXOffset){
        return {
            x:window.pageXOffset,
            y:window.pageYOffset
        }
    }else{
        return {
            x:document.body.scrollLeft+document.documentElement.scrollLeft,
            y:document.body.scrollTop+document.documentElement.scrollTop
        }
    }
}
//查看可视区窗口大小
function getViewportOffset() {
    if(window.innerWidth){
        return {
            w:window.innerWidth,
            h:window.innerHeight
        }
    }else{
            if(document.compatMode==="BackCompat"){
                return {
                    w:document.body.clientWidth,
                    h:document.body.clientHeight
                }
            }else{
                return {
                    w:document.documentElement.clientWidth,
                    y:document.documentElement.clientHeight
                }
            }
        }
}
//获取元素样式
function getStyle(elem,prop){
    if(window.getComputedStyle(elem,null)){
        return window.getComputedStyle(elem,null)[prop];
    }else{
        return elem.currentStyle[prop];
    }
}
//添加事件
function addEvent(elem,type,handle) {
    if(elem.addEventListener){
        elem.addEventListener(type,handle,false);
    }else{
        if(elem.attachEvent){
            elem.atttachEvent('on'+type,function () {
                handle.call(elem);
            });
        }else{
            elem['on'+type]=handle;
        }
    }
}
//取消冒泡
function stopBubble(event){
    if(event.stopPropagation){
        event.stopPropagation();
    }else{
        event.cancelBubble=true;
    }
}
//阻止默认事件
function cancelHandler(event) {
    if(event.preventDefault){
        event.preventDefault();
    }else{
        event.returnValue=false;
    }
}