import { Car } from "./car"; // 导入汽车类

// 电动汽车类
export class ElectroCar extends Car {
    // 重写继承自父类的run()方法
    run(): void {
        super.run();         // 调用父类的run()方法
        console.log('我是烧电的。。');
    }
}