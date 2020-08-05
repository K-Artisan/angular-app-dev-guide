// 必要的导入
import { Car } from "./car";
import { SuperSportsCar } from "./super-sports-car";
import { ElectroCar } from "./electro-car";

// 类型为Car的SportsCar实例
let superSportsCar: Car = new SuperSportsCar();
let beep = superSportsCar.beep(); // 获得"滴滴"
// superSportsCar.accelerate();   // 错误：汽车类Car未定义方法accelerate()
let _superSportsCar = superSportsCar as SuperSportsCar; // 类型断言
_superSportsCar.nos = 1

_superSportsCar.nos = 10;
_superSportsCar.accelerate();     // 输出"加速1分钟，N2O剩余9千克。。"

// 汽车质量检车函数
function checkCar(car: Car): boolean {
    try {
        car.beep();
        car.run();
        return true;   // 车辆合格，返回true
    }
    catch {
        return false;  // 车辆不合格，返回false
    }
}

// 检测超级跑车和电动汽车是否合格
let electroCar: ElectroCar = new ElectroCar();
let isSuperSportsCarQualified: boolean = checkCar(superSportsCar);
let isElectroCarQualified: boolean = checkCar(electroCar);
console.log('isElectroCarQualified', isElectroCarQualified)