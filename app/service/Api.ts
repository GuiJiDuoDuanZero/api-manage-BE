import { Service } from 'egg'

class ApiService extends Service {

  // 创建接口
  public async create(params) {
    const { ctx } = this;
    try {
      const results = await ctx.model.Api.create(Object.assign({}, params));
      return results;
    } catch (err) {
      console.log('err:',err)
      return {
        code: 500,
        msg: JSON.stringify(err),
      };
    }
  }

  // 获取接口列表
  public async getList(params) {
    const { ctx } = this;
    try {
      const results = await ctx.model.Api.find(params);
      return results;
    } catch (err) {
      return {
        code: 500,
        msg: JSON.stringify(err),
      };
    }
  }

}
export default ApiService;