"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
function add(x, y) {
    return x + y;
}
add(1, 2);
console.log('add(1, 2)=', add(1, 2));
function registe(name, password, age) {
    console.log('name=', name, 'password=', password, 'age?=', age);
}
registe('sss', 'pw123', 0);
registe('sss', 'pw123');
function registeDefault(name, password, age) {
    if (age === void 0) { age = 30; }
    console.log('name=', name, 'password=', password, 'age=', age);
}
registeDefault('sss', 'pw123', 100);
registeDefault('sss', 'pw123');
function addContracts(phone) {
    var addresses = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        addresses[_i - 1] = arguments[_i];
    }
    console.log('phone=', phone, 'addresses=', addresses.join(','));
}
addContracts('sss');
addContracts('sss', 'address1');
addContracts('sss', 'address1', 'address2');
addContracts.apply(void 0, __spreadArrays(['sss'], ['address1', 'address2']));
function add2(x, y) {
    var total = x + y;
    console.log('x + y=', total);
    return x + y;
}
add2(6, 3);
//返回联合类型
function getHeigh(heigth, unit) {
    if (unit === void 0) { unit = 'px'; }
    if (unit) {
        return heigth * 2 + unit;
    }
    return heigth * 2;
}
console.log('getHeigh(6)=', getHeigh(6));
console.log('getHeigh(6, null)=', getHeigh(6, null));
//函数类型
var typeOfAdd = add; //let typeOfAdd: (x: number, y: number) => number
var typeOfAdd2 = registeDefault;
var typeOfAdd3 = registe;
var myAdd = function (x, y) {
    return x + y;
};
console.log('myAdd(1, 2)=', myAdd(1, 2));
//获取运行时函数类型
var myTypeOfAdd = typeof add;
console.log('myTypeOfAdd', myTypeOfAdd); //返回一个字符串'function'
var calculate;
calculate = function (a, b) {
    return a + b;
};
//重载实现函数
function addOveride(x, y) {
    return x + y; // 加法运算或字符串拼接的实现
}
console.log('addOveride(2,5)', addOveride(2, 5));
console.log('addOveride(2,5)', addOveride("2", "5"));
//# sourceMappingURL=index.js.map