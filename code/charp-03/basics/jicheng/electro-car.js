"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElectroCar = void 0;
var car_1 = require("./car"); // 导入汽车类
// 电动汽车类
var ElectroCar = /** @class */ (function (_super) {
    __extends(ElectroCar, _super);
    function ElectroCar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // 重写继承自父类的run()方法
    ElectroCar.prototype.run = function () {
        _super.prototype.run.call(this); // 调用父类的run()方法
        console.log('我是烧电的。。');
    };
    return ElectroCar;
}(car_1.Car));
exports.ElectroCar = ElectroCar;
//# sourceMappingURL=electro-car.js.map