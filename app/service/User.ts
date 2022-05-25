import { Service } from 'egg'

class UserService extends Service {

  //判断邮箱是否已经被注册
  async findEmail(params) {
    const { ctx } = this;
    try {
      const results = await ctx.model.User.findOne({ email: params.email });
      return results;
    } catch (err) {
      return {
        code: 500,
        msg: JSON.stringify(err),
      };
    }
  }

  // 根据用户名找用户
  async find(params) {
    const { ctx } = this;
    try {
      const results = await ctx.model.User.findOne({ username: params.username });
      return results;
    } catch (err) {
      return {
        code: 500,
        msg: JSON.stringify(err),
      };
    }
  }

  // 注册用户
  async create(params) {
    const { ctx } = this;
    try {
      const results = await ctx.model.User.create(Object.assign({}, params));
      return results;
    } catch (err) {
      return {
        code: 500,
        msg: JSON.stringify(err),
      };
    }
  }

}
export default UserService;