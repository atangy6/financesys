const express = require('express')
const router = express.Router()

const mallHandler = require('../router_handler/mall_handler')
// 新增
router.post('/add', mallHandler.mallAdd)
// 查询所有数据
router.post('/all', mallHandler.mallAll)

// 编辑
router.post('/edit/:id', mallHandler.mallEdit)
// 删除
router.post('/delete/:id', mallHandler.mallDelete)

module.exports = router