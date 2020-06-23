const router = require('koa-router')()
const userApi = require('../app/api/user')
router.prefix('/user')
//微信登录
router.post('/wechatlogin', function (ctx, next) {
  
  return userApi.wechatLogin(ctx) 
})
// 手机号登录
router.post('/login', function (ctx, next) {
  userApi.login(ctx) 
})
//更新个人信息
router.put('/info', function (ctx, next) {
  userApi.info(ctx) 
})
//查询个人信息
router.get('/me', function (ctx, next) {
  userApi.me(ctx) 
})


module.exports = router
