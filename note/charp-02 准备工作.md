[TOC]

# Node.js

​       简单来说，Node.js是JavaScript的一个运行时（Runtime），这就跟JRE（Java Runtime Environment）是Java的运行时、.NET Framework是C#的运行时一样。此外，Node.js是跨平台的，我们可以基于它开发不同平台下的服务端、桌面甚至移动应用程序。

    ## module (模块)

​       在Node.js中，一个JavaScript文件就是一个Node.js模块。要在一个模块中使用另一个模块的功能时，我们需要将那个模块导入当前模块中。

   ## package(包)

​      当一个Node.js应用程序中的模块数量过多时，这些模块通常会被按照相关性组织到不同的目录中，并且这些目录分别可以被当作一个整体导入有需要的模块中。在Node.js中，这样的目录有一个专有的名称，那就是包（Package）—— 这有些类似于Java中的包或C#中的程序集（Assembly）。

## npm

   + 狭义上的npm（Node.js Package Manager）是指Node.js应用程序，称为Node.js包管理器。通过它，我们可以方便地下载第三方Node.js包，或发布自己的Node.js包。
     
   +  广义上的npm则是指开发它的同名公司，以及这家公司提供的第三方Node.js包在线仓库（Registry）等服务。我们在通过npm（Node.js包管理器）下载第三方Node.js包时，就是从它的在线仓库中下载的。
      
      + 除了下载，任何人都可以注册npm账户，然后向它的在线仓库中发布自己的Node.js包。因此，我们几乎可以从它的在线仓库中找到任何我们想要的Node.js包，包括那些本质上并非运行在Node.js上的资源，比如我们熟悉的jQuery和Bootstrap。

# VS Code

​      不同于Visual Studio或Eclipse，为了保持轻量，VS Code本身没有项目的概念，取而代之的是我们日常使用的文件系统中的文件夹（目录）。在用VS Code打开文件系统中的一个文件夹时，我们就认为打开了一个VS Code项目；而创建一个VS Code项目，事实上就是在文件系统中创建一个文件夹。



# TypeScripe

## hello-world.ts

```ts
function helloWorld() {
    console.log('hello world');
}
```

​        以上是一个JavaScript函数，但TypeScript兼容JavaScript的语法，因此它也是合法的TypeScript代码。
​       当然，除了我们熟悉的JavaScript语法，TypeScript还引入了JavaScript中没有的众多特性，比如类型检查、接口和装饰器等。但这些特性无法获得JavaScript运行时的支持，因此我们需要把TypeScript代码编译成原生的JavaScript代码，而执行这一编译工作的则是TypeScript编译器。

# TypeScript编译器

​        TypeScript编译器是基于Node.js实现的。更准确地说，TypeScript编译器是一个运行在Node.js上的应用程序（Node.js包），因此我们可以通过npm命令将它安装到我们的开发设备中。

## 安装

```xml
cnpm install -g typescript
```

查看TypeScript编译器是否已经被安装到全局安装目录中

```xml
npm ls -g typescript
```

查询结果

