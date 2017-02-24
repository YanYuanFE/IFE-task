
function Observer(data) {
	this.data = data;
	this.each(data);
}

Observer.prototype.each = function (obj) {
	for(let key in obj) {
		this.watch(key,obj[key]);
	}
}

Observer.prototype.watch = function (key,val) {
	Object.defineProperty(this.data, key, {
		enumerable: true,
		configurable: true,
		get: function () {
			console.log('你访问了' + key);
			return val;
		},
		set: function (newVal) {
			console.log('你设置了' + key);
			console.log('新的' + key + '值为' +newVal);
			if (newVal === val) return;
			val = newVal;
		}
	})
};


let app1 = new Observer({
  name: 'youngwind',
  age: 25
});

let app2 = new Observer({
  university: 'bupt',
  major: 'computer'
});

// 要实现的结果如下：
app1.data.name // 你访问了 name
app1.data.age = 100;  // 你设置了 age，新的值为100
app2.data.university // 你访问了 university
app2.data.major = 'science'  // 你设置了 major，新的值为 science
