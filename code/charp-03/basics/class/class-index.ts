
class Knapsack {
    [index: string]: string;
}

let knapsack1: Knapsack = new Knapsack();
// 向knapsack的索引中添加键为color值为orange的索引
knapsack1['color'] = 'orange';
console.log(knapsack1['color']);


class Style {
    [index: string]: string | number;
}

let style: Style = { 'width': '200px', 'height': 100, 'backgroundColor': '#ffffff' };
console.log(style);