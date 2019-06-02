const fs = require("fs")
let booksPath = './data/books.json'
//获取所有数据
exports.find = function (callback) {
    fs.readFile(booksPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        callback(null, JSON.parse(data))
    })
}