const fs = require('fs')
const path  = require('path')
//promise方式获取文件内容
function getFile(fileName){
    const promise = new Promise((resolve,reject)=>{
        const fullName = path.resolve(__dirname,"",fileName)
        fs.readFile(fullName,(err,data)=>{
            if(err){
                reject(err)
                return
            }
            resolve(JSON.parse(data.toString()))
        })
    })
    return promise
    
}
//测试
getFile('a.json').then(aData=>{
    console.log('aData',aData)
    return getFile(aData.next)
}).then(bData=>{
    console.log('bData',bData)
    return getFile(bData.next)
}).then(cData=>{
    console.log('cData',cData)
})