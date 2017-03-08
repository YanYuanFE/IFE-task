
function Observer(data) {
	this.data = data;
	this.each(data);
    this.dep = new Dep();
}

Observer.prototype.each = function (obj) {
	/*
	用hasOwnProperty
	在遍历一个对象的所有属性时忽略掉继承属性，
	注意这里 for...in  循环只会遍历可枚举属性
	*/
	for(var key in obj) {
		if(obj.hasOwnProperty(key)){
			if (Object.prototype.toString.apply(obj[key]) === '[object Object]') {
				return new Observer(obj[key]);
			}
			this.watch(key,obj[key]);
		}

	}
}

Observer.prototype.watch = function (key,val) {
	this.defineProperty(this.data,key,val);
};

Observer.prototype.$watch = function (attr, callback) {
    this.dep.addSub(attr,callback);
}

Observer.prototype.defineProperty = function(obj, key, val) {
    let that = this;

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
            that.dep.notify(key, val, newVal);
			if (newVal === val) return;
			val = observe(newVal);
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
	this.subs = {};
}

Dep.prototype.addSub = function(attr,callback) {
    if(this.subs[attr]){
        this.subs[attr].push(callback);
    } else {
        this.subs[attr] = [callback];
    }
}

Dep.prototype.deleteSub = function (attr) {
    for(let key in this.subs) {
        if(this.subs.hasOwnProperty(key) && key ===attr) {
            delete this.subs[key];
        }
    }
}

Dep.prototype.notify=function(attr,...arg){
	this.subs[attr] && this.subs[attr].forEach(function(sub){
		sub(...arg);
	})
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


let app2 = new Observer({
    name: 'youngwind',
    age: 25
});

// 你需要实现 $watch 这个 API
app2.$watch('age', function(oldAge, newAge) {
    console.log(`我的年纪变了，原来是: ${oldAge}岁, 现在已经是：${newAge}岁了`)
});



app2.data.age = 100; // 输出：'我的年纪变了，现在已经是100岁了'