```xml
C:\Users\weikai\AppData\Roaming\npm
+-- @vue/cli@4.4.6
| +-- @vue/cli-ui@4.4.6 -> C:\Users\weikai\AppData\Roaming\npm\node_modules\@vue\cli\node_modules\_@vue_cli-ui@4.4.6@@vue\cli-ui
| | `-- typescript@3.9.6
| `-- typescript@3.9.6  -> C:\Users\weikai\AppData\Roaming\npm\node_modules\@vue\cli\node_modules\_typescript@3.9.6@typescript
`-- typescript@3.9.7
```

# 手动编译TypeScript代码

```xml
tsc helloworld.ts
```

项目中多了一个名为“hello-world.js”的JavaScript文件

它是由同名的TypeScript文件hello-world.ts编译而来的，而这一编译动作就是由前面的tsc命令触发的。

# 自动编译TypeScript代码

默认情况下，VS Code不会自动编译项目中的TypeScript代码。为了使项目中的TypeScript代码获得自动编译的支持，我们需要在项目中新建一个名为tsconfig.json的JSON文件，然后向其中输入一个空白的JSON对象。

VS Code发现当前项目中有这个文件时，会为当前项目创建两个任务，即“监视”和“构建”。

单击VS Code工具栏中的“终端(T)”选项，接着在弹出的下拉菜单中单击“运行任务(R)”命令。随后，VS Code将弹出一个包含以上两个任务的任务列表，

通常我们会在开发过程中使TypeScript编译器的监视任务处于执行状态，因此现在要做的就是在任务列表中单击这一任务以开启它。而在这一任务开启之后，VS Code将打开一个新的集成终端

```xml
[5:59:07] Starting compilation in watch mode...
[5:59:08] Found 0 errors. Watching for file changes.
```

#  调试TypeScript代码

## Node.js快速地执行JavaScript代码

在开始调试TypeScript代码之前，让我们先来看看如何通过Node.js快速地执行JavaScript代码

```xml
node helloworld.js
```
输出
```xml
hello world
```

以上命令首先会加载Node.js运行时，接着Node.js运行时会加载当前项目下的JavaScript文件hello-world.js，并开始它的执行

## 调试TypeScript

## 调试`helloworld.js`

打开`helloworld.js`文件，设置断点，按`F5`,选择环境`Node.js`

## 调试helloworld.ts

+ TypeScript代码是无法被直接运行的，所以当我们试图通过VS Code调试TypeScript代码时，VS Code必须找到包含目标TypeScript代码的编译结果的JavaScript文件，然后把它加载到Node.js中去运行。
  
+ hello-world.js确实是hello-world.ts的编译结果文件，但这件事情只有TypeScript编译器和开发人员自己知道，VS Code对此其实“一无所知”。

因此，若要解决上述问题，我们必须让VS Code“知道”hello-world.js就是hello-world.ts的编译结果文件。为了实现这一目的，我们需要修改当前TypeScript项目的配置文件tsconfig.json，

`tsconfig.json`

```json
{
    "compilerOptions": { //编译选项
        "sourceMap": true //生成映射文件
    }
}
```

以上修改添加了TypeScript编译器选项属性compilerOptions，这个属性的值是对象，而这个对象的属性将影响TypeScript编译器对当前项目中的TypeScript文件的编译。
比如，代码中的源文件映射属性sourceMap，它将使TypeScript编译器在对当前项目中的TypeScript文件进行编译时，为它们各生成一个扩展名为.map的映射文件。

+ hello-world.js.map就是映射文件，我们目前无须关心这个映射文件的太多细节，只需要知道通过其sources属性、sourceRoot属性及file属性，VS Code就能找到与源TypeScript文件对应的那个编译结果文件。

+ 映射文件也是TypeScript文件在浏览器环境中调试的基础。

## 多个TypeScript文件协同工作

+ helloworld.js

```xml
export function helloWorld() {
    console.log('hello world!!');
}
```

+ index.js 

```xml
import { helloWorld } from './helloworld'
helloWorld();
```

+ 运行

```xml
node index.js
```

+ 输出

```xml
hello world!!
```



## launch.json

VS Code给出了一个“打开launch.json”的提示。如果我们单击这个提示，VS Code会为当前项目创建一个名为.vscode的文件夹，并在其中创建一个名为launch.json的JSON文件。这个文件中的以下四个属性会影响VS Code的调试行为。

```json
{
    // 使用 IntelliSense 了解相关属性。 
    // 悬停以查看现有属性的描述。
    // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "pwa-node",
            "request": "launch",
            "name": "Launch Program",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "program": "${workspaceFolder}\\helloworld.ts",
            "outFiles": [
                "${workspaceFolder}/**/*.js"
            ]
        }
    ]
}
```

+ （1）"type": "node"—— 表示在Node.js运行时上调试程序。
+ （2）"request": "launch"—— 表示以启动应用程序的方式开始调试程序。
+ （3）"program": "${workspaceFolder}/hello-world.ts"—— 表示要启动已调试的应用程序是项目根目录下的TypeScript文件hello-world.ts。
+ （4）"outFiles": ["${workspaceFolder}/**/*.js"]—— 表示相应的输出文件（要加载到Node.js运行时中运行的文件）是项目根目录或其任意子目录中与以上启动文件同名的JavaScript文件，即hello-world.js。

有了以上文件，不管我们当前打开的是哪个TypeScript文件，按下键盘上的F5键时，被调试的都是hello-world.ts。为了阻止这样的事情发生，我们可以修改以上文件中的program属性的值，或直接删除这个文件。本书选择的是直接删除方式。



# Express

作为一个Web服务器，Node.js提供了一些基础的HTTP和文件I/O API，但这些API使用起来有些烦琐，为此我们需要一个基于Node.js的Web应用程序开发框架，这个框架就是Express。

由于是基于Node.js实现的，因此Express也是一个Node.js包，并且也可以通过npm命令被安装到开发设备中。接下来，我们要做的就是安装Express。

## 安装Express

```xml
cnpm install express
```

## 创建Web应用程序

新建`server-app.js`

```js
var express = require('express');
var app = express();
app.get('/', function (req, res) {
    res.send('hello world');
})

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("host->", host, " ;port->", port);
})
```

+ 运行命令

```xml
node server-app.js
```

+ 在浏览器中打开

```xml
http://localhost:3000
```

## 静态资源服务

`server-app.js`

```js
var app = express();
//将项目根目录设置为静态文件目录
app.use(express.static(__dirname));
...
```

这一修改将使Express把当前项目的根目录当作Web应用程序的静态资源目录，从而使这个目录下的所有静态资源都可以通过它们的路径被访问。为了使这一修改起效，我们需要重启Web应用程序。

回到之前用于启动Web应用程序的VS Code集成终端，按组合键“Ctrl + C”以停止Web应用程序，然后再次输入并执行node命令“node server-app.js”以启动它。

在浏览器中打开

```xml
http://localhost:3000/index.html
```

# 了解模块

​         使用JavaScript开发大型Web应用程序不是一件轻松的事。

​         原因至少有两个：一是所有JavaScript代码都会共享一个全局的作用域，这使来自于不同组织的JavaScript代码很容易发生冲突和覆盖；二是为了便于测试、开发和维护，大型应用程序通常需要分成多个层（Tier）或类似的架构来开发，但使用JavaScript很难实现应用程序的分层，也很难使层与层之间轻易地进行引用。

## 通用模块

在标准的模块被写入ECMAScript 2015中之前，其实人们已经在JavaScript中使用非标准的模块了，只是这种非标准的模块并非由ECMA国际组织官方定义，而是由一些热心的开发人员和社区“私下”定义的。由于热心的开发人员和社区都不止有一个，因此这种非官方定义的模块便有多种，而每一种都必须遵守其定义者提出的规范。

作为应用程序开发者的我们，根本不需要精通通用模块规范的所有具体细节，只需要知道它们的存在，以及它们是如何在ECMAScript 2015被广泛遵守之前，帮助我们在不同版本的不同平台上实现通用模块的加载的。

### CommonJS

CommonJS不像jQuery，它不是一个代码库，我们无法将它加载到浏览器中。CommonJS是一个规范，它规定了怎样的JavaScript代码才是一个CommonJS模块，以及应该如何加载这样的模块。

+ helloworld.ts

```js
export function helloWorld() {
    console.log('hello world');
}
```

+ helloworld.js

```js
"use strict";
exports.__esModule = true;
exports.helloWorld = void 0;
function helloWorld() {
    console.log('hello world');
}
exports.helloWorld = helloWorld;
//# sourceMappingURL=helloworld.js.map
```

​          添加了导出标识符export之后，hello-world.ts变成了一个TypeScript模块，TypeScript编译器默认将它编译成了一个CommonJS模块。也就是说，以上代码就是一个CommonJS模块，而其中的“exports._ _esModule = true”和“exports.helloWorld = helloWorld”就是CommonJS规范约定的写法，它们的作用是将当前CommonJS模块内定义的函数helloWorld导出为一个公共的函数。

​      代码底部的“//# sourceMappingURL=hello-world.js.map”不是CommonJS规范的要求，是TypeScript编译器根据tsconfig.json中的sourceMap属性的值为true生成的，用于VS Code和浏览器加载hello-world.js的源映射文件hello-world.js.map。VS Code和浏览器会通过源映射文件hello-world.js.map加载相应的TypeScript文件hello-world.ts，并建立hello-world.js和hello-world.ts之间的函数和变量的映射关系，从而实现hello-world.ts在VS Code和浏览器中的调试。

+ index.js

打开index.ts的编译结果文件index.js

```js
"use strict";
exports.__esModule = true;
var helloworld_1 = require("./helloworld");
helloworld_1.helloWorld();
//# sourceMappingURL=index.js.map
```

index.js也是一个CommonJS模块。而其中函数调用“require("./hello-world")”的作用就是将hello-world.js这个CommonJS模块导入当前CommonJS模块index.js中。

#### 模块加载器

CommonJS约定：只要是CommonJS模块，就都可以使用exports对象来导出变量和函数等定义，并使用require()函数来导入其他CommonJS模块。但作为一个规范，CommonJS本身并不提供exports对象和require()函数，需要提供它们的是能够加载CommonJS模块的模块加载器。
模块加载器和jQuery一样，是一个JavaScript代码库，之前我们用来成功地执行了index.js的Node.js就内置了这样一个模块加载器，因此它可以很好地处理CommonJS模块的加载和其中的导入及导出。



### AMD

CommonJS给模块规范起了一个好头，但仍有一些不足，其中最著名的就是它定义的模块加载方式不是异步的。为了弥补CommonJS的不足，人们在它的基础上制订了允许模块异步载的规范，即异步模块定义（Asynchronous Module Definition，AMD）。
那么，我们应该如何编写AMD模块呢？答案仍然是我们无须自己编写，因为TypeScript编译器同样会代劳。

打开TypeScript项目配置文件tsconfig.json，将其内容修改至为

```json
{
    "compilerOptions": { //编译选项
        "sourceMap": true, //生成映射文件
        "module": "amd" //指定生成的javascript的模块规范
    }
}
```

等待TypeScript编译器完成对整个项目的编译，然后将index.js变成

```js
define(["require", "exports", "./helloworld"], function (require, exports, helloworld_1) {
    "use strict";
    exports.__esModule = true;
    helloworld_1.helloWorld();
});
//# sourceMappingURL=index.js.map
```

以上就是由TypeScript生成的一个AMD模块，而它的由来，相信读者已经猜到，即当我们将当前项目的tsconfig.json中的module属性的值设置为amd时，TypeScript便会将项目中的TypeScript模块编译成AMD模块。

### UMD

有了AMD之后，人们面临着一个问题，即同一个项目中可能会同时包含一部分（老的）遵循CommonJS规范的模块，以及另一部分（新的）遵循AMD规范的模块。这种情形会使模块的加载变得难以控制，因为遵循不同规范的模块需要使用遵循不同规范的模块加载器才能加载。
为了解决以上问题，人们又制订了通用模块定义（Universal Module Definition，UMD），使遵循UMD规范的模块加载器可以同时用于加载CommonJS模块和AMD模块。

打开TypeScript项目配置文件tsconfig.json，将其内容修改至为

```json
{
    "compilerOptions": { //编译选项
        "sourceMap": true, //生成映射文件
        "module": "umd" //指定生成的javascript的模块规范
    }
}
```

index.js 变成

```js
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./helloworld"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var helloworld_1 = require("./helloworld");
    helloworld_1.helloWorld();
});
//# sourceMappingURL=index.js.map
```



## 通用模块加载器

CommonJS模块之所以可以被Node.js加载，是因为Node.js中内置了一个遵循CommonJS规范的模块加载器。另外，由于UMD兼容CommonJS，Node.js也能加载UMD模块。

现在的问题是，我们开发的Web应用程序除了其中的服务端部分运行在Node.js中，还有很大一部分客户端需要运行在浏览器上，而浏览器上是没有内置任何通用模块加载器的—— 这也是之前当我们试图在浏览器上运行index.js时，浏览器提示“exports is not defined”的原因。

好在一部分热心人定义了通用模块规范之后，另一部分热心人随后就创建了相应的通用模块加载器。

模块加载器和模块规范不同，它们不再仅仅是契约的集合，而是基于这些契约编写的JavaScript代码（库）。这些代码中包含了模块规范中约定的exports、require()、define()和factory()等对象和函数的定义，当这些对象和函数被加载到JavaScript运行环境（如浏览器）中时，我们便能通过它们来将符合指定规范的模块加载到JavaScript运行环境中。
那么，

​         除了Node.js内置的模块加载器，还有哪些著名的模块加载器呢？
​    （1）RequireJS。RequireJS是遵循AMD规范的模块加载器，可用于在浏览器和Node.js中异步加载AMD模块—— Node.js内置的模块加载器只能加载CommonJS模块和UMD模块。
此外，RequireJS的开发团队还发布了基于RequireJS实现的另一个模块加载器cajon。通过cajon，我们可以在浏览器上加载CommonJS模块。
同时，RequireJS的开发团队还发布了RequireJS的一个适配器r.js。通过r.js，我们可以将CommonJS模块转换成AMD模块，然后将它们加载到Node.js或浏览器中。
有没有觉得很乱？放心，本书不打算对RequireJS进行过多的介绍。更何况在RequireJS之外，我们还有更好的选择，那就是更加简单易用但功能更加强大的SystemJS。
   （2）SystemJS。不同于Node.js内置的模块加载器和RequireJS对能够加载的目标模块有所限制，SystemJS在其设计之初的目标就是加载符合任何规范的模块以及任何资源文件，比如CommonJS模块、AMD模块、UMD模块甚至ECMAScript模块，以及图片、文本、CSS、音频和HTML等文件。

### RequireJS



      ### SystemJS

SystemJS也有自己的模块规范，这一规范与CommonJS和AMD等规范互不兼容，因此其他模块加载器无法加载SystemJS模块。

另外，SystemJS需要在相应的插件的帮助下才能加载ECMAScript模块及图片和文本等资源。这些插件的用法并不复杂，但由于本书不涉及ECMAScript模块及图片和文本等资源的加载，因此不会介绍这些插件的用法。	

因此，本书（以及很长一段时间内的Angular官方案例）采用的模块加载器都是SystemJS，但在使用SystemJS之前，我们需要先将它安装到当前项目中。

#### package.json

运行如下命令，创建package.json文件

```xml
npm init
```

当我们在某个目录中创建一个package.json文件时，这个目录会被当成一个Node.js包，而package.json就是这个Node.js包的描述文件。

将项目描述成一个Node.js包有两个好处：一是可以将它发布到npm的在线仓库中，从而使别人可以下载并使用它；二是可以其中的package.json，为其批量下载其所依赖的其他Node.js包。通过如下命令

```xml
cnpm install
```

#### 安装SystemJS

以上被安装的SystemJS的版本是0.21.5，其另一个分支版本是2.0.0。但那个分支不支持CommonJS模块的加载，所以我们需要使用0.21.5这个分支。

```js
cnpm install systemjs --save
```

#### 使用SystemJS

修改index.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>hello world</title>
</head>

<body>
    <h1>hello world</h1>
    <!-- <script src="./index.js"></script> -->

    <script src="./node_modules/systemjs/dist/system.js"></script>
    <script>
        (function () {
            System.config({
                packages: {
                    '/': {
                        defaultExtension: 'js' //设置根目录下的资源的默认后缀为js
                    }
                }
            })
        })()
        System.import('index.js')
    </script>

</body>

</html>
```

## ECMAScript模块













