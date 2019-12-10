function doConsole(arr) {
    if (arr.length < 2) {
        // 如果数组不够两个,那么必然结果是1
        arr.push(1)
        // console.log(1);
    } else {
        // 如果超过量个,那么数组的下一个数应该是倒数第一,和倒数第二个数的和
        var a = arr[arr.length - 1];
        var b = arr[arr.length - 2]
        arr.push(a + b)
        // console.log(a + b);
    }

    // 这里会有死循环,
    // 应该添加限制,如果 arr.length < 100 就继续做, 如果长度大于等于100 泵名数量已经到达100 个了,停下
    if (arr.length < 100) {
        doConsole(arr);
    }
}


// 我想知道这个算法的时间
// 使用 console.time 标记开始
// 使用 console.timeEnd 标记借宿
console.time('push算法耗时')
for (var i = 0; i < 1000000; i++) {
    doConsole([]);
}
console.timeEnd('push算法耗时')
function feibo(n) {
    if (n >= 3) {
        return feibo(n - 1) + feibo(n - 2)
    }


    // console.log();
    return 1
}

console.time('return算法耗时')
for (var i = 0; i < 100; i++) {
    var a = feibo(100)
}
console.timeEnd('return算法耗时')