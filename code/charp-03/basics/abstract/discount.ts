// 折扣策略
export abstract class Discount {
    // 折扣描述
    abstract description: string;

    /**
     * 折扣策略构造函数
     * @param totalAmount 总金额
     */
    constructor(protected totalAmount: number) {
    }

    // 获取折扣金额
    abstract getDiscountAmount(): number;
}