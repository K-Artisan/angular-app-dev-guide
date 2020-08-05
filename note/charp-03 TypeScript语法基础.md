[TOC]

在开始正式走进Angular的世界之前，我们需要先熟悉Angular应用程序的开发语言，即TypeScript。

# 基本概念

新建一个项目（文件夹），新建一个名为`tsconfig.json`的JSON文件使其成为一个TypeScript项目

```json
{
    "compilerOptions": { //编译选项
        "sourceMap": true, //生成映射文件
        "module": "commonjs" //指定生成的javascript的模块规范 commonjs,amd,umd
    }
}
```

## 模块

TypeScript并没有要求我们总是使用模块。

新建TypeScript文件`basics/modules/air.ts`

```ts
var temperature = 20;
console.log('当前温度:' + temperature);
```

编译后得到的js文件`basics/modules/air.js`，在node中是可以执行的

```xml
node basics/modules/air.js
```

但是，在不使用模块的情况下，我们将面临各种命名冲突的问题，

因此在大型应用程序开发中使用模块是必然的选择。

## TypeScript中的模块	

TypeScript中的模块是怎样的呢？简单来说，任何包含顶层（Top-level）的import或export语句的TypeScript文件都是模块—— 以上air.ts未包含任何import或export语句，因此它不是一个模块。

顶层的import或export语句又是什么呢？为了回答这个问题，我们继续在项目目录basics/modules下新建一个名为land.ts的TypeScript文件，

```
namespace Land {
    export var temperatrue = 30;
    console.log('当前温度:' + temperature);
}
```

以上代码在全局作用域下定义了一个名为Land的命名空间，并通过标识符export导出了这个命名空间内一个名为temperature的变量。但由于导出这个变量的export语句是被嵌套在命名空间内的，因此以上land.ts就不是一个TypeScript模块。

也就是说，顶层就是指未被嵌套。接下来，就让我们试着通过未被嵌套的export语句来定义一些具备导出功能的TypeScript模块。

### 导出

#### 导出变量

新建ts文件sea.ts

```tsx
export var temperatrue = 30;
```

由于以上export语句未被嵌套在任何其他环境中，因此以上sea.ts就是一个TypeScript模块。

#### 导出函数

新建ts文件sea.ts

```tsx
export var temperatrue = 30;
export function swim() {
    console.log('swim---')
}
```

再次导出另一个名为temperature的变量的同时，还导出了一个名为swim()的函数，因此以上human.ts无疑也是一个TypeScript模块。

**前面两个模块定义的变量和函数都被导出了，但其实模块中完全可以定义不被导出的变量和函数—— 只要不使用标识符export修饰它们即可。**

模块中导出的变量和函数可以被模块内的其他代码访问，但更多时候它们是提供给其他模块使用的。而为了能够使用它们，其他模块还需要对它们进行导入。

### 导入

如果要使一个模块导出的变量和函数对其他模块可见，那么其他模块必须先导入这个模块

index.js

```tsx
import { temperatrue } from './sea';
console.log('海水温度->' + temperatrue)
```

import语句中目标模块的路径不能包含扩展名，因为它也有可能指向的是一个目录，或者扩展名为.tsx或.d.ts的文件。但就目前来说，我们可以认为它就是指向同名的扩展名为.ts的TypeScript文件。



为了避免与导入自sea.ts中的变量temperature发生命名冲突，我们使用操作符as为导入自human.ts中的变量temperature取了一个别名，即humanTemperature。

index.js

```tsx
import { temperatrue } from './sea';
import { temperatrue as humanTemperatrue, swim } from './human';
console.log('海水温度->' + temperatrue);
console.log('人体温度->' + humanTemperatrue);
swim();
```

即当一个模块导出多个会与其他模块产生命名冲突的变量和函数时，我们是不是需要不厌其烦地多次使用操作符as取多个别名？

不需要

index.js

```tsx
import { temperatrue } from './sea';
import { temperatrue as humanTemperatrue, swim } from './human';
import * as human from './human';

console.log('海水温度->' + temperatrue);
console.log('人体温度->' + humanTemperatrue);
swim();

console.log('人体温度->' + human.temperatrue);
human.swim()
```

为模块human.ts导出的整体取了一个别名human，然后通过这个别名访问了其所代表的整体中的变量temperature和函数swim()。



## 　变量和常量

新建`forvar.js`

```js
for (var i = 0; i < 10; i++) {
    setTimeout(function () {
        console.log(i);
    }, 0)
}
```

运行命令

```js
node basics/modules/forvar.js
```

输出结果

```xml
10
10
10
10
10
10
10
10
10
10
```

为什么会这样呢？

因为在ECMAScript 2015之前，JavaScript中没有块作用域（Block Scope），以上**通过关键字var定义的变量i的作用域在for循环语句之外，当循环结束时它的值被递增到了10**。
在循环结束之后，当每一个计时器触发时，相应的回调函数通过**闭包（Closure）**获得的变量i的值便也就一直是10，从而使我们最终看到的输出都是10。

计时器回调函数不会在setTimeout()函数被执行之后立即被调用，即使在提供的到期时间为0的情况下也是如此。**计时器回调函数最早的执行时间为当前事件循环（Event Loop）结束时**。

**闭包**是指一个函数和定义这个函数的环境（可以认为就是这个函数的作用域）。当一个函数被调用时，这个函数能访问它的定义环境中的变量（而不仅是这个函数中定义的变量），这就是闭包的作用。

### 自调用函数

修改forvar.js

```js
for (var i = 0; i < 10; i++) {
    (function () {
        var j = i;
        setTimeout(function () {
            console.log("自调用函数->j:", j);
        }, 0)
    })()
}
```

将for循环中原先的代码放在了一个自调用函数（Self-invoking Function）中，然后在自调用函数中定义了一个值为i的新变量j。
由于函数具有独立的作用域，而自调用函数在每一次循环中都会被调用

