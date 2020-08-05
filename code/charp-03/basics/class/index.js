var Calculator = /** @class */ (function () {
    function Calculator(maxOperand, minOperand) {
        // precision: number = 2; // 计算结果精度属性，表示计算结果应保留2位小数
        this._precision = 2; //按照惯例，通过访问器访问的属性的名字以下画线开头
        this.maxOperand = maxOperand;
        this.minOperand = minOperand;
    }
    Object.defineProperty(Calculator.prototype, "precision", {
        /**
            * 访问器，访问属性_precision
            */
        get: function () {
            console.log('获取属性_precision的值');
            return this._precision;
        },
        /**
         * 设置器，设置属性_precision
         */
        set: function (value) {
            console.log('设置属性_precision的值');
            this._precision = value;
        },
        enumerable: false,
        configurable: true
    });
    /**
   * 加法
   * @param x 加数
   * @param y 加数
   */
    Calculator.prototype.add = function (x, y) {
        var areOperandsLegal = this.checkOperands(x, y);
        if (!areOperandsLegal) {
            throw '非法的操作数';
        }
        var fixed = (x + y).toFixed(this._precision); // 保留指定位数的小数
        return +fixed; // 将字符串转换成数字
    };
    /**
     * 减法
     * @param x 被减数
     * @param y 减数
     */
    Calculator.prototype.subtract = function (x, y) {
        var areOperandsLegal = this.checkOperands(x, y);
        if (!areOperandsLegal) {
            throw '非法的操作数';
        }
        var fixed = (x - y).toFixed(this._precision); // 保留指定位数的小数
        return +fixed; // 将字符串转换成数字
    };
    /**
     * 判断参与运算的两个操作数是否合法
     * @param x 操作数1
     * @param y 操作数2
     */
    Calculator.prototype.checkOperands = function (x, y) {
        if (x > this.maxOperand || x < this.minOperand) {
            console.log('操作数x超出了可计算数的范围');
            return false;
        }
        if (y > this.maxOperand || y < this.minOperand) {
            console.log('操作数y超出了可计算数的范围');
            return false;
        }
        return true;
    };
    return Calculator;
}());
var calculator = new Calculator(100, -100);
var precision = calculator.precision; // 得到2
calculator.precision = 3; //赋值
console.log(calculator.maxOperand); //输出100
// 通过读取器读取属性_precision的值，仍然得到2
precision = calculator.precision; // 控制台被输出"获取属性_precision的值"
// 通过设置器将属性_precision的值设置为50
calculator.precision = 50; // 控制台被输出"设置属性_precision的值"
// 再次通过读取器读取属性_precision的值，得到50
precision = calculator.precision; // 控制台被输出"获取属性_precision的值"
console.log(precision); //输出50
var calculator4 = new Calculator(100, -100);
var sum = calculator4.add(12.1212, 45.4545); // 加法计算，得到57.58
var difference = calculator4.subtract(12.1212, 45.4545); // 减法计算，得到-33.3
console.log(sum, difference); //输出57.58 -33.33
//# sourceMappingURL=index.js.map