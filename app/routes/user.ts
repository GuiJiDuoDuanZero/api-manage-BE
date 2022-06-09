import { Application } from "egg";
import { EMAIL_REDIS_KEY_TYPE } from '../chore/constants/email.constant';

export default (app: Application) => {
  const { controller, router, middleware } = app;

  /**
  * @desc 注册
  */
  router.post('/v0/user/register', middleware.emailCodeCheck(EMAIL_REDIS_KEY_TYPE.register), controller.user.register);

  /**
   * @desc 登录
   */
  router.post('/v0/user/login', controller.user.login);

  /**
   * @desc 忘记密码
   */
  router.put('/v0/user/forget', middleware.emailCodeCheck(EMAIL_REDIS_KEY_TYPE.forget), controller.user.forget);
}