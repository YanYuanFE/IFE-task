
function Observer(data) {
	this.data = data;
	this.each(data);
}

Observer.prototype.each = function (obj) {
	/*
	用hasOwnProperty
	在遍历一个对象的所有属性时忽略掉继承属性，
	注意这里 for...in  循环只会遍历可枚举属性
	*/
	for(let key in obj) {
		if(obj.hasOwnProperty(key)){
			if (typeof obj[key] === 'object') {
				return new Observer(obj[key]);
			}
			this.watch(key,obj[key]);
		}
		
	}
}

Observer.prototype.watch = function (key,val) {
	defineProperty(this.data,key,val);
};

function defineProperty(obj, key, val) {
	var dep = new Dep();

	Object.defineProperty(obj, key, {
		enumerable: true,
		configurable: true,
		get: function () {
			console.log('你访问了' + key);
			if(val instanceof Observer){
				// console.log('你访问了' + key);
	    		return val.data
	    	}
	    
    		return val
		},
		set: function (newVal) {
			console.log('你设置了' + key);
			console.log('新的' + key + '值为' +newVal);
			if (newVal === val) return;
			val = observe(newVal);
			dep.notify();
		}
	})
}

function observe(value){
	if (!value || typeof value !== 'object') {
		return value;
	} else {
		return new Observer(value);
	}
}

function Dep(){
	this.subs = [];
}

Dep.prototype.addSub = function(sub) {
	this.subs.push(sub);
}

Dep.prototype.notify=function(){
	this.subs.forEach(function(sub){
		sub.update();
	})
}

function Watcher(){
	this.value = this.get();
}

Watcher.prototype.update = function(){
	this.run();
}

Watcher.prototype.run = function () {
	var value = this.get();
	if(value !== this.value) {
		this.value = value;

	}
}

Watcher.prototype.get = function (){
	var value =
}
// let obj = {
//  a: 1,
//  b: 2,
//  c: {
//      d: 3,
//      e: 4
//  }
// }

// let app = new Observer(obj);
// app.data.c.d;
// app.data.c.e=5;

let app1 = new Observer({
  name: 'youngwind',
  age: 25
});



// app1.data.age = 100;  // 你设置了 age，新的值为100



 app1.data.name = {
         lastName: 'liang',
         firstName: 'shaofeng'
 };

 app1.data.name.lastName;
 // 这里还需要输出 '你访问了 lastName '
 app1.data.name.firstName = 'lalala';
 // 这里还需要输出 '你设置了firstName, 新的值为 lalala'