import { Application } from "egg";

export default (app: Application) => {
  const { controller, router, middleware } = app;
  const { tokenHandler } = middleware;
  // validate

  /**
   * @desc 创建工作区
   */
  router.post('/v0/workspace/create', tokenHandler(), controller.workspace.create);

  /**
   * @desc 获取工作区列表
   */
  router.get(
    '/v0/workspace/list',
    tokenHandler(),
    // validate(),
    controller.workspace.getWorkspaceList
  );

  /**
   * @desc 删除工作区
   */
  router.delete('/v0/workspace/delete', tokenHandler(), controller.workspace.deleteWorkspace);

  /**
   * @desc 更新工作区
   */
  router.put('/v0/workspace/update', tokenHandler(), controller.workspace.updateWorkspace);
}