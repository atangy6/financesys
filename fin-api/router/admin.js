const express = require('express')
// 创建路由对象
const router = express.Router()

// 导入登录注册处理函数模块
const adminHandler = require('../router_handler/admin_handler')

// 注册
router.post('/register', adminHandler.register)

// 登录
router.post('/login', adminHandler.login)

// 将路由对象共享出去
module.exports = router