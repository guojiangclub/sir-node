const mysql = require("./mysql")


const getUserByOpenid = async(openid)=>{
    let sql = "select id from user where weapp_openid=?"
   
    return await mysql.exec(sql,[openid]) 
}
const createUser= async(openid)=>{
    let sql = "insert into  `user` (weapp_openid)values(?) "
    const insertData = await mysql.exec(sql,[openid]) 
    return insertData.insertId
}
module.exports = {
    getUserByOpenid,createUser
}