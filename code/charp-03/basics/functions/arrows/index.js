"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//构造函数
function Person() {
    this.age = 1;
}
/*
//构造函数上的实例方法
Person.prototype.grow = function () {
    setInterval(function () {
        console.log(this.age++)
    }, 2000)
}

new Person().grow(); //NaN,NaN,......
*/
/*
Person.prototype.grow = function () {
    let that = this;
    setInterval(function () {
        console.log(that.age++)
    }, 2000)
}

new Person().grow(); //1,2,......
*/
Person.prototype.grow = function () {
    var _this = this;
    setInterval(function () {
        console.log(_this.age++);
    }, 2000);
};
new Person().grow(); //1,2,......
//# sourceMappingURL=index.js.map