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
exports.Hovercar = void 0;
var car_1 = require("./car"); // 导入汽车类
// 飞行汽车类
var Hovercar = /** @class */ (function (_super) {
    __extends(Hovercar, _super);
    function Hovercar(color) {
        var _this = _super.call(this) || this;
        _this.color = color;
        return _this;
    }
    return Hovercar;
}(car_1.Car));
exports.Hovercar = Hovercar;
//# sourceMappingURL=hovercar.js.map