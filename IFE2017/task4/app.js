function Observer(obj) {
    this.el = document.querySelector(obj.el);
    this.html = '';
    this.walk(obj.data);
    this.data = obj.data;
    this.tempMatch(this.el.innerHTML, this.data);
    this.subscribers = {};
}

Observer.prototype.tempMatch = function (temp, data) {
    var that = this;
    var reg=/\{\{\{(.+?)\}\}\}|\{\{(.+?)\}\}/g;


    this.html = temp;
    temp.match(reg).forEach(function (item) {
        var key = item.slice(2, item.length-2).trim();
        that.tempReplace(key, data, item);
    })

    this.el.innerHTML = this.html;
    this.html = '';
}

Observer.prototype.tempReplace = function (key, data, template) {
    var index = key.indexOf('.');

    if (index>0) {
        this.tempReplace(key.slice(index + 1), data[key.slice(0, index)], template);
    } else {
        this.html = this.html.replace(template, data[key]);
    }
}

//遍历数据
Observer.prototype.walk = function (data, path) {
    var that = this;

    Object.keys(data).forEach(function (key) {
        that.defineReactive(data, key, data[key], path);
    })
}

//监听
Observer.prototype.defineReactive = function(obj, key, val, path) {
    var that = this;

    if (!path) {
        path = key;
    } else {
        path = path + key;
    }

    //深度监听
    this.observe(val, path);

    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            console.log('你访问了' + key);
            return val;
        },
        set: function (newVal) {
            if (newVal === val) return;
            val = newVal;
            that.tempMatch(that.el.innerHTML, that.data);
            console.log('你设置了' + key,'新的' + key + '值为' +newVal);
            that.$notify(path || key);
            that.observe(newVal, path);
        }
    })
}

//对象深度监听
Observer.prototype.observe = function(value, path){
    if (!value || typeof value !== 'object') return;
    if (path) path = path + '.';
    this.walk(value, path);
}

//订阅属性
Observer.prototype.$watch = function (key, callback) {
    if (typeof callback !== 'function') {
        console.log('callback must to be function');
        return;
    }
    if(!this.subscribers[key]){
        this.subscribers[key] = [];
    }
    this.subscribers[key].push(callback);
}

//发布事件
Observer.prototype.$notify = function (path) {
    var that = this;
    var keys = path.split('.');
    var depPaths = keys.map(function (key, index) {
        if (index == 0) {
            return key;
        }
        var str = '';
        while (index--) {
            str = keys[index] + '.' + str;
            return str + key;
        }
    });
    depPaths.forEach(function (path) {
        var fns = that.subscribers[path];
        if (fns && fns.length) {
            fns.forEach(function (fn) {
                fn && fn(that.$getValue(path));
            })
        }
    })
}

Observer.prototype.$getValue = function (exp) {
    var path = exp.split('.');
    var val = this.data;

    path.forEach(function (k) {
        val = val[k];
    })
    return val;
}




let app2 = new Observer({
    el: '#app',
    data: {
        user: {
            name: 'youngwind',
            age: 25
        }
    }
});


app2.$watch('name', function (oldName, newName) {
    console.log('我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。')
});

app2.$watch('age', function(oldAge, newAge) {
    console.log(`我的年纪变了`)
});

app2.data.name = 'hahaha';
// 输出：我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。
app2.data.name= 'blablabla';
// 输出：我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。

app2.data.age=45;

