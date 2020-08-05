import { Car } from "./car"; // 导入汽车类

// 飞行汽车类
export class Hovercar extends Car {
    constructor(color: string) {
        super(); // 调用父类的构造函数,必须调用，否则提示语法错误
        this.color = color;
    }
}