const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')
const db = require('../db/index')
exports.regUser = (req, res) => {
    const userinfo = req.body
    // 判断用户名密码是否为空
    if (!userinfo.username || !userinfo.password) {
        return res.cc('用户名密码不能为空')
    }
    const sqlSEL = 'select * from ev_users where username = ?'
    // 搜索数据库中用户名是否被占用
    db.squery(sqlSEL, [userinfo.username], function (err, results) {
        if (err) {
            return res.cc(err)
        }
        if (results.length > 0) {
            return res.cc('用户名被占用，，请更换其他用户名！')
        }
        // 密码加密，并注册
   userinfo.password = bcrypt.hashSync(userinfo.password,10)
   const sqlINS = 'INSERT INTO ev_users set ?'
   db.squery(sqlINS,{username:userinfo.username,password:userinfo.password},function(err,results) {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) {
            return res.cc('注册用户失败')
        }
        res.cc('注册成功！',0)
   }) 
   })
    
   
}

exports.login = (req, res) => {
    const userinfo = req.body
    const sql = 'select * from ev_users where username = ?'
    db.query(sql,userinfo.username,function(err,results) {
        if (err) return res.cc(err)
        if (results.length !==1 ) return res.cc('登录失败')
        const compareResult = bcrypt.compareSync(userinfo.password,results[0].password)
        if (!compareResult) return res.cc('登录失败！')
        // 剔除掉密码和头像，然后生成token
        const user= {...results[0],password:'',user_pic:''}
        const tokenStr = jwt.sign(user,config.jwtSecretKey,{expiresIn:'2h'})
        res.send({
            status:0,
            message:'登录成功！',
            token:'Bearer' + tokenStr

        })
    })
} 