var CalculatorStatic = /** @class */ (function () {
    function CalculatorStatic() {
        this._precision = 2; //按照惯例，通过访问器访问的属性的名字以下画线开头
    }
    Object.defineProperty(CalculatorStatic, "maxOperand", {
        /**
            * 静态读取器，访问静态属性_maxOperand
            */
        get: function () {
            console.log('读取静态属性_maxOperand的值');
            return CalculatorStatic._maxOperand;
        },
        /**
         * 静态设置器，设置静态属性_maxOperand
         */
        set: function (value) {
            console.log('设置静态属性_maxOperand的值');
            this._maxOperand = value; // this的是当前类，而非实例
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 重置操作数范围
     */
    CalculatorStatic.resetOperandRange = function () {
        CalculatorStatic._maxOperand = 100;
        this._minOperand = -100; //静态方法内的关键字this指向的不是类的对象，而是类本身
    };
    Object.defineProperty(CalculatorStatic.prototype, "precision", {
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
    CalculatorStatic.prototype.add = function (x, y) {
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
    CalculatorStatic.prototype.subtract = function (x, y) {
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
    CalculatorStatic.prototype.checkOperands = function (x, y) {
        if (x > CalculatorStatic.maxOperand || x < CalculatorStatic._minOperand) {
            console.log('操作数x超出了可计算数的范围');
            return false;
        }
        if (y > CalculatorStatic.maxOperand || y < CalculatorStatic._minOperand) {
            console.log('操作数y超出了可计算数的范围');
            return false;
        }
        return true;
    };
    CalculatorStatic._minOperand = -100; // 设置初始值
    return CalculatorStatic;
}());
// 通过静态访问器设置静态属性_maxOperand的值
CalculatorStatic.maxOperand = 100; // 控制台中被输出"设置静态属性_maxOperand的值"
CalculatorStatic._minOperand = -100;
var calculator7 = new CalculatorStatic();
calculator7.precision = 2;
var sum5 = calculator7.add(20.123, 20.123); // 得到40.24
var calculator8 = new CalculatorStatic();
calculator8.precision = 3;
var sum6 = calculator8.add(20.123, 20.123); // 得到40.2
CalculatorStatic.resetOperandRange(); // 将最大操作数和最小操作数分别重置回100和-100
sum = calculator.subtract(150, -150); // 得到undefined，操作数超出范围
//# sourceMappingURL=index-static.js.map