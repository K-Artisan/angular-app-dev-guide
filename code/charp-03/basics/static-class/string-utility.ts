/**
 * 字符串工具类
 */
export abstract class StringUtility { // 抽象类，防止被实例化 
    private constructor() { // 私有构造函数，防止被继承
    }

    /**
     * 判断指定的字符串是否是undefined、null、空字符串或空格组成的字符串
     * @param 要被判断的字符串
     */
    static isEmpty(str: string): boolean {
        return (!str || /^\s*$/.test(str));
    }

    /**
     * 判断指定的字符串是否是数字
     * @param str 要判断的字符串
     */
    static isNumber(str: string): boolean {
        return this.isEmpty(str) ? false : !isNaN(+str);
    }
}

let isEmpty: boolean = StringUtility.isEmpty('   ');  // 得到true
isEmpty = StringUtility.isEmpty('white space');       // 得到false
let isNumber: boolean = StringUtility.isNumber('12'); // 得到true
isNumber = StringUtility.isNumber(''); // 得到false，调用isNaN('')会得到t