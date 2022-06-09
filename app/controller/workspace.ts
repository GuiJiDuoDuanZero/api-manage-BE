import { Controller } from 'egg';
import { v4 as uuid } from 'uuid';
import { vCreate, vDelete, vGetList, vUpdate } from '../chore/validates/workspace';

class Workspace extends Controller {

  public async create() {
    const { ctx } = this;

    try {
      ctx.userInfo.ownerUid = ctx.userInfo.uid;
      delete ctx.userInfo.uid

      const params = { ...ctx.request.body, ...ctx.userInfo };
      ctx.validate(vCreate(), params);

      params.workspaceId = uuid(params.ownerUid);

      const workspaceInfo = await ctx.service.workspace.create(params);

      if (workspaceInfo) {
        ctx.body = {
          msg: '工作区创建成功',
          data: {
            workspaceId: workspaceInfo.workspaceId
          }
        };

        return
      }
      ctx.body = {
        msg: '工作区创建失败'
      }
    } catch (error) {
      console.log('工作区创建接口出错', error);
      ctx.body = {
        msg: '服务器错误'
      }
    }
  }

  /**
   * @desc 目前因为还不存在共享工作区功能，所以获取工作区还是来自于个人创建的
   */
  public async getWorkspaceList() {
    const { ctx } = this;

    try {
      ctx.validate(vGetList(), ctx.userInfo);
      const workspaceList = await ctx.service.workspace.getList(ctx.userInfo);

      if (!workspaceList.hasOwnProperty('code')) {
        ctx.body = {
          msg: '获取工作区列表成功',
          data: {
            workspaceList: (workspaceList as any[]).map(item => {
              return {
                workspaceId: item.workspaceId,
                ownerUid: item.ownerUid,
                uid: [],
                private: item.private,
                name: item.name
              }
            })
          }
        };

        return;
      }

      ctx.body = {
        msg: '获取工作区列表失败',
      }
    } catch (error) {
      ctx.body = {
        msg: '服务器错误'
      }
    }
  }

  /**
   * @desc 删除workspace，暂时不用考虑权限
   */
  public async deleteWorkspace() {
    const { ctx } = this;
    try {
      const params = { ...ctx.userInfo, ...ctx.request.body };
      ctx.validate(vDelete(), params);

      let results = await ctx.service.workspace.delete(params);
      ctx.body = {
        msg: '删除工作区成功',
        results
      }
    } catch (error) {
      ctx.body = {
        msg: '服务器错误'
      }
    }
  }

  /**
   * @desc 更新工作区
   */
  public async updateWorkspace() {
    const { ctx } = this;
    try {
      const params = { ...ctx.userInfo, ...ctx.request.body };
      ctx.validate(vUpdate(), params);

      await ctx.service.workspace.update(params);
      ctx.body = {
        msg: `更新工作区${params.name}成功`,
      }
    } catch (error) {
      ctx.body = {
        msg: '服务器错误'
      }
    }
  }
};

export default Workspace;