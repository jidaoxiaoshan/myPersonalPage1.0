
exports.setTime=function() {
    let t = new Date()
    let year = t.getFullYear()
    let month = t.getMonth() + 1
    let day = t.getDate()
    let h = t.getHours()
    let m = t.getMinutes()
    let s = t.getSeconds()

    return year + "-" + geshi(month) + "-" + geshi(day) + " " + geshi(h) + ":" + geshi(m) + ":" + geshi(s)
}

function geshi(x) {
    return x < 10 ? "0" + x : x
}