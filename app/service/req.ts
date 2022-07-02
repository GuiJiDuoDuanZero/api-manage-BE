import { Service } from 'egg'

class ReqService extends Service {

  // 创建接口
  public async create(params) {
    const { ctx } = this;
    try {
      const results = await ctx.model.Req.create(Object.assign({}, params));
      // console.log('results:',results)
      return results;
    } catch (err) {
      console.log('err:',err)
      return {
        code: 500,
        msg: JSON.stringify(err),
      };
    }
  }


}
export default ReqService;