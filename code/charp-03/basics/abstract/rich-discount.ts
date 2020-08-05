import { Discount } from "./discount";

export class RichDiscount extends Discount {
    description: string = '满额100打8折';

    getDiscountAmount(): number {
        return this.totalAmount < 100 ? this.totalAmount : this.totalAmount * 0.8;
    }
}