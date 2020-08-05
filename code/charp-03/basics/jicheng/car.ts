export class Car {
    color: string;
    run(): void {
        console.log(`this is a ${this.color} car`);
    }
    beep(): string {
        return '嘟嘟';
    }
}