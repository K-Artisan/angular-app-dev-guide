import { Car } from './car';
export class SportsCar extends Car {
    sportRun(): void {
        console.log('跑车加速')
    }

    beep(): string {
        return '滴滴';
    }
}