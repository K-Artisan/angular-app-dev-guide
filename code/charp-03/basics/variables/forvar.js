for (var i = 0; i < 10; i++) {
    setTimeout(function () {
        console.log(i);
    }, 0)
}

for (var i = 0; i < 10; i++) {
    (function () {
        var j = i;
        setTimeout(function () {
            console.log("自调用函数->j:", j);
        }, 0)
    })()
}

for (let i = 0; i < 10; i++) {
    setTimeout(function () {
        console.log('let->i:', i);
    }, 0)
}