输出

```js
自调用函数->j: 0
自调用函数->j: 1
自调用函数->j: 2
自调用函数->j: 3
自调用函数->j: 4
自调用函数->j: 5
自调用函数->j: 6
自调用函数->j: 7
自调用函数->j: 8
自调用函数->j: 9
```

### let

​       通过自调用函数来避免以上欺骗显得有些烦琐，并且对于JavaScript的初学者来说并不轻松。因此，ECMAScript 2015引入了关键字let，从而使通过关键字let定义循环变量的for循环可以获得块作用域，以降低开发人员受到以上欺骗的成本。

```js
for (let i = 0; i < 10; i++) {
    setTimeout(function () {
        console.log('let->i:', i);
    }, 0)
}
```

输出

```xml
let->i: 0
let->i: 1
let->i: 2
let->i: 3
let->i: 4
let->i: 5
let->i: 6
let->i: 7
let->i: 8
let->i: 9
```

#### TypeScript中使用let

新建variable/index.ts

```ts
export { } //使当前模块成为一个模块,进而使index.ts不会与项目中的其他TypeScript文件发生变量和函数的命名冲突
for (let i = 0; i < 10; i++) {
    setTimeout(function () {
        console.log('let->i:', i);
    }, 0)
}
```

     + 第一部分使用export语句导出了一个空对象，从而使index.ts成为一个TypeScript模块，进而使index.ts不会与项目中的其他TypeScript文件发生变量和函数的命名冲突—— 随后我们还会见到这样的代码。
     + 第二部分和前面第一个for循环几乎是一样的，但其中用于定义循环变量的关键字var被换成了let，因此以上for循环的循环体在每一次被执行时都会获得一个独立的块作用域，并且其中每一个块作用域都会获得一个不同的变量i。

#### let的好处

为了避免这样的灾难，TypeScript（以及ES 215）推荐我们使用关键字let定义变量，因为TypeScript编译器会阻止关键字let定义重名的变量。并抛出相应的语法错误提示

### 常量

​       除了关键字let，TypeScript（以及ES2015）还引入了另一个关键字const，以定义与变量对应的常量。
常量必须在定义的同时被赋值，并且在定义之后不能再被赋予新值

```ts
const pi = 3.14;
//pi = 3.1415; //提示错误
var person = {
    name: '123'
};
person.name = "456"; //是合法的
console.log('person.name:', person.name)
```



# 基础类型

TypeScript中的13个基础类型（Basic Type）

尽管在JavaScript中有类型的概念，但是缺乏对类型的检查，从而使代码变得容易出错。

JavaScript是一门动态类型（弱类型）编程语言，类型可被动态地修改

## boolean

boolean类型的变量只能从true和false中取一个值，如果将其他值赋给boolean类型的变量，或者将true或false赋给其他类型的变量，我们都将得到类型不匹配的错误。

```js
let yesOrNo: boolean = true;
console.log('yesOrNo:', yesOrNo)
```



## number

TypeScript中的数字是浮点数，其类型是number，它可以接受二进制、八进制、十进制和十六进制的值。	

由于TypeScript中的数字是浮点数，因此TypeScript中number类型的变量的值即可以是整数，也可以是小数。但在表示小数时，我们只能使用十进制。

```js
let num1: number = 6;
let num2: number = 6.1;
```

## string

和JavaScript中的字符串一样，TypeScript中的字符串也使用英文单引号或双引号包围

不能将number类型的数字赋给string类型的变量，但仍然可以对它们进行拼接

```ts
let firstname: string = 'hello'
let lastname: string = 'world'
let num_srtring: string = num2 + firstname; //不能将number类型的数字赋给string类型的变量，但仍然可以对它们进行拼接
let myname: string = `${firstname}-${lastname}`; //字符模板
```

支持字符模板

```ts
let myname: string = `${firstname}-${lastname}`; //字符模板
```

## Array

```ts
let numArray: Array<number> = new Array<number>(4, 5);
numArray.push(1);
numArray.push(2);
console.log('numArray:', numArray)
console.log('numArray[1]:', numArray[1])
```

## Tuple

Tuple（元组）是一种特殊的数组，其特殊之处是其元素个数固定，并且其每一个元素的类型可以不同。

```xml
let heights: [number, string] = [20, "px;"]
console.log('heights[0]:', heights[0])
console.log('heights[1]:', heights[1])
```



## enum

枚举的每一个成员都有一个数字值，其中的第一个成员默认的数字值是0，随后的每一个成员逐一递增1。

```tsx
enum Sex {
    Female,
    Male,
    Secret
}
console.log('Sex.Secret:', Sex.Secret)

let mySex: Sex = Sex.Male
console.log('mySex:', mySex)
```

## ull和undefined

null和undefined是两个比较特殊的类型，这两个类型的变量的值只能是它们自己，比如以下赋值是合法的：

+ 我们声明了一个类型为null的变量job，为此可以将null赋给它；接着我们还声明了一个类型为undefined的变量hobby，为此也可以将undefined赋给它。
  但如果我们将其他值赋给这两个变量，那么将得到TypeScript编译器抛出的错误
+ 那就是它们都是其他所有类型的子类型，因此默认情况下null和undefined作为值可以赋给任何类型的变量（或许读者早就发现了）：

```tsx
/*------------------ull和undefined------------------*/
let job: null = null;
//job = 'sss';//错误
let address: string = null
```



## any和unknown

any是TypeScript中比较特殊的一个类型，它被称为任意类型，通过它声明的变量可以被赋予任何类型的值，

```tsx
let anyVal: any = 30;
anyVal = null;
anyVal = '33.6'
console.log('anyVal:', anyVal)
```

