import { Controller } from 'egg';
import { vCreate,vGetList} from '../chore/validates/req';

class Req extends Controller {

  public async create() {
    const { ctx } = this;
    try {
      const params = { ...ctx.request.body};
      ctx.validate(vCreate(), params);
        // console.log('params24:',params)
      const reqInfo = await ctx.service.req.create(params);
        // console.log('reqInfo:',reqInfo)
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
        msg: '接口请求参数创建失败'
      }
    } catch (error) {
      console.log('接口请求参数出错', error);
      ctx.body = {
        msg: '服务器错误'
      }
    }
  }


  /**
   * @desc 获取接口列表
   */
   public async getList() {
    const { ctx } = this;
    try {
      const query = ctx.request.query;
      // console.log('params24:',query)
      ctx.validate(vGetList(), query);
      const reqList = await ctx.service.req.getList(query);
      // console.log('reqList:',reqList)
      if (!reqList.hasOwnProperty('code')) {
        ctx.body = {
          msg: '获取接口列表成功',
          code: 0,
          data: { reqList }
        };
        return;
      }
      ctx.body = {
        msg: '获取接口列表失败',
      }
    } catch (error) {
      console.log('error70:',error)
      ctx.body = {
        msg: '服务器错误'
      }
    }
  }

}

export default Req;