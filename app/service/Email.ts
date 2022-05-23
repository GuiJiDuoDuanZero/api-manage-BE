import { Service } from 'egg';
import { createTransport } from 'nodemailer';

/**
 * Test Service Email
 */
class EmailService extends Service {

  public sendMail(sendTo: string, subject: string, userInfo: any) {
    const transport = createTransport({
      port: 465,
      secure: true,
      host: this.config.email.host,
      auth: {
        user: this.config.email.name,
        pass: this.config.email.password,
      }
    });

    const message = {
      from: this.config.email.name,
      to: sendTo,
      subject: subject,
      html: `用户注册账号<h3>${userInfo.username}</h3> <br /> <h3>验证码: ${userInfo.code}</h3>`
    };

    return new Promise((resolve, reject) => {
      transport.sendMail(message, (err, info) => {
        if (err) {
          return reject(undefined);
        } else {
          return resolve(info);
        }
      })
    })
  }
}

export default EmailService;