const fs = require("fs")
let projectPath = './data/project.json'
//获取所有数据
exports.find = function (callback) {
    fs.readFile(projectPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        callback(null, JSON.parse(data).project)
    })
}

//添加数据
exports.save = function (pro, callback) {
    fs.readFile(projectPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        let project = JSON.parse(data).project
        project.unshift(pro)

        let fileData = JSON.stringify({
            project: project
        })

        fs.writeFile(projectPath, fileData, function (err) {
            if (err) {
                return callback(err)
            }
            callback(null)
        })
    })
}
