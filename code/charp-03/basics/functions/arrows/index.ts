export { }

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
    setInterval(() => {
        console.log(this.age++)
    }, 2000)
}

new Person().grow(); //1,2,......