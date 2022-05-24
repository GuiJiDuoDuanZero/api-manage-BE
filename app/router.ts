import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.get('/email', controller.email.sendEmail);

  router.post('/register', controller.user.register);
};
