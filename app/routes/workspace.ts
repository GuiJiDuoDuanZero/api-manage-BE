import { Application } from "egg";

export default (app: Application) => {
  const { controller, router, middleware } = app;

  /**
   * @desc 创建工作区
   */
  router.post('/v0/workspace/create', middleware.tokenHandler(), controller.workspace.create);

  /**
   * @desc 获取工作区列表
   */
  router.get('/v0/workspace/list', middleware.tokenHandler(), controller.workspace.getWorkspaceList);

  /**
   * @desc 删除工作区
   */
  router.delete('/v0/workspace/delete', middleware.tokenHandler(), controller.workspace.deleteWorkspace);

  /**
   * @desc 更新工作区
   */
  router.put('/v0/workspace/update', middleware.tokenHandler(), controller.workspace.updateWorkspace);
}