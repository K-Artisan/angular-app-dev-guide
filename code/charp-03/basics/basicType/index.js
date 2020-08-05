/*------------------boolean------------------*/
var yesOrNo = true;
console.log('yesOrNo:', yesOrNo);
/*------------------number------------------*/
var num1 = 6;
var num2 = 6.1;
/*------------------string------------------*/
var firstname = 'hello';
var lastname = 'world';
var num_srtring = num2 + firstname; //不能将number类型的数字赋给string类型的变量，但仍然可以对它们进行拼接
var myname = firstname + "-" + lastname; //字符模板
/*------------------Array------------------*/
var numArray = new Array(4, 5);
numArray.push(1);
numArray.push(2);
console.log('numArray:', numArray);
console.log('numArray[1]:', numArray[1]);
/*------------------Tuple------------------*/
var heights = [20, "px;"];
console.log('heights[0]:', heights[0]);
console.log('heights[1]:', heights[1]);
/*------------------enum------------------*/
var Sex;
(function (Sex) {
    Sex[Sex["Female"] = 0] = "Female";
    Sex[Sex["Male"] = 1] = "Male";
    Sex[Sex["Secret"] = 2] = "Secret";
})(Sex || (Sex = {}));
console.log('Sex.Secret:', Sex.Secret);
var mySex = Sex.Male;
console.log('mySex:', mySex);
/*------------------ull和undefined------------------*/
var job = null;
//job = 'sss';//错误
var address = null;
/*------------------any和unknown------------------*/
var anyVal = 30;
anyVal = null;
anyVal = '33.6';
console.log('anyVal:', anyVal);
var sex = "男";
sex = 1;
sex = undefined;
sex = null;
/*------------------void------------------*/
function findGirFriend() {
    console.log('void');
    return;
}
/*------------------nerver------------------*/
function findGirFriendNeverWhenThrow() {
    throw "未捕获异常";
}
function findGirFriendNeverWhenWhile() {
    while (true) {
        console.log('根本停不下来');
    }
}
/*------------------类型断言------------------*/
var response = 'Web Api 返回的一串字符串';
var responseString = response;
var responselength = responseString.length;
var responselength2 = responseString.length;
console.log('responselength->', responselength, "responselength2->", responselength);
/*------------------类型断言------------------*/
var numVal = 100;
var numString = numVal.toString();
var numString2 = '33';
var numVal2 = +numString2;
//# sourceMappingURL=index.js.map