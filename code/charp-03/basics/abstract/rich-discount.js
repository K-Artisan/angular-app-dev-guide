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
exports.RichDiscount = void 0;
var discount_1 = require("./discount");
var RichDiscount = /** @class */ (function (_super) {
    __extends(RichDiscount, _super);
    function RichDiscount() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.description = '满额100打8折';
        return _this;
    }
    RichDiscount.prototype.getDiscountAmount = function () {
        return this.totalAmount < 100 ? this.totalAmount : this.totalAmount * 0.8;
    };
    return RichDiscount;
}(discount_1.Discount));
exports.RichDiscount = RichDiscount;
//# sourceMappingURL=rich-discount.js.map