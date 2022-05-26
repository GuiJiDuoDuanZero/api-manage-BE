// This file is created by egg-ts-helper@1.30.3
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportUser from '../../../app/model/user';
import ExportWorkspace from '../../../app/model/workspace';

declare module 'egg' {
  interface IModel {
    User: ReturnType<typeof ExportUser>;
    Workspace: ReturnType<typeof ExportWorkspace>;
  }
}
