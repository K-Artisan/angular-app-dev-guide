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
exports.SuperSportsCar = void 0;
var sports_car_1 = require("./sports-car"); // 导入跑车类
// 超级跑车类
var SuperSportsCar = /** @class */ (function (_super) {
    __extends(SuperSportsCar, _super);
    function SuperSportsCar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SuperSportsCar.prototype.accelerate = function () {
        console.log("\u52A0\u901F1\u5206\u949F\uFF0CN2O\u5269\u4F59" + --this.nos + "\u5343\u514B\u3002\u3002");
    };
    return SuperSportsCar;
}(sports_car_1.SportsCar));
exports.SuperSportsCar = SuperSportsCar;
//# sourceMappingURL=super-sports-car.js.map