既然any类型如此随意，那作为强类型编程语言的TypeScript为什么要引入它呢？
答案很简单，因为有时候我们可能需要在TypeScript代码中跟一些现有的JavaScript代码（库）交互，而JavaScript代码返回的数据的类型是未知的，但TypeScript又要求数据必须有一个类型，此时any便是这样一个类型。



TypeScript引入any类型很大一部分原因是为了和JavaScript代码交互，如果不是处于这样的情景之中，我们应该尽量避免使用any类型。尽管如此，我们仍然会在不与JavaScript代码交互的情况下用到any类型

为了尽可能地避免这样的错误，TypeScript对未知类型做了一个限制，那就是不允许我们将未知类型的值赋给其他类型（any除外）的变量。

```tsx
/*------------------any和unknown------------------*/
let anyVal: any = 30;
anyVal = null;
anyVal = '33.6'
console.log('anyVal:', anyVal)

let sex: unknown = "男";
sex = 1;
sex = undefined;
sex = null;
```

## void

然而，声明可被赋值为undefined的变量不是void类型的作用所在，其真正的作用是指定函数的返回类型，

函数的返回类型一旦被指定为void，那么它便不能返回任何类型的值（undefined除外）

当然，返回类型为void的函数中还是可以有空return语句的

事实上，以上return语句隐式地返回了一个undefined。而有时候，函数是真的不会返回任何值的，这个时候我们就需要将函数的返回类型指定为never。

## never

never表示不存在的值的类型。

never类型有什么用呢？它可以用于指定一个永远无法返回的函数的返回类型，

```tsx
function findGirFriendNeverWhenThrow(): never {
    throw "未捕获异常";
}

function findGirFriendNeverWhenWhile(): never {
    while (true) {
        console.log('根本停不下来');
    }
}
```

## object

在前面介绍的12种基础类型中，除了特殊的any、unknown、void和never，剩下的boolean、number、string、Array、Tuple、enum、null和undefined都用于指定直观的数据的类型。
在这些直观的数据类型中，boolean、number、string、enum、null和undefined被称为简单类型（Primitive Type），Array和Tuple则被称为对象类型。
对象类型有一个共同点，那就是它们都是类型object的子类型。在TypeScript中子类型是兼容于父类型的，



## 其它

TypeScript中还有更多复杂的类型，比如函数类型、更加精确的对象类型、类的类型、索引类型和组合类型等。



# 类型断言

```tsx
/*------------------类型断言------------------*/
let response: any = 'Web Api 返回的一串字符串';
let responseString: string = <string>response;
let responselength: number = responseString.length;
let responselength2: number = (responseString as string).length;
console.log('responselength->', responselength, "responselength2->", responselength);

```

假设我们通过一个第三方JavaScript库从Web API获取了一个字符串，由于JavaScript中没有string类型，因此它返回的字符串的类型只能是any。
接着第二行代码试图获取Web API返回的字符串的长度，因此访问了类型为any的变量response的length属性。
以上两行代码能够顺利地通过TypeScript编译器的编译，其编译结果也能正常地运行在JavaScript的运行环境中。但唯一不足的是，其中第二行代码无法获得VS Code输入提示的支持，这降低了编码效率，也增大了出错的可能性。

类型断言就可以很好地解决以上问题，加入类型断言之后,通过在变量前面添加<string>来将变量response的类型断言为string

```tsx
let responseString: string = <string>response;
```

类型断言的另一种写法（同时也是推荐写法）是使用操作符as，以下是上面这个例子使用操作符as之后的版本：

```tsx
let responselength2: number = (responseString as string).length;
```



## 类型转换

果非要在TypeScript中进行运行时类型转换，我们该怎么办呢？答案很简单，调用相应的运行时类型转换方法（或函数）即可。比如，当需要将数字转换成字符串时，我们只需要调用数字的toString()方法：

```tsx
let numVal: number = 100;
let numString: string = numVal.toString();

let numString2: string = '33'
let numVal2: number = +numString2;
```

  加号操作符同样会在运行时返回一个实实在在的类型为number的值

# 函数

为了使函数的使用更加不容易出错，TypeScript中的函数还接受更加严格的限制，比如参数类型和返回类型等。

## 函数的参数

### 参数的个数

调用函数时，传参的参数个数要与定义的一致

### 参数的类型

在参数添加了一个英文冒号，然后在冒号的后面添加了参数类型的标识符

```tsx
function add(x: number, y: number) {
    return x + y;
}

add(1, 2)
console.log('add(1, 2)=', add(1, 2));
```

## 可选参数

+ 参数的后面添加了一个英文问号，使它成为一个可选参数。

+ 可选参数不能出现在常规参数的前面。

```tsx
function registe(name: string, password: string, age?: number) {
    console.log('name=', name, 'password=', password, 'age?=', age,);
}
registe('sss', 'pw123', 0);
registe('sss', 'pw123');
```

输出

```tsx
name= sss password= pw123 age?= 0
name= sss password= pw123 age?= undefined
```



## 默认参数

当调用方未向可选参数提供值时，我们可能会在函数的内部给这个参数一个默认值，

```tsx
function registeDefault(name: string, password: string, age = 30) {
    console.log('name=', name, 'password=', password, 'age=', age,);
}
registeDefault('sss', 'pw123', 100);
registeDefault('sss', 'pw123');
```

**注意**

+ 默认参数和可选参数可以同时出现在同一个函数的参数列表中，并且它们的先后顺序不影响函数定义的合法性
+ 但当参数列表中有常规参数时，默认参数和可选参数一样，也不能出现在常规参数的前面
+ 

## 剩余参数

剩余参数以英文省略号（...）开头，其类型必须是数组，表示它可以接收零个或多个值。

，由于剩余参数的本质仍然是一个可选的数组参数，因此以上函数内部仍然需要将它当作数组来对待

