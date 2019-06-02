const fs = require("fs")
const Func = require("./func.js")
let articlesPath = './data/articles.json'
//获取所有数据
exports.find = function (callback) {
    fs.readFile(articlesPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        callback(null, JSON.parse(data))
    })
}

//根据id获取单个数据
exports.findById = function (id, callback) {
    fs.readFile(articlesPath, function (err, data) {
        if (err) {
            return callback(err)
        }
        let free_notes = JSON.parse(data).free_notes

        /*let note = free_notes.find(function (item) {
            return item.id === parseInt(id)
        })*/

        for (let i = 0; i < free_notes.length; i++) {
            let currentId = parseInt(id)
            if (free_notes[i].id === currentId) {
                let currentIndex = i
                note = free_notes[i]

                //记录浏览次数
                if (!note.views) {
                    note.views = 1
                }

                note.views++
                let fileData = JSON.stringify({
                    free_notes: free_notes
                })

                fs.writeFile(articlesPath, fileData, function (err) {
                    if (err) {
                        return callback(err)
                    }
                    callback(null)
                })

                if (currentIndex === 0) {
                    //    查询当前对象的上一组数据
                    prevNote = {
                        "id": free_notes[currentIndex].id,
                        "title": "当前是第一篇文章"
                    }
                    //    查询当前对象的下一组数据
                    nextNote = free_notes[currentIndex + 1]
                } else if (currentIndex === free_notes.length - 1) {
                    prevNote = free_notes[currentIndex - 1]
                    nextNote = {
                        "id": free_notes[currentIndex].id,
                        "title": "当前是最后一篇文章"
                    }
                } else {
                    prevNote = free_notes[currentIndex - 1]
                    nextNote = free_notes[currentIndex + 1]
                }
            }
        }
        callback(null, {
            note: note,
            prevNote: prevNote,
            nextNote: nextNote
        })
    })
}

//根据标签获取所有符合标签的数据

exports.findByTag = function (tag, callback) {
    fs.readFile(articlesPath, function (err, data) {
        if (err) {
            return callback(err)
        }
        let free_notes = JSON.parse(data).free_notes
        let artList = []

        for (let i = 0; i < free_notes.length; i++) {
            if (free_notes[i].tags.indexOf(tag) !== -1) {
                artList.push(free_notes[i])
            }
        }
        callback(null, {
            free_notes: artList
        })
    })
}

//根据时间获取所有符合标签的数据
exports.findByTime = function (t, callback) {
    fs.readFile(articlesPath, function (err, data) {
        if (err) {
            return callback(err)
        }
        let free_notes = JSON.parse(data).free_notes
        let artList = []

        for (let i = 0; i < free_notes.length; i++) {
            if (free_notes[i].date_time.indexOf(t) !== -1) {
                artList.push(free_notes[i])
            }
        }
        callback(null, {
            free_notes: artList
        })
    })
}

//添加数据
exports.save = function (article, callback) {
    fs.readFile(articlesPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        let free_notes = JSON.parse(data).free_notes
        article.id = parseInt("2018" + Date.now())
        article.date_time = Func.setTime()
        article.author = "几道小山"
        article.views = 0
        article.tags = article.tags.split("、")
        article.contents = article.contents.split(/\r\n/)


        if (article.password === "dajibagege" ) {
            article.password = "你猜猜看！"
            free_notes.unshift(article)

            let fileData = JSON.stringify({
                free_notes: free_notes
            })

            fs.writeFile(articlesPath, fileData, function (err) {
                if (err) {
                    return callback(err)
                }
                callback(null)
            })
        }
    })
}