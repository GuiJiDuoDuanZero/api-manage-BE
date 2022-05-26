import { Controller } from 'egg';
import { uuid } from 'lsp-uuid';

class Workspace extends Controller {

  private vCreate() {
    return {
      name: { type: 'string', required: true },
      private: { type: 'number', required: true },
      uid: { type: 'string', required: true }
    }
  }

  public async create() {
    const { ctx } = this;

    try {
      const params = { ...ctx.request.body, ...ctx.userInfo };
      ctx.validate(this.vCreate(), params);

      params.workspaceId = uuid(params.uid);
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
};

export default Workspace;