```tsx
function addContracts(phone: string, ...addresses: string[]) {
    console.log('phone=', phone, 'addresses=', addresses.join(','));
}
addContracts('sss');
addContracts('sss', 'address1');
addContracts('sss', 'address1', 'address2');
```

如果我们确实只能向剩余参数提供一个数组，就应该像以下代码那样做

```tsx
addContracts('sss', ...['address1', 'address2']);
```

上数组参数左侧的三个连续的英文点号称为展开操作符（Spread Operator），其作用是将数组展开成多个值，

**注意**

+ 剩余参数、默认参数和可选参数可以同时出现在同一个函数的参数列表中，但剩余参数必须出现在默认参数和可选参数的后面。

+ 如果参数列表中还有常规参数，剩余参数也必须出现在常规参数之后



## 函数返回类型

### 一般的类型

```tsx
function add2(x: number, y: number): number {
    let total = x + y;
    console.log('x + y=', total);
    return x + y;
}
add2(6, 3);
```

如果我们不指定函数的返回类型，这一类型也会自动被TypeScript编译器推断出来

既然函数的返回类型可以自动被推断，那么为什么要手动指定呢？答案是便于阅读

### 联合类型

```tsx
//返回联合类型
function getHeigh(heigth: number, unit: string = 'px'): number | string {
    if (unit) {
        return heigth * 2 + unit;
    }
    return heigth * 2;
}
console.log('getHeigh(6)=', getHeigh(6));
console.log('getHeigh(6, null)=', getHeigh(6, null));
```

` number | string`是联合类型，它的变量既可以接收类型为string的值，也可以接收类型为number的值

# 函数类型

我们要做的是将函数的参数和返回类型当作一个整体来看待，因为它们组成了函数类型。

在JavaScript和TypeScript中，函数本身就是一个对象，当使用typeof操作符操作一个函数（对象）时，我们会得到一个表示函数类型的字符串function。

由于历史原因，尽管在JavaScript中通过操作符typeof操作一个函数得到的是字符串function，但这并不意味着function是JavaScript中的数据类型—— 函数在JavaScript中的数据类型是object。

```tsx
function add(x: number, y: number) {
    return x + y;
}
//函数类型
let typeOfAdd = add //let typeOfAdd: (x: number, y: number) => number
```

`x: number, y: number) => number`就是变量`typeOfAdd`的类型，同时也是函数`add()`的类型。

函数的类型其实就是其参数列表和返回类型的组合，其中箭头符号（=>）左侧的是函数的参数列表，右侧的则是其返回类型



### 类型别名

通过`x: number, y: number) => number`描述的函数类型不能单独出现在代码中—— 这样的出现没有意义

为了使函数类型确实可以出现在代码中，我们需要用到类型别名（Type Alias）。

```tsx
type funType1 = (x: number, y: number) => number;
type funType2 = (x: number, y: number) => number;
```

尽管以上两个类型别名是等价的，但我们不能使用等于号（“==”或“===”）对它们进行比较，因为等于号仅用于值的比较，而类型（别名）不是值。
基于同样的原因，类型别名也不是变量或常量，因此设置类型别名的标识符type不能被换成var、let或const。



```tsx
//获取编译时函数类型
type addType = typeof add;

//获取运行时函数类型
let myTypeOfAdd: string = typeof add;
console.log('myTypeOfAdd', myTypeOfAdd); //返回一个字符串'function'
```



### 类型兼容

函数的类型存在兼容性，而参数更多的函数类型可以兼容参数更少的函数类型。

我们可以总结出目标函数类型兼容源函数类型（源函数类型兼容于目标函数类型）的前提条件是：
（1）目标函数类型的返回类型兼容源函数类型的返回类型；
（2）目标函数类型和源函数类型的参数列表中对应序号的参数的类型存在兼容性；
（3）目标函数类型的常规参数数量多于或等于源函数类型的常规参数数量。

#### 参数个数兼容

```tsx
let calculate: (x: number, y: number, operator: string) => number;
calculate = function (a: number, b: number): number {
    return a + b;
}
```

#### 参数类型兼容

```tsx
calculate = function (x: any, y: any): number {
    return x * y;
}
```

#### 返回类型兼容

```tsx
alculate = function(x: number, y: number) : any {
    return x - y;
}
```

# 函数重载

和其他编程语言不同的是，TypeScript中重载的函数不能包含自己的函数体，而只能共用一个实现函数的函数体。

```tsx
//重载函数
function addOveride(x: number, y: number): number; // 加法运算函数
function addOveride(x: string, y: string): string; // 字符串拼接函数
//重载实现函数
function addOveride(x: any, y: any): any {
    return x + y;                           // 加法运算或字符串拼接的实现
}
console.log('addOveride(2,5)', addOveride(2, 5));
console.log('addOveride(2,5)', addOveride("2", "5")); 
```

输出

```tsx
addOveride(2,5) 7
addOveride(2,5) 25
```

# 箭头函数

```tsx
export { }

//构造函数
function Person() {
    this.age = 1;
}
//构造函数上的实例方法
Person.prototype.grow = function () {
    setInterval(function () {
        console.log(this.age++)
    }, 2000)
}

new Person().grow(); //NaN,NaN,......
```

this作为函数内置的对象，其取值会因函数被调用的方式的不同而不同：
（1）当函数在全局作用域中被直接调用时，其中的this对象为JavaScript运行时中的全局对象，比如，浏览器中的window以及Node.js中的global—— 但在strict模式下为undefined；
（2）当函数被当作构造函数调用时，其中的this对象为当前正在被构造的对象；
（3）当函数被当作对象的方法调用时，其中的this对象为正在调用当前方法的对象；
（4）当函数通过call()函数或bind()函数被调用时，其中的this对象为call()或bind()这两个函数提供的对象。
显然，以上定时器回调函数是由JavaScript运行时在全局作用域中直接调用的，并且以上代码的编译结果采用的是strict模式，因此，其中的this对象的值就是undefined。

