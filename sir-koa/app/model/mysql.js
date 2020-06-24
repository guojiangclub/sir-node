const mysql = require('mysql')
const { Config } = require('../../config/mysql')

// 创建链接对象
 const con = mysql.createConnection(Config)

// 开始链接
 con.connect()

// 统一执行 sql 的函数
 function exec(sql,params) {
    const promise = new Promise((resolve, reject) => {
        con.query(sql,params, (err, result) => {
            if (err) {
                reject(err)
                return
            }
            resolve(result)
        })
    })
    return promise
}

module.exports = {
    exec,
    escape: mysql.escape
}