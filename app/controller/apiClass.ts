import { Controller } from 'egg';

class ApiClass extends Controller {

  private vClass() {
    return {
      workspaceId: { type: 'string', required: true },
      itemId: { type: 'string', required: true },
      parentCatId: { type: 'string', required: false },
      className: { type: 'string', required: true },
      classRemark: { type: 'string', required: false }
    }
  }

  private vDelete() {
    return {
      workspaceId: { type: 'string', required: true },
      itemId: { type: 'string', required: true },
      classId: { type: 'string', required: true }
    }
  }

  public async create() {
    const { ctx } = this;
    try {
      const params = ctx.request.body;
      ctx.validate(this.vClass(), params);

      // 校验工作区
      const dbWorkspace = await ctx.service.workspace.getWorkspace(params);
      if (dbWorkspace?.hasOwnProperty('code') || !dbWorkspace) {
        return ctx.body = {
          msg: '工作区不存在'
        }
      }
      // 校验项目
      // 暂无

      const dbClass = await ctx.service.apiClass.createApiClass(params);
      if (dbClass && !dbClass?.hasOwnProperty('code')) {
        const data = {
          className: dbClass.className,
          classRemark: dbClass.classRemark,
          catId: dbClass._id
        }

        return ctx.body = {
          msg: '创建成功',
          data
        }
      }
      ctx.body = {
        msg: '创建失败'
      }
    } catch (error) {
      ctx.status = 500
      ctx.body = {
        msg: 'create api class error'
      }
    }
  }

  public async delete() {
    const { ctx } = this;
    const params = ctx.request.body;
    try {
      ctx.validate(this.vDelete(), params);

      // 校验工作区
      const dbWorkspace = await ctx.service.workspace.getWorkspace(params);
      if (dbWorkspace?.hasOwnProperty('code') || !dbWorkspace) {
        return ctx.body = {
          msg: '工作区不存在'
        }
      }
      // 校验项目
      // 暂无

      const dbClass = await ctx.service.apiClass.deleteApiClass(params);

      if (dbClass) {
        return ctx.body = {
          msg: '删除接口分类成功'
        }
      }

      ctx.body = {
        msg: '删除接口分类失败'
      }
    } catch (error) {
      ctx.status = 500
      ctx.body = {
        msg: 'delete api class error'
      }
    }
  }
}

export default ApiClass;