```tsx
Person.prototype.grow = () => {
    setInterval(function () {
        console.log(this.age++)
    }, 2000)
}

new Person().grow(); //1,2,......
```



但为了得到这个结果，我们定义了一个额外的变量that。为了避免以上麻烦，TypeScript（以及ES 2015）引入了箭头函数（Arrow Function），因此我们可以在箭头函数的帮助下将以上代码精简至

```tsx
Person.prototype.grow = function () {
    setInterval(() => {
        console.log(this.age++)
    }, 2000)
}

new Person().grow(); //1,2,......
```

关箭头函数的以下几个特点：
（1）箭头函数不管以什么方式被调用，其中都没有内置的this对象；
（2）如果在箭头函数中访问this对象，那么这个this对象是箭头函数所处的闭包环境中最近的封闭函数内的this对象；
（3）如果箭头函数没有处在闭包环境中，那么箭头函数中访问的this对象就是JavaScript运行时中的全局对象，比如，浏览器中的window对象—— 这一规则与当前文件是否采用strict模式无关。



箭头函数不能被当作构造函数使用，其中除了没有内置的this对象，也没有内置的arguments对象、new.target对象和super()函数。此外，由于Node.js模块是执行在Node.js的require()函数中的，因此Node.js模块顶层的箭头函数访问的this对象是这个require()函数内置的this对象—— 而非全局对象global。



# 类

我们创建了一个人类构造函数。为了避免其grow()方法被重复地创建导致的内存浪费，我们将其grow()方法定义到了其原型prototype上。
但掌握原型（链）的使用对不少JavaScript初学者来说都不是一件容易的事，为了使事情变得简单，TypeScript（以及ES 2015）引入了类（Class）的概念，以使我们可以在不关心原型的情况下，基于类创建避免内存浪费的对象。

```tsx
class Calculator {
    constructor() {
        console.log('构造了一个计算器对象');
    }
}

let calculator: Calculator = new Calculator(); // 输出"构造了一个计算器对象"
```

如果不定义构造函数，会获得一个隐式的构造函数

## 构造函数

类的构造函数是一个特殊的函数，它总是会在实例化类的对象时被调用。但我们还不知道的是，类的构造函数没有返回类型，但可以有参数列表，并且其参数列表中同样可以出现常规参数、可选参数、默认参数和剩余参数。

```ts
class Calculator {
    precision: number = 2; // 计算结果精度属性，表示计算结果应保留2位小数
    maxOperand: number;
    minOperand: number;

    constructor(maxOperand: number, minOperand: number) {
        this.maxOperand = maxOperand;
        this.minOperand = minOperand;
    }
}

let calculator: Calculator = new Calculator(100, 1);
console.log(calculator.maxOperand); //输出100

```

在构造函数的函数体中，当这个名字的前面被添加了前缀this.时，它指代的是属性；

事实上，TypeScript的语法规则要求我们，当在类中访问类的实例成员时，我们必须在成员的前面添加前缀this.，因为这样可以有效地防止指代错误。

## 实例成员

 ```tsx
class Calculator {
    precision: number = 2; // 计算结果精度属性，表示计算结果应保留2位小数
    constructor() {
        
    }
}

let calculator: Calculator = new Calculator();
let precision: number = calculator.precision; // 得到2
 ```

## 访问器 

为了使属性的修改可以被监测，TypeScript（以及ECMAScript 5.1）引入了访问器（Accessor）的概念。为了在TypeScript中使用访问器，我们需要先修改当前项目的TypeScript项目配置文件

```json
{
    "compilerOptions": { //编译选项
        ...
        "target": "ES5" //使当前项目兼容ES5的语法，并将编译结果输出为兼容ES5的JavaScript代码
    }
}
```

```tsx
class Calculator {
    maxOperand: number;
    minOperand: number;

    // precision: number = 2; // 计算结果精度属性，表示计算结果应保留2位小数
    _precision: number = 2; //按照惯例，通过访问器访问的属性的名字以下画线开头
    /**
        * 访问器，访问属性_precision
        */
    get precision(): number {
        console.log('获取属性_precision的值')
        return this._precision;
    }

    /**
     * 设置器，设置属性_precision
     */
    set precision(value: number) {
        console.log('设置属性_precision的值')
        this._precision = value;
    }

    constructor(maxOperand: number, minOperand: number) {
        this.maxOperand = maxOperand;
        this.minOperand = minOperand;
    }

}
```

成对的访问器（即读取器和设置器）的名字必须是相同的，因此以上代码中的访问器都被命名为precision。另外，按照惯例通过访问器访问的属性的名字应该是下画线加访问器的名字，因此以上精度属性被重命名成了_precision。

访问器的本质虽然是函数，但我们不能像调用方法那样调用它们，而应该像访问属性那样访问它们

```tsx
// 通过读取器读取属性_precision的值，仍然得到2
precision = calculator.precision; // 控制台被输出"获取属性_precision的值"
// 通过设置器将属性_precision的值设置为50
calculator.precision = 50;         // 控制台被输出"设置属性_precision的值"
// 再次通过读取器读取属性_precision的值，得到50
precision = calculator.precision; // 控制台被输出"获取属性_precision的值"
console.log(precision); //输出50
```

## 方法

