import { Controller } from 'egg';
import { vCreate} from '../chore/validates/req';

class Req extends Controller {

  public async create() {
    const { ctx } = this;
    try {
      const params = { ...ctx.request.body};
      ctx.validate(vCreate(), params);
        // console.log('params24:',params)
      const reqInfo = await ctx.service.req.create(params);
        // console.log('apiInfo:',reqInfo)
      if (reqInfo) {
        ctx.body = {
          msg: '接口请求参数创建成功',
          code: 0,
          data: {
            reqInfo
          }
        };

        return
      }
      ctx.body = {
        msg: '接口创建失败'
      }
    } catch (error) {
      console.log('接口创建接口出错', error);
      ctx.body = {
        msg: '服务器错误'
      }
    }
  }

}

export default Req;