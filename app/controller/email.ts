import { Controller } from 'egg';

class EmailController extends Controller {
  public async sendEmail() {
    const { ctx } = this;
    const sendEmailRes = await ctx.service.email.sendMail('1375883312@qq.com', '叼毛', { username: '1375883312@qq.com', code: ctx.helper.generatorEmailCode() });
    console.log(sendEmailRes);
    if (sendEmailRes) {
      ctx.body = { code: 0 }
    } else {
      ctx.body = { code: 40000 }
    }
  }
}

export default EmailController;