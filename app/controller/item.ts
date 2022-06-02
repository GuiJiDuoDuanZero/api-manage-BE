import { Controller } from 'egg';
import { v4 as uuid } from 'uuid';

class Item extends Controller {

  private vCreate() {
    return {
      name: { type: 'string', required: true },
      workspaceId: { type: 'string', required: true }
    }
  }
  private vGetList() {
    return {
      workspaceId: { type: 'string', required: true }
    }
  }

  private vGetDetail() {
    return {
      itemId: { type: 'string', required: true }
    }
  }

  // private vDelete() {
  //   return {
  //     itemId: {type: 'string', required: true } 
  //   }
  // }

  private vUpdate() {
    return {
      itemId: {
        type: 'string', required: true
      },
      name: {
        type: 'string', required: false
      }
    }
  }

  public async create() {
    const { ctx } = this;
    try{
      ctx.userInfo.ownerUid = ctx.userInfo.uid;
      delete ctx.userInfo.uid
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

  /**
   * @desc 获取项目列表
   */
   public async getItemList() {
    const { ctx } = this;
    try {
      const query = ctx.request.query;
      // console.log('params24:',query)
      ctx.validate(this.vGetList(), query);
      const itemList = await ctx.service.item.getList(query);
      if (!itemList.hasOwnProperty('code')) {
        ctx.body = {
          msg: '获取项目列表成功',
          code: 0,
          data: {
            itemList: (itemList as any[]).map(item => {
              return {
                itemId: item.itemId,
                name: item.name
              }
            })
          }
        };
        return;
      }
      ctx.body = {
        msg: '获取项目列表失败',
      }
    } catch (error) {
      ctx.body = {
        msg: '服务器错误'
      }
    }
  }

  /**
   * @desc 获取项目详情
   */
   public async getItemDetail() {
    const { ctx } = this;
    try {
      const query = ctx.request.query;
      ctx.validate(this.vGetDetail(), query);
      const itemDetail= await ctx.service.item.getDetail(query);
      // const classList= await ctx.service.item.getDetail(query);
      if (!itemDetail.hasOwnProperty('code')) {
        ctx.body = {
          msg: '获取项目详情成功',
          code: 0,
          data: {
            itemDetail: { 
              workspaceId:itemDetail.workspaceId,
              itemId:itemDetail.itemId,
              name:itemDetail.name,
            },
            // classList: (classList as any[]).map(item => {
            //   return {
            //     classListId: item.itemId,
            //     name: item.name
            //   }
            // })
          }
        };
        return;
      }
      ctx.body = {
        msg: '获取项目详情失败',
      }
    } catch (error) {
      ctx.body = {
        msg: '服务器错误'
      }
    }
  }

  /**
   * @desc 更新项目
   */
   public async updateItem() {
    const { ctx } = this;
    try {
      const params = { ...ctx.userInfo, ...ctx.request.body };
      ctx.validate(this.vUpdate(), params);
      await ctx.service.item.update(params);
      // console.log('newItem:',newItem)
      ctx.body = {
        msg: `更新工作区${params.name}成功`,
        code:0,
        itemId:params.itemId
      }
    } catch (error) {
      ctx.body = {
        msg: '服务器错误'
      }
    }
  }



}

export default Item;