const mysql = require('mysql')

// 创建链接对象
 const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    port: '3306',
    database: 'sir'
})

// 开始连接
 con.connect()

// 执行 sql 语句
 const sql = `insert into test (title, content, author) values (' 标题 C', ' 内容 C','zhangsan');`
con.query(sql, (err, result) => {
    if (err) {
        console.error(err)
        return
    }
    console.log(result)
})

// 关闭连接
 con.end()