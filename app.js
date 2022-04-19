const express = require('express')
const app = express()
const config = require('./config')
const expressJWT = require('express-jwt')
const cors = require('cors')
const joi = require('@hapi/joi')
app.use(cors())
// 解析application/x-www-form-urlencoded格式的表单数据的中间件
app.use(express.urlencoded({extended:false}))

app.use(function(req,res,next) {
    res.cc = function(err,status=1) {
        res.send({
            status,
            message:err instanceof Error ? err.message : err,
        })
        next()
    }
})
app.use(expressJWT({secret:config.jwtSecretKey}.unless({path:[/^\/api\//]})))
// 注册登录路由模块导入
const userRouter = require('./router/user')
app.use('/api',userRouter)
// 全局错误中间件，处理err并处理joi验证中出现的错误
app.use(function(err,req,res,next) {
    if (err instanceof joi.ValidationError) {
        // 数据验证失败错误
        return res.cc(err)
    }
    if (err.name ==='UnauthorizedError') return res.cc('身份认证失败')
    // 其他错误
    res.cc(err)
})
// 个人中心路由模块导入
const userinfoRouter = require('./router/userinfo')
app.use('/my',userinfoRouter)
// 分类管理路由模块
const artCateRouter = require('./router/artcate')
app.use('./my/cate',artCateRouter)
// 图书管理路由模块
const articleRouter = require('./router/article')
app.use('./my/article',articleRouter)

app.use('/uploads',express.static('./uploads'))
app.listen(3007,function() {
    console.log('api server running at http://127.0.0.1:3007')
})