import { Controller } from 'egg';
import { v4 as uuid } from 'uuid';

class Item extends Controller {

  private vCreate() {
    return {
      name: { type: 'string', required: true },
      workspaceId: { type: 'string', required: true }
    }
  }

  public async create() {
    const { ctx } = this;
    try{
      ctx.userInfo.ownerUid = ctx.userInfo.uid;
      delete ctx.userInfo.uid

      // ctx.body = {
      //   msg: '111',
      // }
      const params = { ...ctx.request.body, ...ctx.userInfo };
      ctx.validate(this.vCreate(), params);

      params.itemId = uuid(params.ownerUid);

      const itemInfo = await ctx.service.item.create(params);

      if (itemInfo) {
        ctx.body = {
          msg: '项目创建成功',
          data: {
            itemId: itemInfo.itemId
          }
        };

        return
      }
      ctx.body = {
        msg: '项目创建失败'
      }
    } catch (error) {
      console.log('项目创建接口出错', error);
      ctx.body = {
        msg: '服务器错误'
      }
    }
  }
}

export default Item;