const userrouter = require('koa-router')()
const userApi = require('../app/api/user')
const auth = require('../middleware/auth')
userrouter.prefix('/user')

//微信登录
userrouter.post('/wechatlogin', function (ctx, next) {
  return userApi.wechatLogin(ctx) 
})
// 手机号登录
userrouter.post('/login',auth,function (ctx, next) {
 return userApi.login(ctx) 
})
//更新个人信息
userrouter.put('/info', function (ctx, next) {
  return userApi.info(ctx) 
})
//查询个人信息
userrouter.get('/me', function (ctx, next) {
  return userApi.me(ctx) 
})


module.exports = userrouter
