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
    const list = await cardModel.getCards()
    ctx.body = resp.setData(list)
    return
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
    // 获取图片源
    //  <input type="file" name="file" multiple>
    const file = ctx.request.files.file;
    const fileName = file.name;
    // 创建可读流
    const render = fs.createReadStream(file.path);
    let filePath = path.join('public/images',fileName);
    const fileDir = path.join('public/images');
    if (!fs.existsSync(fileDir)) {
      fs.mkdirSync(fileDir, err => {
        console.log('创建失败',err)
      });
      return
    }
    // 创建写入流
    const upStream = fs.createWriteStream(filePath);
    render.pipe(upStream);
    // console.log(ctx.request.origin);
    
    ctx.body = resp.setData({"url":ctx.request.origin+"/"+filePath }) 
    return
}
module.exports = {
    getCard,addCard,praise,upload
}