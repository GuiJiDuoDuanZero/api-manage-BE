import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router, middleware } = app;

  router.get('/', controller.home.index);
  router.get('/email', controller.email.sendEmail);

  router.post('/register', middleware.emailCodeCheck(), controller.user.register);
  router.post('/login', controller.user.login);
};
