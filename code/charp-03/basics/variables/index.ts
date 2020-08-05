export { } //使当前模块成为一个模块,进而使index.ts不会与项目中的其他TypeScript文件发生变量和函数的命名冲突
for (let i = 0; i < 10; i++) {
    setTimeout(function () {
        console.log('let->i:', i);
    }, 0)
}

const pi = 3.14;
//pi = 3.1415; //提示错误
var person = {
    name: '123'
};
person.name = "456"; //是合法的
console.log('person.name:', person.name)