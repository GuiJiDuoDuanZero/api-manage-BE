import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  security: {
    enable: false
  },
  jwt: {
    enable: true,
    package: 'egg-jwt'
  },
  validate: {
    enable: true,
    package: 'egg-validate'
  },
  redis: {
    enable: true,
    package: 'egg-redis'
  }
};

export default plugin;
