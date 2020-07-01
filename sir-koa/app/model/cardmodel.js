const mysql = require("./mysql")

const createCardPraise = async(cardId,userId)=>{
    let sql = "insert into  `card_praise` (card_id,user_id)values(?,?) "
    const insertData = await mysql.exec(sql,[cardId,userId]) 
    return insertData.insertId
}
const getCardPraise = async(cardId,userId)=>{
    let sql = "select id from `card_praise` where card_id=? and user_id=?"
    const res = await mysql.queryOne(sql,[cardId,userId]) 
    return res.id
}
const getCards = async()=>{
    let sql = "select id,content,image from `card`"
    const res = await mysql.exec(sql) 
    return res
}
const incrCardPraise = async(cardId)=>{
    let sql = "update  `card` set praise=praise+1 where id=?"
    const res = await mysql.exec(sql,[cardId]) 
    return res.affectedRows
}
const addCard = async(userId,content,image)=>{
    let sql = "insert into  `card` (user_id,content,image)values(?,?,?) "
    const insertData = await mysql.exec(sql,[userId,content,image]) 
    return insertData.insertId
}
module.exports = {
    createCardPraise,incrCardPraise,getCardPraise,addCard,getCards
}