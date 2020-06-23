
const miniappConfig = require('../../config/miniapp')
const koa2Req = require('koa2-request')
const response = require('../code/response')
const resp = new response()


const wechatLogin = async (ctx)=>{
  
    const code = ctx.request.body.code
    const appid = miniappConfig.appid
    const secret = miniappConfig.secret
    const loginUrl = "https://api.weixin.qq.com/sns/jscode2session?appid="+appid+"&secret="+secret+"&js_code="+code+"&grant_type=authorization_code"    
    const wxresult = await koa2Req(loginUrl).catch((err)=>{
        console.log("err" , err );
    });
    const body = JSON.parse(wxresult.body);
    if(body.errcode >0 ){
         ctx.body = resp.fail(10001, body.errmsg)
         return
    }
    const {session_key,openid} = JSON.parse(wxresult.body);
    ctx.body = resp.succeed()

    return 
}
const login =(ctx)=>{
    
}
const info =(ctx)=>{
    
}
const me =(ctx)=>{
    
}
module.exports= {
    wechatLogin,login,info,me
}