/**
 * 在这里定义和登录注册相关的路由处理函数
 * 供/router/admin.js模块进行调用
 */
const db = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')

// 注册用户的处理函数
exports.register = (req, res) => {
    const adminInfo = req.body
    if (!adminInfo.name || !adminInfo.password) {
        return res.json({ status: 400, message: '用户名或密码为空' })
    }

    const sql = `select * from admin where name = ? `
    db.query(sql, [adminInfo.name], (err, results) => {
        if (err) {
            return res.send({
                status: 404,
                message: err.message
            })
        }

        if (results.length > 0) {
            return res.status(400).json('用户名已被注册，请更改后重新注册！')
        }

        // 对用户的密码,进行 bcrype 加密，返回值是加密之后的密码字符串
        adminInfo.password = bcrypt.hashSync(adminInfo.password, 10)

        const sqlStr = 'insert into admin set ?'
        db.query(sqlStr, { name: adminInfo.name, password: adminInfo.password, identify: adminInfo.identify }, (err, results) => {
            if (err) {
                return res.send({
                    status: 400,
                    message: err.message
                })
            }

            if (results.affectedRows !== 1) {
                return res.status(400).json('注册用户失败，请稍后再试')
            }

            res.json({
                status: 200,
                message: '注册成功',
                name: adminInfo.name,
                password: adminInfo.password,
                identify: adminInfo.identify
            })
        })

    })
}

// 登录的处理函数
exports.login = (req, res) => {
    const adminInfo = req.body
    const sql = `select * from admin where name = ?`
    db.query(sql, adminInfo.name, (err, results) => {
        if (err) {
            return res.status(400).json(err)
        }

        if (results.length !== 1) {
            return res.status(400).json('用户不存在')
        }

        const compareResult = bcrypt.compareSync(adminInfo.password, results[0].password)
        if (!compareResult) {
            return res.status(400).json('用户名或密码输入错误，请重新输入')
        }

        // const admin = { ...results[0], password: '' }
        const admin = {
            id: results[0].id,
            name: results[0].name,
            identify: results[0].identify
        }
        const tokenStr = jwt.sign(admin, config.jwtSecretKey, {
            // expiresIn: '10h', // token 有效期为 10 个小时
            expiresIn: '10h', // token 有效期为 10 个小时
        })

        // 将生成的 Token 字符串响应给客户端
        res.json({
            status: 200,
            message: '登录成功！',
            // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
            token: 'Bearer ' + tokenStr,
        })

    })
}

