import { SportsCar } from "./sports-car"; // 导入跑车类

// 超级跑车类
export class SuperSportsCar extends SportsCar {
    nos: number; // 氮氧化物加速系统
    accelerate(): void {
        console.log(`加速1分钟，N2O剩余${--this.nos}千克。。`);
    }
}