import { Controller } from 'egg';
import { EMIAL_EXPRIED_TIME } from '../chore/email.constant';

class EmailController extends Controller {

  private vEmail() {
    return {
      email: { type: 'string', required: true },
      username: { type: 'string', required: true }
    }
  };

  public async sendEmail() {
    const { ctx } = this;

    try {
      const query = ctx.request.query;
      const userInfo = await ctx.service.user.findEmail(query);
      if (userInfo) {
        ctx.body = {
          msg: '邮箱已经被注册'
        }
        return
      }

      ctx.validate(this.vEmail(), query);
      const code = ctx.helper.generatorEmailCode();
      await this.service.dbRedis.set<number>(query.username, code, EMIAL_EXPRIED_TIME);
      const sendEmailRes = await ctx.service.email.sendMail(
        query.email,
        '注册',
        {
          username: query.username,
          code
        });
      if (sendEmailRes) {
        ctx.body = { code: 0 }
      } else {
        ctx.body = { msg: '发送邮件失败，请重试' }
      }
    } catch (error) {
      console.log('获取邮箱验证码接口出错', error);
      ctx.body = { msg: '邮件服务异常' }
    }
  }
}

export default EmailController;