```tsx
    //...省略的访问器和构造函数

    /**
     * 加法
     * @param x 加数 
     * @param y 加数
     */
    add(x: number, y: number): number {
        let areOperandsLegal: boolean = this.checkOperands(x, y);
        if (!areOperandsLegal) {
            throw '非法的操作数';
        }

        let fixed: string = (x + y).toFixed(this._precision); // 保留指定位数的小数
        return +fixed; // 将字符串转换成数字
    }

    /**
     * 减法
     * @param x 被减数
     * @param y 减数
     */
    subtract(x: number, y: number): number {
        let areOperandsLegal: boolean = this.checkOperands(x, y);
        if (!areOperandsLegal) {
            throw '非法的操作数';
        }

        let fixed: string = (x - y).toFixed(this._precision); // 保留指定位数的小数
        return +fixed; // 将字符串转换成数字
    }

    /**
     * 判断参与运算的两个操作数是否合法
     * @param x 操作数1
     * @param y 操作数2
     */
    checkOperands(x: number, y: number): boolean {
        if (x > this.maxOperand || x < this.minOperand) {
            console.log('操作数x超出了可计算数的范围');
            return false;
        }
        if (y > this.maxOperand || y < this.minOperand) {
            console.log('操作数y超出了可计算数的范围');
            return false;
        }

        return true;
    }
```

​        方法的本质是函数，只是在面向对象编程的世界里，被封装成为类的成员的函数被称为方法。但构造函数并非类的成员，因此它不被称为构造方法。

  ```tsx
let calculator4: Calculator = new Calculator(100, -100);
let sum: number = calculator4.add(12.1212, 45.4545); // 加法计算，得到57.58
let difference: number = calculator4.subtract(12.1212, 45.4545); // 减法计算，得到-33.3
console.log(sum, difference); //输出57.58 -33.33
  ```



## 静态成员

### 定义

```tsx
class CalculatorStatic {
    static maxOperand: number; //静态属性
    static minOperand: number;//静态属性
    .......
    
    /**
     * 判断参与运算的两个操作数是否合法
     * @param x 操作数1
     * @param y 操作数2
     */
    checkOperands(x: number, y: number): boolean {
        if (x > CalculatorStatic.maxOperand || x < CalculatorStatic.minOperand) {
            console.log('操作数x超出了可计算数的范围');
            return false;
        }
        if (y > CalculatorStatic.maxOperand || y < CalculatorStatic.minOperand) {
            console.log('操作数y超出了可计算数的范围');
            return false;
        }

        return true;
    }

}


// 设置静态属性的值,多个实例公用
CalculatorStatic.maxOperand = 100;
CalculatorStatic.minOperand = -100;

let calculator7: CalculatorStatic = new CalculatorStatic();
calculator7.precision = 2;
let sum5: number = calculator7.add(20.123, 20.123); // 得到40.24


let calculator8: CalculatorStatic = new CalculatorStatic();
calculator8.precision = 3;
let sum6: number = calculator8.add(20.123, 20.123); // 得到40.2
```

修饰符static就是类的静态成员的修饰符，因此经过以上修改之后计算器类的maxOperand和minOperand便成了静态属性。

实例属性和静态属性的区别：

- 实例属性在类的内部必须通过关键字this访问，而静态属性通常需要通过类来访问；
- 实例属性仅属于单个实例，而静态属性可以被所有实例共享。

### 静态访问器

```tsx
class CalculatorStatic {
    static _maxOperand: number; //静态属性
    /**
        * 静态读取器，访问静态属性_maxOperand
        */
    static get maxOperand(): number {
        console.log('读取静态属性_maxOperand的值');
        return CalculatorStatic._maxOperand;
    }

    /**
     * 静态设置器，设置静态属性_maxOperand
     */
    static set maxOperand(value: number) {
        console.log('设置静态属性_maxOperand的值');
        this._maxOperand = value; // this的是当前类，而非实例
    }
    ......
}
    
// 通过静态访问器设置静态属性_maxOperand的值
CalculatorStatic.maxOperand = 100; // 控制台中被输出"设置静态属性_maxOperand的值"
```

静态访问器需要遵守另一个规则，那就是其函数体内不能访问类的实例成员，只能访问类的静态成员

事实上，关键字this在静态访问器（及稍后我们将了解的静态方法）内指向的不是类的实例，而是类本身。因此，以上静态访问器中的`CalculatorStatic._maxOperand`和`this._maxOperand`是等价的，即都是计算器类的静态属性_maxOperand。

### 静态方法

```tsx
class CalculatorStatic {   
    static _minOperand: number = -100; // 设置初始值
    /**
     * 重置操作数范围
     */
    static resetOperandRange(): void {
        CalculatorStatic._maxOperand = 100;
        this._minOperand = -100; //静态方法内的关键字this指向的不是类的对象，而是类本身
    }
    ......
}
    
CalculatorStatic.resetOperandRange();       // 将最大操作数和最小操作数分别重置回100和-100
sum = calculator.subtract(150, -150); // 得到undefined，操作数超出范围

```

以上resetOperandRange()方法就是一个静态方法，而这个方法的作用是将计算器类的_maxOperand和_minOperand两个静态属性重置回它们的初始值—— 静态方法内的关键字this指向的不是类的对象，而是类本身。

在类的外部使用其静态方法时，我们只需要通过类的名字访问即可；而在类的内部使用其静态方法时，我们既可以使用类的名字访问它，也可以使用关键字this访问它。

## 可选成员

类的可选成员包括可选属性（Optional Property）和可选方法（Optional Method）—— 类没有可选访问器。

### 可选属性

所谓可选属性，是指类型不为undefined但值可被赋为undefined的实例或静态属性。

```TSX
class Calculator {
    precision?: number;         // 可选的精度属性

    static maxOperand?: number; // 可选的静态最大操作数属性
    static minOperand: number;  // 非可选的静态最小操作数属性
}

calculator.precision = undefined;
Calculator.maxOperand = undefined;
```

由于可选属性的值可能是undefined，我们不能将它们直接赋给非undefined类型的变量，因此以下代码是非法的：

```tsx
let precision: number = calculator.precision;   // 错误
let maxOperand: number = Calculator.maxOperand; // 错误
```

有时候我们可以明确地知道可选属性的值不是undefined，这时可以这样做：

