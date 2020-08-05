"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringUtility = void 0;
/**
 * 字符串工具类
 */
var StringUtility = /** @class */ (function () {
    function StringUtility() {
    }
    /**
     * 判断指定的字符串是否是undefined、null、空字符串或空格组成的字符串
     * @param 要被判断的字符串
     */
    StringUtility.isEmpty = function (str) {
        return (!str || /^\s*$/.test(str));
    };
    /**
     * 判断指定的字符串是否是数字
     * @param str 要判断的字符串
     */
    StringUtility.isNumber = function (str) {
        return this.isEmpty(str) ? false : !isNaN(+str);
    };
    return StringUtility;
}());
exports.StringUtility = StringUtility;
var isEmpty = StringUtility.isEmpty('   '); // 得到true
isEmpty = StringUtility.isEmpty('white space'); // 得到false
var isNumber = StringUtility.isNumber('12'); // 得到true
isNumber = StringUtility.isNumber(''); // 得到false，调用isNaN('')会得到t
//# sourceMappingURL=string-utility.js.map