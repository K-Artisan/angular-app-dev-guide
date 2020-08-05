/*------------------boolean------------------*/
let yesOrNo: boolean = true;
console.log('yesOrNo:', yesOrNo)


/*------------------number------------------*/
let num1: number = 6;
let num2: number = 6.1;

/*------------------string------------------*/
let firstname: string = 'hello'
let lastname: string = 'world'
let num_srtring: string = num2 + firstname; //不能将number类型的数字赋给string类型的变量，但仍然可以对它们进行拼接
let myname: string = `${firstname}-${lastname}`; //字符模板

/*------------------Array------------------*/
let numArray: Array<number> = new Array<number>(4, 5);
numArray.push(1);
numArray.push(2);
console.log('numArray:', numArray)
console.log('numArray[1]:', numArray[1])


/*------------------Tuple------------------*/
let heights: [number, string] = [20, "px;"]
console.log('heights[0]:', heights[0])
console.log('heights[1]:', heights[1])

/*------------------enum------------------*/
enum Sex {
    Female,
    Male,
    Secret
}
console.log('Sex.Secret:', Sex.Secret)

let mySex: Sex = Sex.Male
console.log('mySex:', mySex)


/*------------------ull和undefined------------------*/
let job: null = null;
//job = 'sss';//错误
let address: string = null


/*------------------any和unknown------------------*/
let anyVal: any = 30;
anyVal = null;
anyVal = '33.6'
console.log('anyVal:', anyVal)

let sex: unknown = "男";
sex = 1;
sex = undefined;
sex = null;

/*------------------void------------------*/
function findGirFriend(): void {
    console.log('void');
    return;
}

/*------------------nerver------------------*/
function findGirFriendNeverWhenThrow(): never {
    throw "未捕获异常";
}

function findGirFriendNeverWhenWhile(): never {
    while (true) {
        console.log('根本停不下来');
    }
}


/*------------------类型断言------------------*/
let response: any = 'Web Api 返回的一串字符串';
let responseString: string = <string>response;
let responselength: number = responseString.length;
let responselength2: number = (responseString as string).length;
console.log('responselength->', responselength, "responselength2->", responselength);

/*------------------类型断言------------------*/
let numVal: number = 100;
let numString: string = numVal.toString();

let numString2: string = '33'
let numVal2: number = +numString2;
