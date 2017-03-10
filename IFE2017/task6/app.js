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

        Dep.target = this;
        const value = this.vm._data[this.expOrFn];

        Dep.target = null;
        return value;
    }
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

