import {
    SportsCar
} from './sports-car'

import {
    Hovercar
} from './Hovercar'

import {
    ElectroCar
} from './electro-car'
import { Car } from './car';


let sporstCar = new SportsCar();
sporstCar.color = 'white'
sporstCar.run();
sporstCar.sportRun();

let hoverCar = new Hovercar('Blue');
hoverCar.run();

let electrCar = new ElectroCar();
electrCar.run();

//类的兼容
let car: Car = new SportsCar();
car.run(); //可以调用父类Car定义的方法
//car.sportRun();//不能调用
let sportsCar = car as SportsCar; //类型断言
sportsCar.sportRun();

