import { Controller } from 'egg';

class UserController extends Controller {

  private vUser() {
    return {
      username: { type: 'string', required: true },
      password: { type: 'string', required: true },
    }
  };

  private vRegister() {
    return {
      username: { type: 'string', required: true },
      password: { type: 'string', required: true },
      email: { type: 'string', required: true }
    }
  };

  /**
   * 用户注册
   */
  public async register() {
    const { ctx, app } = this;

    // 接收校验参数
    try {
      const params = ctx.request.body;
      ctx.validate(this.vRegister(), params);

      const userInfo = await ctx.service.user.findEmail(params);

      if (userInfo) {
        ctx.body = {
          msg: '邮箱已经被注册'
        }
        return
      }

      // 判断用户名是否重复
      const user = await ctx.service.user.find(params);
      await ctx.service.user.create(params);

      if (user) {
        ctx.status = 401;
        ctx.body = {
          msg: '邮箱已被注册'
        };
        return;
      };

      const token = app.jwt.sign(
        { username: params.username },
        app.config.jwt.secret,
        { expiresIn: '24h' }
      )

      ctx.body = { msg: '注册成功', token }
    } catch (error) {
      ctx.body = { code: 40001 }
    }

  }

  /**
   * 用户登录
   */
  public async login() {
    const { ctx, app } = this;

    try {
      const params = ctx.request.body;
      ctx.validate(this.vUser(), params);
      console.log(params);
      const data = await ctx.service.user.find(params);
      if (!data) {
        ctx.body = { msg: '用户不存在' };
        return;
      }
      if (data.password !== params.password) {
        ctx.body = { msg: '登录密码错误' };
        return;
      }

      const token = app.jwt.sign(
        { username: params.username },
        app.config.jwt.secret,
        { expiresIn: '24h' }
      )

      ctx.body = { code: 0, token };
    } catch (error) {
      ctx.body = { msg: '登录失败' }
    }

  }
}

export default UserController;