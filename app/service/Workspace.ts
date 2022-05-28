import { Service } from 'egg'

class WorkspaceService extends Service {

  // 创建工作区
  public async create(params) {
    const { ctx } = this;
    try {
      const results = await ctx.model.Workspace.create(Object.assign({}, params));
      return results;
    } catch (err) {
      return {
        code: 500,
        msg: JSON.stringify(err),
      };
    }
  }

  // 获取工作区列表
  public async getList(params) {
    const { ctx } = this;
    try {
      const results = await ctx.model.Workspace.find({ ownerUid: params.uid });
      return results;
    } catch (err) {
      return {
        code: 500,
        msg: JSON.stringify(err),
      };
    }
  }

  // 删除工作区
  public async delete(params) {
    const { ctx } = this;
    try {
      const results = await ctx.model.Workspace.deleteOne({ workspaceId: params.workspaceId });
      return results;
    } catch (err) {
      return {
        code: 500,
        msg: JSON.stringify(err),
      };
    }
  }
}
export default WorkspaceService;