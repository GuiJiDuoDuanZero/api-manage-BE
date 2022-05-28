import { Application } from 'egg';
import { EMAIL_REDIS_KEY_TYPE } from './chore/email.constant';

export default (app: Application) => {
  const { controller, router, middleware } = app;

  /**
   * @desc 发送邮件
   */
  router.get('/email', controller.email.sendEmail);

  /**
   * @desc 注册
   */
  router.post('/register', middleware.emailCodeCheck(EMAIL_REDIS_KEY_TYPE.register), controller.user.register);

  /**
   * @desc 登录
   */
  router.post('/login', controller.user.login);

  /**
   * @desc 忘记密码
   */
  router.put('/forget', middleware.emailCodeCheck(EMAIL_REDIS_KEY_TYPE.forget), controller.user.forget);

  /**
   * @desc 创建工作区
   */
  router.post('/v0/workspace/create', middleware.tokenHandler(), controller.workspace.create);

  /**
   * @desc 获取工作区列表
   */
  router.get('/v0/workspace/list', middleware.tokenHandler(), controller.workspace.getWorkspaceList);

  /**
  * @desc 删除工作区
  */
  router.delete('/v0/workspace/delete', middleware.tokenHandler(), controller.workspace.deleteWorkspace);
};

