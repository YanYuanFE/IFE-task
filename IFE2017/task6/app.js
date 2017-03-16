//ES6

export default class Observer{
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

//属性转换
export function defineReactive(obj,key,val){
    //创建消息订阅器数组
    var dep =new Dep();
    //注册劫持属性
    var childObj = observe(val);
    console.log(childObj)

    Object.defineProperty(obj,key,{
        enumberable: true,
        configurable: true,
        get: () => {
            // 检查是否watch的get，注册到Dep中
            if(Dep.target){
                dep.addSub(Dep.target)
            }
            return val
        },
        set: newVal => {
            var value = val;
            // 值相等直接返回
            if(newVal === val) {
                return;
            }
            // 值不相等触发刷新操作
            val = newVal;
            childObj = observe(newVal);
            console.log(childObj)
            //广播数据到订阅者
            dep.notify();
        }
    })
}

//递归
export function observe(value,vm){
    if(!value || typeof value != 'object'){
        return
    }
    return new Observer(value);
}

//消息订阅器
export class Dep{
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
/*
现在需要将消息订阅者注册到消息订阅器中
这样数据层set广播消息到消息订阅器数组
消息订阅者可接受消息进行相应刷新操作
注册的关键在Object.defineProperty的get()被调用时
Watcher的get()会调用数据层的get()。
触发get劫持，注册Watcher到Dep数组中
为了判断是否在Watcher中进行get，需要设置一个状态位
*/

//消息订阅者
export class Watcher{
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
        // 设置状态标志
        Dep.target = this;
        // 调用Object.defineProperty()注册的get劫持
        const value = this.vm._data[this.expOrFn];
        // 还原状态标识
        Dep.target = null;
        return value;
    }
}

/*
数据绑定实现了对数据层set与get的劫持与刷新操作关联
Observer实现对数据属性的set/get的劫持
Dep实现对set操作的消息广播数组的管理
Watcher对应特定消息的订阅者,可以实现为数据层刷新或者UI层刷新
*/


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

console.log(app2)


// app2.$watch('name', function (oldName, newName) {
//     console.log('我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。')
// });
//
// app2.$watch('age', function(oldAge, newAge) {
//     console.log(`我的年纪变了`)
// });
//
// app2.data.name.firstName = 'hahaha';
// // 输出：我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。
// app2.data.name.lastName = 'blablabla';
// // 输出：我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。
//
// app2.data.age.a=45;

