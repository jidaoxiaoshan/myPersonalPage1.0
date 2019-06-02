const express = require('express')
const bodyParser = require('body-parser')
const router = require('./router')
const app = express()

app.use('/public',express.static('public'))
app.use('/node_modules',express.static('node_modules'))

app.engine("html", require('express-art-template'))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(router)

app.listen(process.env.PORT || 5050,function () {
    console.log("服务器启动成功")
})