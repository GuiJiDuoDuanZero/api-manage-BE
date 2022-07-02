import { Application } from "egg";

export default (app: Application) => {
  const { controller, router, middleware } = app;

  /**
   * @desc 创建api
   */
  router.post('/v0/item/api/create', middleware.tokenHandler(), controller.api.create);

  /**
   * @desc 获取api列表
   */
  router.get('/v0/item/api/list', middleware.tokenHandler(), controller.api.getList);

  /**
   * @desc 删除api
   */
  router.delete('/v0/item/api/delete', middleware.tokenHandler(), controller.api.deleteItem);

  /**
   * @desc 获取api详情
   */
  router.get('/v0/item/api/detail', middleware.tokenHandler(), controller.api.getDetail);

  /**
  * @desc 更新api
  */
  router.put('/v0/item/api/update', middleware.tokenHandler(), controller.api.update);


  // ————————req路由————————
  /**
   * @desc 创建req
   */
  router.post('/v0/item/api/req', middleware.tokenHandler(), controller.req.create);
  /**
   * @desc 获取req
   */
   router.get('/v0/item/api/req', middleware.tokenHandler(), controller.req.getList);
   /**
   * @desc 更新req
   */
    router.put('/v0/item/api/req', middleware.tokenHandler(), controller.req.update);
    /**
   * @desc 删除req
   */
  //  router.get('/v0/item/api/req', middleware.tokenHandler(), controller.req.getList);

}