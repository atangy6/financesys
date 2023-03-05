const express = require('express')

const router = express.Router()

const phoneHandler = require('../router_handler/phone_handler')

// 手机购买情况
router.get('/phone', phoneHandler.getPhone)

// 手机日销量情况
router.get('/sales', phoneHandler.phoneSales)

// 新增用户和活跃用户情况
router.get('/user_status', phoneHandler.userStatus)



module.exports = router