```tsx
let precision: number = calculator.precision!;
let maxOperand: number = Calculator.maxOperand!;
```

以上代码结尾的英文叹号被称为非空断言操作符（Non-null Assertion Operator），其作用是告诉TypeScript编译器相应的操作数的值不是空（null或undefined），从而使这个值可以被赋给非空变量。

### 可选方法

所谓可选方法，是指类中可以不被实现（不包含方法体）的实例或静态方法。

```tsx
export { };
class Calculator {
    precision?: number;         // 可选的精度属性

    static maxOperand?: number; // 可选的静态最大操作数属性
    static minOperand: number;  // 非可选静态属性

    // 可选的加法计算方法
    add?(x: number, y: number): number;

    // 可选的减法计算方法
    subtract?(x: number, y: number): number {
        return x - y;
    }

    // 可选的最大操作数获取静态方法
    static getMaxOperand?(): number;

    // 可选的最小操作数获取静态方法
    static getMinOperand?(): number {
        return this.minOperand;
    }
}

let calculator = new Calculator();
calculator.subtract!(1, 2);
//Calculator.getMaxOperand!();
Calculator.getMinOperand!()
```



可选方法可以不被实现，但也可以被实现。不管是否被实现，当被调用时，可选方法名字的后面都需要添加非空断言操作符：



## 索引

```tsx
class Knapsack {
    [index: string]: string;
}

let knapsack1: Knapsack = new Knapsack();
// 向knapsack的索引中添加键为color值为orange的索引
knapsack1['color'] = 'orange';
console.log(knapsack1['color']);


class Style {
    [index: string]: string | number;
}

let style: Style = { 'width': '200px', 'height': 100, 'backgroundColor': '#ffffff' };
console.log(style);
```

## 继承

 ### 单继承

一个类可以有多个子类，但只能有一个父类。

- car.ts

```tsx
export class Car {
    color: string;
    run(): void {
        console.log(`this is a ${this.color} car`);
    }
}
```

- sports-car.ts

```tsx
import { Car } from './car';
export class SportsCar extends Car {
    sportRun(): void {
        console.log('跑车加速')
    }
}
```

- index.ts

```tsx
import {
    SportsCar
} from './sports-cart'

let sporstCar = new SportsCar();
sporstCar.color = 'white'
sporstCar.run();
sporstCar.sportRun();
```

### super

当为子类提供显式的构造函数时，子类中的显式构造函数必须通过关键字super调用父类的构造函数。

必须调用，否则提示语法错误，hovercar.ts

```tsx
import { Car } from "./car"; // 导入汽车类

// 飞行汽车类
export class Hovercar extends Car {
    constructor(color: string) {
        super(); // 调用父类的构造函数,必须调用，否则提示语法错误
        this.color = color;
    }
}
```



### 重写

```tsx
import { Car } from "./car"; // 导入汽车类

// 电动汽车类
export class ElectroCar extends Car {
    // 重写继承自父类的run()方法
    run(): void {
        super.run();         // 调用父类的run()方法
        console.log('我是烧电的。。');
    }
}
```

```tsx
let electrCar = new ElectroCar();
electrCar.run();
```



## 类的兼容

TypeScript中的父类兼容子类。

只能访问父类中定义的成员，

不能访问这个对象本确实拥有但却未被定义在父类中的成员。

```tsx
//类的兼容
let car: Car = new SportsCar();
car.run(); //可以调用父类Car定义的方法
//car.sportRun();//不能调用
```

如果非要调用子类的方法，需要进行类型断言

```tsx
//类的兼容
let car: Car = new SportsCar();
car.run(); //可以调用父类Car定义的方法
//car.sportRun();//不能调用
let sportsCar = car as SportsCar; //类型断言
sportsCar.sportRun();
```



## 函数参数的双向协变

函数类型(sportsCar: SportsCar) => boolean兼容(car: Car) => boolean，同时也兼容(superSportsCar: SuperSportsCar) => boolean

目标函数类型兼容源函数类型的前提条件，重新描述为：
① 目标函数类型的返回类型兼容源函数类型的返回类型；
② 目标函数类型和源函数类型的参数列表中对应序号的参数的类型是双向协变的，即其中的任何一方兼容另一方都可以；
③ 目标函数类型的常规参数数量多于或等于源函数类型的常规参数数量。



## 可访问性

TypeScript支持的访问修饰符有public、protected和private，其中public是类的构造函数和所有成员默认的访问修饰符。

### public

类的构造函数和成员默认的访问修饰符是public。

### protected

访问修饰符改成了protected，其子类可访问。

+ calculator.ts

```tsx
export class Calculator {
    public precision: number = 2;
    public static maxOperand: number = 100;
    public static minOperand: number = -100;

    public constructor(precision: number) {
        this.precision = precision;
             this.precision = precision;
    }

    protected checkOperands(x: number, y: number): boolean {
        if (x > Calculator.maxOperand || x < Calculator.minOperand) {
            console.log('操作数x超出了可计算数的范围');
            return false;
        }

        if (y > Calculator.maxOperand || y < Calculator.minOperand) {
            console.log('操作数y超出了可计算数的范围');
            return false;
        }

        return true;
    }
}
```

+ SimpleCalculator.ts

```tsx
// 必要的导入
import { Calculator } from "./calculator";

// 简单计算器类
export class SimpleCalculator extends Calculator {
    add(x: number, y: number): number {
        let areOperandsLegal: boolean = this.checkOperands(x, y);
        if (!areOperandsLegal) {
            throw '非法的操作数';
        }

        let fixed: string = (x + y).toFixed(this.precision);
        return +fixed;
    }

    subtract(x: number, y: number): number {
        let areOperandsLegal: boolean = this.checkOperands(x, y);
        if (!areOperandsLegal) {
            throw '非法的操作数';
        }

        let fixed: string = (x - y).toFixed(this.precision);
        return +fixed;
    }
}
```

