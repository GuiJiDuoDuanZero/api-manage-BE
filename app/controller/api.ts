import { Controller } from 'egg';
// import { v4 as uuid } from 'uuid';

class Api extends Controller {

  private vCreate() {
    return {
      title: { type: 'string', required: true },
      itemId: { type: 'string', required: true },
      catId: { type: 'string', required: true },
      method: { type: 'string', required: true },
      path: { type: 'string', required: true }
    }
  }
  private vGetList() {
    return {
        itemId: { type: 'string', required: true },
        catId: { type: 'string', required: true },
    }
  }
  private vGetDetail() {
    return {
      _id: { type: 'string', required: true }
    }
  }
  // private vDelete() {
  //   return {
  //     _id: {type: 'string', required: true } 
  //   }
  // }


  public async create() {
    const { ctx } = this;
    try{
      ctx.userInfo.ownerUid = ctx.userInfo.uid;
      delete ctx.userInfo.uid
      const params = { ...ctx.request.body, ...ctx.userInfo };
      ctx.validate(this.vCreate(), params);
      //   console.log('params24:',params)
      const apiInfo = await ctx.service.api.create(params);
      //   console.log('apiInfo:',apiInfo)
      if (apiInfo) {
        ctx.body = {
          msg: '接口创建成功',
          code:0,
          data: {
                apiId: apiInfo._id,
                title: apiInfo.title,
                catId:apiInfo.catId,
                itemId:apiInfo.itemId,
                method: apiInfo.method,
                path: apiInfo.path,
                status: apiInfo.status,
                createdAt: apiInfo.createdAt,
                updatedAt: apiInfo.updatedAt,
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

  /**
   * @desc 获取接口列表
   */
   public async getList() {
    const { ctx } = this;
    try {
      const query = ctx.request.query;
        // console.log('params24:',query)
      ctx.validate(this.vGetList(), query);
      const apiList = await ctx.service.api.getList(query);
        // console.log('apiList:',apiList)
      if (!apiList.hasOwnProperty('code')) {
        ctx.body = {
          msg: '获取接口列表成功',
          code: 0,
          data: {apiList
            // apiList: (apiList as any[]).map(item => {
            //   return {
            //     apiId: item.apiId,
            //     name: item.name
            //   }
            // })
          }
        };
        return;
      }
      ctx.body = {
        msg: '获取接口列表失败',
      }
    } catch (error) {
      ctx.body = {
        msg: '服务器错误'
      }
    }
  }

  /**
   * @desc 删除api，暂时不考虑权限
   */
  public async deleteItem() {
    const { ctx } = this;
    try {
      const params = {...ctx.request.body };
      // ctx.validate(params);
      // console.log('params111:',params)
      let results=await ctx.service.api.delete(params);
      // console.log('results111:',results)
      ctx.body = {
        msg: '删除api成功',
        code:0,
        results
      }
    } catch (error) {
      ctx.body = {
        msg: '服务器错误',
        error:error
      }
    }
  }

  /**
   * @desc 获取api详情
   */
   public async getDetail() {
    const { ctx } = this;
    try {
      const query = ctx.request.query;
      // console.log('query111:',query)
      ctx.validate(this.vGetDetail(), query);
      const apiDetail= await ctx.service.api.getDetail(query);
      if (!apiDetail.hasOwnProperty('code')) {
        ctx.body ={
          msg: '获取api详情成功',
          code: 0,
          data: {
            apiDetail
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

}

export default Api;