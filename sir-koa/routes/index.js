const router = require('koa-router')()
const indexApi = require('../app/api/index')
// ctx.response.type = 'application/json';
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello 1234'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})


//首页列表
router.get('/card', async (ctx, next) => {
  indexApi.getCard(ctx)
})
//打卡
router.post('/card', async (ctx, next) => {
  indexApi.addCard(ctx)
})
//点赞
router.post('/praise', async (ctx, next) => {
  indexApi.praise(ctx)
})
module.exports = router
