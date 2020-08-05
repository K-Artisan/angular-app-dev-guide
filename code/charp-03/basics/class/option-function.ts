export { };
class Calculator {
    precision?: number;         // 可选的精度属性

    static maxOperand?: number; // 可选的静态最大操作数属性
    static minOperand: number;  // 非可选静态属性

    // 可选的加法计算方法
    add?(x: number, y: number): number;

    // 可选的减法计算方法
    subtract?(x: number, y: number): number {
        return x - y;
    }

    // 可选的最大操作数获取静态方法
    static getMaxOperand?(): number;

    // 可选的最小操作数获取静态方法
    static getMinOperand?(): number {
        return this.minOperand;
    }
}

let calculator = new Calculator();
calculator.subtract!(1, 2);
//Calculator.getMaxOperand!();
Calculator.getMinOperand!()