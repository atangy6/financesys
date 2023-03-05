const db = require('../db/index')

exports.userAdd = (req, res) => {
    const fields = {}
    if (req.body.name) fields.name = req.body.name
    if (req.body.addr) fields.addr = req.body.addr
    if (req.body.age) fields.age = req.body.age
    if (req.body.birth) fields.birth = req.body.birth
    if (req.body.sex) fields.sex = req.body.sex

    const sql = `insert into user_info set ?`
    db.query(sql, fields, (err, results) => {
        if (err) return res.status(400).json(err)
        if (results.affectedRows !== 1) return res.status(400).json('添加失败')
        res.json(fields)
    })
}

exports.userAll = (req, res) => {
    const sql = `select * from user_info order by id desc`
    db.query(sql, (err, results) => {
        if (err) return res.status(400).json(err)
        if (results.length === 0) return res.status(200).json('查无数据')
        res.json(results)
    })
}

exports.userEdit = (req, res) => {
    const fields = {}
    if (req.body.name) fields.name = req.body.name
    if (req.body.addr) fields.addr = req.body.addr
    if (req.body.age) fields.age = req.body.age
    if (req.body.birth) fields.birth = req.body.birth
    if (req.body.sex) fields.sex = req.body.sex

    const sql = `update user_info set ? where id = ?`
    db.query(sql, [fields, req.params.id], (err, results) => {
        console.log(req.params.id)
        if (err) return res.status(400).json(err)
        if (results.affectedRows !== 1) return res.status(400).json('编辑失败')
        res.json(fields)
    })
}

exports.userDelete = (req, res) => {
    const sql = `delete from user_info where id = ?`
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.status(400).json(err)
        if (results.affectedRows !== 1) return res.status(400).json('删除失败')
        res.json('删除成功')
    })
}