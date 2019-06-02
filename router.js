const express = require("express")
const Message = require('./models/message')
const Books = require('./models/books')
const Articles = require('./models/articles')
const Project = require('./models/project')

const router = express.Router()

//主要页面的路由
router.get("/", function (req, res) {
    res.render('index.html')
})

router.get("/default", function (req, res) {
    Articles.find(function (err, articles) {
        if (err) {
            return res.status(500).send('server error')
        }
        res.render('default.html', {
            articles: articles
        })
    })
})

//简历
router.get("/resume", function (req, res) {
    res.render('resume.html')
})
//书架
router.get("/bookshelf", function (req, res) {
    Books.find(function (err, books) {
        if (err) {
            return res.status(500).send('server error')
        }
        res.render('bookshelf.html', {
            books: books
        })
    })
})
//随笔
router.get("/free_notes", function (req, res) {
    Articles.find(function (err, articles) {
        if (err) {
            return res.status(500).send('server error')
        }
        res.render('free_notes.html', {
            articles: articles
        })
    })
})
//文章添加页面
router.get("/articles", function (req, res) {
    res.render('articles.html')
})
//展示文章
router.get("/show_articles", function (req, res) {
    let id = req.query.id
    Articles.findById(id, function (err, data) {
        if (err) {
            return res.status(500).send('server error')
        }
        res.render('show_articles.html', {
            data: data
        })
    })
})
//查询文章
router.get("/search", function (req, res) {
    let date_time = req.query.date_time
    let tag = req.query.tag
    //通过时间查询文章
    if (date_time) {
        Articles.findByTime(date_time, function (err, data) {
            if (err) {
                return res.status(500).send('server error')
            }
            res.render('search.html', {
                data: data
            })
        })
    }
    //通过标签查询文章
    if (tag) {
        Articles.findByTag(tag, function (err, data) {
            if (err) {
                return res.status(500).send('server error')
            }
            res.render('search.html', {
                data: data
            })
        })
    }
})

//添加新文章
router.post("/add_article", function (req, res) {
    Articles.save(req.body,function (err, data) {
        if (err) {
            return res.status(500).send('server error')
        }
        console.log(data)
        res.redirect('/free_notes')
    })
})


//留言页面
router.get("/message_board", function (req, res) {
    Message.find(function (err, message) {
        if (err) {
            return res.status(500).send('server error')
        }
        res.render('message_board.html', {
            message: message
        })
    })
})
//提交新留言
router.post("/message_board", function (req, res) {
    Message.save(req.body, function (err) {
        if (err) {
            return res.status(500).send('server error')
        }
        res.redirect('/message_board')
    })
})

//小案例
router.get("/project", function (req, res) {
    Project.find(function (err, project) {
        if (err) {
            return res.status(500).send('server error')
        }
        res.render('project.html', {
            project: project
        })
    })
})
//小案例的路由
router.get("/project/demo001", function (req, res) {
    res.render('./demo/demo001/index.html')
})

router.get("/project/demo002", function (req, res) {
    res.render('./demo/demo002/index.html')
})

router.get("/project/demo003", function (req, res) {
    res.render('./demo/demo003/index.html')
})

//添加新案例
router.post("/add_project", function (req, res) {
    Project.save(req.body,function (err, data) {
        if (err) {
            return res.status(500).send('server error')
        }
        console.log(data)
        res.redirect('/project')
    })
})
module.exports = router