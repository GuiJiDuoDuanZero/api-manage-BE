import { Controller } from 'egg';

class UserController extends Controller {

  private vUser() {
    return {
      username: { type: 'string', required: true },
      password: { type: 'string', required: true },
      code: { type: 'string', required: true }
    }
  };

  /**
   * 用户注册
   */
  public async register() {
    const { ctx } = this;

    // 接收校验参数
    try {
      const params = ctx.request.body;
      ctx.validate(this.vUser(), params);

      const code = await this.service.dbRedis.get(params.username);

      if (!code) {
        ctx.body = {
          msg: '验证码不存在或已过期'
        }
        return
      }

      if (code !== params.code) {
        ctx.body = {
          msg: '验证码错误'
        }
        return;
      }

      // 判断用户名是否重复
      const isUser = false;
      if (isUser) {
        ctx.status = 401;
        ctx.body = {
          code: 40001
        };
        return;
      };
      ctx.body = { code: 0 }
    } catch (error) {
      ctx.body = { code: 400001 }
    }

  }

  /**
   * 用户登录
   */
  public async login() {
    const { ctx } = this;
    // 接收并校验参数
    ctx.validate(this.vUser(), ctx.request.body);
    const data = await ctx.service.user.Login(ctx.request.body);
    if (!data) {
      ctx.status = 401;
      ctx.body = { code: 40000 };
      return;
    }
    ctx.body = { code: 0 };
  }
}

export default UserController;