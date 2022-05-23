import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1653295602527_9613';

  // add your egg config in here
  config.middleware = [];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  /* 自定义 token 的加密条件字符串 */
  config.jwt = {
    secret: 'test-egg-serve-jwt'
  }

  /* 邮件配置 */
  config.email = {
    host: 'smtp.qq.com', //邮件host
    name: '1375883312@qq.com', // 邮件名
    password: 'rqauvgkkcjzahgce',  //  vcamessage@163.com Vca123456  ,授权码登录
    // to:'184336166@qq.com,xxx@163.com' //发送给谁
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
