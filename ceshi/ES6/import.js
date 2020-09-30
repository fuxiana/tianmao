// export default function() {
//     console.log('你好！！！')
// }



let name = '你叫什么啊？';
let obj = {
    name: '不知道',
    age: 15,
    sex: '男'
}

function fn() {
    return '你在干什么啊？'
}

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    int() {
        return this.name + this.age
    }
}
//暴露模块，定义模块
export {
    name,
    obj,
    fn,
    Person
}