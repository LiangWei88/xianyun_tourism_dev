// 从前往后逐个计算
// var arr = []

function feiBo() {
    if (arr.length < 2) {
        arr.push(1);
    } else {
        var a = arr[arr.length - 1]
        var b = arr[arr.length - 2]
        arr.push(a + b);
    }
    if (arr.length < 100) {
        feiBo();
    }
}

// feiBo()
// console.log(arr);

// f1 1
// f2 1
// f3 3
// f4 4
// f5 5
// f6 6


//--------------------------------------------------------------------------

// 从后往前推
// function f(index) {
//     if (index == 1 || index == 2) {
//         return 1
//     } else {
//         return f(index - 2) + f(index - 1)
//     }
// }

// 函数     结果    次数
// f1         1        1
// f2         1        1
// f3         2        3 次数 = 结果 + 1
// f4         3        5 次数 = 结果 + 2
// f5         5        9 次数 = 结果 + 3
// f6         8        5 + 9 + 1 结果 = 15

// 但是明显


