const fs = require('fs')
const path  = require('path')
//callback方式获取文件内容
function getFile(fileName,callback){
    const fullName = path.resolve(__dirname,"",fileName)
    fs.readFile(fullName,(err,data)=>{
        if(err){
            console.error(err)
            return
        }
        callback(JSON.parse(data.toString()))
    })
}
//测试
getFile('a.json',aData=>{
    console.log('aData',aData)
    getFile(aData.next,bData=>{
        console.log('bData',bData)
        getFile(bData.next,cData=>{
            console.log('cData',cData)
        })
    })
})