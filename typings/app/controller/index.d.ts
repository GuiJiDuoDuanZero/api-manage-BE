// This file is created by egg-ts-helper@1.30.3
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportEmail from '../../../app/controller/email';
import ExportHome from '../../../app/controller/home';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    email: ExportEmail;
    home: ExportHome;
    user: ExportUser;
  }
}
