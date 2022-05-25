export default () => {
  return async function emailCodeCheck(ctx, next) {
    const params = ctx.request.body;
    const code = await ctx.service.dbRedis.get(params.username);

    if (!params.hasOwnProperty('code')) {
      ctx.body = {
        msg: '验证码不存在'
      }
    }

    if (!code) {
      ctx.body = {
        msg: '验证码已过期'
      }
      return
    }

    if (code !== params.code) {
      ctx.body = {
        msg: '验证码错误'
      }
      return;
    }

   await next();
  }
}