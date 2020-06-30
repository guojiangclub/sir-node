const fs = require("fs")
const path = require("path")
const cardModel = require('../model/cardmodel')
const request = require('koa2-request')
const { md5 } = require('../util/cryp')
const response = require('../core/response')
const Redis = require('../model/redis')
const redis = new Redis()
const resp = new response()


const getCard = async(ctx) => {
    
    
}
const addCard = async(ctx) => {
    const userId = ctx.state.userId
    const content =ctx.request.body.content
    const image =ctx.request.body.image
    await cardModel.addCard(userId,content,image)
    ctx.body = resp.succeed()
    return
}
const praise = async(ctx) => {
    const cardId = ctx.request.body.card_id
    const userId = ctx.state.userId
    let id =  await cardModel.getCardPraise(cardId,userId)
    if(id > 0){
        ctx.body = resp.fail(20001,"不要重复点赞")
        return
    }
    await cardModel.createCardPraise(cardId,userId)
    await cardModel.incrCardPraise(cardId)
    ctx.body = resp.succeed()
    return
}
const upload = async (ctx) => {
    if ('POST' != ctx.method) return
    // 获取图片源
    //  <input type="file" name="file" multiple>
    const file = ctx.request.files.file

    // 接收读出流
    const reader = fs.createReadStream(file.path)
    // 创建写入流 
    // 3. 指定图片路径文件名（即上传图片存储目录）
    const stream = fs.createWriteStream(path.join('public/images', file.name))
    // 用管道将读出流 "倒给" 输入流
    reader.pipe(stream)
    // 4.打印上传文件在服器上存储的相对路径 
    console.log('uploading %s -> %s', file.name, stream.path)
    // 5.重定向到基于根目录下的静态资源web访问路径，展示图片
    ctx.redirect(stream.path.substr(6).replace(/\\/g,'/'))
    
}
module.exports = {
    getCard,addCard,praise,upload
}