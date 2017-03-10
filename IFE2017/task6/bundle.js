/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["defineReactive"] = defineReactive;
/* harmony export (immutable) */ __webpack_exports__["observe"] = observe;
//ES6

class Observer{
    constructor(value){
        this.value = value
        this.walk(value)
    }
    //遍历
    walk(value){
        var keys = Object.keys(value);

        keys.forEach(
            //劫持key
            key => this.convert(key, value[key])
        )
    }
    //转换为劫持属性
    convert(key, val){
        defineReactive(this.value, key, val)
    }
}
/* harmony export (immutable) */ __webpack_exports__["default"] = Observer;


//属性转换
function defineReactive(obj,key,val){
    //创建订阅数组
    var dep =new Dep();
    //注册劫持属性
    var childObj = observe(val);

    Object.defineProperty(obj,key,{
        enumberable: true,
        configurable: true,
        get: () => {
            if(Dep.target){
                dep.addSub(Dep.target)
            }
            return val
        },
        set: newVal => {
            var value = val;

            if(newVal === val) {
                return;
            }
            val = newVal;
            childObj = observe(newVal);
            //广播数据到订阅者
            dep.notify();
        }
    })
}

//递归
function observe(val,vm){
    if(!value || typeof value != 'object'){
        return
    }
    return new Observer(value);
}

//消息订阅器
class Dep{
    constructor(){
        this.subs = []
    }

    addSub(sub){
        this.subs.push(sub)
    }
    notify(){
        this.subs.forEach(sub => sub.update())
    }
}
/* harmony export (immutable) */ __webpack_exports__["Dep"] = Dep;


//消息订阅者
class Watcher{
    constructor(vm,expOrFn,cb){
        this.cb = cb;
        this.vm = vm;
        this.expOrFn =expOrFn;
        this.value = this.get();
    }

    update(){
        this.run()
    }

    run(){
        const value = this.get();
        if(value !== this.value){
            this.value = value;
            this.cb.call(this.vm);
        }
    }

    get(){

        Dep.target = this;
        const value = this.vm._data[this.expOrFn];

        Dep.target = null;
        return value;
    }
}
/* harmony export (immutable) */ __webpack_exports__["Watcher"] = Watcher;





let app2 = new Observer({
    name: {
        firstName: 'shaofeng',
        lastName: 'liang'
    },
    age: {
        a:25,
        b:21
    }
});


app2.$watch('name', function (oldName, newName) {
    console.log('我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。')
});

app2.$watch('age', function(oldAge, newAge) {
    console.log(`我的年纪变了`)
});

app2.data.name.firstName = 'hahaha';
// 输出：我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。
app2.data.name.lastName = 'blablabla';
// 输出：我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。

app2.data.age.a=45;



/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map