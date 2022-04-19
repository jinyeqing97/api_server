// 个人中心路由模块
const express = require('express')
const userinfo_handler = require('../router_handler/userinfo.js')
const router = express.Router()
const expressJoi = require('@escook/express-joi')
const { update_userinfo_schema , updatePassword_schema, update_avatar_schema} = require('../schema/user.js')
router.get('/userinfo',userinfo_handler.getUserinfo)
router.post('/userinfo',expressJoi(update_userinfo_schema),userinfo_handler.updateUserinfo)
router.post('/updatepwd',expressJoi(updatePassword_schema),userinfo_handler.updatePassword)
router.post('/update/avatar',expressJoi(update_avatar_schema),userinfo_handler.updateAvatar)
module.exports = router