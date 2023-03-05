// 导入express
const express = require('express')
// 创建路由对象
const router = express.Router()

const fundsHandler = require('../router_handler/funds_handler')

// 新增
router.post('/add', fundsHandler.fundsAdd)
// 查询全部数据
router.get('/allFunds', fundsHandler.fundsAll)

// 编辑
router.post('/edit/:id', fundsHandler.fundsEdit)
// 删除
router.post('/delete/:id', fundsHandler.fundsDelete)

// 向外共享对象
module.exports = router

