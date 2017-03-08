
function Observer(data) {
    this.data = data;
    this.parents = Array.prototype.slice.call(arguments,1)[0] || 'data';
    this.each(data);
}

Observer.prototype.each = function (obj) {
    var that =this;
    for(var key in obj) {
        if(obj.hasOwnProperty(key)){
            if (Object.prototype.toString.apply(obj[key]) === '[object Object]') {
                new Observer(obj[key], this.parents + '.' + key);
            }else{
                this.watch(key,obj[key],this.parents);
            }
        }
    }
}

Observer.prototype.content = {};

Observer.prototype.watch = function (key,val, parents) {
    this.defineProperty(key,val, parents);
};

Observer.prototype.defineProperty = function(key, val, parents) {
    let that = this;

    Object.defineProperty(that.data, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            console.log('你访问了' + key);
            return val;
        },
        set: function (newVal) {
            var allkey = parents + '.' +key;
            if (newVal === val) return;
            val = observe(newVal);
            if (Object.prototype.toString.apply(newVal) === '[object Object]') {
                new Observer(newVal, allkey);
            }
            console.log('你设置了' + key);
            console.log('新的' + key + '值为' +newVal);
            that.emit(allkey, val, newVal);
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

Observer.prototype.$watch = function (name, callback) {
    if (!this.content[name]) {
        this.content[name] = [];
    }
    this.content[name].push(callback);
    return this;
}

Observer.prototype.emit = function (name) {
    var that = this;
    if(name.indexOf('.')!==-1) {
        var parent = name.split('.');
        parent.forEach(function (val) {
            that.emit(val);
        })
    }

    var info = Array.prototype.slice.call(arguments,1);

    if(this.content[name]){
         this.content[name].forEach(function (item) {
             item.apply(that,info);
         })
    }
    return this;

}

Observer.prototype.off = function (name,fn) {
    if(!fn) {
        this.content[name] = null;
        return this;
    }

    var index = this.content[name].indexOf(fn);
    this.content[name].splice(index,1);
    return this;

}




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

