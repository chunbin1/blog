# js隐式类型转换
最近做了一些题目[js转换](https://www.eveningwater.com/my-web-projects/react/5/)，做完一头雾水，应该有一些规律可以让我全作对这些这些问题、

## 什么是隐式类型转换
隐式转换是相对于`显式类型转换`的,通常是由`+`、`-`或者`==`等操作运算符导致的类型转换，他不明显，但是有会副作用。
比如：
```js
let a = 42 + '' // a经过转换，变成了'42'字符串类型
```
经过加法运算，a变成了字符串类型。

## 抽象值操作
对于不同的类型，抽象操作的结果其实是不一致的
### ToPrimitive
把不同类型转化为原始类型，
原始类型直接返回
对象的转换规则：
    1. 转换为相应的基本类型值
        - 检查是否有valueOf()方法，如果有并且返回基本类型值，就用该值进行强制类型转换
        - 如果没有valueOf()，检查是否有toString()方法并且返回基本类型值，使用toString()返回值来进行强制类型转换
        - 如果均不返回基本类型值，会产生TypeError错误
    2. 返回非数字的基本类型值，再遵循以上规则将其强制转换为数字
可以通过修改@@toPrimitive来修改规则，转换规则。
```js
const a = []
// 数组默认是没有@@toPrimitive的
a[Symbol.toPrimitive] = function(){
    return 3
}

// 而日期类型是有的
const b = new Date()
b[Symbol.toPrimitive]  // fn
```
### ToString
其中null=>'null',undefined=>'undefined',true=>'true'
```js
// number
const a = 42
a.toString() // '42'
const b = 42*1000**7
b.toString() // '4.2e+22'

// obj
const obj = {}
obj.toString() // "[object Object]"

// array
const arr = [1,2]
arr.toString() // '1,2'
```

### ToNumber
字符串转换规则：基本遵循数字常量的相关规则和语法，处理失败返回NaN，ToNumber对以0开头的八进制数并不按照八进制数处理，而是采用十进制。
```js
Number(010) // 8
Number('010') // 10
```
对象的转化规则：调用ToPrimitive规则
```js
Number(['LCB']); // NaN
```
过程：
 1. ['lcb']的valueOf方法返回的是['lcb'],不是基本类型，
 2. 调用toString，返回了'lcb'字符串，是基本类型
 3. 根据字符串转换规则，得出`NaN`



## 字符串与数字的隐式强制类型转换
### 一元形式的类型转换
```js
1+ +"13" // 14
1- -"13" // 14

+new Date() // 1629711851817
```
其中+X、-X是+运算符的一元形式，会调用ToNumber操作，而且-操作还会改变数字的符号位。
ps：值得注意的是，这种一元形式转换大部分被归为显式类型转换，但是称之为隐式也没问题（不是我说的，是《你不知道的js》说的，概念问题不纠结）。

### +运算符
+运算符能用于数字加法和字符串拼接
`+运算符的转换规则：调用ToPrimitive规则，如果其中一个被转换为了字符串类型，那么就执行拼接操作。`
```js
const a = [1,2]
const b = [3,4]
a+b // 1,23,4
```
过程分析：
    1. a和b都为数组，先调用ToPrimitive规则
    2. a可以通过toString转换为`'1,2'`, b通过toString转换为`'3,4'`，满足拼接的操作
    4. 拼接得到`1,23,4`
举一反三验证我们的想法
```js
[1,2]+4 // 1,24

// 修改valueOf
const a = [3,4]
const b = [1,2]
a.valueOf = ()=>{
    console.log('valueOf被调用了')
    return 4
}
a + b // 41,2
```
a,b经过ToPrimitive后，b为字符串，进行拼接操作
```js
const a = [3,4]
a[Symbol.toPrimitive] = function(){
    return 3
}
a + 4 // 7
```
修改Symbol.toPrimitive可以改变`ToPrimitive`行为。





