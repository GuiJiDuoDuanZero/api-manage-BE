import { Service } from 'egg'

class WorkspaceService extends Service {

  // 创建工作区
  async create(params) {
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
}
export default WorkspaceService;