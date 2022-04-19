const express = require('express')
const router = express.Router()
const userHandler = require('../router_handler/user')
const expressJoi = require('@escook/express-joi')
const { reg_login_schema } = require('../schema/user')
const { realpath } = require('fs')
router.post('/requser',expressJoi(reg_login_schema) ,userHandler.regUser)
router.post('/login',expressJoi(reg_login_schema),userHandler.login)
module.exports = router