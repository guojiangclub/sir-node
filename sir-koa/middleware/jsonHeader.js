
module.exports = async (ctx, next) => {
    ctx.response.type = 'application/json';
    await next();
  }