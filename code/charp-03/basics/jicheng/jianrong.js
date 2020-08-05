"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var super_sports_car_1 = require("./super-sports-car");
var electro_car_1 = require("./electro-car");
// 类型为Car的SportsCar实例
var superSportsCar = new super_sports_car_1.SuperSportsCar();
var beep = superSportsCar.beep(); // 获得"滴滴"
// superSportsCar.accelerate();   // 错误：汽车类Car未定义方法accelerate()
var _superSportsCar = superSportsCar; // 类型断言
_superSportsCar.nos = 1;
_superSportsCar.nos = 10;
_superSportsCar.accelerate(); // 输出"加速1分钟，N2O剩余9千克。。"
// 汽车质量检车函数
function checkCar(car) {
    try {
        car.beep();
        car.run();
        return true; // 车辆合格，返回true
    }
    catch (_a) {
        return false; // 车辆不合格，返回false
    }
}
// 检测超级跑车和电动汽车是否合格
var electroCar = new electro_car_1.ElectroCar();
var isSuperSportsCarQualified = checkCar(superSportsCar);
var isElectroCarQualified = checkCar(electroCar);
console.log('isElectroCarQualified', isElectroCarQualified);
//# sourceMappingURL=jianrong.js.map