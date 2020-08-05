"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Car = void 0;
var Car = /** @class */ (function () {
    function Car() {
    }
    Car.prototype.run = function () {
        console.log("this is a " + this.color + " car");
    };
    Car.prototype.beep = function () {
        return '嘟嘟';
    };
    return Car;
}());
exports.Car = Car;
//# sourceMappingURL=car.js.map