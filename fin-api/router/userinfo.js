// 导入express
const express = require('express')
// 创建路由对象
const router = express.Router()

const userHandler = require('../router_handler/userinfo_handler')

// 新增
router.post('/add', userHandler.userAdd)
// 查询全部数据
router.get('/allUsers', userHandler.userAll)

// 编辑
router.post('/edit/:id', userHandler.userEdit)
// 删除
router.post('/delete/:id', userHandler.userDelete)

// 向外共享对象
module.exports = router

