
const miniappConfig = require('../../config/miniapp')
const koa2Req = require('koa2-request')

const userModel = require('../model/usermodel')
const request = require('koa2-request')
const { md5 } = require('../util/cryp')
const response = require('../core/response')
const Redis = require('../model/redis')
const redis = new Redis()
const resp = new response()

const wechatLogin = async (ctx) => {

    const code = ctx.request.body.code
    const body = await wxUser(code)

    if (body.errcode > 0) {
        ctx.body = resp.fail(10001, body.errmsg)
        return
    }
    let userId = await userModel.getUserByOpenid(body.openid)
    if(userId == 0){
        userId = await userModel.createUser(body.openid)
    }
    const token = md5(body.openid)
    redis.set(token,{ "openid": body.openid,"userId":userId })
    ctx.body = resp.setData({ "token": token })
    return
}
const wxUser = async (code) => {
    const appid = miniappConfig.appid
    const secret = miniappConfig.secret
    const loginUrl = "https://api.weixin.qq.com/sns/jscode2session?appid=" + appid + "&secret=" + secret + "&js_code=" + code + "&grant_type=authorization_code"
    const wxresult = await koa2Req(loginUrl).catch((err) => {
        console.log("err", err);
    });
    return JSON.parse(wxresult.body)
}
const login = async(ctx) => {
    const phone = ctx.request.body.phone
    const userId = ctx.state.userId
    
    const res = await userModel.updateUser(userId,phone)
    
    // const openid =ctx.request.body.openid
    // let userId = await userModel.getUserByOpenid(openid)
    // if(userId == 0){
    //     userId = await userModel.createUser(openid)
    // }
    // const token = md5(openid)
    // redis.set(token,{ "openid": openid,"userId":userId })
    ctx.body = resp.succeed()
    return
}
const info =async (ctx) => {
    const userId = ctx.state.userId
    const nickname = ctx.request.body.nickname
    await userModel.updateUserInfo(userId,nickname)
    ctx.body = resp.succeed()
    return
}
const me =async (ctx) => {
    const userId = ctx.state.userId
    const user = await userModel.getUserById(userId)
    ctx.body = resp.setData(user)
    return
}
module.exports = {
    wechatLogin, login, info, me
}