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

