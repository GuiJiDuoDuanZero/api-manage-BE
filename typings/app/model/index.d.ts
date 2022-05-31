// This file is created by egg-ts-helper@1.30.3
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportClass from '../../../app/model/class';
import ExportUser from '../../../app/model/user';
import ExportWorkspace from '../../../app/model/workspace';

declare module 'egg' {
  interface IModel {
    Class: ReturnType<typeof ExportClass>;
    User: ReturnType<typeof ExportUser>;
    Workspace: ReturnType<typeof ExportWorkspace>;
  }
}
