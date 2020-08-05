"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sports_car_1 = require("./sports-car");
var Hovercar_1 = require("./Hovercar");
var electro_car_1 = require("./electro-car");
var sporstCar = new sports_car_1.SportsCar();
sporstCar.color = 'white';
sporstCar.run();
sporstCar.sportRun();
var hoverCar = new Hovercar_1.Hovercar('Blue');
hoverCar.run();
var electrCar = new electro_car_1.ElectroCar();
electrCar.run();
//类的兼容
var car = new sports_car_1.SportsCar();
car.run(); //可以调用父类Car定义的方法
//car.sportRun();//不能调用
var sportsCar = car; //类型断言
sportsCar.sportRun();
//# sourceMappingURL=index.js.map