简单计算器类`SimpleCalculator`继承自计算器类`Calculator`，它在复用父类的操作数检查方法`checkOperands()`方法的情况下完成了加减法运算

### private

只能在类内部被访问

## readonly

```tsx
// 计算器类
export class Calculator {
    protected readonly precision: number = 2;
    private static _maxOperand: number = 100;
    public static readonly minOperand: number = -100;

    // 读取私有属性_maxOperand的公共读取器
    static get maxOperand(): number {
        return this._maxOperand;
    }

    public constructor(precision: number) {
        this.precision = precision;
    }

    // 受保护的操作数检查方法
    protected checkOperands(x: number, y: number): boolean {
        // ...省略的代码
    }
}
```

首先，我们需要知道的是，只读属性标识符readonly不是访问修饰符，因此它的作用不是控制可访问性，并且可以和访问修饰符一起使用。

+ 修饰符protected之后添加了标识符readonly，这会使它成为一个只读属性，从而使它只有在以下两种情况下可以被赋值：
  （1）在定义时被赋初始值，比如，以上代码将它的初始值赋为2；
  （2）在构造函数中被重新赋值，比如，以上构造函数会将它的值重新赋为参数precision的值。
+ 静态属性也被我们使用标识符readonly修饰了，这样一来，它就只有定义的同时可以被赋初始值—— 即使是在构造函数中我们也不能对它进行重新赋值，更不用说其他实例方法中了。

## 参数属性

参数属性（Parameter Property）并非是一种新的属性，而是TypeScript中声明属性的另一种方式。通过这种方式，我们可以在类的构造函数参数列表中声明类的实例属性，从而简化实例属性的声明和赋值过程。

```tsx
// 汽车类
export class Car {
    // 通过构造函数参数列表定义参数属性
    constructor(public color: string) {
    }

    run(): void {
        console.log('${this.color}车在跑。。');
    }
}

let car: Car = new Car('蓝色');
car.run(); // 输出"蓝色车在跑。。"
```

等价于

```tsx
export class Car {
    public color: string;

    constructor(color: string) {
        this.color = color;
    }

    run(): void {
        console.log('${this.color}车在跑。。');
    }
}
```

除了以上情况，参数属性其实还可以是可选的，并且还可以有默认值。比如，前面的计算器类Calculator的精度属性precision，就可以被写成如下所示的参数属性：

```tsx
//计算器类
export class Calculator {
    // ...省略的代码
    // 受保护的、拥有默认值的只读参数属性
    public constructor(protected readonly precision: number = 2) {
    }
    // ...省略的代码
}
```



## 抽象类

使用标识符abstract将计算器类Calculator定义成了一个抽象类，而TypeScript中的抽象类是不能被实例化的，

```tsx
export abstract class Calculator {
    // ...省略的代码
    // 受保护的、拥有默认值的只读参数属性
    public constructor(protected readonly precision: number = 2) {
    }

    protected checkOperands(x: number, y: number): boolean {
        if (x > Calculator.maxOperand || x < Calculator.minOperand) {
            console.log('操作数x超出了可计算数的范围');           
            console.log('操作数x超出了可计算数的范围');
            return false;
        }

        if (y > Calculator.maxOperand || y < Calculator.minOperand) {
            console.log('操作数y超出了可计算数的范围');
            return false;
        }

        return true;
    } 
}
```

当然，抽象类存在的意义并不仅仅是为了阻止相应的实例被创建，它的另一大作用是帮助我们快速地定义相关的特征和行为的规范。

+ Discount.ts

```tsx
// 折扣策略
export abstract class Discount {
    // 折扣描述
    abstract description: string;

    /**
     * 折扣策略构造函数
     * @param totalAmount 总金额
     */
    constructor(protected totalAmount: number) {
    }

    // 获取折扣金额
    abstract getDiscountAmount(): number;
}
```

+ newbie-discount.ts 

```tsx
import { Discount } from "./discount";

export class NewbieDiscount extends Discount {
    description: string = '新用户一律5折';

    getDiscountAmount(): number {
        return this.totalAmount * 0.5;
    }
}
```



+ rich-discount.ts

```tsx
import { Discount } from "./discount";

export class RichDiscount extends Discount {
    description: string = '满额100打8折';

    getDiscountAmount(): number {
        return this.totalAmount < 100 ? this.totalAmount : this.totalAmount * 0.8;
    }
}
```

# 模拟静态类

在TypeScript中类不能被标识符static修饰，因此TypeScript中没有所谓的静态类,

尽管如此，我们仍然可以结合现有的知识在TypeScript中模拟静态类。

```tsx
/**
 * 字符串工具类
 */
export abstract class StringUtility { // 抽象类，防止被实例化 
    private constructor() { // 私有构造函数，防止被继承
    }

    /**
     * 判断指定的字符串是否是undefined、null、空字符串或空格组成的字符串
     * @param 要被判断的字符串
     */
    static isEmpty(str: string): boolean {
        return (!str || /^\s*$/.test(str));
    }

    /**
     * 判断指定的字符串是否是数字
     * @param str 要判断的字符串
     */
    static isNumber(str: string): boolean {
        return this.isEmpty(str) ? false : !isNaN(+str);
    }
}

let isEmpty: boolean = StringUtility.isEmpty('   ');  // 得到true
isEmpty = StringUtility.isEmpty('white space');       // 得到false
let isNumber: boolean = StringUtility.isNumber('12'); // 得到true
isNumber = StringUtility.isNumber(''); // 得到false，调用isNaN('')会得到t
```

以上字符串工具类StringUtility没有（也不能）被标识符static修饰，但它功能上已经是一个静态类，因为它拥有静态类的以下本质特征：
① 不能被实例化，因为它是抽象的；
② 不能被继承，因为它的构造函数的可访问性是私有的。