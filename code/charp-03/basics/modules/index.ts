import { temperatrue } from './sea';
import { temperatrue as humanTemperatrue, swim } from './human';
import * as human from './human';

console.log('海水温度->' + temperatrue);
console.log('人体温度->' + humanTemperatrue);
swim();

console.log('人体温度->' + human.temperatrue);
human.swim()