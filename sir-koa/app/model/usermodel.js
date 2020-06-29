const mysql = require("./mysql")


const getUserByOpenid = async(openid)=>{
    let sql = "select id from user where weapp_openid=?"
    let user = await mysql.queryOne(sql,[openid])
    
    return user ? user.id : 0
}
const createUser= async(openid)=>{
    let sql = "insert into  `user` (weapp_openid)values(?) "
    const insertData = await mysql.exec(sql,[openid]) 
    return insertData.insertId
}
const updateUser = async(userId,phone)=>{
    let sql = "update  `user` set phone=? where id=?"
    const res = await mysql.exec(sql,[phone,userId]) 
    return res.affectedRows
}
module.exports = {
    getUserByOpenid,createUser,updateUser
}