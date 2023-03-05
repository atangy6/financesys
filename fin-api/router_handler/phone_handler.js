const db = require('../db/index')

exports.getPhone = (req, res) => {
    const sql = `select * from phone_buy`

    db.query(sql, (err, results) => {
        if (err) return res.json(err)
        if (results.length === 0) return res.json('数据库中暂无数据')
        res.status(200).json(results)
    })
}

exports.phoneSales = (req, res) => {
    const sql = 'select * from phone_sales'
    db.query(sql, (err, results) => {
        if (err) return res.status(400).json(err)
        if (results.length === 0) return res.status(200).json('数据库中暂无数据')
        res.status(200).json(results)
    })
}

exports.userStatus = (req, res) => {
    const sql = 'select weekday, new, active from user_status'
    db.query(sql, (err, results) => {
        if (err) return res.status(400).json(err)
        if (results.length === 0) return res.status(200).json('数据库中暂无数据')
        res.status(200).json(results)
    })
}
