export { }
function add(x: number, y: number) {
    return x + y;
}

add(1, 2)
console.log('add(1, 2)=', add(1, 2));

function registe(name: string, password: string, age?: number) {
    console.log('name=', name, 'password=', password, 'age?=', age,);
}
registe('sss', 'pw123', 0);
registe('sss', 'pw123');


function registeDefault(name: string, password: string, age = 30) {
    console.log('name=', name, 'password=', password, 'age=', age,);
}
registeDefault('sss', 'pw123', 100);
registeDefault('sss', 'pw123');

function addContracts(phone: string, ...addresses: string[]) {
    console.log('phone=', phone, 'addresses=', addresses.join(','));
}
addContracts('sss');
addContracts('sss', 'address1');
addContracts('sss', 'address1', 'address2');
addContracts('sss', ...['address1', 'address2']);


function add2(x: number, y: number): number {
    let total = x + y;
    console.log('x + y=', total);
    return x + y;
}
add2(6, 3);

//返回联合类型
function getHeigh(heigth: number, unit: string = 'px'): number | string {
    if (unit) {
        return heigth * 2 + unit;
    }
    return heigth * 2;
}
console.log('getHeigh(6)=', getHeigh(6));
console.log('getHeigh(6, null)=', getHeigh(6, null));

//函数类型
let typeOfAdd = add; //let typeOfAdd: (x: number, y: number) => number
let typeOfAdd2 = registeDefault;
let typeOfAdd3 = registe;


type funType1 = (x: number, y: number) => number;
type funType2 = (x: number, y: number) => number;

//通过函数别名定义函数
type addFunType = (x: number, y: number) => number;
let myAdd: addFunType = function (x: number, y: number): number {
    return x + y;
}
console.log('myAdd(1, 2)=', myAdd(1, 2));

//获取编译时函数类型
type addType = typeof add;


//获取运行时函数类型
let myTypeOfAdd: string = typeof add;
console.log('myTypeOfAdd', myTypeOfAdd); //返回一个字符串'function'


let calculate: (x: number, y: number, operator: string) => number;
calculate = function (a: number, b: number): number {
    return a + b;
}

//重载函数
function addOveride(x: number, y: number): number; // 加法运算函数
function addOveride(x: string, y: string): string; // 字符串拼接函数
//重载实现函数
function addOveride(x: any, y: any): any {
    return x + y;                           // 加法运算或字符串拼接的实现
}
console.log('addOveride(2,5)', addOveride(2, 5));
console.log('addOveride(2,5)', addOveride("2", "5")); 
