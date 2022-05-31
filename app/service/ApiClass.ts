import { Service } from 'egg';

/**
 * Test Service api class
 */
class ApiClass extends Service {
  public async createApiClass(params) {
    const { ctx } = this;
    try {
      const result = await ctx.model.Class.create(Object.assign({}, params));
      return result;
    } catch (error) {
      return {
        code: 500,
        msg: JSON.stringify(error)
      }
    }
  }
}

export default ApiClass;