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

  // 获取项目下的分类列表
  public async getClassList(params) {
    const { ctx } = this;
    try {
      const results = await ctx.model.Class.find(params);
      return results;
    } catch (err) {
      return {
        code: 500,
        msg: JSON.stringify(err),
      };
    }
  }

  // 删除api
  public async delete(params) {
    const { ctx } = this;
    try {
      // console.log('params24:',params)
      const results = await ctx.model.Class.deleteOne({ _id: params._id });
      // console.log('results24:',results)
      return results;
    } catch (err) {
      return {
        code: 500,
        msg: JSON.stringify(err),
      };
    }
  }

}

export default ApiClass;