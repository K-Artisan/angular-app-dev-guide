"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _loop_1 = function (i) {
    setTimeout(function () {
        console.log('let->i:', i);
    }, 0);
};
for (var i = 0; i < 10; i++) {
    _loop_1(i);
}
var pi = 3.14;
//pi = 3.1415; //提示错误
var person = {
    name: '123'
};
person.name = "456"; //是合法的
console.log('person.name:', person.name);
//# sourceMappingURL=index.js.map