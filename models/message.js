const fs = require("fs")
const Func = require("./func.js")
let messagePath = './data/message.json'
//获取所有数据
exports.find = function (callback) {
    fs.readFile(messagePath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        callback(null, JSON.parse(data).messages)
    })
}

//添加数据
exports.save = function (message, callback) {
    fs.readFile(messagePath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        let messages = JSON.parse(data).messages
        message.id = messages[0].id + 1
        message.date_time = Func.setTime()
        messages.unshift(message)

        let fileData = JSON.stringify({
            messages: messages
        })

        fs.writeFile(messagePath, fileData, function (err) {
            if (err) {
                return callback(err)
            }
            callback(null)
        })
    })
}



