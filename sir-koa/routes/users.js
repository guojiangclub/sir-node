const router = require('koa-router')()
const userApi = require('../app/api/user')

router.prefix('/users')
//微信登录
router.post('/wechatlogin', function (ctx, next) {
  userApi.User.wechatLogin(ctx) 
})
// 手机号登录
router.post('/login', function (ctx, next) {
  userApi.User.login(ctx) 
})
//更新个人信息
router.put('/info', function (ctx, next) {
  userApi.User.info(ctx) 
})
//查询个人信息
router.get('/me', function (ctx, next) {
  userApi.User.me(ctx) 
})


module.exports = router
