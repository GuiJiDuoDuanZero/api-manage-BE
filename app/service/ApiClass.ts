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

  public async deleteApiClass(params) {
    const { ctx } = this;
    try {
      const result = await ctx.model.Class.deleteOne({ _id: params.classId });
      return result;
    } catch (error) {
      return {
        code: 500,
        msg: JSON.stringify(error)
      }
    }
  }

  public async updateApiClass(params, updateInfo) {
    const { ctx } = this;
    try {
      const result = await ctx.model.Class.updateOne({ _id: params.classId }, { $set: { ...updateInfo, updateAt: Date.now() } });
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