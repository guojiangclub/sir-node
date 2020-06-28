
const response = require('../app/core/response')
const Redis = require('../app/model/redis')
const redis = new Redis()
const resp = new response()
module.exports = async (ctx, next) => {
    let token = ctx.request.headers["token"];
    // 解码
    let json = redis.get(token)
    let user = JSON.parse(json)
    if (user) {
        ctx.state.userId = user.userId
        // 未过期
        await next();
    } else {
        //过期
        ctx.body =  resp.fail(10001, "请重新登录")
        return
    }

}



