const fs = require("fs")
const path = require("path")



const getCard = (ctx) => {
    
    
}
const addCard = (ctx) => {
    
    
}
const praise = (ctx) => {
    
    
}
const upload = (ctx) => {
    if ('POST' != ctx.method) return await next()
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